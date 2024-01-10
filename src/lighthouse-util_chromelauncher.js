// Lighthouse is a marvelous tool for testing the quality of your web apps. A robust module for launching Chrome was developed within Lighthouse and is now extracted for standalone use. The chrome-launcher NPM module will find where Chrome is installed, set up a debug instance, launch the browser, and kill it when your program is done.
// Opens up the browser's remote-debugging-port on an available port and automatically locates a Chrome binary to launch.

import * as ChromeLauncher from 'chrome-launcher';
import lighthouse from "lighthouse";

export async function createBrowser(headless=false) {
  return ChromeLauncher.launch({
  chromeFlags: [
      '--window-size=412,732',
      '--disable-gpu',
      headless ? '--headless' : ''
    ],
    args: ["--show-paint-rects"], 
  });
}

export function createReportWithBrowser(url, browser, options) {

// browser - parameters
// The remote debugging port exposed by the launched chrome
// chrome.port: number;

// Method to kill Chrome (and cleanup the profile folder)
// chrome.kill: () => Promise<void>;

// The process id
// chrome.pid: number;

// The childProcess object for the launched Chrome
// chrome.process: childProcess

  return lighthouse(
    url,
    {
      port: browser.port,
      disableDeviceEmulation: true,
      logLevel: 'info',
      output: 'html',
      chromeFlags: ['--disable-mobile-emulation'],
    },
    options
  );
}
  