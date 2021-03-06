/*--------------------------------------------------------------------------------------------------------*/

  // These tests make sure that we login, all Inbox pages render properly and the new message search all
  // function properly

/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

  'Login Page with Correct Credentials': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .enterMemberCreds()
      .submit()
      .validateUrlChange();
    //better name for this function needed

  },

  'Inbox Page initial render': function(client) {
    const inbox = client.page.InboxPage();

    inbox.validateInbox();

    client.pause(2000);
  },

  'Click New Message button to show Search input': function(client) {
    const inbox = client.page.InboxPage();

    inbox.newMessageClick()
      .validateNewMessageInput()
      .newMessageClick();

    client.pause(2000);
  },

  'No search results with one character input': function(client) {
    const inbox = client.page.InboxPage();

    inbox.newMessageClick()
      .fillInNewMessageInput('f')
      .searchResultNotVisible()
      .newMessageClick();
  },

  'No search results with two characters input': function(client) {
    const inbox = client.page.InboxPage();

    inbox.newMessageClick()
      .fillInNewMessageInput('fr')
      .searchResultNotVisible()
      .newMessageClick();

    client.pause(2000);
  },

  'Search results with three characters input': function(client) {
    const inbox = client.page.InboxPage();

    inbox.newMessageClick()
      .fillInNewMessageInput('fro')
      .searchResultVisible()
      .clickFirstResult();

    client.end(3000);

  },
}
