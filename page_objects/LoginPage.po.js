class LoginPage{

    //Constructor
    constructor(page){
        this.page = page

        this.create_new_account = this.page.locator('.want-registration') // Get the create new account button
        this.name = this.page.locator('#login-nome-s') // Get the name input field
        this.email = this.page.locator('#login-email-s') // Get the email input field
        this.email_confirm = this.page.locator('#login-email-s-confirm') // Get the email confirm input field
        this.password = this.page.locator('#login-pass-s') // Get the password input field
        this.password_confirm = this.page.locator('#login-pass-s-confirm') // Get the password confirm input field
        this.terms_and_conditions = this.page.getByRole('checkbox', { name: 'DECLARO QUE LI E COMPREENDI' }) // Get the terms and conditions checkbox
        this.confirm_button = this.page.locator('.login-btn') // Get the confirm button
        
    }


    //Methods

    /**
   * Function to click on create new account button
   * 
   * @returns {void}
   */
    async clickOnCreateNewAccount(){
        await this.create_new_account.click() // Click on the create new account button

    }

 /**
   * Function to fill the registration form with valid inputs
   * @param {string} username - The username to fill in the form
   * @param {string} email - The email to fill in the form
   * @param {string} password - The password to fill in the form
   * @returns {void}
   */
    async fillTheForm(username, email, password){
        await this.name.click() // Click on the name input field
        await this.name.fill(username) // Fill the name input field
        await this.email.click() // Click on the email input field
        await this.email.fill(email) // Fill the email input field
        await this.email_confirm.click() // Click on the email confirm input field
        await this.email_confirm.fill(email) // Fill the email confirm input field
        await this.password.click() // Click on the password input field
        await this.password.fill(password) // Fill the password input field
        await this.password_confirm.click() // Click on the password confirm input field
        await this.password_confirm.fill(password) // Fill the password confirm input field
        await this.terms_and_conditions.check() // Check the terms and conditions checkbox
        await this.confirm_button.click() // Click on the confirm button


    }


   




}

module.exports = { LoginPage }