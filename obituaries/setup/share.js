function renderShareArea(pageName) {
    console.log("renderShareArea for:", pageName);

    const pageURL = `https://reelcareer.co/obituaries/celebrating/${encodeURIComponent(pageName)}.html`;
    const pageTitle = `Join us in celebrating the life of ${pageName}!`;
    const encodedPageTitle = encodeURIComponent(pageTitle); // Use for URL query strings

    const shareHTML = `
        <div class="share-section">
            <h2>Share this Celebration</h2>
            <div class="share-buttons">
                <a class="facebook" href="https://www.facebook.com/sharer/sharer.php?u=${pageURL}" target="_blank" title="Share on Facebook">
                    <i class="fab fa-facebook"></i>
                </a>
                <a class="twitter" href="https://twitter.com/intent/tweet?text=${encodedPageTitle}&url=${pageURL}" target="_blank" title="Share on Twitter">
                    <i class="fab fa-twitter"></i>
                </a>
                <a class="linkedin" href="https://www.linkedin.com/shareArticle?mini=true&url=${pageURL}" target="_blank" title="Share on LinkedIn">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a class="whatsapp" href="https://wa.me/?text=${encodedPageTitle}%20${pageURL}" target="_blank" title="Share on WhatsApp">
                    <i class="fab fa-whatsapp"></i>
                </a>
                <button id="deviceShareButton" class="device-share" title="Share using your device">
                    <i class="fas fa-share-alt"></i> 
                </button>
            </div>
        </div>
    `;

    const shareArea = document.getElementById('dynamic-shareArea');
    shareArea.innerHTML = shareHTML;
    const mainPhoto = document.getElementById('mainPhoto');
    const deviceShareButton = document.getElementById('deviceShareButton');
    
    if (navigator.share) {
      deviceShareButton.addEventListener('click', async () => {
        try {
          // Fetch the image as a Blob and create a File object
          const imageUrl = mainPhoto.src;
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
    
          // Use the File object in the share method
          await navigator.share({
            title: pageTitle,
            text: `Celebrate the life of ${pageName}!`,
            url: pageURL,
            files: [file], // Share the image file
          });
    
          console.log("Shared successfully!");
        } catch (error) {
          console.error('Error sharing:', error);
        }
      });
    } else {
      deviceShareButton.style.display = 'none'; // Hide the button if the Web Share API is not supported
    }
    
}

window.renderShareArea = renderShareArea;
