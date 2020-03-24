const axios = require('axios');
const express = require('express');
const jsforce = require('jsforce');

const app = express();

const conn = new jsforce.Connection({});

const postData = {
    attach: false,
	size: 'standard-1X',
	type: 'run',
	time_to_live: 1800
};

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.heroku+json; version=3',
    'Authorization': 'Bearer 8c2f5164-1d2f-4c23-9399-3fd9cc0f706b'
};

function runλ(data) {
    postData.command = `npm run λ -- ${JSON.stringify(data)}`;
    axios.post('https://api.heroku.com/apps/intel-faas/dynos', postData, { headers })
    .then(() => { console.log('success'); })
    .catch(error => { console.log(error); });
}

(async () => {
    await conn.login('sshaginyan@demo.com', '474925~Ste' + 'qi8O5SrMmrEooKYy7KrmuLifG');
    //await conn.login('steve@myfirstdemo.demo', 'abc123abc');

    conn.streaming.subscribe('/data/ChangeEvents', runλ);
    conn.streaming.subscribe('/event/PlatformEvents__e', runλ);

})();

app.post('/http', () => {

});

app.post('/apex', () => {

});

app.post('/lightning_web_components', () => {

});

app.post('/flow_builder', () => {

});

app.listen(process.env.PORT || 8080);