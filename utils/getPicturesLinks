(function (data_attribute_stringified) {
    /**
     * Extracts high-resolution image links from product images on a webpage.
     * It looks for images inside elements with a class containing 'product__img'
     * and selects the best quality available (2x resolution if present).
     *
     * @returns {string[]} Array of high-resolution image URLs.
     */
    function getBigPictureLinks() {
        let images = document.querySelectorAll(`[class*='product__img'] img`);
        let links = Array.from(images).map((img) => {
            let srcset = img.getAttribute(`srcset`);
            if (srcset) {
                let sources = srcset.split(`,`).map((src) => src.trim().split(` `));
                let bigImage = sources.find((source) => source[1] === `2x`);
                if (bigImage) return bigImage[0];
            }
            return img.getAttribute(`src`);
        });
        return links;
    }

    /**
     * Checks if a given string is already URL-encoded.
     *
     * @param {string} str - The string to check.
     * @returns {boolean} - True if the string is encoded, false otherwise.
     */
    function isEncoded(str) {
        try {
            return decodeURIComponent(str) !== str;
        } catch (e) {
            return false;
        }
    }

    // Retrieve high-resolution image URLs
    let pictureLinks = getBigPictureLinks();

    // Encode the last part of each URL to avoid encoding issues
    let encodedLinks = pictureLinks.map((link) => {
        let urlParts = link.split(`/`);
        let lastPart = urlParts[urlParts.length - 1];

        // Decode if already encoded to prevent double encoding
        let decodedLastPart = isEncoded(lastPart) ? decodeURIComponent(lastPart) : lastPart;

        // Re-encode the last part of the URL
        let reencodedLastPart = encodeURIComponent(decodedLastPart);

        // Replace the last part with the re-encoded value
        urlParts[urlParts.length - 1] = reencodedLastPart;

        return urlParts.join(`/`);
    });

    // Return all URLs
    return encodedLinks.join(`<!LIST!>`);
})(`DATA_ATTRIBUTE_INSTANCE_LIVE_SCRAPPER_SPOT`);
