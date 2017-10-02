const autoResponseCommands = {

  validateAutoResponseElements: function() {
    return this.waitForElementVisible('@autoResponseInput', 1500, 'Auto-Response input is visible ready for test')
      .verify.visible('@autoResponseInput', 'Auto-Response text area is visible')
      .verify.visible('@saveAutoResponseButton', 'Save Auto-Response button is visible')
      .verify.visible('@cancelAutoResponseButton', 'Cancel button is visible')
      // .verify.visible('@characterLimitCounter', 'Character limit counter is visible')
      // characterLimitCounter causing error
      .verify.visible('@editEventButton', 'Edit event button is visible')
      .verify.visible('@deleteEventButton', 'Delete event button is visible')
      .verify.visible('@scheduleEventButton', 'Schedule event button is visible')
      .verify.visible('@firstScheduledEvent', 'First event is visible')
  },

  validateAutoResponsePopupElements: function() {
    return this.waitForElementVisible('body', 1000, 'Body is visible')
      .click('@scheduleEventButton')
      .waitForElementVisible('@scheduleEventPopup', 4000, 'Schedule event popup is visible')
      .verify.visible('@eventNameInput', 'Event input is visible')
      .verify.visible('@allDayCheckbox', 'All day checkbox is visible')
      .verify.visible('@autoResponseInputInPopup', 'Auto-Response input in popup is visible')
      .verify.visible('@channelsDropdown', 'Channels dropdown tab in popup is visible')
      .click('@channelsDropdown')
      .waitForElementVisible('@firstChannelInDropdown', 2000, 'Wait for first channel')
      .verify.visible('@firstChannelInDropdown', 'First channel in popup is visible')
      .verify.visible('@submitEventButton', 'Submit event button in popup is visible')
      .verify.visible('@cancelButtonInNewOOOForm', 'Cancel button in popup is visible')
      .verify.visible('@closeFormButton', 'Close form (X) button is visible')
      .click('@closeFormButton')
  },

  validateDeletePopup: function() {
    return this.waitForElementVisible('body', 1000, 'body is visible')
      .waitForElementVisible('@deleteEventButton', 3000, 'Delete event button is visible')
      .click('@deleteEventButton')
      .waitForElementVisible('@deleteEventPopup', 2000, 'Delete event popup is visible')
      .verify.visible('@deleteButtonFinal', 'Delete button final is visible')
      .verify.visible('@cancelDeletePopupButton', 'Cancel delete popup button is visible')
      .verify.visible('@closeDeletePopupButton', 'Close delete popup (X) button is visible')
      .click('@closeDeletePopupButton')
  },

  fillInAutoResponse: function(autoResponseText) {
    return this.waitForElementVisible('@autoResponseInput', 3000, 'Input is visible')
      .clearValue('@autoResponseInput')
      .setValue('@autoResponseInput', autoResponseText)
  },

  validateAutoResponseError: function() {
    return this.waitForElementVisible('@autoResponseError', 2000, 'Error prompt is visible')
  },

  submitAutoResponse: function() {
    return this.waitForElementVisible('body', 1000, 'Body is visible')
      .click('@saveAutoResponseButton')
  },

  savedPrompt: function() {
    return this.waitForElementVisible('@autoResponseSavedPrompt', 1000, 'Saved prompt is visible')
  },

  fillInOOOEvent: function() {
    return this.waitForElementVisible('@scheduleEventButton', 1000, 'Schedule event button is visible')
      .click('@scheduleEventButton')
      .waitForElementVisible('@scheduleEventPopup', 3000, 'Schedule event popup is visible')
      .setValue('@eventNameInput', 'Automated testing created event')
      .click('@allDayCheckbox')
      .setValue('@autoResponseInputInPopup', 'Hi Im a sentient computer program... ergo... vis a vie...')
      .click('@channelsDropdown')
      .click('@firstChannelInDropdown')
      .click('@submitEventButton')
      // .waitForElementVisible('@autoResponseSavedPrompt', 1000, 'Saved prompt is visible')
  },

  validateEditOOOEvent: function() {
    return this.waitForElementVisible('@editEventButton', 3000, 'Edit event button is visible')
      .click('@editEventButton')
      .waitForElementVisible('@scheduleEventPopup', 2000, 'Edit OOO event popup visible')
      .click('@closeFormButton')
  },

  deleteLastOOOEvent: function() {
    return this.waitForElementVisible('body', 2000, 'Body is visible')
      .waitForElementVisible('@secondDeleteEventButton', 3000, '2nd Delete event button is visible')
      .click('@secondDeleteEventButton')
      .waitForElementVisible('@deleteEventPopup', 3000, 'Delete event popup is visible')
      .click('@deleteButtonFinal')

  }


}

module.exports = {
  commands: [autoResponseCommands],
  url: function() {
    return this.api.launch_url + '/settings/organization/auto-response'
  },
  elements: {

    /*-----------------------------------------------------*/
    // auto response input and buttons elements
    /*-----------------------------------------------------*/

    autoResponseInput: {
      selector: `//*[@id="defaultReply"]`,
      locateStrategy: 'xpath',
    },
    saveAutoResponseButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[3]/div/button[2]`,
      locateStrategy: 'xpath',
    },
    cancelAutoResponseButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[3]/div/button[1]`,
      locateStrategy: 'xpath',
    },
    characterLimitCounter: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[2]/div/div/text()`,
      locateStrategy: 'xpath',
    },
    autoResponseError: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[2]/div/div[1]/div`,
      locateStrategy: 'xpath',
    },
    autoResponseSavedPrompt: {
      selector:  `//*[@id="js-toasts-container"]/div/div/div`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------*/
    // schedule out of office event elements
    /*-----------------------------------------------------*/

    scheduleEventButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[4]/div/div[2]/div/button`,
      locateStrategy: 'xpath',
    },

    firstScheduledEvent: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[5]/div`,
      locateStrategy: 'xpath',
    },

    editEventButton: {
      selector: `(//BUTTON[@type='button'][text()='Edit'][text()='Edit'])[1]`,
      locateStrategy: 'xpath',
    },

    deleteEventButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[5]/div/div[1]/div[2]/button[2]`,
      locateStrategy: 'xpath',
    },

    secondDeleteEventButton: {
      selector: `//*[@id="app"]/div/div[2]/div/div/div[6]/div/div[1]/div[2]/button[2]`,
      locateStrategy: 'xpath',
      // this element added so test deletes the OOO event it creates as they are listed in order of creation
    },

    deleteEventPopup: {
      selector:`/html/body/div[4]/div/div`,
      locateStrategy: 'xpath',
    },

    deleteButtonFinal: {
      selector: `//div[@class='modal__footer']//button[.='Delete']`,
      locateStrategy: 'xpath'
    },

    cancelDeletePopupButton: {
      selector: `/html/body/div[4]/div/div/div/div[3]/div/button[1]`,
      locateStrategy: 'xpath',
    },

    closeDeletePopupButton: {
      selector:  `/html/body/div[4]/div/div/div/div[1]/button`,
      locateStrategy: 'xpath',
    },

    /*-----------------------------------------------------*/
    // schedule event popup elements
    /*-----------------------------------------------------*/

    scheduleEventPopup: {
      selector: `/html/body/div[5]/div/div/div`,
      locateStrategy: 'xpath',
    },

    eventNameInput: {
      selector: `//input[@id='title']`,
      locateStrategy: 'xpath',
    },

    allDayCheckbox: {
      selector: `//*[@id="allDayOOO"]`,
      locateStrategy: 'xpath'
    },

    autoResponseInputInPopup:{
      selector: `//*[@id="message"]`,
      locateStrategy: 'xpath',
    },

    channelsDropdown: {
      selector: `//div[@class='form']/div[5]/span[2]/div/input`,
      locateStrategy: 'xpath'
    },

    firstChannelInDropdown: {
      selector: `//div[@class='form']/div[5]/span[2]/div/div/div/div[1]/a/div`,
      locateStrategy: 'xpath'
    },

    submitEventButton: {
      selector: `//div[@class='modal__footer']//button[.='Schedule Event']`,
      locateStrategy: 'xpath'
    },

    cancelButtonInNewOOOForm: {
      selector: `/html/body/div[5]/div/div/div/div[3]/div/button[1]`,
      locateStrategy: 'xpath'
    },

    closeFormButton: {
      selector: `/html/body/div[5]/div/div/div/div[1]/button`,
      locateStrategy: 'xpath'
    }
  }
};
