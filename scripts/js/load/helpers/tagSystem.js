
// Function to create and add styles for tag-primary and other elements
function addTagStyles() {
    const style = document.createElement("style");
    style.textContent = `
        .tagsContainer { 
            display: flex;
            flex-wrap: wrap;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 5px;
            min-height: 40px;
        }

        .tagInput {
            border: none;
            outline: none;
            flex-grow: 1;
        }

        .tag {
            background-color: #639ad4 ; 
            color: white;
            border-radius: 3px;
            padding: 5px 10px;
            margin: 3px;
            display: inline-flex;
            align-items: center;
                font-size: 1rem;
        }

        .tag button {
            background: none;
            border: none;
            color: white;
            margin-left: 5px;
            cursor: pointer;
        }

        .clearTagsButton {
            background-color: #dc3545; /* Bootstrap danger color */
            color: white;
            border: none;
            border-radius: 4px;
            padding: 5px 10px;
            cursor: pointer;
            margin-top: 5px;
        }

        .clearTagsButton:hover {
            background-color: #c82333; /* Darker shade on hover */
        }
    `;
    document.head.appendChild(style);
}


function createTagInputSystem({ tagsContainerId, badgeClass = "tag-primary" }) {
    const tagsContainer = document.getElementById(tagsContainerId);
    tagsContainer.classList.add("tagsContainer"); // Ensure the class is added

    
    // Search for the existing input within the container and hide it
    const existingInput = tagsContainer.querySelector("input[type='text']");
    if (existingInput) {
        existingInput.style.display = "none"; // Hide the existing input
    }

    // Create a temporary input to handle tag entries
    const tagInput = document.createElement("input");
    tagInput.type = "text";
    tagInput.className = "form-control tagInput mt-2";
    tagInput.id = `input_${tagsContainerId}`
    tagInput.placeholder = "Add a tag and press Enter";
    tagsContainer.appendChild(tagInput); // Append the new input to the container
    
    // Create tags list container dynamically
    const tagsList = document.createElement("div");
    tagsList.className = `mt-2 tagsList`;
    tagsList.id =  `tagsList_${tagsContainerId}`;
    tagsContainer.appendChild(tagsList); // Append the tags list to the container

    // Create the Clear Tags button dynamically
    const clearTagsButton = document.createElement("button");
    clearTagsButton.className = "btn clearTagsButton mt-2";
    clearTagsButton.textContent = "Clear Tags";
    tagsContainer.appendChild(clearTagsButton); // Append the clear button below the tags list

    // Function to update the existing input with tags
    function updateHiddenInput() {
        const tags = Array.from(tagsList.children).map(tag => tag.textContent.replace(" x", "").trim());
        if (existingInput) {
            existingInput.value = tags.join(","); // Update the existing input with comma-separated tags
        }
    }

    // Function to add a tag
    function addTag(tag) {
        if (!tag) return; // Prevent empty tags

        const tagElement = document.createElement("span");
        tagElement.className = `tag badge ${badgeClass} mr-1`; // Using provided badge class
        tagElement.textContent = tag;

        const removeButton = document.createElement("button");
        removeButton.textContent = " x"; // Close button
        removeButton.className = "ml-1 btn btn-sm tag_btn"; // Styling for remove button
        removeButton.onclick = (e) => {
            tagsList.removeChild(tagElement);
            e.preventDefault(); // Prevent form submission

            updateHiddenInput(); // Update existing input after removing tag
        };

        tagElement.appendChild(removeButton);
        tagsList.appendChild(tagElement);
        updateHiddenInput(); // Update existing input when a new tag is added
    }

    // Set up event listener for the tag input
    tagInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && tagInput.value.trim() !== "") {
            e.preventDefault(); // Prevent form submission
            const tag = tagInput.value.trim();
            addTag(tag); // Add the new tag
            tagInput.value = ""; // Clear the input
        }
    });

    // Set up event listener for focus out
tagInput.addEventListener("focusout", () => {
    const tag = tagInput.value.trim();
    if (tag) {
        // Show a toast notification when focus is lost and there's a value
        showToast('Press Enter to add Tag', 'info');
    }
});
    // Event listener to clear all tags
    clearTagsButton.addEventListener("click", (event) => {
      event.preventDefault();
      
        tagsList.innerHTML = ""; // Clear all tags
        updateHiddenInput(); // Update existing input after clearing tags
    });

    // Return input and clear button for external listeners
    return { tagInput, clearTagsButton, tagsList, addTag };
}




