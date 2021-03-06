const universalElementsCommands = {

  pause: function(time) {
    this.api.pause(time);
    return this;
  },

  validateUniversalElements: function() {
    return this.waitForElementVisible('@myProfileButton', 'My Profile button is visible')
      .verify.visible('@myProfileButton', 'Profile button is visible')
      .verify.visible('@inboxDirectButton', 'Inbox direct is visible')
      .verify.visible('@chatDirectButton', 'Chat direct is visible')
      .verify.visible('@contactsButton', 'Contacts button is visible')
      .verify.visible('@searchButton', 'Search button is visible')
      .verify.visible('@helpDropdown', 'Help button is visible')
      .verify.visible('@settingsButton', 'Settings button is visible')
  },

  validateSearchModal: function(patientName) {
    return this.waitForElementVisible('@searchButton', 'Search button is visible')
      .click('@searchButton')
      .waitForElementVisible('@searchModalInput', 'Search input is visible on click')
      .setValue('@searchModalInput', patientName)
      .waitForElementVisible('@searchModalFirstResult', 'First result on search dropdown is visible')
      .verify.visible('@addNewContactButton', 'Add new contact button is visible')
      .click('@searchModalFirstResult')
      .waitForElementNotPresent('@searchModalFirstResult', 'First result is hidden')
  },

  validateSettingsDropdown: function() {
    return this.waitForElementVisible('@settingsButton', 'Settings button is visible')
      .pause(500)
      .click('@settingsButton')
      .waitForElementPresent('@logoutButton', 'logout button is visible')      
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Profile in settings is visible')
      .waitForElementVisible('@myPreferencesInSettingsDropdown', 'Preferences in settings is visible')
      .waitForElementVisible('@oooInSettingsDropdown', 'Out of Office is visible!')
      // .waitForElementVisible('@billingInSettingsDropdown', 'Billing in settings is visible')//activate when billing is included
      .waitForElementVisible('@channelsInSettingsDropdown', 'Channels is visible')
      .waitForElementVisible('@groupsInSettingsDropdown', 'Groups is visible')
      .waitForElementVisible('@membersInSettingsDropdown', 'Members is visible')
      .waitForElementVisible('@orgPreferencesInSettingsDropdown', 'Org Preferences is visible')
      .waitForElementVisible('@orgProfileInSettingsDropdown', 'Org profile is visible ')
      .waitForElementVisible('@tagsInSettingsDropdown', 'Tags is visible')
      .waitForElementVisible('@templatesInSettingsDropdown', 'templates is visible')
      .pause(500)
      .click('@settingsButton')
  },

  validateHelpDropdown: function() {
    return this.waitForElementVisible('@helpDropdown', 'Help button is visible')
      .pause(500)
      .click('@helpDropdown')
      .waitForElementVisible('@supportDeskButton', 'Support desk is visible')
      .waitForElementVisible('@knowledgeBaseButton', 'Knowledge base is visible')
      .waitForElementVisible('@submitAnIssueButton', 'Submit an issue is visible')
      .waitForElementVisible('@ideaSubmissionButton', 'Idea submission is visible')
      .waitForElementVisible('@systemDetailsButton', 'System details is visible')
  },

  /*----------perhaps add more to test for groups in Inbox/Chat-----------*/
  clickAppNavButtons: function() {
    return this.waitForElementVisible('@assignedToMeButton', 'Assigned to Me button is shown')
      .click('@assignedToMeButton')
      .pause(500)
      .verify.containsText('@appHeaderTitle', 'Assigned to Me', 'Inbox Assigned title present')
      .click('@followingButton')
      .pause(500)
      .verify.containsText('@appHeaderTitle', 'Following', 'Inbox following title present')
      .click('@inboxDirectButton')
      .pause(500)
      .verify.containsText('@appHeaderTitle', 'Patient - Direct', 'Inbox Direct title present')
      .click('@chatDirectButton')
      .pause(500)
      .verify.containsText('@appHeaderTitle', 'Team - Direct', 'Chat Direct title present')
      .click('@contactsButton')
      .pause(500)
      .verify.containsText('@appHeaderTitle', 'Contacts', 'Contacts title present')
  },

  clickHelpDropdownButtons: function() {
    return this.waitForElementPresent('@helpDropdown', 'Help dropdown is visible')
      .click('@helpDropdown')
      .waitForElementPresent('@supportDeskButton', 'Support desk button is visible')
      .click('@supportDeskButton')
      .click('@knowledgeBaseButton')
      .click('@submitAnIssueButton')
      .click('@ideaSubmissionButton')
  },

  clickSystemDetailsButton: function () {
      return this.waitForElementPresent('@helpDropdown', 'Help dropdown is visible')
        .waitForElementVisible('@systemDetailsButton', 'System Details button is visible')
        .click('@systemDetailsButton')
  },

  clickSearchModalButtons: function(patientName) {
    return this.click('@assignedToMeButton')
      .waitForElementVisible('@searchButton', 'Search button is visible')
      .click('@searchButton')
      .waitForElementVisible('@searchModalInput', 'Search input is visible on click')
      .setValue('@searchModalInput', patientName)
      .waitForElementVisible('@searchModalFirstResult', 'First result on search dropdown is visible')
      .verify.visible('@addNewContactButton', 'Add new contact button is visible')
      .click('@searchModalFirstResult')
      .waitForElementNotPresent('@searchModalFirstResult', 'First result is hidden')
      .verify.urlContains('50069', 'Taken to profile summary view')// no long 'userID' string but actual ID number
  },

  clickAddNewContact: function() {
    return this.click('@searchButton')
      .waitForElementVisible('@searchModalInput', 'Search input is present')
      .click('@addNewContactButton')
  },

  clickMyProfile: function() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@myProfileInSettingsDropdown')
      .pause(500)
      .verify.urlContains('/profile', 'My profile page is visible')
  },

  clickMyPreferences: function() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@myPreferencesInSettingsDropdown')
      .pause(500)
      .verify.urlContains('/preferences', 'My Preferences page is visible')
  },

  clickChannels: function() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@channelsInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/channels', 'Channels page is visible')
  },

  clickGroups: function() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@groupsInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/groups', 'Groups page is visible')
  },

  clickMembers: function() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@membersInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/members', 'Members page is visible')
  },

  clickOOO: function() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@oooInSettingsDropdown')
      .pause(500)
      .verify.urlContains('/organization/out-of-office', 'Out of Office page is visible')
  },

  clickBilling: function() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@billingInSettingsDropdown')
      .pause(500)
      .verify.urlContains('/organization/billing', 'Billing page is visible')
  },

  clickOrgPreferences: function() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@orgPreferencesInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/preferences', 'Organization Preferences page is visible')
  },

  clickOrgProfile: function() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@orgProfileInSettingsDropdown')
      .pause(500)
      // .waitForElementNotVisible('@orgProfileInSettingsDropdown', 'Org Profile is hidden')
      .verify.urlContains('organization/profile', 'Organization Profile page is visible')
  },

  clickTags: function() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@tagsInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/tags', 'Tags page is visible')
  },

  clickTemplates: function() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@templatesInSettingsDropdown')
      .pause(500)
      .verify.urlContains('organization/templates', 'Templates page is visible')
  },

  clickSystemDetails: function() {
    return this.click('@settingsButton')
      .waitForElementVisible('@myProfileInSettingsDropdown', 'Settings Dropdown is visible')
      .click('@systemDetailsInSettingsDropdown')
      .pause(500)
      .verify.urlContains('diagnostics', 'System Detail page is visible')
  },

  clickLogout: function() {
    return this.waitForElementVisible('@settingsButton', 'Settings button is visible')
      .click('@settingsButton')
      .waitForElementVisible('@logoutButton', 'Logout button is visible')
      .pause(500)
      .click('@logoutButton')
      .waitForElementNotPresent('@logoutButton', 'Logout button no longer present')
  }
}

module.exports = {
  commands: [universalElementsCommands],
  url: function() {
    return this.api.launch_url + '/inbox'
  },

  elements: {

    appHeaderTitle: {
      selector: `//DIV[@class='app-page__header__title']`,
      locateStrategy: 'xpath',
    },

    /*-------------------------------------------------------------------------*/
    //Left hand column navigation buttons. Top to bottom.
    /*-------------------------------------------------------------------------*/

    assignedToMeButton: {
      selector: `//BUTTON[contains(text(), 'Assigned to Me')]`,
      locateStrategy: 'xpath',
    },

    followingButton: {
      selector: `//BUTTON[contains(text(), 'Following')]`,
      locateStrategy: 'xpath',
    },

    inboxDirectButton: {
      selector: `(//SPAN[@class='app-navigation__nav__button__text'][text()='Direct'][text()='Direct'])[1]`,
      locateStrategy: 'xpath',
    },

    chatDirectButton: {
      selector: `(//SPAN[@class='app-navigation__nav__button__text'][text()='Direct'][text()='Direct'])[2]`,
      locateStrategy: 'xpath',
    },

    contactsButton: {
      selector: `//BUTTON[contains(text(), 'Contacts')]`,
      locateStrategy: 'xpath'
    },

    orgTitle: {
      selector: `//BUTTON[contains(text(), 'Organization')]`,
      locateStrategy: 'xpath',
    },

    /*----------------------------------------------*/
    // search bar elements
    /*----------------------------------------------*/

    searchButton: {
      selector: `//BUTTON[contains(@title, 'Search users')]`, 
      locateStrategy: 'xpath',
    },

    searchModalInput: {
      selector: `//INPUT[starts-with(@id, global)]`,
      locateStrategy: 'xpath',
    },

    searchModalFirstResult: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][text()='Frodo  Baggins']`, //specific to Frodo test case
      locateStrategy: 'xpath',
    },

    addNewContactButton: {
      selector: `//BUTTON[contains(text(), 'Add New Contact')]`,
      locateStrategy: 'xpath',
    },

    closeSearchModal: {
      selector: `//BUTTON[contains(@title, 'Close')]`,
      locateStrategy: 'xpath'
    },

    /*----------------------------------------------*/
    // Profile Button and former Notification xpaths
    /*----------------------------------------------*/

    myProfileButton: { 
      selector: `//A[@title='My Profile']`,
      locateStrategy: 'xpath',
    },
    /*----------------------------------------------*/
    // Help Button dropdown
    /*----------------------------------------------*/

    helpDropdown: {
      selector: `//BUTTON[contains(@title, 'Help')]`,
      locateStrategy: 'xpath'
    },

    supportDeskButton: {
      selector: `//BUTTON[contains(text(), 'Support Desk')]`,
      locateStrategy: 'xpath'
    },

    knowledgeBaseButton: {
      selector: `//BUTTON[contains(text(), 'Knowledge Base')]`,
      locateStrategy: 'xpath'
    },

    submitAnIssueButton: {
      selector: `//BUTTON[contains(text(), 'Submit an Issue')]`,
      locateStrategy: 'xpath'
    },

    ideaSubmissionButton: {
      selector: `//BUTTON[contains(text(), 'Idea Submission')]`,
      locateStrategy: 'xpath'
    },

    systemDetailsButton: {
      selector: `//BUTTON[contains(text(), 'System Details')]`,
      locateStrategy: 'xpath'
    },

    /*----------------------------------------------*/
    // Settings dropdown elements
    /*----------------------------------------------*/

    settingsButton: {
      selector: `//BUTTON[contains(@title, 'Settings')]`, 
      locateStrategy: 'xpath',
    },

    myProfileInSettingsDropdown: {
      selector: `(//SPAN[@class='u-text-overflow'][text()='Profile'][text()='Profile'])[1]`,
      locateStrategy: 'xpath',
    },

    myPreferencesInSettingsDropdown: {
      selector: `(//SPAN[@class='u-text-overflow'][text()='Preferences'][text()='Preferences'])[1]`,
      locateStrategy: 'xpath',
    },

    oooInSettingsDropdown: {
      selector: `//SPAN[contains(text(), 'Out of Office')]`,
      locateStrategy: 'xpath',
    },

    billingInSettingsDropdown: {
      selector: `//SPAN[contains(text(), 'Billing')]`,
      locateStrategy: 'xpath',
    },

    channelsInSettingsDropdown: {
      selector: `//SPAN[contains(text(), 'Channels')]`,
      locateStrategy: 'xpath',
    },

    groupsInSettingsDropdown: {
      selector: `//SPAN[contains(text(), 'Groups')]`,
      locateStrategy: 'xpath',
    },

    membersInSettingsDropdown: {
      selector: `//SPAN[contains(text(), 'Members')]`,
      locateStrategy: 'xpath',
    },

    orgPreferencesInSettingsDropdown: {
      selector: `(//SPAN[@class='u-text-overflow'][text()='Preferences'][text()='Preferences'])[2]`,
      locateStrategy: 'xpath',
    },

    orgProfileInSettingsDropdown: {
      selector: `(//SPAN[@class='u-text-overflow'][text()='Profile'][text()='Profile'])[2]`,
      locateStrategy: 'xpath',
    },

    tagsInSettingsDropdown: {
      selector: `//SPAN[contains(text(), 'Tags')]`,
      locateStrategy: 'xpath',
    },

    templatesInSettingsDropdown: {
      selector: `//SPAN[contains(text(), 'Templates')]`,
      locateStrategy: 'xpath',
    },

    logoutButton: {
      selector: `(//SPAN[@class='button__text-wrapper' and contains(text(), 'Log Out')])`,
      locateStrategy: 'xpath',
    },
  }
};
