const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('petHost', {
  contextMenu: () => ipcRenderer.send('show-context-menu'),
  show: () => ipcRenderer.send('show-pet'),
  onCommand: (callback) => ipcRenderer.on('pet-command', (_event, command) => callback(command))
});
