import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './utils.js';
import { pollResource } from './resourceManager.js';
 

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true, // hides menu bar but keeps window buttons
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true // allow DevTools
    }
  });
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123'); // Vite dev server URL 
  }else {

  mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
  }
  pollResource();
});
