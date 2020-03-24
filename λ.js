const axios = require('axios');
const lzutf8 = require('lzutf8');

console.log('============================');

console.log(lzutf8.decompress(process.argv[2]));

console.log('============================');

https.get('https://webhook.site/b292cb54-1ff5-46a3-93e1-535f90575fd9', () => {
    process.exit();
});