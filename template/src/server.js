const authSheetName = "Authorized Users";

function doGet(e) {
  if (!authenticate()) return unauthorizedView();
  var parameter = e.parameter;
  var view = parameter.view;
  switch (view) {
    case undefined:
      return indexView();
    default:
      return notFoundView();
  }
}

function unauthorizedView() {
  var template = HtmlService.createTemplateFromFile("unauthorized.html");
  template.initialObject = "[]";
  return template
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function authenticate() {
  // TODO implement auth
  /* var listOfAuthorizedUsers = SpreadsheetApp.getActive()
    .getSheetByName(authSheetName)
    .getRange("A2:A")
    .getValues()
    .map((a) => a[0])
    .filter((a) => a != "");
  if (!listOfAuthorizedUsers.includes(Session.getActiveUser().getEmail()))
    return false; */
  return true;
}

function notFoundView() {
  return HtmlService.createHtmlOutput(
    "<p class = 'lead text-center'> The page you requested couldn't be found on our server.</p>"
  );
}

function include(fileName, ...params) {
  var template = HtmlService.createTemplateFromFile(fileName);
  if (params.length) {
    params.forEach((paramObj) => {
      for (var key in paramObj) {
        template[key] = paramObj[key];
      }
    });
  }
  return template.evaluate().getContent();
}
