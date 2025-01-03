function renderShareArea(pageName) {

    console.log("renderShareArea(pageURL, pageName)");

    let pageURL = `https://reelcareer.co/obituaries/celebrating/${pageName}.html`;
    // URL-encode the pageName to ensure it is correctly formatted for use in URLs
    let ecodePageName = encodeURIComponent(pageName);

    // Construct the share title for Twitter and WhatsApp
    let pageTitle = `Join%20us%20in%20celebrating%20the%20life%20of%20${ecodePageName}!`;

    // Create the HTML for the share buttons
    const shareHTML = `
        <div class="share-section">
            <h2>Share this Celebration</h2>
            <div class="share-buttons">
                <a class="facebook" href="https://www.facebook.com/sharer/sharer.php?u=${pageURL}" target="_blank" title="Share on Facebook">
                    <i class="fa fa-facebook"></i>
                </a>
                <a class="twitter" href="https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageURL}" target="_blank" title="Share on Twitter">
                    <i class="fa fa-twitter"></i>
                </a>
                <a class="linkedin" href="https://www.linkedin.com/shareArticle?mini=true&url=${pageURL}" target="_blank" title="Share on LinkedIn">
                    <i class="fa fa-linkedin"></i>
                </a>
                <a class="whatsapp" href="https://wa.me/?text=${pageTitle}%20${pageURL}" target="_blank" title="Share on WhatsApp">
                    <i class="fa fa-whatsapp"></i>
                </a>
            </div>
        </div>
    `;
    
    // Find the share area on the page and insert the share buttons
    const shareArea = document.getElementById('dynamic-shareArea');
    shareArea.innerHTML = shareHTML;
}
window.renderShareArea = renderShareArea;
