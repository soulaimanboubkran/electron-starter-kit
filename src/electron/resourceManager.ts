const POLL_INTERVAL = 2000; // in milliseconds

import osUtils from 'os-utils';

export  function pollResource(){

    setInterval(async() => {
      //  console.log('Polling resource...');
        // Add your resource polling logic here
      const cpuUsage = await getCpuUsage();
      const ramUsage = getRamUsage();
      console.log({ cpuUsage, ramUsage });
    }, POLL_INTERVAL);
}
function getCpuUsage(): Promise<number> {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}
