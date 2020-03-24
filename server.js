const axios = require('axios');
const express = require('express');
const jsforce = require('jsforce');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    postData.command = `ls && npm run λ -- ${JSON.stringify(data)}`;
    console.log(postData);
    axios.post('https://api.heroku.com/apps/intel-faas/dynos', postData, { headers })
    .then(() => { console.log('success'); })
    .catch(error => { console.log(error); });
}

(async () => {
    // await conn.login('sshaginyan@demo.com', '474925~Ste' + 'qi8O5SrMmrEooKYy7KrmuLifG');
    await conn.login('steve@myfirstdemo.demo', 'abc123abc');

    conn.streaming.subscribe('/data/ChangeEvents', data => {
        runλ({ transportType: 'Change Data Capture', data });
    });
    
    conn.streaming.subscribe('/event/PlatformEvents__e', data => {
        runλ({ transportType: 'Platform Events', data });
    });

})();

app.post('/http', (request, response) => {
    runλ({ transportType: 'HTTP', data: request.body });
    response.sendStatus(200);
});

app.post('/apex', (request, response) => {
    runλ({ transportType: 'APEX', data: request.body });
    response.sendStatus(200);
});

app.post('/lightning_web_components', (request, response) => {
    runλ({ transportType: 'Lightning Web Components', data: request.body });
    response.sendStatus(200);
});

app.post('/flow_builder', (request, response) => {
    runλ({ transportType: 'Flow Builder', data: request.body });
    response.sendStatus(200);
});

app.listen(process.env.PORT || 8080);