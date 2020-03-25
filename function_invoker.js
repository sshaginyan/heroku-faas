process.env.DATABASE_URL = 'postgres://u8f6tki4kd7t7o:p6e81aa2b5e1c738bfc56a0068949fbfc1bd73aefd2c93e30eaf74793568160ca@ec2-3-227-37-147.compute-1.amazonaws.com:5432/d619mlqhcpeng3';
process.env.DATABASE_URL += '?ssl=true';

const axios = require('axios');
const { Client } = require('pg');
const express = require('express');
const jsforce = require('jsforce');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const conn = new jsforce.Connection({});

const client = new Client({
    ssl: {
        rejectUnauthorized: true,
    },
    connectionString: process.env.DATABASE_URL
});

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

async function runFunction(data) {
    postData.command = `npm run function -- ${data.transportType}`;
    await axios.post('https://api.heroku.com/apps/intel-faas/dynos', postData, { headers });
}

(async () => {
    await conn.login('sshaginyan@demo.com', '474925~Ste' + 'qi8O5SrMmrEooKYy7KrmuLifG');

    conn.streaming.subscribe('/data/ChangeEvents', data => {
        runFunction({ transportType: 'Change_Data_Capture', data });
    });
    
    conn.streaming.subscribe('/event/PlatformEvents__e', data => {
        runFunction({ transportType: 'Platform_Events', data });
    });

})();

client.connect((error, client) => {
    if(error) throw error;

    client.on('notification', msg => {
        const data = JSON.parse(msg.payload);
        runFunction({ transportType: 'Heroku_Connect', data });
    });
    client.query('LISTEN faas');
});

app.post('/http', (request, response) => {
    runFunction({ transportType: 'HTTP', data: request.body });
    response.sendStatus(200);
});

app.post('/apex', (request, response) => {
    runFunction({ transportType: 'Apex', data: request.body });
    response.sendStatus(200);
});

app.post('/lightning_web_components', (request, response) => {
    runFunction({ transportType: 'Lightning_Web_Components', data: request.body });
    response.sendStatus(200);
});

app.post('/flow_builder', (request, response) => {
    runFunction({ transportType: 'Flow Builder', data: request.body });
    response.sendStatus(200);
});

app.listen(process.env.PORT || 8080);