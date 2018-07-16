const accountSetupCommands = {

    pause: function (time) {
        this.api.pause(time);
        return this;
    },

    clickBillingToggle: function () {
        return this.waitForElementVisible('@billingToggle', 'Billing toggle is visible')
            .click('@billingToggle')
            .waitForElementNotPresent('@newBillingRadio', 'Billing options are hidden')
    },

    fillInOrgBasicInformation: function (name, address, city, state, zip) {
        return this.waitForElementPresent('@orgNameInput', 'Organization inputs are visible')
            .setValue('@orgNameInput', name)
            .setValue('@addressLineOneInput', address)
            .setValue('@cityInput', city)
            .setValue('@stateDropdown', state)
            .setValue('@zipInput', zip)
    },

    clickCreateOrganizaton: function () {
        return this.waitForElementVisible('@createOrgButton', 'Create organization button is visible')
            .click('@createOrgButton')
    }
}

module.exports = {
    commands: [accountSetupCommands],

    url: function () {
        return this.api.launch_url + '/accountsetup'
    },

    elements: {

        /*---------------------------------------------------------*/
        // Organization Information
        /*---------------------------------------------------------*/

        // Not in use when creating org without billing
        // existingBillingRadio: {
        //     selector: ``,
        //     locateStrategy: 'xpath',
        // },

        newBillingRadio: {
            selector: `//LABEL[contains(@for, 'selectedBillingOpt')]`, // used to verify billing options are hidden
            locateStrategy: 'xpath',
        },

        orgNameInput: {
            selector: `//INPUT[contains(@id, 'name')]`,
            locateStrategy: 'xpath',
        },

        parentCompanyInput: {
            selector: `//INPUT[contains(@id, 'parentCompany')]`,
            locateStrategy: 'xpath',
        },

        addressLineOneInput: {
            selector: `//INPUT[contains(@id, 'street1')]`,
            locateStrategy: 'xpath',
        },

        addressLineTwoInput: {
            selector: `//INPUT[contains(@id, 'street2')]`,
            locateStrategy: 'xpath',
        },

        cityInput: {
            selector: `//INPUT[contains(@id, 'city')]`,
            locateStrategy: 'xpath',
        },

        stateDropdown: {
            selector: `//SELECT[contains(@id, 'state')]`,
            locateStrategy: 'xpath',
        },

        zipInput: {
            selector: `//INPUT[contains(@id, 'zip')]`,
            locateStrategy: 'xpath',
        },

        orgPhoneInput: {
            selector: `//INPUT[contains(@id, 'businessPhone')]`,
            locateStrategy: 'xpath',
        },

        orgEmailInput: {
            selector: `//INPUT[contains(@id, 'businessEmail')]`,
            locateStrategy: 'xpath',
        },

        /*---------------------------------------------------------*/
        // Contact information
        /*---------------------------------------------------------*/

        contactNameInput: {
            selector: `//INPUT[contains(@id, 'orgContactName')]`,
            locateStrategy: 'xpath',
        },

        contactPhoneInput: {
            selector: `//INPUT[contains(@id, 'orgContactPhone')]`,
            locateStrategy: 'xpath',
        },

        contactEmailInput: {
            selector: `//INPUT[contains(@id, 'orgContactEmail')]`,
            locateStrategy: 'xpath',
        },
        /*---------------------------------------------------------*/
        // Billing Toggle
        /*---------------------------------------------------------*/

        billingToggle: {
            selector: `//LABEL[contains(@for, 'billingChecked')]`,
            locateStrategy: 'xpath',
        },

        /*---------------------------------------------------------*/
        // Sales Information
        /*---------------------------------------------------------*/

        // currently will not be used for automated testing    

        /*---------------------------------------------------------*/
        // Payment Information
        /*---------------------------------------------------------*/

        // currently will not be used for automated testing

        /*---------------------------------------------------------*/

        createOrgButton: {
            selector: `//BUTTON[contains(text(), 'Create Organization')]`,
            locateStrategy: 'xpath',
        },
    }
}