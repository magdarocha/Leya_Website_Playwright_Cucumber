@SearchBooksinLeyaOnline
Feature: Search for books and verify details on Leya Online

  @scenario_1
  Scenario: Search for "George", Verify that the book "O Triunfo dos Porcos" is displayed on the list, Confirm that the book description contains the words "Quinta Manor"
    
    Given I am on the homepage of Leya Online
    When I search for "George"
    Then the book "O Triunfo dos Porcos" should be displayed in the search results
    And the book description should contain the words "Quinta Manor"

  @scenario_2
  Scenario: Search for the book "1984", Validate the author, ISBN, page count, and dimensions
    
    Given I am on the homepage of Leya Online
    When I search for the book "1984"
    Then the author of the book should be "George Orwell"
    And the ISBN of the book should be "9789722071550"
    And the number of pages should be "344"
    And the dimensions of the book should be "235 x 157 x 23 mm"

  @scenario_3
  Scenario: Search for the book "1984", Verify that the book "O Triunfo dos Porcos" is authored by the same author
    
    Given I am on the homepage of Leya Online
    When I search for the book "1984"
    And I get the author
    When I search for the book "O Triunfo dos Porcos"
    And I get the author
    Then the authors must be the same
      
  @scenario_4
  Scenario: Search for the book "1984", Add to the basket and confirm the basket contains one item
    
    Given I am on the homepage of Leya Online
    When I search for the book "1984"
    And I add the book to the basket
    Then the number of items in the basket should be "1"

  
  @scenario_5
  Scenario: Add and remove "Dom Quixote" from the cart, verify the cart is empty
    
    Given I am on the homepage of Leya Online
    When I search for the book "Dom Quixote de La Mancha"
    And I add the book to the basket
    And I delete the book from the basket
    Then the basket should be empty
