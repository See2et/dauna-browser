import { getViews } from "./manageWins";

export function getViewsInput() {
  const views = getViews()
  views.map(view => {
    view.view.webContents.on('before-input-event', (event, input) => {
      event.preventDefault();
      return input;
    })
  })
}
