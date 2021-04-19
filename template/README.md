# base-gas-app
A base structure for google app script web app project which will get you started in seconds

# Things to remember
- All the routing is done in server.js, whereas creation of views happens inside their respective server.js file which is named as module.server.js
- All module have scripting and styles done in their own js and css files named as module.js.html and module.css.html respectively
- Common scripting and styling are placed in common.js.html and common.css.html respectively

## For example
If we have a module that handles CRUD operation of product, then
- Routing to the product urls will be done in server.js
- Functions that create template from html files will be placed in product.server.js
- Every page will have there own css and js files such as product-add.js.html and product-add.css.html or product-edit.js.html and product-edit.css.html

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

4. Create a new app script project using command
```
mkdir project_name
mkdir project_name/src
cd project_name/src
clasp create --title "project_name"
```

OR

Clone an existing script using
```
mkdir project_name
mkdir project_name/src
cd project_name/src
clasp clone <scriptID>
```

5. download the repo from (do not clone): https://github.com/AppX-Technologies/base-gas-app and extract it inside project_name (not project_name/src)
6. run ```npm install``` to get intellisense in vs code

# Push the code
First push the code in project_name to git
Then if code is ready to be pushed to app script, change directory to project_name/src and run ```clasp push``` 
