const { app, BrowserWindow, Menu, ipcMain, screen } = require('electron');
const path = require('path');

let mainWindow;

app.setName('Lumi 桌宠');

const actionLabels = {
  idle: '待机',
  'running-right': '向右移动',
  'running-left': '向左移动',
  waving: '挥手',
  jumping: '跳跃',
  failed: '沮丧',
  waiting: '等待',
  running: '工作中',
  review: '检查'
};

function createWindow() {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;
  mainWindow = new BrowserWindow({
    width: 192,
    height: 208,
    x: Math.max(0, width - 240),
    y: Math.max(0, height - 250),
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.setAlwaysOnTop(true, 'floating');
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.on('closed', () => { mainWindow = null; });
}

function showContextMenu() {
  if (!mainWindow) return;
  const template = [
    {
      label: '动作',
      submenu: Object.entries(actionLabels).map(([action, label]) => ({
        label,
        click: () => mainWindow.webContents.send('pet-command', action)
      }))
    },
    { label: '暂停/继续动画', click: () => mainWindow.webContents.send('pet-command', 'toggle-pause') },
    { label: '回到待机', click: () => mainWindow.webContents.send('pet-command', 'idle') },
    { type: 'separator' },
    { label: '隐藏 Lumi', click: () => mainWindow.hide() },
    { label: '退出桌宠', click: () => app.quit() }
  ];
  Menu.buildFromTemplate(template).popup({ window: mainWindow });
}

app.whenReady().then(() => {
  ipcMain.on('show-context-menu', showContextMenu);
  ipcMain.on('show-pet', () => mainWindow && mainWindow.show());
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
  else if (mainWindow) mainWindow.show();
});
