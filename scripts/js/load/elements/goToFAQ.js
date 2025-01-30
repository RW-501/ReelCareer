
// Check if the FAQ container exists before applying styles
    const faqContainer = document.getElementById("goToFAQ_Container");
    if (faqContainer) {
        applyFAQStyles();
    }

    // Function to check if the FAQ button exists
    function checkFAQButton() {
        const faqButton = document.getElementById("goToFAQ_BTN");
        return !!faqButton; // Returns true if exists, false otherwise
    }

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

    // Example usage of checkFAQButton function
    if (checkFAQButton()) {
        console.log("FAQ button exists.");
    } else {
        console.log("FAQ button not found.");
    }

    