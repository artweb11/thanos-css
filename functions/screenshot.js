const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context) => {

    const pageToScreenshot = JSON.parse(event.body).pageToScreenshot;

    const browser = await chromium.puppeteer.launch({
        executablePath: await chromium.executablePath,
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        headless: chromium.headless,
    });
    
    const page = await browser.newPage();

    await page.goto(pageToScreenshot);

    const screenshot = await page.screenshot({ encoding: 'base64' });

    await browser.close();
  
    return {
        headers: {
            "content-type": "image/png"
        },
        statusCode: 200,
        body: screenshot,
        isBase64Encoded: true
    }

}