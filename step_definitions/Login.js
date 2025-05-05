const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const { Given, When, Then, After } = require("@cucumber/cucumber");
const { faker } = require('@faker-js/faker');
const { HomePage } = require( '../page_objects/HomePage.po'); // Import the HomePage class
const { BookPage } = require( '../page_objects/BookPage.po'); // Import the BookPage class
const { LoginPage } = require ( '../page_objects/LoginPage.po'); // Import the LoginPage class


let page = null;

Given('I am on the homepage of Leya', async () =>{

    // Launch the browser and create a new context and page
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();

    // Navigate to the Leya Online homepage
    await page.goto("https://leyaonline.com/pt/");

    this.home_page = new HomePage(page); // Create an instance of HomePage

    this.book_page = new BookPage(page); // Create an instance of BookPage

    this.login_page = new LoginPage(page); // Create an instance of LoginPage
})

When('I navigate to the registration page', async() => {
    this.home_page.clickOnLoginButton(); // Click on the login button
    this.login_page.clickOnCreateNewAccount(); // Click on the create new account button
})

When('I create a new account with valid inputs', async() => {
    this.username = 'John'
    const email = faker.internet.email(); // Generate a random email address
    const password = faker.internet.password(); // Generate a random password

    await this.login_page.fillTheForm(this.username, email, password);

})

Then('I should see a success message', async() => {

    const icon_with_name = await this.home_page.getLoginIconName() // Get the login icon name
    
    expect(icon_with_name).toEqual(this.username);// Log the tag to the console
})