const axios = require('axios');

axios.post('https://webhook.site/b292cb54-1ff5-46a3-93e1-535f90575fd9', { transportType: process.argv[2] });