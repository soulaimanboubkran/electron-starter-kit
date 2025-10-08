import { useEffect, useState } from 'react';
import './App.css';



function App() {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [ramUsage, setRamUsage] = useState(0);

  useEffect(() => {
    // Retry a few times for the preload to be available (preload can be slightly delayed)
    let attempts = 0;
    const maxAttempts = 5;
    const delay = 200; // ms

    let unsubscribeFn: (() => void) | undefined;

    const trySubscribe = () => {
      attempts += 1;
      if (window.electron && typeof window.electron.subscribeStatistics === 'function') {
        unsubscribeFn = window.electron.subscribeStatistics((stats) => {
          console.log('CPU:', stats.cpuUsage);
          console.log('RAM:', stats.ramUsage);
          setCpuUsage(stats.cpuUsage);
          setRamUsage(stats.ramUsage);
        });
      } else if (attempts < maxAttempts) {
        setTimeout(trySubscribe, delay);
      } else {
        console.error('Electron API not available after retries');
      }
    };

    trySubscribe();

    // Cleanup: unsubscribe if we subscribed
    return () => {
      if (typeof unsubscribeFn === 'function') {
        unsubscribeFn();
      }
    };
  }, []);

  return (
    <div className="App">
      <h1>System Monitor</h1>
      <div>CPU Usage: {cpuUsage}%</div>
      <div>RAM Usage: {ramUsage}%</div>
    </div>
  );
}

export default App;