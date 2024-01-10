import { createBrowser, createReportWithBrowser } from "./lighthouse-util.js";
import fs from "fs";
import Assert from "assert";
import urls_data from '../Data/urls.js';
import config from 'lighthouse/core/config/lr-desktop-config.js';


const performanceReport_chromelauncher = async (mobile) => {
    const browser = await createBrowser();
    let k = 1;
    // let page = null;
    for(let urls of urls_data){
        // const page = (await browser.pages())[0];
        // await page.goto(urls.url, { waitUntil: 'networkidle0' });
        const result = await createReportWithBrowser(
        urls.url,
        browser,
        mobile ? null : config
        );
        Assert(result.report, "No report returned");
        if(mobile)
            fs.writeFileSync(`./LightHouse_Reports/Mobile_Reports/report${k}.html`, result.report, "utf-8", (err) => {
                if(err)
                    console.log(err);
            })
        else
            fs.writeFileSync(`./LightHouse_Reports/Desktop_Reports/report${k}.html`, result.report, "utf-8", (err) => {
                if(err)
                    console.log(err);
            })
        k++;
    }
    // await page.close();
    await browser.kill;
}

export default performanceReport_chromelauncher;