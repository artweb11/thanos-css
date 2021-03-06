const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context) => {

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    };
      
    if (event.httpMethod !== 'GET') {
        // To enable CORS
        return {
        statusCode: 200, // <-- Important!
        headers,
        body: ''
        };
    }

    // const params = JSON.parse(event.body);
    const pageToScreenshot = event.queryStringParameters.url;
    // params.pageToScreenshot;
    const w = parseInt( event.queryStringParameters.width ) || 1024;
    const h = parseInt( event.queryStringParameters.height ) || 768;

    const browser = await chromium.puppeteer.launch({
        executablePath: await chromium.executablePath,
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        headless: chromium.headless,
    });
    
    const page = await browser.newPage();

    await page.setViewport({
        width: w,
        height: h,
        deviceScaleFactor: 1,
    });

    await page.goto(pageToScreenshot);

    await page.waitFor(1000);

    const screenshot = await page.screenshot({ encoding: 'base64' });

    await browser.close();
  
    return {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "image/png"
        },
        statusCode: 200,
        body: screenshot,
        isBase64Encoded: true
    }

}