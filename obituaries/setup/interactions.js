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
  <form id="guestbookForm">
    <div>
      <input type="text" id="guestName" placeholder="Your Name" required>
    </div>
    <div>
      <textarea id="guestMessage" rows="4" placeholder="Your Message" required></textarea>
    </div>
    <button type="submit" id="submit-btn" class="changeable-text">Submit</button>
  </form>
  <div class="guestbook-entries" id="guestbookEntries"></div>
</div>

    `;
    
    // Find the share area on the page and insert the share buttons
    const interactionsArea = document.getElementById('dynamic-interaction-area');
    interactionsArea.innerHTML = interactionsHTML;
}
window.renderInteractionsArea = renderInteractionsArea;

renderInteractionsArea();