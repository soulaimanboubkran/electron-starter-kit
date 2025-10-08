const POLL_INTERVAL = 2000; // in milliseconds

import { BrowserWindow } from 'electron';
import osUtils from 'os-utils';
import os from 'os';
export  function pollResource(mainWindow:BrowserWindow){

    setInterval(async() => {
      //  console.log('Polling resource...');
        // Add your resource polling logic here
  const cpuUsageFraction = await getCpuUsage();
  const ramUsageFraction = getRamUsage();
  // Convert fractions (0..1) to percentages (0..100)
  const cpuUsage = Number((cpuUsageFraction * 100).toFixed(2));
  const ramUsage = Number((ramUsageFraction * 100).toFixed(2));
  mainWindow.webContents.send('resource-usage', { cpuUsage, ramUsage });

    }, POLL_INTERVAL);
}
export function getStaticData() {

  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

  return {

    cpuModel,
    totalMemoryGB,
  };
}

function getCpuUsage(): Promise<number> {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}
