@websitemode
Feature: Apply Dark Mode to the Website  
  
  @scenario_1
  Scenario: Change to dark mode and verify that dark mode is applied
    
    Given I am on the homepage of website Leya 
    When I change the background to dark mode
    Then the website should be displayed in dark mode and show a message
