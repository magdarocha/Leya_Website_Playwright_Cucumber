@websitemode
Feature: Apply Dark Mode to the Website  

    Background: homepage of Leya Online
        Given I am on the homepage of Leya Online
  
  @scenario_1
  Scenario: Change to dark mode and verify that dark mode is applied
  
    When I change the background to dark mode
    Then the website should be displayed in dark mode and show a message
