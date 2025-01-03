function renderInteractionsArea() {

    
    // Create the HTML for the share buttons
    const interactionsHTML = `
                <div id="flowe-area">
            <i class="fas fa-spa"></i><div id="flowerCount">0</div>
                </div>
            <div class="actions">
                <button id="send-gift" ><i class="fa fa-gift"></i> Send Gift</button>
                <button id="send-flowers" ><i class="fas fa-spa"></i> Send Flowers</button>
            </div>
<div  class="guestbook">
            <h2>Guestbook</h2>
            <form id="guestbookForm">
                <div>
                    <input type="text" id="guestName" placeholder="Your Name" required>
                </div>
                <div>
                    <textarea id="guestMessage" rows="4" placeholder="Your Message" required></textarea>
                </div>
                <button type="submit">Submit</button>
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