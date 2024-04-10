const puppeteer = require('puppeteer');
// biblioteca para perguntar para o usuário
const readlineSync = require('readline-sync');


console.log('WebScraping - créditos: https://youtu.be/4W55nFDyIrc');


async function bot() {
  // mostra o bot executando (abrindo o navegador)
  const browser = await puppeteer.launch({ headless: false }); 
  // abre uma aba no navegador
  const page = await browser.newPage();
  // define a moeda de busca para conversão com base no que o usuário digitar
  const baseMoney = readlineSync.question('Informe uma moeda base: ') || 'dolar';
  // define a moeda de busca para qual vai ser convertida com base no que o usuário digitar
  const finalMoney = readlineSync.question('Informe uma moeda desejada:') || 'real';
  
  // url do site que faz a conversão da moeda
  const googleUrl = `https://www.google.com/search?q=${baseMoney}+para+${finalMoney}&oq=${baseMoney}+para+${finalMoney}&aqs=chrome.0.69i59j0l7.1726j0j4&sourceid=chrome&ie=UTF-8`;
  // redireciona para a url criada
  await page.goto(googleUrl);
  // faz uma captura de tela da página
  // await page.screenshot({path: 'picture.png'});

  // evento para acessar o console da página e pegar algum item pelo querySelector
  const result = await page.evaluate(() => {
    // pega o valor do input que mostra o valor da moeda escolhida
    return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
  });
  
  // imprime o resultado no console
  console.log(`O valor de 1 ${baseMoney} em ${finalMoney} é ${result}`)

  // fecha a aba
  await browser.close();
}

// chama a função
bot();
