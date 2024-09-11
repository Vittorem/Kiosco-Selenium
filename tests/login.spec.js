const { Builder, Browser, By, Key} = require('selenium-webdriver')

describe('First test with Selenium and mocha', () => {
    it('login with standard credentials', async () => {
        // manejador del browser
        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        // navigate to the app
        await driver.get('https://www.saucedemo.com/')

        // selectores
        await driver.findElement(By.id('user-name')).sendKeys('standard_user')
        await driver.findElement(By.css('#password')).sendKeys('secret_sauce')
        await driver.findElement(By.name('login-button')).click()
        // await driver.sleep(5000)
        await driver.quit()
    });
});

describe('Agregar un producto tech al carrito de ML', () => {
    it('deberia añadir el producto correctamente', async () => {
    //el manejador del borwser siempre va
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    // el manejador de assertion en este caso con mocha tambien se incluye
    const assert = require('assert');

    // visitamos la pagina
    await driver.get('https://www.mercadolibre.com.mx/')
    // navegamos al smartphone
    await driver.findElement(By.name('as_word')).sendKeys('pura 70 pro', Key.ENTER)
    //lo seleccionamos
    await driver.findElement(By.xpath("//h2[@class='ui-search-item__title' and contains(text(), 'Celular Huawei Pura70 12 Gb + 256 Gb Blanco + Freebuds Pro 3')]")).click();
        // lo validamos
        const title = await driver.findElement(By.css('.ui-pdp-title')); // definimos el titulo
        const titleText = await title.getText(); // mandamos llamar al texto
        assert.strictEqual(titleText, 'Celular Huawei Pura70 12 Gb + 256 Gb Blanco + Freebuds Pro 3');// hacemos la asercion

        //añadimos al carrito
        const button = await driver.findElement(By.className("andes-button andes-spinner__icon-base ui-pdp-action--secondary andes-button--quiet"));
        await driver.executeScript("arguments[0].click();", button);
        
        // como es una simulacion en ML confirmamos el click mediante la aparicion del modal
        const modal = await driver.findElement(By.xpath("//h1[@class='center-card__title' and contains(text(), '¡Hola! Para agregar al carrito, ingresa a tu cuenta')]"))
        const modalText = await modal.getText();
        assert.strictEqual(modalText, '¡Hola! Para agregar al carrito, ingresa a tu cuenta')

    // al final siempre cerramos la instancia abierta
        await driver.quit()
    });
});