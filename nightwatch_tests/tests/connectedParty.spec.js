const findTextOnPage = require('../helper_functions').findTextOnPage;
const randoNum = require('../helper_functions').randoNum;

const fakeName = {
  firstName: `Pewpew${randoNum}`,
  lastName: `Pubgagrub${randoNum}`,
}

module.exports = {
  'Login with valid member creds': function(client) {
    let login = client.page.LoginPage();

    login.navigate()
    .fillInForm('kfoster', 'chacoz')
    .submit()
    .validateUrlChange()
  },

  'Connect an existing contact with a new contact': function(client) {
    let uni = client.page.UniversalElements();
    let profileSum = client.page.ProfileSummaryPage();
    let editCon = client.page.EditContactPopupPage();
    let randoNum = Math.ceil(Math.random() * 1000);

    uni.searchForContactAndClick('Broccoli Boy');

    profileSum.clickEditProfile();

    editCon.createNewContactAndCP(fakeName.firstName, fakeName.lastName)
      .clickSaveContact();

    client.pause(1000);

    findTextOnPage(profileSum, `${fakeName.firstName} ${fakeName.lastName}`);
    
    client.end(1000);
  },
}