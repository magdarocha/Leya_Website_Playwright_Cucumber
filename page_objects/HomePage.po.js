class HomePage {

    // Constructor
    constructor(page) {
        this.page = page

        this.search_bar = this.page.locator('#searchbar-large') // Get the search bar
        this.book_list =  this.page.locator('.search-books-details .row div .book-name') // Get the list of books
        this.login_button = this.page.locator('.icon-login') // Get the login button
        this.login_icon_name = this.page.locator('#dropdownMenuLink20') // Get the login icon name
        this.sun_icon = this.page.locator('.icon-sun') // Get the dark mode icon
        this.moon_icon = this.page.locator('.icon-moon') // Get the moon icon
    }


    // Methods
   /**
   * Function to search for a book or author
   * 
   * @param {string} book_or_author - The name of the book or author to search for
   * @returns {void}
   */
   async searchFor(book_or_author){
        await this.search_bar.click()
        await this.search_bar.fill(book_or_author)
    }




   /**
   * Function to get the list of book names
   * 
   * @returns {array} list of the book names present in the search results
   */
    async getBookNameList() {
        await this.page.waitForSelector('.search-books-details');

        // Get the count of elements
        const count = await this.book_list.count();

        let names_list = []; // Initialize an empty array to store book names

        for (let i = 0; i < count; i++) {
            const book_title = await this.book_list.nth(i).innerText(); // Get the text of each book

            names_list.push(book_title); // Add the book name to the array
        }

        return names_list // Return the list of book names
    }




    /**
   * Function to click on a book
   * 
   * @param {string} book - The name of the book to click on
   * @returns {void}
   */
    async clickOnBook(book){
        await this.page.waitForSelector('.search-books-details');
        // Get the count of elements
        const count = await this.book_list.count();

        // Prepare page to next step
        for (let i = 0; i < count; i++) {
            const book_title = await this.book_list.nth(i).innerText(); // Get the text of each book

            if(book_title == book) {
                // using locator('..')I can navigate to the parent
                // by doing it again, I can navigate to the grandparent
                await this.book_list.nth(i).locator('..').locator('..').click(); // Click on the book if it matches the name
                break;
            }
        }
    }


 /**
   * Function to click on Login button
   * 
   * @returns {void}
   */
    async clickOnLoginButton() {
        await this.page.waitForSelector('.icon-login');

        await this.login_button.click(); // Click on the login button
    }


     /**
   * Function to get the login icon name
   * 
   * @returns {string} icon_name - The name of the login icon
   */
    async getLoginIconName(){
        const icon_name = await this.login_icon_name.getAttribute('data-tag');
    
        return icon_name // Return the login icon name
    }

  /**
   * Function to click on the dark mode icon
   * 
   * @returns {void} 
   */
    async clickInTheDarkMode(){
        await this.sun_icon.click() // Click on the dark mode icon

    }


    /**
   * Function to get if moon icon is visible
   * 
   * @returns {boolean} visibility_icon - The visibility of the moon icon
   */
    async getDarkMode(){
        await this.page.waitForSelector('.icon-moon');
        const visibility_icon = await this.moon_icon.isVisible() // Check if the moon icon is visible   

        return visibility_icon // Return the visibility of the moon icon

    }
}

module.exports = { HomePage }