  @loginpage
  
  Feature: User Registration on Leya Online

  @scenario_1
  Scenario: Create a new account with valid inputs and verify the validation message
    
    Given I am on the homepage of Leya
    When I navigate to the registration page
    When I create a new account with valid inputs
    Then I should see a success message
