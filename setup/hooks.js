const {
    After,
  } = require("@cucumber/cucumber");



  After(async () => {
      // Close the browser after each scenario
      console.log("Closing the browser after scenario...");
      if (global.page) {
          await global.page.context().browser().close(); // Close the browser context
      }
  
  })
  