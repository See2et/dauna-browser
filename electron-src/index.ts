// Native
import { join } from 'path'
import { format } from 'url'

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, BrowserView } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js'),
    },
  })

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      })

  const view = new BrowserView();
  win.addBrowserView(view);
  view.setBounds({ x: 0, y: 0, width: 400, height: 600 });
  view.setAutoResize({horizontal: true, vertical: true});
  view.webContents.loadURL(url);

  const view2 = new BrowserView();
  win.addBrowserView(view2);
  view2.setBounds({ x: 400, y: 0, width: 400, height: 600 });
  view2.setAutoResize({horizontal: true, vertical: true});
  view2.webContents.loadURL("https://www.google.com/")


  view.webContents.openDevTools();
  view.webContents.executeJavaScript(`console.log(document)`);
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message)
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500)
})
