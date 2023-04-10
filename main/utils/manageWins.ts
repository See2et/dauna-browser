import { BrowserView, BrowserViewConstructorOptions, BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import { createWindow } from "../helpers";

interface managedWin {
  id: string;
  win: BrowserWindow;
  views: managedView[];
}

interface managedView {
  id: string;
  view: BrowserView;
}

let wins: managedWin[] = [];

export function addWin(name: string, id: string, opt: BrowserWindowConstructorOptions) {
  if (wins.find(win => win.id === id)) return;
  const win = new BrowserWindow(opt);
  wins.push({
    id: id,
    win: win,
    views: []
  });
}

export function getWin(id: string) {
  const win = wins.find(win => win.id === id);
  if (!win) return null;
  return win.win;
}

export function addView(parentId: string, id: string, opt?: BrowserViewConstructorOptions) {
  if (wins.find(win => win.views.find(view => view.id === id))) {
    console.log('View already exists');
    return;
  };
  const view = new BrowserView(opt ?? {});
  const parent = wins.find(win => win.id === parentId);
  parent.win.addBrowserView(view);
  if (parent) {
    parent.views.push({
      id: id,
      view: view
    });
  }
}

export function getView(id: string) {
  const win = wins.find(win => win.views.find(view => view.id === id));
  if (!win) return null;
  const view = win.views.find(view => view.id === id).view;
  if (!view) return null;
  return view;
}
