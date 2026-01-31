import { test, expect } from '@playwright/test';

const negativeInputs = [
  'naa pogave maaten',
  'nimmi inga varaadha',      
  'nee poga maattiya?',   
  'adhu illa',                   
  'awa padikka maattaa',            
  'awana enakku pidikkaathu',                 
  'awal kallachchi',                
  '2 thengaai',          
  'enakku apple vendaam',       
  'computer use panna virumbala',                        
  'amma adikka maattanga'       
];

negativeInputs.forEach((input, index) => {
  test(`NegFun${String(index + 1).padStart(4, '0')} - "${input}"`, async ({ page }) => {
    test.setTimeout(60000);  // 60 seconds timeout
    
    await page.goto('/');
    await page.click('textarea');
    await page.waitForTimeout(1000);
    
    // Type input word-by-word (same logic as positive)
    const words = input.split(' ');
    for (const word of words) {
      await page.keyboard.type(word);
      await page.keyboard.press('Space');
      await page.waitForTimeout(2500);  // Same timing as positive tests
    }
    
    await page.waitForTimeout(4000);
    
    // NEGATIVE TEST: PASS if NO Tamil characters appear
    const tamilCount = await page.locator('text=/[\\u0B80-\\u0BFF]/').count();
    expect(tamilCount).toBe(0);  // ✅ Test PASSES when NO Tamil found
    
    // Screenshot proof
    await page.screenshot({ 
      path: `proof-neg${String(index + 1).padStart(4, '0')}.png`, 
      fullPage: true 
    });
    console.log(`🟢 NegFun${String(index + 1).padStart(4, '0')} PASS - No Tamil: "${input}" ✓`);
  });
});