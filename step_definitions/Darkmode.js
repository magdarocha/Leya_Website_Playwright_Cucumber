const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const { Given, When, Then, After } = require("@cucumber/cucumber");
const { HomePage } = require( '../page_objects/HomePage.po'); // Import the HomePage class


Given('I am on the homepage of website Leya', async() => {
    
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://leyaonline.com/pt/");

    this.home_page = new HomePage(page); // Create an instance of HomePage
})

When('I change the background to dark mode', async() => {
    this.home_page.clickInTheDarkMode(); // Click on the dark mode icon

})

Then('the website should be displayed in dark mode and show a message', async() => {  
    
    const dark_mode_status = await this.home_page.getDarkMode(); // Get the dark mode status

    if(dark_mode_status) {
        console.log("Dark mode is enabled.");
    }
    else {
        console.log("Dark mode is not enabled.");
    }

    expect(dark_mode_status).toBeTruthy(); // Check if dark mode is enabled
})