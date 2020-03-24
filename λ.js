const https = require('https');

console.log('============================');
console.log(process.argv);
console.log('============================');

https.get('https://webhook.site/b292cb54-1ff5-46a3-93e1-535f90575fd9', () => {
    process.exit();
});