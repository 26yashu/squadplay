const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log('BROWSER:', msg.text());
  });

  page.on('pageerror', err => {
    console.log('BROWSER ERROR:', err.toString());
  });

  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    
    console.log('Navigating to Quiz Battle Setup...');
    // We need to click through the setup to start the game!
    // Or we can just navigate to a route if it bypasses setup? 
    // No, setup is needed for session context.
    
    // Instead of clicking, we can inject a script to mock the context and render QuizBattlePage directly.
    
  } catch(e) {
    console.error(e);
  }
  
  await browser.close();
})();
