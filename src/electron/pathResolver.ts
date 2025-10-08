import path from 'path';
import { app } from 'electron';
import { isDev } from './utils.js';


export function getPreloadPath() {
  // Build the path without a leading slash so path.join works cross-platform.
  return path.join(
    app.getAppPath(),
    isDev() ? '.' : '..',
    'dist-electron',
    'preload.cjs'
  );
}
