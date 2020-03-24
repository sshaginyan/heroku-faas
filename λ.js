const https = require('https');

console.log(process.argv);

https.get('https://webhook.site/b292cb54-1ff5-46a3-93e1-535f90575fd9', () => {
    process.exit();
});