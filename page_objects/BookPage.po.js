class BookPage {
    // Atributes

    // Constructor
    constructor(page) {
        this.page = page
        this.sinopse = this.page.locator('.sinopse:visible .show-more') // Get the synopsis of the book
        this.buy_butons = this.page.getByRole('link', { name: 'Comprar' }) // Get the buy button
        this.author = this.page.locator('.author:visible .nome_autor') // Get the author name
        this.details_list = this.page.locator('._sinpose-address:visible ul') // Get the details list of the book
        this.basket_count = this.page.locator('#dropdownMenuButton100'); // Get the basket count
        this.basket = this.page.locator('.icon-carrinho') // Get the basket icon
        this.garbage_icon = this.page.locator('.icon-garbage') // Get the garbage icon
        this.basket_message = this.page.locator('#atc-dropdown div').getByText('Carrinho vazio') // Get the basket message
    }

// Methods
     /**
   * Function to returns the book's synopsis
   * 
   * @returns {string} sinopse - The synopsis of the book
   */
    async getSinopse(){

        const sinopse = await this.sinopse.innerText()

        return sinopse
    }


     /**
   * Function to return the author's name
   * 
   * @returns {string} author - The author of the book
   */
    async getAuthorName(){

        await this.page.waitForSelector('._sinpose-address');
        const author = this.author.innerText();
    
        return author
    }


    /**
   * Function to return the isbn number
   * 
   * @returns {string} isbn - The ISBN number of the book
   */
    async getISBN(){

    await this.page.waitForSelector('._sinpose-address');
    

    const isbn_text = await this.details_list.getByText('ISBN:').innerText()
    const isbn_n = isbn_text.split(': ')[1].trim()

    return isbn_n // Return the ISBN number


    }

    /**
   * Function to return the pages number
   * 
   * @returns {string} pages - The number of pages of the book
   */
    async getPageNumber(){

    await this.page.waitForSelector('._sinpose-address');

    const pages = await this.details_list.getByText('Páginas:').innerText()
    const numbers = pages.split(': ')[1].trim()

    return numbers

    }

    /**
   * Function to return the dimensions of the book
   * 
   * @returns {string} dimensions - The dimensions of the book
   */
    async getDimensions(){

        await this.page.waitForSelector('._sinpose-address');

        const dimensions = await this.details_list.getByText('Dimensões:').innerText()
        const dims = dimensions.split(': ')[1].trim()

        return dims // Return the dimensions of the book


    }


     /**
   * Function to add the book to the basket
   * 
   * @returns {void} 
   */
    async addToBasket(){
    
        await this.page.waitForSelector('._sinpose-address');
        
        await this.buy_butons.first().click('a') // Click on the first buy button, it's a link (a)

    }



     /**
   * Function to get the count of items in the basket
   * 
   * @returns {string} count - The count of items in the basket
   */
    async getBasketCount() {
         //I need to wait specifically for the attribute to appear before calling getAttribute, because in the other way I dont have the data-tag in the html
        
            await this.page.waitForFunction(() => {
                const el = document.querySelector('#dropdownMenuButton100');
                return el && el.getAttribute('data-tag') !== null;
              })

        const count = await this.basket_count.getAttribute('data-tag');

        return count // Return the count of items in the basket

    }

  /**
   * Function to remove the book from the basket
   * 
   * @returns {void} 
   */
    async removeFromBasket() {

        await this.basket.click();
        await this.garbage_icon.click();

    }

    /**
   * Function to get the empty basket message
   * 
   * @returns {string} message - The empty basket message
   */
    async getEmptyBasketMessage() {

        const message = await this.basket_message.innerText();

        return message

    }

}

module.exports = { BookPage }