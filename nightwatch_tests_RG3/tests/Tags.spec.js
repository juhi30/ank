module.exports = {
  
  //Logs into app to start tests
 'Login Page with Correct Credentials': function (client) {
     const login = client.page.LoginPage();

     login.navigate()
         .enterMemberCreds()
         .submit()
         .validateUrlChange()
 },

 'Go to Tags page and validate elements': function (client) {
     const tags = client.page.TagsPage();

     tags.navigate()
        .validateTagPageElements()

     client.pause(1000);
 },

 'Validate new Tag modal and create new Tag': function (client) {
     const tags = client.page.TagsPage();

     tags.validateCreateTagModal()

     client.pause(1000)
 }

}