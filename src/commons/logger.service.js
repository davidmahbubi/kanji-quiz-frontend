 /**
  * Logger Service
  * 
  * This service contain function
  * that will output the templated log messages
  */
 
 const PREFIX = '=>';
 
 /**
  * log
  * 
  * This method will print out
  * the given category and message
  * and also deciding it's shown
  * in development mode or not
  * 
  * @param {*} category 
  * @param {*} message 
  * @param {boolean} developmentOnly 
  * @param {boolean} error 
  */
 function makeLog(category, message, developmentOnly = true, error = false) {
    if (developmentOnly) {
        if (process.env.NODE_ENV === 'development') {
            console[!error ? 'log' : 'error'](`${PREFIX} [${category}] ${message}`);
        }
    } else {
        console[!error ? 'log' : 'error'](`${PREFIX} [${category}] ${message}`);
    }
 }

 export { makeLog };
     