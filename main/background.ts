import { app, BrowserView, Menu, MenuItem } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  const mainView = new BrowserView();
  mainWindow.addBrowserView(mainView);
  mainView.setBounds({ x: 0, y: 0, width: 500, height: 600 });
  mainView.setAutoResize({ width: true, height: true });
  mainView.webContents.loadURL('https://duckduckgo.com');

  const subView = new BrowserView();
  mainWindow.addBrowserView(subView);
  subView.setBounds({ x: 500, y: 0, width: 500, height: 600 });
  subView.setAutoResize({ width: true, height: true });
  subView.webContents.loadURL('https://google.com');

  const views = [mainView, subView];

  views.map(view => {
    view.webContents.on('before-input-event', (event, input) => {
      const inputKey = input.key.toLowerCase();
      console.log('input: ', inputKey);
      event.preventDefault();
    })
  })
})();

app.on('window-all-closed', () => {
  app.quit();
});
