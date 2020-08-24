const https = require('https');
const url = require('url');

exports.handler = async ( event , context, callback ) => 
{ 
    if (event.httpMethod === 'OPTIONS') {
        preflight(callback);
    } else {
        console.log('url: ', event.queryStringParameters.url );
        getRequest( event.queryStringParameters.url, callback );
    }
    
}

function preflight(callback) {
    callback(null, {
      statusCode: 204,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
      },
      body: {},
    });
  }

function getRequest(urlStr, callback) {
    const clientReq = https.request(
      {
        url.parse( urlStr ),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      clientRes => {
        clientRes.setEncoding('utf8');
        let rawData = '';
        clientRes.on('data', chunk => {
          rawData += chunk;
        });
        clientRes.on('error', err => {
          console.log('error here line 140', err);
          callback(err.message);
        });
        clientRes.on('end', () => {
          callback(null, {
            statusCode: 200,
            headers: {
            //   'content-type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: rawData,
          });
        });
      }
    );
    clientReq.end();
  }