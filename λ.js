const zlib = require('zlib');
const axios = require('axios');

console.log('============================');
zlib.inflate(process.argv[2], (error, decompressed) => {
    if(error) throw error;
    console.log(decompressed.toString());
});
console.log('============================');

https.get('https://webhook.site/b292cb54-1ff5-46a3-93e1-535f90575fd9', () => {
    process.exit();
});