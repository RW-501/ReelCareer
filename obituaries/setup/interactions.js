function renderInteractionsArea() {

    
    // Create the HTML for the share buttons
    const interactionsHTML = `
    <div id="flowerCount-area" class="changeable-area">
                <div id="flower-area">
            <i class="fas fa-spa"></i><div id="flowerCount">0</div>
                </div>
            <div class="actions">
                <button id="send-gift" ><i class="fa fa-gift"></i> Send Gift</button>
                <button id="send-flowers" ><i class="fas fa-spa"></i> Send Flowers</button>
            </div>
</div>

<div class="guestbook form changeable-area">
  <h2 class="changeable-text">Guestbook</h2>
<div id="guestbookForm">
  <div>
    <input type="text" id="guestName" placeholder="Your Name" required>
  </div>
      <input type="checkbox" id="anonymousCheckbox">
    <label for="anonymousCheckbox">Submit as Anonymous</label>
  </div>

  <div>
    <textarea id="guestMessage" rows="4" placeholder="Share a memory of [$Name$]..." required></textarea>
  </div>
  <div>

  <button id="submit-btn" class="changeable-text">Submit</button>
</div>


  <div class="guestbook-entries" id="guestbookEntries"></div>
</div>

    `;
    
    // Find the share area on the page and insert the share buttons
    const interactionsArea = document.getElementById('dynamic-interaction-area');
    interactionsArea.innerHTML = interactionsHTML;
}
window.renderInteractionsArea = renderInteractionsArea;

renderInteractionsArea();




function renderGiftBoxArea() {

    
  // Create the HTML for the share buttons
  const giftBoxAreaHTML = `
  <!-- Pop-up Container -->
<div id="giftPopup" class="giftPopup">
  <div class="giftPopup-content">
    <span class="close-button" onclick="closeGiftPopup()">&times;</span>
    <h2>Choose a Gift for [$NameFull$] </h2>
    
    <!-- Gift Options -->
    <div class="gift-options">
      <div class="gift-item">
        <img src="https://example.com/flowers.jpg" alt="Flower Bouquet">
        <h3>Flower Bouquet</h3>
        <p>A beautiful bouquet to honor the memory.</p>
      </div>
      <div class="gift-item">
        <img src="https://example.com/candle.jpg" alt="Memorial Candle">
        <h3>Memorial Candle</h3>
        <p>Light a candle to keep the memory alive.</p>
      </div>
      <div class="gift-item">
        <img src="https://example.com/charity.jpg" alt="Charity Donation">
        <h3>Charity Donation</h3>
        <p>Donate in the name of the dearly departed.</p>
      </div>
    </div>
    
    <!-- Fee Information -->
    <div class="fees-info">
      <p>Service Fee: 10% on all purchases.</p>
      <p>Transaction Fee: $1.50 per transaction.</p>
    </div>
    
    <!-- Close Button -->
    <button onclick="closeGiftPopup()">Close</button>
  </div>
</div>

  `;
  
  // Find the share area on the page and insert the share buttons
  const giftBoxArea = document.getElementById('dynamic-interaction-area');
  giftBoxArea.innerHTML = giftBoxAreaHTML;
}
window.renderGiftBoxArea = renderGiftBoxArea;

renderGiftBoxArea();