
// Check if the FAQ container exists before applying styles
    const faqContainer = document.getElementById("goToFAQ_Container");
    if (faqContainer) {
        applyFAQStyles();
    }


function checkGoToFAQButton() {
    const goToFAQBtn = document.getElementById("goToFAQ_BTN");

    if (goToFAQBtn) {
        console.log("goToFAQ_BTN exists.");
        // Add any additional actions here, such as an event listener
        goToFAQBtn.addEventListener("click", () => {
            window.location.href = "/faq"; // Update the URL as needed
        });
    } else {
        console.warn("goToFAQ_BTN does not exist.");
    }
}

// Run the function after the DOM has loaded
checkGoToFAQButton();

    // Apply styles dynamically
    function applyFAQStyles() {
        const style = document.createElement("style");
        style.innerHTML = `
            #goToFAQ_Container { 
                display: flex;
                justify-content: center;
                align-items: center;
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            .goToFAQ_Content {
                max-width: 600px;
            }

            .goToFAQ_Text {
                font-size: 1.1rem;
                color: #333;
                margin-bottom: 15px;
            }

            .goToFAQ_Button {
                background: #007bff;
                color: white;
                border: none;
                padding: 10px 20px;
                font-size: 1rem;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease-in-out;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .goToFAQ_Button:hover {
                background: #0056b3;
            }
        `;
        document.head.appendChild(style);
    }

