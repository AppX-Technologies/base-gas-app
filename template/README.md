# gas-utils
Utility tools to get you started with a google app scripts app in seconds.

# Commands provided by the script
```generate-project```: Command that generates a complete webapp project template

```generate-page```: Command that generates a page inside webapp project

# Example usage
```npx gas-utils generate-project "AppX" ./AppX "About Us" ```

This command creates a new project named AppX inside directory ./AppX (creates a new if not already created). The third arguement is optional and specifies the name of the first page to be included in the project. If not specified, index.html will be generated. 

```npx gas-utils generate-page "Contact Us" "AppX" ```

This command creates a new page with files its associated js and css files. The second arguement is the project name. The project name is supplied to be used in ```navbar brand```, ```<title>``` and ```<footer>```. 

# Things to remember
- All the routing is done in server.js, whereas creation of views and their related functions happens inside their respective server.js file which is named as page.server.js (For example. index.server.js)
- Common server functions which are used throughout the app are placed inside server.js
- All page have scripting and styles done in their own js and css files named as page.js.html and page.css.html respectively (Ex: index.js.html and index.css.html)
- Common scripting and styling which are used throughout the app are placed in common.js.html and common.css.html respectively.

### For example
If we have a page name "Create Products", then
- Routing to the page urls will be done in server.js and all other functions to be used throughout the project will be done in server.js
- Functions that create template from html files and also any db related functions will be placed in create_products.server.js
- Every page will have there own css and js files such as create_products.js.html and create_products.css.html

# Setting up project
1. The Apps Script CLI (clasp) requires Node.js >= v6.0.0 to be installed.
2. Run the below command to download and install clasp globally
```
npm i @google/clasp -g
```
3. Login to clasp using the account that is associated with the project
```
clasp login
```
A browser window will open and allow you to login to your google account.

4. If its a new project, first run the generate-project command on your local computer, Create a new app script project in app script home page and clone it in the src directory using

```
cd project_name/src
clasp clone <scriptID>
```
5. If its a already exising project, just clone it from github.

6. run ```npm install``` to get intellisense in vs code

# Push the code
First push the code in project_name to git
Then if code is ready to be pushed to app script, change directory to project_name/src and run ```clasp push``` 
