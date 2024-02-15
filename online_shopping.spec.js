import {expect, test} from '@playwright/test'

test('Online Shopping Test', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder('email@example.com').fill('shreya.vethekar09@gmail.com');
    await page.getByPlaceholder('enter your passsword').fill('ssv20');
    await page.getByRole('button',{name : 'login'}).click();

    //Dataset
    const product_name ='ADIDAS ORIGINAL'; 
    const country = 'India';

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
    await page.getByPlaceholder('Select Country').fill(country);
    // await page.locator("//section//button[2]").click();
    await page.waitForTimeout(2000);
    const dropdown = page.locator(".ta-results");
    await page.waitForTimeout(2000);
    const optionsCount = await dropdown.locator("button").count();
    console.log(optionsCount)
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        console.log(text)
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator("//a[text()='Place Order']").click();
    await page.locator("//button[text()='Click To Download Order Details in Excel']").click();
    await page.waitForTimeout(2000);
    

}) 