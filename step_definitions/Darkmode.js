const { expect } = require('@playwright/test');
const { When, Then} = require("@cucumber/cucumber");


When('I change the background to dark mode', async() => {
    global.home_page.clickInTheDarkMode(); // Click on the dark mode icon

})

Then('the website should be displayed in dark mode and show a message', async() => {  
    
    const dark_mode_status = await global.home_page.getDarkMode(); // Get the dark mode status

    if(dark_mode_status) {
        console.log("Dark mode is enabled.");
    }
    else {
        console.log("Dark mode is not enabled.");
    }

    expect(dark_mode_status).toBeTruthy(); // Check if dark mode is enabled
})