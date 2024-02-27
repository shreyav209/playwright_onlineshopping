import {expect, test} from '@playwright/test'

test('Online Shopping Test', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder('email@example.com').fill('shreya.vethekar09@gmail.com');
    await page.getByPlaceholder('enter your passsword').fill('ssv20');
    await page.getByRole('button',{name : 'login'}).click();

    //Dataset
    const product_name ='ADIDAS ORIGINAL'; 
    const country = 'Ind';

    //Select the item 
    const products = await page.locator('//div[@class="card"]')
    const products_bodycard =await page.locator("//div[@class='card-body']")
    //console.log(await product_title.textContent())
    const count = await products.count(); //get count of product
    //console.log(count)
    for(let i=0; i < count ; ++i) 
    {
        const product_title = await products.nth(i).locator("//div[@class='card-body']/h5/b")
        //console.log(await product_title.textContent())
        const prod_name = await product_title.textContent();
        if(prod_name == product_name)
        {
            await await products.nth(i).locator("//button[text()=' Add To Cart']").click();
            break;
        }
    await page.waitForTimeout(2000);
    }
    // toast-container
    // role="alert"
    const message = await page.getByRole('alert')
    await expect(message).toBeVisible(); // Product Added To Cart 

    //click on cart
    await page.locator("//button[@routerlink='/dashboard/cart']").click();
    await page.locator("//button[text()='Buy Now']").click();
    //await page.locator("//button[text()='Checkout']").click();

    //checkout
    await page.locator("[placeholder*='Country']").type("ind");
 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
  await page.waitForTimeout(3000)
   //expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   //console.log(orderId);
    

}) 