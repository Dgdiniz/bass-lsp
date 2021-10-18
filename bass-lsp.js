#!/usr/bin/env node

const {
  DiagnosticSeverity,
  TextDocuments,
  createConnection,
} = require("vscode-languageserver");

const { TextDocument } = require("vscode-languageserver-textdocument");

var exec = require("child_process").exec;

const getBassDiagnostics = (callback) => {
  exec("bass -lsp main.asm", function (error, stdout, stderr) {
    const results = JSON.parse(stderr);
    callback(results["Diagnostics"]);
  });
};

const getDiagnostics = (change) =>
  getBassDiagnostics(function (results) {
    connection.sendDiagnostics({
      uri: change.document.uri,
      diagnostics: results.filter((diagnostic) =>
        change.document.uri.includes(diagnostic["source"])
      ),
    });
  });

const connection = createConnection();
const documents = new TextDocuments(TextDocument);

connection.onInitialize(() => ({
  capabilities: {
    textDocumentSync: documents.syncKind,
  },
}));

documents.onDidChangeContent((change) => {
  getDiagnostics(change);
});

documents.onDidSave((change) => {
  getDiagnostics(change);
});

documents.listen(connection);
connection.listen();
