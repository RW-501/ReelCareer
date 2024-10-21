


// Function to generate a unique ID for questions

let questionCounter = 0;
const MAX_QUESTIONS = 10; // Set the limit here

document.getElementById("addQuestionButton").addEventListener("click", function() {
    if (questionCounter < MAX_QUESTIONS) {
        addQuestionField();
    } else {
        alert(`You cannot add more than ${MAX_QUESTIONS} questions.`);
    }
});

function addQuestionField() {
    questionCounter++;

    // Create the Bootstrap card for the question
    const questionDiv = document.createElement('div');
    questionDiv.id = `question-${questionCounter}`;
    questionDiv.className = "card mb-3"; // Bootstrap card with margin-bottom for spacing
    questionDiv.setAttribute('draggable', 'true'); // Enable dragging

    const cardBody = document.createElement('div');
    cardBody.className = "card-body";

    // Card header for question number
    const cardHeader = document.createElement('h5');
    cardHeader.className = "card-title";
    cardHeader.innerHTML = `Question ${questionCounter}`;
    cardBody.appendChild(cardHeader);

    // Add the input field for the question
    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.className = "form-control mb-2";
    questionInput.placeholder = `Enter question ${questionCounter}`;
    questionInput.name = `question-${questionCounter}-text`;

    // Add real-time validation for question text input
    addRealTimeValidation(questionInput);

    cardBody.appendChild(questionInput);

    // Add helpful hints below the input
    const helpfulHint = document.createElement('small');
    helpfulHint.className = "form-text text-muted";
    helpfulHint.innerHTML = 'Tip: Make your question clear and concise to get the best responses.';
    cardBody.appendChild(helpfulHint);

    // Add the buttons for multiple choice or statement
    const multipleChoiceButton = document.createElement('button');
    multipleChoiceButton.type = 'button';
    multipleChoiceButton.className = "btn btn-primary me-2"; // Added margin-end (me) for spacing
    multipleChoiceButton.innerHTML = 'Multiple Choice';
    multipleChoiceButton.onclick = function() {
        addMultipleChoice(questionDiv, questionCounter);
    };
    cardBody.appendChild(multipleChoiceButton);

    const statementButton = document.createElement('button');
    statementButton.type = 'button';
    statementButton.className = "btn btn-secondary me-2";
    statementButton.innerHTML = 'Statement';
    statementButton.onclick = function() {
        addStatement(questionDiv);
    };
    cardBody.appendChild(statementButton);

    // Add remove question button
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = "btn btn-danger";
    removeButton.innerHTML = 'Remove Question';
    removeButton.onclick = function() {
        removeQuestion(questionDiv);
    };
    cardBody.appendChild(removeButton);

    questionDiv.appendChild(cardBody);

    // Append the new question block to the form
    document.getElementById("customQuestionsContainer").appendChild(questionDiv);

    // Refresh drag-and-drop functionality after adding a new question
    refreshDragAndDrop();
}


// Function to show suggestions for common questions
function showQuestionSuggestions(input, questionCounter) {
    const suggestions = [
        'What are your career goals?',
        'What is your experience with [specific skill]?',
        'How do you handle tight deadlines?',
        'What are your strengths and weaknesses?',
        'Why do you want to work with our company?'
    ];

    const suggestionDropdown = document.createElement('datalist');
    suggestionDropdown.id = `suggestions-${questionCounter}`;
    suggestions.forEach(suggestion => {
        const option = document.createElement('option');
        option.value = suggestion;
        suggestionDropdown.appendChild(option);
    });
    input.setAttribute('list', suggestionDropdown.id);
    input.parentNode.appendChild(suggestionDropdown);
}

// Other functions like addMultipleChoice, removeQuestion, etc., stay the same...

// Remove question and reset labels
function removeQuestion(questionDiv) {
    questionDiv.remove();
    resetQuestionLabels();
}

// Reset question numbers after deletion
function resetQuestionLabels() {
    const questionCards = document.querySelectorAll('#customQuestionsContainer .card');
    questionCounter = 0;
    questionCards.forEach((card, index) => {
        questionCounter++;
        card.id = `question-${questionCounter}`;
        card.querySelector('.card-title').innerHTML = `Question ${questionCounter}`;
        card.querySelector('input').placeholder = `Enter question ${questionCounter}`;
        card.querySelector('input').name = `question-${questionCounter}-text`;

        // Update name for multiple choice options
        const multipleChoiceDiv = card.querySelector(`#multiple-choice-${index + 1}`);
        if (multipleChoiceDiv) {
            const options = multipleChoiceDiv.querySelectorAll('input');
            options.forEach((option, i) => {
                option.name = `question-${questionCounter}-option-${i + 1}`;
            });
        }
    });
}


function addMultipleChoice(questionDiv, questionNumber) {
    const multipleChoiceDiv = document.createElement('div');
    multipleChoiceDiv.id = `multiple-choice-${questionNumber}`;
    multipleChoiceDiv.className = "mt-3"; // Added margin-top for spacing

    // First choice input with validation
    const choiceInput = document.createElement('input');
    choiceInput.type = 'text';
    choiceInput.className = "form-control mb-2";
    choiceInput.placeholder = 'Enter multiple choice option';
    choiceInput.name = `question-${questionNumber}-option-1`;
    
    // Real-time validation for options
    choiceInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });

    multipleChoiceDiv.appendChild(choiceInput);

    const addMoreButton = document.createElement('button');
    addMoreButton.type = 'button';
    addMoreButton.className = "btn btn-success mt-2"; // Margin-top for spacing
    addMoreButton.innerHTML = 'Add more options';
    addMoreButton.onclick = function() {
        addMoreMultipleChoice(multipleChoiceDiv, questionNumber);
    };
    multipleChoiceDiv.appendChild(addMoreButton);

    questionDiv.appendChild(multipleChoiceDiv);
}


// Add option validation for empty choices
function addMoreMultipleChoice(multipleChoiceDiv, questionNumber) {
    const options = multipleChoiceDiv.querySelectorAll('input');
    
    // Validate that all existing options have values
    let valid = true;
    options.forEach(option => {
        if (option.value.trim() === '') {
            option.classList.add('is-invalid'); // Bootstrap invalid class
            valid = false;
        } else {
            option.classList.remove('is-invalid');
        }
    });

    if (!valid) {
        alert('Please fill in all current options before adding more.');
        return;
    }

    // Create the next option input if validation passed
    const optionCount = multipleChoiceDiv.childElementCount - 1; // Exclude the 'Add more options' button
    const choiceInput = document.createElement('input');
    choiceInput.type = 'text';
    choiceInput.className = "form-control mb-2";
    choiceInput.placeholder = `Option ${optionCount + 1}`;
    choiceInput.name = `question-${questionNumber}-option-${optionCount + 1}`;

    // Add real-time validation for new option
    addRealTimeValidation(choiceInput);

    multipleChoiceDiv.insertBefore(choiceInput, multipleChoiceDiv.lastElementChild);
}


function addStatement(questionDiv) {
    const statementTextArea = document.createElement('textarea');
    statementTextArea.placeholder = 'Enter statement response';
    statementTextArea.className = "form-control mt-3"; // Bootstrap class and margin-top
    statementTextArea.style.resize = "none"; // Disable resizing
    questionDiv.appendChild(statementTextArea);
}

// Function to collect custom questions and their options
function collectCustomQuestions() {
    const customQuestions = [];
    for (let i = 1; i <= questionCounter; i++) {
        const questionText = document.querySelector(`input[name="question-${i}-text"]`).value;
        const questionType = document.getElementById(`multiple-choice-${i}`) ? "multiple-choice" : "statement";

        if (questionType === "multiple-choice") {
            const options = [];
            const optionInputs = document.querySelectorAll(`input[name^="question-${i}-option-"]`);
            
            // Ensure all multiple choice options are filled in
            optionInputs.forEach(input => {
                if (input.value.trim() !== '') {
                    options.push(input.value);
                }
            });

            if (options.length === 0) {
                alert(`Please provide at least one option for question ${i}`);
                continue;
            }

            customQuestions.push({ question: questionText, type: questionType, options });
        } else {
            customQuestions.push({ question: questionText, type: questionType });
        }
    }
    return customQuestions;
}

// Initialize Sortable.js for drag-and-drop
function refreshDragAndDrop() {
    new Sortable(document.getElementById('customQuestionsContainer'), {
        animation: 150,
        onEnd: resetQuestionLabels, // Re-label questions after reordering
    });
}




function addRealTimeValidation(inputElement) {
    inputElement.addEventListener('input', function() {
        const errorMessage = this.nextElementSibling;
        if (this.value.trim() === '') {
            this.classList.add('is-invalid');
            errorMessage.innerHTML = 'This field cannot be empty.';
        } else {
            this.classList.remove('is-invalid');
            errorMessage.innerHTML = '';
        }
    });
}

// In the addQuestionField function, after adding input
const questionInput = document.createElement('input');
questionInput.type = 'text';
questionInput.className = "form-control mb-2";
questionInput.placeholder = `Enter question ${questionCounter}`;
questionInput.name = `question-${questionCounter}-text`;

addRealTimeValidation(questionInput);

// Add an error message element after the input field
const errorMessage = document.createElement('div');
errorMessage.className = 'invalid-feedback'; // Bootstrap's invalid feedback class
cardBody.appendChild(errorMessage);








// Initialize the first time
refreshDragAndDrop();













document.addEventListener("DOMContentLoaded", function() {
    const tagsContainer = document.getElementById("tagsContainer");
    const tagInput = document.getElementById("tagInput");
    const tagsList = document.getElementById("tagsList");
    const clearTagsButton = document.getElementById("clearTagsButton");

    // Function to add a tag
    function addTag(tag) {
        const tagElement = document.createElement("span");
        tagElement.className = "tag";
        tagElement.textContent = tag;

        const removeButton = document.createElement("button");
        removeButton.textContent = "x"; // Close button
        removeButton.onclick = () => {
            tagsList.removeChild(tagElement);
        };

        tagElement.appendChild(removeButton);
        tagsList.appendChild(tagElement);
    }

    // Event listener for tag input
    tagInput.addEventListener("keypress", (e) => {
        console.log("Key pressed:", e.key); // Debugging log
        if (e.key === "Enter" ||e.key ==="insertText" && tagInput.value.trim() !== "") {
            e.preventDefault();
            const tag = tagInput.value.trim();
            console.log("Adding tag:", tag); // Debugging log
            addTag(tag);
            tagInput.value = ""; // Clear the input
        }
    });
    

    // Function to clear all tags
    clearTagsButton.addEventListener("click", () => {
        tagsList.innerHTML = ""; // Clear all tags
    });
});



// Function to save form values to local storage
function saveFormValues() {
    const formValues = {
        company: document.getElementById('company').value,
        jobTitle: document.getElementById('jobTitle').value,
        appCompanyID: document.getElementById('appCompanyID').innerText,
        jobLocation: document.getElementById('jobLocation').value,
        jobCity: document.getElementById('jobCity').value,
        jobState: document.getElementById('jobState').value,
        jobZipCode: document.getElementById('jobZipCode').value,
        jobType: document.getElementById('jobType').value,
        jobSalary: document.getElementById('jobSalary').value,
        salaryPayTime: document.getElementById('salaryPayTime').value,
        jobDescription: document.getElementById('jobDescription').value,
        jobRequirements: document.getElementById('jobRequirements').value,
        industry: document.getElementById('industry').value,
        jobFunction: document.getElementById('jobFunction').value,
        contractToHire: document.getElementById('contractToHire').value,
        immediateHire: document.getElementById('immediateHire').value,
        requestLetter: document.getElementById('requestLetter').checked,
        coverLetter: document.getElementById('coverLetter').checked,
        resumeRequired : document.getElementById('requiredResume'),checked,

        benefits: document.getElementById('benefits').value,
        education: Array.from(document.getElementById('education').selectedOptions).map(option => option.value),
        experience: Array.from(document.getElementById('experience').selectedOptions).map(option => option.value),
        applicationLink: document.getElementById('applicationLink').value,
        jobTags: document.getElementById('tagInput').value,
        customQuestions: Array.from(document.querySelectorAll('#customQuestionsContainer input')).map(input => input.value),
        tags: Array.from(document.querySelectorAll('#tagsList .tag')).map(tag => tag.textContent)
    };

    localStorage.setItem('jobFormValues', JSON.stringify(formValues));
}

// Function to retrieve and set form values from local storage
function loadFormValues() {
    const formValues = JSON.parse(localStorage.getItem('jobFormValues'));
    if (formValues) {
        document.getElementById('company').value = formValues.company || '';
        document.getElementById('jobTitle').value = formValues.jobTitle || '';
        document.getElementById('appCompanyID').innerText = formValues.appCompanyID || '';
        document.getElementById('jobLocation').value = formValues.jobLocation || '';
        document.getElementById('jobCity').value = formValues.jobCity || '';
        document.getElementById('jobState').value = formValues.jobState || '';
        document.getElementById('jobZipCode').value = formValues.jobZipCode || '';
        document.getElementById('jobType').value = formValues.jobType || '';
        document.getElementById('jobSalary').value = formValues.jobSalary || '';
        document.getElementById('salaryPayTime').value = formValues.salaryPayTime || '';
        document.getElementById('jobDescription').value = formValues.jobDescription || '';
        document.getElementById('jobRequirements').value = formValues.jobRequirements || '';
        document.getElementById('industry').value = formValues.industry || '';
        document.getElementById('jobFunction').value = formValues.jobFunction || '';
        document.getElementById('contractToHire').value = formValues.contractToHire || '';
        document.getElementById('immediateHire').value = formValues.immediateHire || '';
        document.getElementById('benefits').value = formValues.benefits || '';
        document.getElementById('requestLetter').checked = formValues.requestLetter || '';
        document.getElementById('coverLetter').checked = formValues.coverLetter || '';
        document.getElementById('requiredResume').checked =  formValues.requiredResume || '';


        // Set selected options for multiple selects
        if (formValues.education) {
            formValues.education.forEach(value => {
                document.querySelector(`#education option[value="${value}"]`).selected = true;
            });
        }
        if (formValues.experience) {
            formValues.experience.forEach(value => {
                document.querySelector(`#experience option[value="${value}"]`).selected = true;
            });
        }

        document.getElementById('applicationLink').value = formValues.applicationLink || '';
        document.getElementById('tagInput').value = formValues.jobTags || '';

        // Load custom questions if any
        if (formValues.customQuestions) {
            formValues.customQuestions.forEach(question => {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = question;
                input.className = 'form-control';
                document.getElementById('customQuestionsContainer').appendChild(input);
            });
        }

        // Load tags
        if (formValues.tags) {
            const tagsContainer = document.getElementById('tagsList');
            formValues.tags.forEach(tag => {
                const tagElement = document.createElement('div');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });
        }
    }
}

// Function to clear local storage
function clearLocalStorage() {
    localStorage.removeItem('jobFormValues');
}

// Check if any values are set and remove them if necessary
function checkAndClearValues() {
    const formValues = JSON.parse(localStorage.getItem('jobFormValues'));
    if (!formValues) {
        clearLocalStorage();
    }
}

// Attach event listeners
document.getElementById('jobForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission for demo purposes
    saveFormValues();
    //    checkAndClearValues();

});

document.addEventListener('DOMContentLoaded', () => {
    loadFormValues();
});

// Get the modal element (assuming your modal has the id 'jobModal')
const jobModal = document.getElementById('jobModal');

// Add an event listener for when the modal is fully hidden
jobModal.addEventListener('hidden.bs.modal', function (event) {
    // Perform actions when the modal is closed, like clearing the form or saving unsaved data
    console.log('Modal has been closed');
    
    // Call your localStorage clearing function here if needed
    saveFormValues();
});



function handleJobTypeChange() {
    const jobType = document.getElementById('jobType').value;
    const locationInput = document.getElementById('jobLocation');
    const cityInput = document.getElementById('jobCity');
    const stateInput = document.getElementById('jobState');
    const zipCodeInput = document.getElementById('jobZipCode');

    if (jobType === 'remote') {
        // Hide city, state, and zip code fields
        cityInput.closest('.form-group').style.display = 'none';
        stateInput.closest('.form-group').style.display = 'none';
        zipCodeInput.closest('.form-group').style.display = 'none';
        
        // Set location field to "Remote" if it's blank
        if (!locationInput.value.trim()) {
            locationInput.value = 'Remote';
        }
    } else {
        // Show city, state, and zip code fields
        cityInput.closest('.form-group').style.display = 'block';
        stateInput.closest('.form-group').style.display = 'block';
        zipCodeInput.closest('.form-group').style.display = 'block';

        // If the location was previously set to "Remote" and job type is changed, clear it
        if (locationInput.value === 'Remote') {
            locationInput.value = '';
        }
    }
}

// Add event listener to the job type dropdown
document.getElementById('jobType').addEventListener('change', handleJobTypeChange);


// Function to toggle the visibility of the input field
// Event listener for adding application link
document.getElementById('addExternalLinkButton').addEventListener('click', function() {
    const applicationLinkInput = document.getElementById('applicationLink');
    
    // Toggle the display of the input field
    if (applicationLinkInput.style.display === 'none') {
        applicationLinkInput.style.display = 'block'; // Show input field
        this.style.display = 'none'; // Hide the button
        document.getElementById('removeExternalLinkButton').style.display = 'inline-block'; // Show the remove button
    }
});

// Event listener for removing application link
document.getElementById('removeExternalLinkButton').addEventListener('click', function() {
    const applicationLinkInput = document.getElementById('applicationLink');
    document.getElementById('applicationLinkInput').value = '';
    // Hide the input field
    applicationLinkInput.style.display = 'none'; // Hide input field
    this.style.display = 'none'; // Hide the remove button
    document.getElementById('addExternalLinkButton').style.display = 'inline-block'; // Show the add button
});






// Function to update job preview
function updateJobPreview() {

    const company = document.getElementById('company').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const jobLocation = document.getElementById('jobLocation').value;
    const jobDescription = document.getElementById('jobDescription').value;
    // Update your job preview here
    document.getElementById('jobPreview').innerHTML = `
        <h5>${jobTitle}</h5>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Location:</strong> ${jobLocation}</p>
        <p>${jobDescription}</p>
    `;
}

// Function to toggle the job preview section
document.getElementById('previewBTN').addEventListener('click', function() {
    const jobPreview = document.getElementById('jobPreview');
    
    // Toggle the display style
    if (jobPreview.style.display === 'none' || jobPreview.style.display === '') {
        jobPreview.style.display = 'block'; // Show the preview
    } else {
        jobPreview.style.display = 'none';  // Hide the preview
    }
});



let timeoutId;

function debounce(func, delay) {
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Use debounce for updating job preview
const debouncedUpdateJobPreview = debounce(updateJobPreview, 200);

// Attach debounced function to input and scroll events
document.getElementById('jobForm').addEventListener('input', debouncedUpdateJobPreview);
window.addEventListener('scroll', debouncedUpdateJobPreview);


// Function to move focus to the next input
function moveToNextInput(e) {
    const form = e.target.form;
    const inputs = Array.from(form.querySelectorAll('input, select, textarea'));

    // If the Enter key was pressed and the target isn't the tags input
    if (e.key === 'Enter' && e.target.id !== 'tagInput') {
        e.preventDefault();
        
        const index = inputs.indexOf(e.target); // Get the index of the current input
        const nextInput = inputs[index + 1]; // Get the next input

        if (nextInput) {
            nextInput.focus(); // Move focus to the next input
        }
    }
}

// Add the event listener to all input elements except the tags input
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#jobForm');
    
    // Add keydown event listener for Enter key to all inputs, selects, and textareas
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('keydown', moveToNextInput);
    });
    
    // Skip adding event listener to the tags input field
    const tagInput = document.getElementById('tagInput');
    if (tagInput) {
        tagInput.removeEventListener('keydown', moveToNextInput);
    }
});



// Event listener for resetting the form
document.getElementById('resetFormButton').addEventListener('click', function() {
    const form = document.getElementById('jobForm');

    // Reset all form fields (input, select, textarea)
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false; // Uncheck checkboxes and radio buttons
        } else {
            input.value = ''; // Clear the value of text inputs and textareas
        }
    });

    // Reset visibility for specific custom UI elements
    document.getElementById('tagsList').innerHTML = ''; // Clear tags list
    document.getElementById('applicationLink').style.display = 'none'; // Hide the application link input
    document.getElementById('addExternalLinkButton').style.display = 'inline-block'; // Show add button
    document.getElementById('removeExternalLinkButton').style.display = 'none'; // Hide remove button
});
