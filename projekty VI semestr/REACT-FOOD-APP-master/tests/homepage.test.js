const { test, expect } = require('@playwright/test');

test('Homepage Tests', async ({ page }) => {

  await testSearchFunctionality(page);


  await testAddingToFavorites(page);

 
  await testRemovingFromFavorites(page);

  
  await testEdgeCases(page);
});

async function testSearchFunctionality(page) {
  await page.goto('http://localhost:3000'); 


  await page.fill('input[name="search"]', 'Chicken');

 
  await page.click('button[type="submit"]');

  
  await page.waitForSelector('.items .recipe-item');

  
  const items = await page.$$('.items .recipe-item');
  expect(items.length).toBeGreaterThan(0);
}

async function testAddingToFavorites(page) {
  await page.goto('http://localhost:3000'); 


  await page.click('.items .recipe-item button');

 
  await page.waitForSelector('.favorites .favorite-item');


  const favorites = await page.$$('.favorites .favorite-item');
  expect(favorites.length).toBe(1);
}

async function testRemovingFromFavorites(page) {
  await page.goto('http://localhost:3000'); 


  await page.click('.favorites .favorite-item button');

  
  await page.waitForSelector('.favorites .favorite-item', { state: 'hidden' });


  const favorites = await page.$$('.favorites .favorite-item');
  expect(favorites.length).toBe(0);
}

async function testEdgeCases(page) {
  await page.goto('http://localhost:3000'); 

 
  const initialFavorites = await page.$$('.favorites .favorite-item');
  expect(initialFavorites.length).toBe(0);

  await page.click('.items .recipe-item button');
  await page.waitForSelector('.favorites .favorite-item');
  const favoritesAfterAdd = await page.$$('.favorites .favorite-item');
  expect(favoritesAfterAdd.length).toBe(1);

  await page.click('.favorites .favorite-item button');
  await page.waitForSelector('.favorites .favorite-item', { state: 'hidden' });
  const favoritesAfterRemove = await page.$$('.favorites .favorite-item');
  expect(favoritesAfterRemove.length).toBe(0);


  await page.fill('input[name="search"]', '');
  await page.click('button[type="submit"]');
  await page.waitForSelector('.loading');
  const emptySearchMessage = await page.textContent('.loading');
  expect(emptySearchMessage).toContain('No items found');


}
