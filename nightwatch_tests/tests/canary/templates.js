module.exports = {
  'Login as a member': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .enterMemberCreds('nightkeaton', 'Chacoz123')
      .submit()
      .validateUrlChange()
  },

  'On the templates page, create a new template': function(client) {
    // do stuff
  },

  'Remove that template': function(client) {
    // do stuff
  },

  'Create a new template with an attachment < 600KB': function(client) {
    // do stuff
  },

  'Edit that template with an attachment > 600 KB': function(client) {
    // do stuff
  },

  'Remove that template': function(client) {
    // do stuff
  }
}