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
  <div class="giftBox" id="giftBoxArea"></div>

    `;
    
    // Find the share area on the page and insert the share buttons
    const interactionsArea = document.getElementById('dynamic-interaction-area');
    interactionsArea.innerHTML = interactionsHTML;

}
window.renderInteractionsArea = renderInteractionsArea;




// Function to render the Gift Box
function renderGiftBoxArea(nameFull) {
  const giftBoxAreaHTML = `
    <!-- Pop-up Container -->
    <div id="giftPopup" class="giftPopup">
      <div class="giftPopup-content">
        <span class="close-button" onclick="closeGiftPopup()">&times;</span>
        <h2>Choose a Gift for ${nameFull}</h2>
        
        <!-- Gift Options -->
        <div class="gift-options">
          <div id="gift-Candle-small" class="gift-item" onclick="selectGift('small-candle', 5)">
            <img src="https://reelcareer.co/obituaries/images/gifts/CandleSmall.PNG" alt="Small Candle">
            <h3>Small Candle $5.00</h3>
            <p>Light a candle to keep the memory alive.</p>
          </div>
          <div id="gift-candle-big" class="gift-item" onclick="selectGift('big-candle', 25)">
            <img src="https://reelcareer.co/obituaries/images/gifts/CandleBig.PNG" alt="Big Candle">
            <h3>Big Candle $25.00</h3>
            <p>Light another candle to keep memories aglow.</p>
          </div>
          <div id="gift-charity" class="gift-item" onclick="selectGift('charity', 20)">
            <img src="https://reelcareer.co/obituaries/images/gifts/Charity.PNG" alt="Charity Donation">
            <h3>Charity Donation</h3>
            <p>Extend generosity with another contribution.</p>
          </div>
        </div>

<!-- Custom Amount Option -->
<div class="custom-amount">
  <label for="customAmount">Enter a custom gift amount:</label>
  <input type="text" id="customAmount" name="customAmount" placeholder="Enter amount in dollars">
</div>


        <!-- Fee Information -->
        <div class="fees-info">
          <p>Service Fee: 10% on all purchases.</p>
          <p>Transaction Fee: $1.50 per transaction.</p>
        </div>

        <!-- PayPal Button -->
        <div id="paypal-button-container"></div>
        
        <!-- Close Button -->
        <button onclick="closeGiftPopup()">Close</button>
      </div>
    </div>
  `;

  const giftBoxArea = document.getElementById('giftBoxArea');
  giftBoxArea.innerHTML = giftBoxAreaHTML;
}



window.renderGiftBoxArea = renderGiftBoxArea;

renderInteractionsArea();

