import readline from 'readline';
import performanceReport from './src/performance_report.js';
import performanceReport_chromelauncher from './src/performance_report_chromelauncher.js';

// Create an interface for reading and writing data
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter 1 for mobile report, Enter 2 for desktop report: ", (user_input) => {
  if (user_input == "1") {
    rl.question("Enter 1 for puppeter report, Enter 2 for chromelauncher report: ", (user_input) => {
      if (user_input == "1") {
        console.log("Generating puppeter report on mobile...");
        performanceReport(1)
        .catch(console.error)
        .then(() => {
            console.log(`Finished!`);
        });
      } else if (user_input == "2") {
        console.log("Generating chromelauncher report on mobile...");
        performanceReport_chromelauncher(1)
        .catch(console.error)
        .then(() => {
                console.log(`Finished!`);
            });
      } else {
        console.log("Invalid Input");
      }
      rl.close();
    });
  } else if (user_input == "2") {
    rl.question("Enter 1 for puppeter report, Enter 2 for chromelauncher report: ", (user_input) => {
      if (user_input == "1") {
        console.log("Generating puppeter report on desktop...");
        performanceReport()
        .catch(console.error)
        .then(() => {
            console.log(`Finished!`);
        });
      } else if (user_input == "2") {
        console.log("Generating chromelauncher report on desktop...");
        performanceReport_chromelauncher()
        .catch(console.error)
        .then(() => {
                console.log(`Finished!`);
            });
      } else {
        console.log("Invalid Input");
      }
      rl.close();
    });
  } else {
    console.log("Invalid Input");
    rl.close();
  }
});
