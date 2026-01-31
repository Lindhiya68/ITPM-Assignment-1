import { test, expect } from '@playwright/test';

const yourSentences = [
  'Naa campus ku poren',
  'Thanni kudikkanum pola irukku',
  'Vaazhga vazhamudan',
  'Amma samaikiranga',
  'Adapaawi! ennada senja nee?',
  'Thambi book vaasi da',
  'Awal 2 murai keeley vilundhal',
  'Paadasaalai',
  'Columbu',
  'Exam ezhudhittiya?',
  'Naan vaasiththukkondu irukkiran',
  'Awe sol pechi kekka maattaan',
  'Kamali enna time ku ezhumbinal?',
  'Vaa machan vaa',
  'Awa kedakkuraa',
  'Unakku enna paithiyama?',
  'Enda birthday june 8',
  'Nalla thoonginiya?',
  'Unakku ennaachi?',
  'Next unakkuththaan',
  'Yaaruda maapla?',
  'Adhu ennadhu?',
  'Ellarum eppadi irukkanga?',
  'Poona odudhu paaru'
];

yourSentences.forEach((sentence, index) => {
  test(`PosFun${String(index + 1).padStart(4, '0')} - "${sentence}"`, async ({ page }) => {
    test.setTimeout(120000);  // 2 minutes for long sentences
    
    await page.goto('/');
    await page.click('textarea');
    await page.waitForTimeout(1000);
    
    // Type sentence WORD-BY-WORD (same logic as your working code)
    const words = sentence.split(' ');
    for (const word of words) {
      await page.keyboard.type(word);           // Type word
      await page.keyboard.press('Space');       // Press space  
      await page.waitForTimeout(2500);          // Wait for conversion (your timing)
    }
    
    // Final wait + PROOF (same as your code)
    await page.waitForTimeout(4000);
    await page.screenshot({ 
      path: `proof-pos${String(index + 1).padStart(4, '0')}.png`, 
      fullPage: true 
    });
    console.log(`🟢 PosFun${String(index + 1).padStart(4, '0')} COMPLETE! "${sentence}"`);
  });
});