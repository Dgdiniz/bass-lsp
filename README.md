# Bass-lsp

Bass-lsp is a Language Server Protocol for programming for Snes, Mega Drive, Nes and other old consoles using Bass assembler.

## Example

The image below shows a sample instance of NeoVim running with Bass-lsp.

![https://i.imgur.com/V3pOHWy.gif](https://i.imgur.com/V3pOHWy.gif)

## Installation

The current version needs some automation, so right now most of the steps are manual.

First you need `Nodejs` installed. Install node before continuing.

Bass-lsp needs the Bass assembler with LSP support installed in a folder in the system PATH.
You can download Bass with LSP support at the following link:

[https://github.com/ManualDoCodigo/bass](https://github.com/ManualDoCodigo/bass)

Here I created the folder "C:\bin" and added it to the PATH. I use this folder to put binaries and access them from the terminal.
If you use Linux, you can install Bass in the `~/.local/bin` folder.
Follow the installation instruction from the Bass repository.
You need to install the `bass-syntax-vim` plugin so Vim can detect the console file extension and use the Lsp on the correct files.
You can install the plugin with (assuming you use Plug):

```
Plug 'manualdocodigo/bass-syntax-vim'
```

Now download this repository (Bass-lsp) and access it from the terminal. Enter the following lines:

```
npm install
npm link --force
```
This will install the dependencies and make it executable and accessible from the terminal.
So now you can enter in the terminal the following command:
```
bass-lsp.cmd
```
The terminal should be able to find and run this command. But it's Vim that will run it.

So now you can add the following lines to you `coc-setting.json` to enable Bass-lsp for the console files:

```
"bass-lsp": {
    "command": "bass-lsp.cmd",
    "args": [ "--stdio" ],
    "trace.server": "verbose",
    "filetypes": ["snes", "megadrive", "nes", "bass"]
}
```
You need to add this lines inside you `"languageserver"` object inside the `coc-setting.json`.

Now you can open your project and the LSP diagnostics should work.
If something goes wrong, you can check the log with the following command inside Vim:

```
:CocCommand workspace.showOutput
```
Choose the correct option and scroll the log to the end to see the errors.

## Limitations

- The project is still under testing.
- Your main file needs to be called "main.asm", otherwise it won't work.
- The installation process needs some automation.
- Changes only take place when saving.
- Only diagnostics works. There is no auto-completion or "go to definition".

