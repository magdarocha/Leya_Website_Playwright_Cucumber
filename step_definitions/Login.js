
const { expect } = require('@playwright/test');
const { When, Then } = require("@cucumber/cucumber");
const { faker } = require('@faker-js/faker');



When('I navigate to the registration page', async() => {
    await global.home_page.clickOnLoginButton(); // Click on the login button
    await global.login_page.clickOnCreateNewAccount(); // Click on the create new account button
})

When('I create a new account with valid inputs', async() => {
    this.username = 'John'
    const email = faker.internet.email(); // Generate a random email address
    const password = faker.internet.password(); // Generate a random password

    await global.login_page.fillTheForm(this.username, email, password);

})

Then('I should see a success message', async() => {

    const icon_with_name = await global.home_page.getLoginIconName() // Get the login icon name
    
    expect(icon_with_name).toEqual(this.username);// Log the tag to the console
})