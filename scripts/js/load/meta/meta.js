
function setCanonicalURL(url) {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
    }
    
    canonicalLink.href = url;
}


const currentURL = `${window.location.origin}${window.location.pathname}`;
setCanonicalURL(currentURL);



function addFavicon(type, attributes) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = type;

    for (const attr in attributes) {
        if (attributes.hasOwnProperty(attr)) {
            link.setAttribute(attr, attributes[attr]);
        }
    }

    document.head.appendChild(link);
}
let favLocation = 'https://reelcareer.co/images/favicons';

// Adding standard favicon
addFavicon('image/x-icon', { href: `${favLocation}/favicon.ico` });

// Adding 32x32 favicon
addFavicon('image/png', { sizes: '32x32', href: `${favLocation}/favicon-32x32.png` });

// Adding 16x16 favicon
addFavicon('image/png', { sizes: '16x16', href: `${favLocation}/favicon-16x16.png` });

// Adding Apple Touch Icon
const appleTouchIcon = document.createElement('link');
appleTouchIcon.rel = 'apple-touch-icon';
appleTouchIcon.sizes = '180x180';
appleTouchIcon.href = `${favLocation}/apple-touch-icon.png`;
document.head.appendChild(appleTouchIcon);

// Adding Android Favicon (192x192)
addFavicon('image/png', { sizes: '192x192', href: `${favLocation}/android-chrome-192x192.png` });

// Adding Chrome Favicon (512x512)
addFavicon('image/png', { sizes: '512x512', href: `${favLocation}/android-chrome-512x512.png` });
