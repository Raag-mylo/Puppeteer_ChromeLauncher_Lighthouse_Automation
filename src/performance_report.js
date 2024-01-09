import { createBrowser, createReportWithBrowser } from "./lighthouse-util.js";
import fs from "fs";
import Assert from "assert";
import urls_data from '../Data/urls.js';


const performanceReport = async () => {
    const browser = await createBrowser();
    let k = 0;
    for(let urls of urls_data){
        const result = await createReportWithBrowser(
        browser,
        urls.url,
        {
            output: "html"  
        }
        );
        Assert(result.report, "No report returned");
        fs.writeFileSync(`../LightHouse_Reports/report${k}.html`, result.report, "utf-8", (err) => {
            if(err)
                console.log(err);
        })
        k++;
    }
    await browser.close();
}

performanceReport()
.catch(console.error)
.then(() => {
        console.log(`Finished!`);
    });