


// Function to generate a unique ID for questions
let questionCounter = 0;

document.getElementById("addQuestionButton").addEventListener("click", function() {
    addQuestionField();
});

function addQuestionField() {
    questionCounter++;
    
    const questionDiv = document.createElement('div');
    questionDiv.id = `question-${questionCounter}`;
    
    // Add the input field for the question
    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.className ="form-control mb-2 btn ";

    questionInput.placeholder = `Enter question ${questionCounter}`;
    questionInput.name = `question-${questionCounter}-text`;
    questionDiv.appendChild(questionInput);

    // Add the buttons for multiple choice or statement
    const multipleChoiceButton = document.createElement('button');
    multipleChoiceButton.type = 'button';
    multipleChoiceButton.className ="btn btn-primary btn-block rounded-pill shadow-sm font form-group  ";
    multipleChoiceButton.innerHTML = 'Multiple Choice';
    multipleChoiceButton.onclick = function() {
        addMultipleChoice(questionDiv, questionCounter);
    };
    questionDiv.appendChild(multipleChoiceButton);

    const statementButton = document.createElement('button');
    statementButton.type = 'button';
    statementButton.className ="btn btn-primary btn-block rounded-pill shadow-sm font form-group  ";
    statementButton.innerHTML = 'Statement';
    statementButton.onclick = function() {
        addStatement(questionDiv);
    };
    questionDiv.appendChild(statementButton);

    // Append the new question block to the form
    document.getElementById("customQuestionsContainer").appendChild(questionDiv);
}

function addMultipleChoice(questionDiv, questionNumber) {
    // Create a div to hold the multiple-choice options
    const multipleChoiceDiv = document.createElement('div');
    multipleChoiceDiv.id = `multiple-choice-${questionNumber}`;
    
    // Create the input field for the first multiple-choice option
    const choiceInput = document.createElement('input');
    choiceInput.type = 'text';
    choiceInput.className ="form-control mb-2 ";

    choiceInput.placeholder = 'Enter multiple choice option';
    choiceInput.name = `question-${questionNumber}-option-1`;
    multipleChoiceDiv.appendChild(choiceInput);

    // Add "Add more" button for multiple choices
    const addMoreButton = document.createElement('button');
    addMoreButton.type = 'button';
    addMoreButton.className ="btn btn-primary btn btn-secondary btn-block rounded-pill shadow-sm font form-group  ";
    addMoreButton.innerHTML = 'Add more options';
    addMoreButton.onclick = function() {
        addMoreMultipleChoice(multipleChoiceDiv, questionNumber);
    };
    multipleChoiceDiv.appendChild(addMoreButton);
    
    questionDiv.appendChild(multipleChoiceDiv);
}

function addMoreMultipleChoice(multipleChoiceDiv, questionNumber) {
    const optionCount = multipleChoiceDiv.childElementCount - 1; // Exclude the 'Add more options' button
    const choiceInput = document.createElement('input');
    choiceInput.type = 'text';
    choiceInput.className ="form-control mb-2";

    choiceInput.placeholder = `Option ${optionCount + 1}`;
    choiceInput.name = `question-${questionNumber}-option-${optionCount + 1}`;
    multipleChoiceDiv.insertBefore(choiceInput, multipleChoiceDiv.lastElementChild);
}

function addStatement(questionDiv) {
    // Create a textarea for a statement-type question
    const statementTextArea = document.createElement('textarea');
    statementTextArea.placeholder = 'Enter statement response';

    // Assign Bootstrap classes for styling
    statementTextArea.className = "form-control"; // Only the form-control class

    // Add inline styles
    statementTextArea.style.width = "100%"; // Full width
    statementTextArea.style.padding = "1rem"; // Padding
    statementTextArea.style.margin = "1rem 1rem"; // Horizontal margin
    statementTextArea.style.border = "1px solid #ced4da"; // Border color matching Bootstrap
    statementTextArea.style.borderRadius = "0.25rem"; // Border radius matching Bootstrap
    statementTextArea.style.resize = "none"; // Prevent resizing

    // Append the textarea to the provided questionDiv
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
            optionInputs.forEach(input => {
                options.push(input.value);
            });
            customQuestions.push({ question: questionText, type: questionType, options });
        } else {
            customQuestions.push({ question: questionText, type: questionType });
        }
    }
    return customQuestions;
}

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
        if (e.key === "Enter" && tagInput.value.trim() !== "") {
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
document.getElementById('addExternalLinkButton').addEventListener('click', function() {
    const applicationLinkInput = document.getElementById('applicationLink');
    
    // Toggle the display of the input field
    if (applicationLinkInput.style.display === 'none') {
        applicationLinkInput.style.display = 'block'; // Show input field
        this.style.display = 'none'; // Hide the button
    }
});

