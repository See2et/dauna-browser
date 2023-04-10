import { app, BrowserView, Menu, MenuItem } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import { addView, addWin, getView, getWin } from './utils/manageBrowserViews';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  addWin('main', '1234', {
    width: 800,
    height: 600,
  })

  addView('1234', '5678')

  getView('5678').setBounds({ x: 0, y: 0, width: 800, height: 600 });
  getView('5678').webContents.loadURL('https://www.google.com');
})();

app.on('window-all-closed', () => {
  app.quit();
});
