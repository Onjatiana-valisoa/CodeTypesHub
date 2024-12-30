function getDataFromXhr(){
    let xhr = new XMLHttpRequest();
        let getLoc = location.href.split('?')[0] + '.js';
        xhr.open("GET", getLoc, false);
        xhr.send();
        if (xhr.status === 200) {
            let resp = JSON.parse(xhr.responseText);
            return resp
        } else {
            []
        }
         
    }
    let data = getDataFromXhr(); 
    function extractPart(str) {
        let firstDashIndex = str.indexOf('_');
        let secondDashIndex = str.indexOf('_', firstDashIndex + 1);
        if (secondDashIndex !== -1) {
            return str.slice(0, secondDashIndex);
        }
        return str.slice(0, firstDashIndex);
    }
    let getAllInjection = document.querySelectorAll('div[id="FETCHDATAHERE"]');
    if (getAllInjection.length !== 0) {
        getAllInjection.forEach(el => el.remove())
    }
    
    let arrImg = [];
    let arrSize = [];
    let arrDispo = [];
    let arrEan= [];
    let net = 0;
    let brut = 0;
    let color = "";
    let sku = extractPart(data.variants[0].sku)
    net = data.price/100;
    brut = data.compare_at_price/100;
    color = data.variants[0].option1;
    
    data.images.forEach(img=>{
        arrImg.push("https:"+img)
    })
    
    data.variants.forEach(size=>{
        arrSize.push(size.option2)
        arrEan.push(size.barcode)
        arrDispo.push(size.available ? "true" : "false")
    })
    
    let getCurrency = document.querySelector('meta[property*="currency"]');
    let myDiv = document.createElement('div');
    myDiv.id = "FETCHDATAHERE";
    let myUl = document.createElement('ul');
    let brutEl = document.createElement('li');
    let netEL = document.createElement('li');
    let currencyEl = document.createElement('li');
    let colorEl = document.createElement('li');
    let skuEl = document.createElement('li');
    let myUlSize = document.createElement('ul');
    let myUlImage = document.createElement('ul');
    
    brutEl.classList.add('brut');
    netEL.classList.add('net');
    currencyEl.classList.add('currency');
    colorEl.classList.add('color');
    skuEl.classList.add('sku');
    myUlSize.classList.add('sizes');
    myUlImage.classList.add('images');
    
    brutEl.innerText= brut;
    netEL.innerText = net
    currencyEl.innerText = getCurrency.getAttribute('content')
    colorEl.innerText = color
    skuEl.innerText = sku
    for (let j = 0; j < arrSize.length; j++) {
        let tmpSize = document.createElement('li');
        tmpSize.classList.add('size');
        tmpSize.id = j;
        tmpSize.setAttribute('dispo', arrDispo[j]);
        tmpSize.setAttribute('ean', arrEan[j]);
        tmpSize.innerText = arrSize[j];
        myUlSize.appendChild(tmpSize);
    }
    for (let j = 0; j < arrImg.length; j++) {
        let tmpImg = document.createElement('a');
        tmpImg.classList.add('img');
        tmpImg.id = j;
        tmpImg.setAttribute('href', arrImg[j]);
        myUlImage.appendChild(tmpImg);
    }
    
    myUl.appendChild(brutEl)
    myUl.appendChild(netEL)
    myUl.appendChild(currencyEl)
    myUl.appendChild(colorEl)
    myUl.appendChild(skuEl)
    myUl.appendChild(myUlSize)
    myUl.appendChild(myUlImage)
    
    
    myDiv.appendChild(myUl);
    document.body.appendChild(myDiv);
    
    return '>>> DATA INJECTED <<<<';