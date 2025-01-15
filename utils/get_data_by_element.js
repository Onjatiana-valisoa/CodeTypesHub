/**
 * Autor : Fenosoa
 * Created at : 14-01-2025
 * last modified : 15-01-2024
 * 
 * @param {string} selector - The CSS/XPATH selector (if XPATH, add 'xpath:' at the begining like 'xpath://div[@id="some-id"]')
 * @param {string} attribute - If the data is contained within a specific attribut
 * 
 * @returns {Object} The data in JSON format
 */

function getDataByElement({ selector, attribute=null }) {

    let dataToParse = '[]';
    let element;

    if(selector.includes('xpath')) {
        element = document.evaluate(
            selector.split('xpath:').pop(),
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null).singleNodeValue;
    }
    else { element = document.querySelector(selector); }

    if(element) {
        if(attribute) { dataToParse = element.getAttribute(attribute); }
        else { dataToParse = element.textContent; }
    }

    return JSON.parse(dataToParse);
    
}


// Exemple de site : https://www.vacanzeitaliane.com/index.php?id_product=679&id_product_attribute=3604&rewrite=costume-intero-manila&controller=product&id_lang=1#/30-taglia-l/46-colore-lime
let data = getDataByElement({ selector: `xpath://div[@id="product-details"]`, attribute: 'data-product'})

data;