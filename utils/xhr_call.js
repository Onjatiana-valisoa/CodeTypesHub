/**
 * Autor : Fenosoa
 * Created at : 14-01-2025
 * last modified : 14-01-2024
 * 
 * To get data by call API 'XMLHTTPREQUEST'
 * @param {string} url - The url to send request
 * @param {string} method - The method how to send data "GET" or "POST" (default : "GET")
 * @param {boolean} parse - If the response is a json, you swant ton parse it, if the response is a DOM, no need to parse (default : 'true')
 * @param {Object} formData - If the @param:method is 'POST', @param:formData is the data to send in the request body
 * @param {Object} headers - The requests' headers in Object format.
 * 
 * @returns {Object} - The response of the request. It can be an Object or a DOM
 */

function xhr_call({ url, method="GET", parse=true, formData=null, headers=null }){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    
    if(headers) {
        for(let [key, value] of Object.entries(headers)) {
            xhr.setRequestHeader(key, value);
        }
    }
    
    xhr.send(formData);

    return (parse) ? JSON.parse(xhr.responseText) : xhr.responseText;

}


// Example de site : https://kukuxumusu.com/es/hombre/12172-12679-sudadera-capucha-hombre-la-caca-de-papel.html#/174-color-rojo/191-talla-xl
let token = document.querySelector('form[id*="add"][id*="cart"] input[name="token"]').value || '';
let idProd = document.querySelector('form[id*="add"][id*="cart"] input[name="id_product"]').value || '';
let idCustom = document.querySelector('form[id*="add"][id*="cart"] input[name="id_customization"]').value || '';
let colorElement = document.querySelector('form[id*="add"][id*="cart"] ul input[class*="color"][checked="checked"]');
let sizeElements = document.querySelectorAll('form[id*="add"][id*="cart"] ul input[class*="radio"]');

let group = `${encodeURIComponent(colorElement.getAttribute('name'))}=${colorElement.getAttribute('value')}`;
group += `&${encodeURIComponent(sizeElements[0].getAttribute('name'))}=${sizeElements[0].getAttribute('value')}`;

let url = `https://kukuxumusu.com/es/index.php?controller=product&token=${token}&id_product=${idProd}&id_customization=${idCustom}&${group}&qty=1`
let formData = new FormData();
formData.append("quickview", "0");
formData.append("ajax", "1");
formData.append("action", "refresh");
formData.append("quantity_wanted", "1");

let headers = {
    'Accept' : '*/*',
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 OPR/115.0.0.0'
}

let data = xhr_call({ url:url, method:'POST', formData:formData, headers:headers });

console.log(data);