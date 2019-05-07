import logger from 'rhinotilities/lib/loggers/logger';

const contactFeeder = require('./../feeder/contact.feeder');


let text = '';

const auditLogsCommands = {

  elementText(ele) {
    return this.getText(ele, (tpObj) => {
      text = tpObj.value;
      logger.info(text);
    });
  },

  validateUrlChange() {
    return this.waitForElementNotPresent('@auditLogPageTitle', 6000, false, null, 'Audit Logs page opened successfully')
      .verify.urlContains('auditLog') // maybe some timeout issues happening here working as of 9/20/1
      .pause(5000);
  },

  verifyPageTitle() {
    return this.waitForElementVisible('@auditLogPageTitle', 'The Audit Log Page title is visible');
  },

  verifyFiltersVisibility() {
    return this.waitForElementVisible('@filtersLabel', 'Filters Label is visible')
      .verify.visible('@datePicker', 'Date Picker is visible')
      .verify.visible('@memberFilter', 'Member Filter is visible')
      .verify.visible('@contactFilter', 'Contact Filter is visible')
      .verify.visible('@categoryFilter', 'category Filter is visible')
      .verify.visible('@actionFilter', 'Action Filter is visible');
  },

  VerifyPaginationVisibility() {
    return this.waitForElementVisible('@topPagination', 'top Pagination is visible')
      .waitForElementVisible('@bottomPagination', 'Bottom Pagination is visible');
  },

  verifyColumnVisibility() {
    return this.verify.visible('@dateColumn', 'Date Column is visible')
      .verify.visible('@memberColumn', 'Member Column is visible')
      .verify.visible('@contactColumn', 'Contact Column is visible')
      .verify.visible('@categoryColumn', 'category Column is visible')
      .verify.visible('@actionColumn', 'Action Column is visible');
  },

  verifyExpandAllVisibility() {
    return this.waitForElementVisible('@expandAllButton', 'Expand All Button is visible');
  },

  clickSettingsDropdown() {
    return this.waitForElementVisible('@settingsDropdown', 'Settings dropdown is visible')
      .click('@settingsDropdown');
  },

  validateAuditLogsMenuOption() {
    return this.verify.visible('@auditLogsOption', 'Audit Log is available');
  },

  clickAuditLogsMenuOption() {
    return this.waitForElementVisible('@auditLogsOption', 'Audit Log option is available')
      .click('@auditLogsOption');
  },

  validateAuditEntryWithNoDataFound(action, name, member, category) {
    return this.waitForElementVisible('@auditEntry', 'Event entry is visible')
      .waitForElementVisible('@linkText', 'Details Link text is visible')
      .click('@linkText')
      .verify.visible('@dateAndTime', 'Date and Time is visible')
      .verify.containsText('@member', member, `Member name is ${member}`)
      .verify.containsText('@category', category, `Category should be ${category}`)
      .verify.containsText('@action', action, `Action should be ${action}`)
      .verify.containsText('@linkText', 'Hide Details', 'Link text should be Hide Details')
      .verify.containsText('@noDataFound', name, `${name} is visible`)
      .elementText('@eventDetails');
  },

  selectContactFilter(contactName, selectContactElement) {
    return this.waitForElementVisible('@contactFilter', 'Contact filter is visible')
      .click('@contactFilter')
      .waitForElementVisible('@searchContactInput', 'Search contact input is visible')
      .setValue('@searchContactInput', contactName)
      .waitForElementVisible(selectContactElement, `Searched contact ${contactName} +  is visible`)
      .click(selectContactElement)
      .pause(1000);
  },

  selectActionFilter(selectActionElement) {
    return this.waitForElementVisible('@actionFilter', 'Contact filter is visible')
      .click('@actionFilter')
      .waitForElementVisible(selectActionElement, `${selectActionElement} action is visible`)
      .click(selectActionElement);
  },

  validateAuditEntry(member, category, action, name, contact = '') {
    return this.waitForElementVisible('@auditEntry', `${category} entry is visible`)
      .verify.containsText('@linkText', 'Details', 'Link text should be Details')
      .click('@linkText')
      .verify.visible('@dateAndTime', 'Date and Time is visible')
      .verify.containsText('@member', member, `Member name is ${member}`)
      .verify.containsText('@contact', contact, 'Contact name should not be visible')
      .verify.containsText('@category', category, `Category should be ${category}`)
      .verify.containsText('@action', action, `Action should be ${action}`)
      .verify.containsText('@linkText', 'Hide Details', 'Link text should be Hide Details')
      .verify.containsText('@staticField', name, `${action}ed Event should be ${name}`)
      .elementText('@eventDetails');
  },
};

module.exports = {
  commands: [auditLogsCommands],
  url() {
    return `${this.api.launch_url}/settings/organization/auditLog`;
  },
  elements: {

    //* ********------ Page Title -----*********//
    auditLogPageTitle: {
      selector: '//DIV[text()=\'Audit Log\']',
      locateStrategy: 'xpath',
    },

    filtersLabel: {
      selector: '//DIV[text()=\'FILTER LOG BY:\']',
      locateStrategy: 'xpath',
    },

    datePicker: {
      selector: '//DIV[@class=\'daterange__dropdown\']//button',
      locateStrategy: 'xpath',
    },

    memberFilter: {
      selector: '//SPAN[text()=\'Member(s)\']',
      locateStrategy: 'xpath',
    },

    contactFilter: {
      selector: '//SPAN[text()=\'Contact(s)\']',
      locateStrategy: 'xpath',
    },

    categoryFilter: {
      selector: '//SPAN[text()=\'Category\']',
      locateStrategy: 'xpath',
    },

    actionFilter: {
      selector: '//SPAN[text()=\'Action\']',
      locateStrategy: 'xpath',
    },

    topPagination: {
      selector: '//DIV[@class="row"]//div[@class=\'audit-log__pagination__wrapper\']',
      locateStrategy: 'xpath',
    },

    bottomPagination: {
      selector: '//DIV[@class=\'box responsive-table audit-log__grid\']//DIV[3][@class=\'u-text-right u-text-small audit-log__pagination\']',
      locateStrategy: 'xpath',
    },

    dateColumn: {
      selector: '//DIV[@class=\'rt-resizable-header-content\'][text()=\'Date\']',
      locateStrategy: 'xpath',
    },

    memberColumn: {
      selector: '//DIV[@class=\'rt-resizable-header-content\'][text()=\'Member\']',
      locateStrategy: 'xpath',
    },

    contactColumn: {
      selector: '//DIV[@class=\'rt-resizable-header-content\'][text()=\'Contact\']',
      locateStrategy: 'xpath',
    },

    categoryColumn: {
      selector: '//DIV[@class=\'rt-resizable-header-content\'][text()=\'Category\']',
      locateStrategy: 'xpath',
    },

    actionColumn: {
      selector: '//DIV[@class=\'rt-resizable-header-content\'][text()=\'Action\']',
      locateStrategy: 'xpath',
    },

    expandAllButton: {
      selector: '//BUTTON[@class=\'button expand-all__button button--link\']',
      locateStrategy: 'xpath',
    },

    //* ********------- Audit Logs Menu option ------*********//

    settingsDropdown: {
      selector: '//*[@id="cuke-main-settings"]/div/button',
      locateStrategy: 'xpath',
    },

    auditLogsOption: {
      selector: '//DIV[@class = \'dropdown__menu__item__content__label\']/span[text()=\'Audit Log\']',
      locateStrategy: 'xpath',
    },

    //* ********-------Audit entry ------*********//
    auditEntry: {
      selector: '//DIV[@class = \'rt-tbody\']/DIV[1]',
      locateStrategy: 'xpath',
    },

    dateAndTime: {
      selector: '//DIV[@class = \'rt-tbody\']/DIV[1]/DIV[1]/DIV[1]',
      locateStrategy: 'xpath',
    },

    member: {
      selector: '//DIV[@class = \'rt-tbody\']/DIV[1]/DIV[1]/DIV[2]',
      locateStrategy: 'xpath',
    },

    contact: {
      selector: '//DIV[@class = \'rt-tbody\']/DIV[1]/DIV[1]/DIV[3]',
      locateStrategy: 'xpath',
    },

    category: {
      selector: '//DIV[@class = \'rt-tbody\']/DIV[1]/DIV[1]/DIV[4]',
      locateStrategy: 'xpath',
    },

    action: {
      selector: '//DIV[@class = \'rt-tbody\']/DIV[1]/DIV[1]/DIV[5]',
      locateStrategy: 'xpath',
    },

    linkText: {
      selector: '//DIV[@class = \'rt-tbody\']/DIV[1]/DIV[1]/DIV[6]',
      locateStrategy: 'xpath',
    },

    staticField: {
      selector: '//DIV[@class = \'expand-row__span\']/STRONG',
      locateStrategy: 'xpath',
    },

    eventDetails: {
      selector: '//DIV[@class=\'expand-row u-list\']',
      locateStrategy: 'xpath',
    },

    noDataFound: {
      selector: '//SPAN[contains(text(),\'No Data Found\')]',
      locateStrategy: 'xpath',
    },

    searchContactInput: {
      selector: '//INPUT[@placeholder=\'Search Contacts\']',
      locateStrategy: 'xpath',
    },

    searchedContactConnectedParty: {
      selector: `//SPAN[@class='resource__intro__title__content'][text()='${contactFeeder.contactFirstNameOnModal} ${contactFeeder.contactLastNameOnModal}']`,
      locateStrategy: 'xpath',
    },

    searchContactPatient: {
      selector: `//SPAN[@class='resource__intro__title__content'][text()='${contactFeeder.contactFirstName} ${contactFeeder.contactLastName}']`,
      locateStrategy: 'xpath',
    },

    searchContactOther: {
      selector: `//SPAN[@class='resource__intro__title__content'][text()='${contactFeeder.contactOtherFirstName} ${contactFeeder.contactOtherLastName}']`,
      locateStrategy: 'xpath',
    },

    searchContactNew: {
      selector: `//SPAN[@class='resource__intro__title__content'][text()='${contactFeeder.contactNewFirstName} ${contactFeeder.contactNewLastName}']`,
      locateStrategy: 'xpath',
    },

    searchOtherContact: {
      selector: `//SPAN[@class='resource__intro__title__content'][text()='${contactFeeder.contactOtherFirstName} ${contactFeeder.contactOtherLastName}']`,
      locateStrategy: 'xpath',
    },

    searchConnectedParty: {
      selector: `//SPAN[@class='resource__intro__title__content'][text()='${contactFeeder.contactFirstNameOnModal} ${contactFeeder.contactLastNameOnModal}']`,
      locateStrategy: 'xpath',
    },

    selectAddAction: {
      selector: '//SPAN[@class=\'u-text-overflow\'][text()=\'Add\']',
      locateStrategy: 'xpath',
    },

    selectEditAction: {
      selector: '//SPAN[@class=\'u-text-overflow\'][text()=\'Edit\']',
      locateStrategy: 'xpath',
    },

    selectViewAction: {
      selector: '//SPAN[@class=\'u-text-overflow\'][text()=\'View\']',
      locateStrategy: 'xpath',
    },

    selectMergeAction: {
      selector: '//SPAN[@class=\'u-text-overflow\'][text()=\'Merge\']',
      locateStrategy: 'xpath',
    },

    selectDeleteAction: {
      selector: '//SPAN[@class=\'u-text-overflow\'][text()=\'Delete\']',
      locateStrategy: 'xpath',
    },
  },
};
