// Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.

import puppeteer from "puppeteer";
import lighthouse from "lighthouse";

export function createBrowser() {
   return puppeteer.launch({
     args: ["--show-paint-rects"],  // Required by lighthouse
     headless: false,
   });
}

export function createReportWithBrowser(url, browser, options) {

  // The browser object also has several methods that you can use to interact with the browser, such as browserContexts(), close(), createIncognitoBrowserContext(), disconnect(), isConnected(), newPage(), pages(), targets(), waitForTarget(), and wsEndpoint().
    const endpoint = browser.wsEndpoint(); // Allows us to talk via DevTools protocol
    const endpointURL = new URL(endpoint); // Lighthouse only cares about the port, so we have to parse the URL so we can grab the port to talk to Chrome on
    return lighthouse(
      url,
      {
        port: endpointURL.port,
        disableDeviceEmulation: true,
        logLevel: 'info',
        output: 'html',
        chromeFlags: ['--disable-mobile-emulation'],
      }, options) // Allow options to override anything here
  }