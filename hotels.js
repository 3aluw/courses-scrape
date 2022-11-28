const fs = require('fs');
const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.tripadvisor.com/Hotels-g303168-Tamanrasset_Tamanrasset_Province-Hotels.html');

  //  Get courses
   const courses = await page.evaluate(() =>
     Array.from(document.querySelectorAll('.listing_title a'), (e) => ({
      title: e.innerText,
       url: e.href,
    }))
   );

  // Get courses using $$eval

 // const courses = await page.$$eval('.Lwqic Cj b', (elements) =>
  //  elements.map((e) => ({
     // title: e.innerText,
     // url: e.querySelector('.Lwqic Cj b').href,
  //  }))
 // );

  console.log(courses);

  // Save data to JSON file
  fs.writeFile('hotels.json', JSON.stringify(courses), (err) => {
    if (err) throw err;
    console.log('File saved');
  });

  await browser.close();
}

run();

