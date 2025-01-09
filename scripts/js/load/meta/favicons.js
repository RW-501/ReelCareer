function addFavicons() {
    const head = document.head;

    // Standard Favicon
    const faviconStandard = document.createElement('link');
    faviconStandard.rel = 'icon';
    faviconStandard.type = 'image/x-icon';
    faviconStandard.href = 'https://reelcareer.co/images/favicons/favicon.ico';
    head.appendChild(faviconStandard);

    // 32x32 Favicon
    const favicon32 = document.createElement('link');
    favicon32.rel = 'icon';
    favicon32.type = 'image/png';
    favicon32.sizes = '32x32';
    favicon32.href = 'https://reelcareer.co/images/favicons/favicon-32x32.png';
    head.appendChild(favicon32);

    // 16x16 Favicon
    const favicon16 = document.createElement('link');
    favicon16.rel = 'icon';
    favicon16.type = 'image/png';
    favicon16.sizes = '16x16';
    favicon16.href = 'https://reelcareer.co/images/favicons/favicon-16x16.png';
    head.appendChild(favicon16);

    // Apple Touch Icon
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.sizes = '180x180';
    appleTouchIcon.href = 'https://reelcareer.co/images/favicons/apple-touch-icon.png';
    head.appendChild(appleTouchIcon);

    // Android Favicon (192x192)
    const androidFavicon192 = document.createElement('link');
    androidFavicon192.rel = 'icon';
    androidFavicon192.type = 'image/png';
    androidFavicon192.sizes = '192x192';
    androidFavicon192.href = 'https://reelcareer.co/images/favicons/android-chrome-192x192.png';
    head.appendChild(androidFavicon192);

    // Chrome Favicon (512x512)
    const androidFavicon512 = document.createElement('link');
    androidFavicon512.rel = 'icon';
    androidFavicon512.type = 'image/png';
    androidFavicon512.sizes = '512x512';
    androidFavicon512.href = 'https://reelcareer.co/images/favicons/android-chrome-512x512.png';
    head.appendChild(androidFavicon512);
}

// Call the function to add favicons
addFavicons();



