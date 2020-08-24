exports.handler = async ( event , context, callback ) => 
{ 
    getRequest( event.queryStringParameters.url, function( err, resp ){
        if( err ){ callback(null, {
                statusCode: 200,
                body: err
            });
        }

        callback( null, resp );
    } );
}

function getRequest(url, callback) {
    const clientReq = https.request(
      {
        url,
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