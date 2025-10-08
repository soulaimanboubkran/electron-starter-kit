import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { isDev } from './utils.js';
import { getStaticData, pollResource } from './resourceManager.js';
import { getPreloadPath } from './pathResolver.js';

 ipcMain.handle('getStaticData', async () => {
  return getStaticData();
});
app.on('ready', () => {
  const preloadPath = getPreloadPath();
  console.log('Preload path:', preloadPath);
  
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,

    autoHideMenuBar: false,
   webPreferences: {
  preload: preloadPath,
  contextIsolation: true,
  nodeIntegration: false,
  devTools: true,
},

  });
  
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
  }
  
  pollResource(mainWindow);


});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});