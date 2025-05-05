  @loginpage
  
  Feature: User Registration on Leya Online
    
      Background: homepage of Leya Online
          Given I am on the homepage of Leya Online

  @scenario_1
  Scenario: Create a new account with valid inputs and verify the validation message
    
    When I navigate to the registration page
    When I create a new account with valid inputs
    Then I should see a success message
