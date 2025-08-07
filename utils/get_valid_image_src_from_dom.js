/**
 * get_valid_image_src_from_dom.js
 *
 * Récupère toutes les URLs des balises <img src="..."> présentes dans le DOM,
 * élimine les doublons, convertit les URLs relatives en absolues,
 * vérifie leur validité via une requête HEAD synchrone (taille ≥ 10 Ko),
 * et retourne un tableau contenant uniquement les images valides.
 */

(function (data_attribute_stringified) {
    // Récupère toutes les URLs d`images visibles dans la page
    function getAllImageUrlsFromDom() {
        const base = window.location.origin;
        const seen = new Set();

        return Array.from(document.querySelectorAll(`img`))
            .map((img) => img.getAttribute(`src`))
            .filter((src) => !!src)
            .map((src) => {
                try {
                    return new URL(src, base).href;
                } catch {
                    return null;
                }
            })
            .filter((url) => url && !seen.has(url) && seen.add(url));
    }

    // Vérifie qu`une image est accessible et que sa taille dépasse le seuil donné
    function isImageUrlValidSync(url, minSizeBytes = 10240) {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open(`HEAD`, url, false);
            xhr.send(null);

            if (xhr.status === 200) {
                const length = parseInt(xhr.getResponseHeader(`Content-Length`)) || 0;
                return length >= minSizeBytes;
            }
        } catch (err) {}
        return false;
    }

    function getValidImagesFromDom(minSizeBytes = 10240) {
        const urls = getAllImageUrlsFromDom();
        return urls.filter((url) => isImageUrlValidSync(url, minSizeBytes));
    }

    return getValidImagesFromDom().join(`<!LIST!>`);
})(`DATA_ATTRIBUTE_INSTANCE_LIVE_SCRAPPER_SPOT`);
