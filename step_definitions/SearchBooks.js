const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const { Given, When, Then, After } = require("@cucumber/cucumber");
const { HomePage } = require( '../page_objects/HomePage.po'); // Import the HomePage class
const { BookPage } = require( '../page_objects/BookPage.po'); // Import the BookPage class
const { LoginPage } = require ( '../page_objects/LoginPage.po'); // Import the LoginPage class

let page; // Declare page variable in the outer scope

After(async () => {
    // Close the browser after each scenario
    if (page) {
        await page.context().browser().close(); // Close the browser context
    }

})

Given('I am on the homepage of Leya Online', async () =>{

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

When('I search for {string}', async (author_name) => {    
    await this.home_page.searchFor(author_name)
});

Then('the book {string} should be displayed in the search results', async (book_name) => {
    const book_names = await this.home_page.getBookNameList() // Get the list of book names

    expect(book_names).toContain(book_name); // Check if the book name contains the expected text

    await this.home_page.clickOnBook(book_name) // Click on the book name to view its details
});

Then('the book description should contain the words {string}', async (description) => {
    
    const sinopse = await this.book_page.getSinopse()
    await expect(sinopse.includes(description)).toBeTruthy(); // Check if the synopsis contains the description
});

When('I search for the book {string}', async (book_name) => {    
    
    await this.home_page.searchFor(book_name) // Search for the book name

    this.book_name = book_name; // Store the book name for later use
});

Then('the author of the book should be {string}', async (author_name) => {
    // wait for page to load
    await page.waitForSelector('.search-books-details');
    await this.home_page.clickOnBook(this.book_name);

    const name_of_the_author = await this.book_page.getAuthorName() // Get the author name

    expect(name_of_the_author).toEqual(author_name.toUpperCase())
})

Then('the ISBN of the book should be {string}', async (isbn_number) =>{

    const ISBN = await this.book_page.getISBN();

    expect(ISBN).toEqual(isbn_number); // Check if the ISBN number matches the expected value
});

Then('the number of pages should be {string}', async (page_number) =>{

    const pages = await this.book_page.getPageNumber() // Get the page number

    expect(pages).toEqual(page_number); // Check if the page number matches the expected value
})

Then('the dimensions of the book should be {string}', async (book_dimension) =>{
   
    const dim = await this.book_page.getDimensions() 
    expect(dim).toEqual(book_dimension); // Check if the page number matches the expected value
})

When('I get the author', async () => {
    // wait for page to load
    await page.waitForSelector('.search-books-details');
    await this.home_page.clickOnBook(this.book_name );

    const name_of_the_author = await this.book_page.getAuthorName();


    // Create a list to hold the authors names
    // Create an empty list, in case of first run
    // I need this list to store the authors and then compare them
    if (!this.authors) {
        this.authors = [] // Reset the author array if it already exists
    }
    
    // Add author name to list
    this.authors.push(name_of_the_author) // Store the author name for later use
})

Then('the authors must be the same', async () => {
    // Check if all authors in the list are the same
    const allEqual = this.authors.every(val => val === this.authors[0]);

    expect(allEqual).toBeTruthy(); // Check if all authors are the same
})

When('I add the book to the basket', async () => {
   
    await this.home_page.clickOnBook(this.book_name);

    await this.book_page.addToBasket();
    
})

Then('the number of items in the basket should be {string}', async(cart_number) => {

    const number_of_itens = await this.book_page.getBasketCount();

    expect(number_of_itens).toEqual(cart_number); // Check if the number of items in the basket matches the expected value
});

When('I delete the book from the basket', async () => {
    await this.book_page.removeFromBasket(); // Remove the book from the basket
    
})

Then('the basket should be empty', async() => {

    const empty_basket = await this.book_page.getEmptyBasketMessage();
    
    expect(empty_basket).toEqual('Carrinho vazio'); 
});