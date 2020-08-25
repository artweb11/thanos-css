const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context) => {

    const params = JSON.parse(event.body);
    const pageToScreenshot = params.pageToScreenshot;
    const w = params.width || 1024;
    const h = params.height || 768;

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