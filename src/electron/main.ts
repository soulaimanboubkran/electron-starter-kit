import { app, BrowserWindow } from 'electron';
import path from 'path';
 

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

  mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
});
