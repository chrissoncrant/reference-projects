// Importing default exports doesn't require the brackets. Renaming default exports upon importing does not require the 'as' keyword. Here, it was renamed to 'hi'. The default export must be first in the

//Importing non-default exports requires the brackets and to rename the variable requires using the 'as' keyword.

//REMEMBER the '.js' extension in the import if you get 404 errors

import hi, { sayBye as bye, saySomething } from "./sayings.js";

hi();
bye();
saySomething("Yo");
