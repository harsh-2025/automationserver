// const { Builder, By } = require('selenium-webdriver');

// (async function example() {
//   let driver = await new Builder().forBrowser('chrome').build();
//   try {
//     await driver.get('https://dashboard.razorpay.com/?screen=sign_in'); // Replace with your target URL

//     // Use XPath to find the element
//     let emailinput = await driver.wait(until.elementLocated(By.xpath('//*[@id="Email or Mobile Number"]')),30000000);
//       await emailinput.sendKeys('harsh.rawat@fealtyx.com'); // Replace with the input value you want
//       let emailsubmit = await driver.wait(until.elementLocated(By.xpath('//*[@id="react-root"]/div/div/div[3]/div[2]/div[1]/div[1]/form/div/div/div[3]/button')),30000000);
//       await emailsubmit.click();
//       let passwordinput = await driver.wait(until.elementLocated(By.xpath('//*[@id="Password"]')),30000000);
//       await passwordinput.sendKeys()
//   } finally {
//       // await driver.quit();
//       console.log("hii")
//   }
// })();

const express = require('express');

const { Builder, By,until } = require('selenium-webdriver');
const fs = require('fs');
const app = express();
const port = 3000;
const chrome = require('selenium-webdriver/chrome');

// Load the config file

async function example() {
  // const config = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  // let driver = await new Builder().forBrowser('chrome').build();
  const config = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  let chromeOptions = new chrome.Options();
  chromeOptions.addArguments('--disable-popup-blocking'); // To avoid any popup issues

  // let driver = await new Builder()
  //     .forBrowser('chrome')
  //     .setChromeOptions(new chrome.Options().addArguments('--disable-popup-blocking'))
  //     .build();
      let driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
  try {
    await driver.get('about:blank');
    // Open a new tab with the Razorpay dashboard URL
    await driver.executeScript('window.open("https://dashboard.razorpay.com/?screen=sign_in", "_blank");');
    // Wait for a short moment to ensure the new tab opens
    await driver.sleep(2000);
    // Switch to the new tab
    let handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[1]);

    // await driver.get('https://dashboard.razorpay.com/?screen=sign_in');
    // await driver.get('about:blank');

    // // Open a new tab with the Razorpay dashboard
    // await driver.executeScript('window.open(arguments[0])', 'https://dashboard.razorpay.com/?screen=sign_in');

    // // Switch to the new tab
    // const windows = await driver.getAllWindowHandles();
    // await driver.switchTo().window(windows[1]);

    //login and password start
    // Use XPath to find the email input element
    let emailinput = await driver.wait(until.elementLocated(By.xpath('//*[@id="Email or Mobile Number"]')),30000000);
    await emailinput.sendKeys(config.credentials.email);

    // Use XPath to find and click the submit button
    let emailsubmit = await driver.wait(until.elementLocated(By.xpath('//*[@id="react-root"]/div/div/div[3]/div[2]/div[1]/div[1]/form/div/div/div[3]/button')),30000000);
    await emailsubmit.click();

    // Use XPath to find the password input element
    let passwordinput = await driver.wait(until.elementLocated(By.xpath('//*[@id="Password"]')),30000000);
      await passwordinput.sendKeys(config.credentials.password);
      let submitbuttom = await driver.wait(until.elementLocated(By.xpath('//*[@id="react-root"]/div/div/div[3]/div[2]/div[1]/div[1]/form/div/div/div[4]/button')),30000000);
      await submitbuttom.click();
    //login and password end
    
    // await driver.setTimeout(() => {
      
    // }, 2000);
    let offerlink = await driver.wait(until.elementLocated(By.xpath('//*[@id="react-root"]/div/div[2]/div[1]/div[2]/nav/div/div[6]/a[1]')), 30000000);

    //going to offer page
    // let offerlink = await driver.wait(until.elementLocated(By.xpath('//*[@id="react-root"]/div/div[2]/div[1]/div[2]/nav/div/div[6]/a[1]')),30000000);
    await offerlink.click();
    // await driver.setTimeout(() => {
      
    // }, 2000);

    //creating new offer
    let createnewofferbutton = await driver.wait(until.elementLocated(By.xpath('/html/body/div[7]/div/button[1]')),30000000);
    await createnewofferbutton.click();
    let discountcard = await driver.wait(until.elementLocated(By.xpath('//*[@id="react-root"]/div/div[2]/div[1]/main/div[2]/div/div[1]/div/div/div/div/div[2]/div[1]/div')),30000000);
    await discountcard.click();

    let offername = await driver.wait(until.elementLocated(By.xpath('//*[@id="textinput-1-input-2"]')),30000000);
    await offername.sendKeys(config.offerdetails.offername);
    let offerdisplay = await driver.wait(until.elementLocated(By.xpath('//*[@id="textinput-7-input-8"]')),30000000);
    await offerdisplay.sendKeys(config.offerdetails.offerdisplay);
    let offerterms = await driver.wait(until.elementLocated(By.xpath('//*[@id="textarea-13-input-14"]')),30000000);
    await offerterms.sendKeys(JSON.stringify(config.offerdetails.offerterms));
    let offertype = await driver.wait(until.elementLocated(By.xpath('//*[@id="dropdown-25-trigger-19-input-20"]')),30000000);
    await offertype.click();
    let offertypeoptions = await driver.wait(until.elementLocated(By.xpath('//*[@id="dropdown-25-actionlist"]/div')),30000000);
    let offertypeoption;
    {
      config.offerdetails.offertype === 'instant' ? offertypeoption = await driver.wait(until.elementLocated(By.xpath('//*[@id="dropdown-25-1"]')),30000000)
      : offertypeoption=await driver.wait(until.elementLocated(By.xpath('//*[@id="dropdown-25-2"]')),30000000)

    }
    await offertypeoption.click();
    let nextbutton1 = await driver.wait(until.elementLocated(By.xpath('//*[@id="floating-ui-5"]/div/div[2]/div[2]/div[2]/div/button')),30000000);
    await nextbutton1.click();

    //next page start for discount type
    
    let discounttype = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button')),30000000);
    await discounttype.click();
    // let discountoptions = await driver.wait(until.elementLocated(By.xpath('//*[@id="dropdown-2213-actionlist"]/div')),30000000);
    let discountbutton=await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div/div/div[2]/div/div/div/button[2]')),30000000);
    
    discountbutton.click();

    let minimumorder = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[2]/div[1]/div[2]/div/input')),30000000);
    await minimumorder.sendKeys(config.discount.mov);
    let discountworth = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[4]/div[1]/div[2]/div/input')),30000000);
    await discountworth.sendKeys(config.discount.discountworth);
    let nextbutton2 = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[2]/div[2]/div/button[2]')),30000000);
    await nextbutton2.click();

    //payment page
    let paymentmethod = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button')),30000000);
    await paymentmethod.click();
    let cardoption = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div/div[2]/div/div/div/button[2]')),30000000);
    await cardoption.click();
    let cardtype = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[2]/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button')),30000000);
    await cardtype.click();
    let cardtypeselect = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[2]/div/div[2]/div/div/div/button[2]')),30000000);
    await cardtypeselect.click();
    let bankname = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[3]/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button')),30000000);
    await bankname.click();
    let icicibank = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[3]/div/div[2]/div/div/div/button[4]')),30000000);
    await icicibank.click();
    let cardnetwork = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[4]/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button')),30000000);
    await cardnetwork.click();
    let visacard = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[4]/div/div[2]/div/div/div/button[2]')),30000000);
    await visacard.click();
    let maxusage = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[5]/div[1]/div[2]/div/input')),30000000);
    await maxusage.sendKeys(3);
    let iin = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[6]/div[1]/div[2]/div/input')),30000000);
    await iin.sendKeys(235635);

    let nextbutton3 = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[2]/div[2]/div/button[2]')),30000000);
    await nextbutton3.click();
    
    let checkbox = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[1]/div[2]/div/label/div[2]')),30000000);
    await checkbox.click();
    let inputdate = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[2]/div/div[1]/div/div/input')),30000000);
    // inputdate.sendKeys("15/08/2024")

    inputdate.click();
    let selectdate = await driver.wait(until.elementLocated(By.xpath('/html/body/div[10]/div/div/div/div/div[2]/div[2]/table/tbody/tr[3]/td[2]/div')), 30000000);
    // inputdate.sendKeys('2024-08-12');
    let startdate = await driver.wait(until.elementLocated(By.css(`[title="August 15, 2024"]`)), 30000000);
    startdate.click();
    let enddate = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[3]/div[2]/div[1]/div/div/input')), 30000000);
    enddate.click();
    // enddate.sendKeys("20/08/2024");
    let selectenddate = await driver.wait(until.elementLocated(By.css(`[title="August 31, 2024"]`)), 30000000);
    selectenddate.click();
    let payfail = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[4]/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button')),30000000);
    await payfail.click();
    let payfailoption = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[4]/div/div[2]/div/div/div/button[3]')),30000000);
    await payfailoption.click();
    let checkboxpay = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[6]/div/div/div[1]/div/div/label/div/div/div[1]')),30000000);
    await checkboxpay.click();
    let nextbutton4 = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[2]/div[2]/div/button[2]')),30000000);
    await nextbutton4.click();
    let finalbox = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div/div/div/div/div/div/div/label/div/div/div[1]')),30000000);
    await finalbox.click();

    let createoffer = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[2]/div[2]/div/button[2]')),30000000);
    await createoffer.click();


  } finally {
    console.log("Automation complete");
    // Optionally, you can uncomment the line below to close the browser after the automation
    // await driver.quit();
  }
};

app.get('/start-automation', async (req, res) => {
  // await example();
  // res.send('Automation started!');
  try {
        await example();
        res.send('Automation started!');
    } catch (error) {
        console.error('Error starting automation:', error);
        res.status(500).send('Error starting automation');
    }
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/', async (req, res) => {
  res.send('running the server')
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
