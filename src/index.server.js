function createIndexView(){
    var email = Session.getActiveUser().getEmail();

    const template = HtmlService.createTemplateFromFile("index.html");
    template.signedInUser = email;
    template.baseURL = ScriptApp.getService().getUrl();
    return template.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).setTitle("BRAND - PAGE TITLE");
}