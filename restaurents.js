const fs = require('fs');
const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //Restaurants
  await page.goto('https://www.tripadvisor.com/Restaurants-g303168-Tamanrasset_Tamanrasset_Province.html');

  //  Get a screenshot of the page
  // await page.screenshot({ path: 'example.png', fullPage: true });

  //  Get a PDF of the page
  // await page.pdf({ path: 'example.pdf', format: 'A4' });

  //  Get HTML of the page
  // const html = await page.content();

  //  Get text of the page
  // const title = await page.evaluate(() => document.title);

  //  Get text of the page
  // const text = await page.evaluate(() => document.body.innerText);

  //  Get all links
   const links = await page.evaluate(() =>
     Array.from(document.querySelectorAll('.Lwqic Cj b'), (e) => e.href)
   );

  //  Get courses
   const courses = await page.evaluate(() =>
     Array.from(document.querySelectorAll('.Lwqic'), (e) => ({
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
  fs.writeFile('restaurents.json', JSON.stringify(courses), (err) => {
    if (err) throw err;
    console.log('File saved');
  });

  await browser.close();
}

run();

