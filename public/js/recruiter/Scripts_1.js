


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

    addRealTimeValidation(questionInput);
    cardBody.appendChild(questionInput);

    // Add helpful hints below the input
   
    // Array of helpful hints
    const helpfulHints = [
        'Tip: Make your question clear and concise to get the best responses.',
        'Tip: Use open-ended questions for detailed insights.',
        'Tip: Avoid leading questions to get unbiased responses.',
        'Tip: Frame questions that encourage elaboration.',
        'Tip: Use simple language for better understanding.',
        'Tip: Be specific to avoid ambiguity in responses.',
        'Tip: Think about what information you really need.',
        'Tip: Use neutral language to avoid influencing answers.',
        'Tip: Consider the respondent’s perspective when crafting your question.',
        'Tip: Try to keep questions under 20 words for clarity.',
        'Tip: Start with a warm-up question to ease respondents into the topic.',
        'Tip: Group similar questions together to maintain a logical flow.',
        'Tip: Avoid jargon or technical terms that may confuse the respondent.',
        'Tip: Use examples to clarify what you’re asking when necessary.',
        'Tip: Ensure your questions align with your objectives for the survey.',
        'Tip: Test your questions with a small group before wider distribution.',
        'Tip: Use rating scales to quantify responses for easier analysis.',
        'Tip: Limit the number of questions to keep respondents engaged.',
        'Tip: Be mindful of cultural differences that may affect responses.',
        'Tip: Avoid double-barreled questions that ask about two things at once.',
        'Tip: Consider the order of questions to prevent biasing responses.',
        'Tip: Provide context for complex questions to aid understanding.',
        'Tip: Make sure your questions are relevant to your audience.',
        'Tip: Use the same terminology throughout to avoid confusion.',
        'Tip: Avoid assumptions in your questions to keep them neutral.',
        'Tip: Consider using visual aids if the question is complex.',
        'Tip: Keep follow-up questions related to the main question for coherence.',
        'Tip: Allow for optional responses to avoid forcing an answer.',
        'Tip: Use timeframes in questions to clarify the context (e.g., "In the last month...").',
        'Tip: Encourage feedback on your questions to improve them continuously.',
        'Tip: Use humor or a friendly tone where appropriate to create rapport.',
        'Tip: Acknowledge the limits of your questions in terms of coverage.'
    ];
    

    // Select a random hint
    const randomHint = helpfulHints[Math.floor(Math.random() * helpfulHints.length)];
    
    // Add helpful hint below the input
    const helpfulHint = document.createElement('small');
    helpfulHint.className = "form-text text-muted";
    helpfulHint.innerHTML = randomHint;
    cardBody.appendChild(helpfulHint);


    // Add Multiple Choice Button
    const multipleChoiceButton = document.createElement('button');
    multipleChoiceButton.type = 'button';
    multipleChoiceButton.className = "btn btn-primary me-2 col-md-3 mx-2";
    multipleChoiceButton.innerHTML = 'Multiple Choice';
    multipleChoiceButton.onclick = function () {
        addMultipleChoice(questionDiv, questionCounter);
    };
    cardBody.appendChild(multipleChoiceButton);

    // Add Statement Button
    const statementButton = document.createElement('button');
    statementButton.type = 'button';
    statementButton.className = "btn btn-secondary me-2 col-md-3 mx-2";
    statementButton.innerHTML = 'Statement';
    statementButton.onclick = function () {
        addStatement(questionDiv);
    };
    cardBody.appendChild(statementButton);

    // Add Remove Question Button
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = "btn btn-danger me-2 col-md-3 mx-2";
    removeButton.innerHTML = 'Remove Question';
    removeButton.onclick = function () {
        removeQuestion(questionDiv);
    };
    cardBody.appendChild(removeButton);

    // Add reset question label functionality
    resetQuestionLabels();

    questionDiv.appendChild(cardBody);

    // Append the new question block to the form
    document.getElementById("customQuestionsContainer").appendChild(questionDiv);

    showQuestionSuggestions(questionDiv, questionCounter);

            // Check if statement already exists
if (questionDiv.querySelector('button')) {
    showTemporaryMessage(questionDiv,'You can only add one statement per question.');
    return;
}
    // Refresh drag-and-drop functionality after adding a new question
    refreshDragAndDrop();
}


// Function to show suggestions for common questions
function showQuestionSuggestions(input, questionCounter) {
    // Expanded list of suggestions with multiple choice questions
    const allSuggestions = [
        'What are your career goals?',
        'What is your experience with [specific skill]?',
        'How do you handle tight deadlines?',
        'What are your strengths and weaknesses?',
        'Why do you want to work with our company?',
        'Describe a challenging project you worked on.',
        'How do you prioritize your tasks?',
        'What motivates you to perform well?',
        'Tell us about a time you showed leadership skills.',
        'What do you think you could contribute to our team?',
        'Describe a time you resolved a conflict at work.',
        'How do you handle constructive criticism?',
        'What is your greatest achievement so far?',
        'How do you stay organized in a fast-paced environment?',
        'Tell us about a time you worked as part of a team.',
        'What do you know about our industry?',
        'How do you handle failure?',
        'What are your short and long-term career aspirations?',
        'How do you deal with stressful situations?',
        'What makes you a good fit for this role?',

        // Multiple choice questions
        'What is your preferred work environment? (Remote, On-site, Hybrid)',
        'Which of these skills do you possess? (JavaScript, Python, Java, C#)',
        'How do you prefer to receive feedback? (In-person, Email, Written report)',
        'What type of projects interest you the most? (Research, Development, Management)',
        'Which of the following best describes your leadership style? (Authoritative, Democratic, Laissez-faire, Transformational)',
        'What kind of company culture do you thrive in? (Competitive, Collaborative, Innovative, Traditional)',
        'How often do you like to collaborate with teammates? (Always, Often, Sometimes, Rarely)',
        'What is your preferred method of learning? (Hands-on, Reading, Watching videos)',
        'Which industry do you want to work in? (Technology, Healthcare, Education, Finance)',
        'What is your ideal team size? (1-3, 4-6, 7-10, More than 10)'
    ];

    // Shuffle the suggestions to randomize them
    const shuffledSuggestions = allSuggestions.sort(() => 0.5 - Math.random());

    // Limit to 5 random suggestions per question
    const randomSuggestions = shuffledSuggestions.slice(0, 5);

    // Create the datalist for suggestions
    const suggestionDropdown = document.createElement('datalist');
    suggestionDropdown.id = `suggestions-${questionCounter}`;
    
    randomSuggestions.forEach(suggestion => {
        const option = document.createElement('option');
        option.value = suggestion;
        suggestionDropdown.appendChild(option);
    });

    console.log("input  ", input);
    console.log("questionCounter  ", questionCounter);

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
    // Disable the Statement button
    const statementButton = questionDiv.querySelector('.btn-secondary');
    statementButton.disabled = true; // Disable Statement Button

    const multipleChoiceDiv = document.createElement('div');
    multipleChoiceDiv.id = `multiple-choice-${questionNumber}`;
    multipleChoiceDiv.className = "mt-3"; // Added margin-top for spacing

    const multipleChoiceButton = questionDiv.querySelector('.btn btn-primary');
    multipleChoiceButton.disabled = true; // Disable Multiple Choice Button


    // First choice input with validation
    const choiceInput = document.createElement('input');
    choiceInput.type = 'text';
    choiceInput.className = "form-control mb-2";
    choiceInput.placeholder = 'Enter multiple choice option';
    choiceInput.name = `question-${questionNumber}-option-1`;

    // Real-time validation for options
    addRealTimeValidation(choiceInput);
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

function addMoreMultipleChoice(multipleChoiceDiv, questionNumber) {
    const options = multipleChoiceDiv.querySelectorAll('input');
    const optionValues = Array.from(options).map(input => input.value.trim());


    // Check for duplicates
    const duplicates = optionValues.filter((item, index) => optionValues.indexOf(item) !== index);
    if (duplicates.length > 0) {
        showTemporaryMessage(multipleChoiceDiv,'Options must be unique. Please remove duplicate entries.');
        return;
    }
    // Existin




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
        showTemporaryMessage(multipleChoiceDiv,'Please fill in all current options before adding more.');
        return;
    }

    // Limit the number of options to 5
    if (options.length >= 5) {
        showTemporaryMessage(multipleChoiceDiv,'You can only add up to 5 options.');
        return;
    }

    // Create the next option input if validation passed
    const optionCount = options.length; // Current number of options
    const choiceInput = document.createElement('input');
    choiceInput.type = 'text';
    choiceInput.className = "form-control mb-2";
    choiceInput.placeholder = `Option ${optionCount + 1}`;
    choiceInput.name = `question-${questionNumber}-option-${optionCount + 1}`;

    // Add real-time validation for new option
    addRealTimeValidation(choiceInput);

    // Create a remove button for the new input
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = "btn btn-danger mt-2";
    removeButton.innerHTML = 'Remove option';
    removeButton.onclick = function() {
        choiceInput.remove();
        removeButton.remove();
    };
    
    multipleChoiceDiv.insertBefore(removeButton, multipleChoiceDiv.lastElementChild);
}



function addStatement(questionDiv) {
    // Disable the Multiple Choice button
    const multipleChoiceButton = questionDiv.querySelector('.btn-primary');
    multipleChoiceButton.disabled = true; // Disable Multiple Choice Button

    // Check if statement already exists
    if (questionDiv.querySelector('textarea')) {
       showTemporaryMessage(questionDiv,'You can only add one statement per question.');
        return;
    }

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





function showTemporaryMessage(questionDiv, message) {
    // Create a message div element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'alert alert-warning mt-2'; // Bootstrap warning style
    messageDiv.innerText = message;

    // Attach the message to the questionDiv
    questionDiv.appendChild(messageDiv);

    // Set a timeout to remove the message after 3 seconds (3000ms)
    setTimeout(() => {
        questionDiv.removeChild(messageDiv);
    }, 3000);
}





// Initialize the first time
refreshDragAndDrop();











document.addEventListener("DOMContentLoaded", function() {
    const tagsContainer = document.getElementById("tagsContainer");
    const tagInput = document.getElementById("tagInput");
    const tagsList = document.getElementById("tagsList");
    const clearTagsButton = document.getElementById("clearTagsButton");

    // Function to add a tag
    function addTag(tag) {
        if (!tag) return; // Prevent empty tags

        const tagElement = document.createElement("span");
        tagElement.className = "tag badge badge-primary mr-1"; // Bootstrap class for a nice badge look
        tagElement.textContent = tag;

        const removeButton = document.createElement("button");
        removeButton.textContent = " x"; // Close button
        removeButton.className = "ml-1 btn btn-sm btn-danger"; // Styling for remove button
        removeButton.onclick = () => {
            tagsList.removeChild(tagElement);
        };

        tagElement.appendChild(removeButton);
        tagsList.appendChild(tagElement);
    }

    // Event listener for tag input
    tagInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && tagInput.value.trim() !== "") {
            e.preventDefault(); // Prevent form submission
            const tag = tagInput.value.trim();
            addTag(tag); // Add the new tag
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


// Event listener for adding the application link
document.getElementById('addExternalLinkButton').addEventListener('click', function() {
    const applicationLinkInput = document.getElementById('applicationLink');
    
    // Toggle the display of the input field
    if (applicationLinkInput.style.display === 'none') {
        applicationLinkInput.style.display = 'block'; // Show input field
        this.style.display = 'none'; // Hide the "Add" button
        document.getElementById('removeExternalLinkButton').style.display = 'inline-block'; // Show the "Remove" button
    }
});

// Event listener for removing the application link
document.getElementById('removeExternalLinkButton').addEventListener('click', function() {
    const applicationLinkInput = document.getElementById('applicationLink');
    applicationLinkInput.value = ''; // Clear the input field
    applicationLinkInput.style.display = 'none'; // Hide input field
    this.style.display = 'none'; // Hide the "Remove" button
    document.getElementById('addExternalLinkButton').style.display = 'inline-block'; // Show the "Add" button
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
    clearLocalStorage();

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
