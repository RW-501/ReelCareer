


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
    if (e.key === "Enter" && tagInput.value.trim() !== "") {
        e.preventDefault();
        const tag = tagInput.value.trim();
        addTag(tag);
        tagInput.value = ""; // Clear the input
    }
});
// Function to clear all tags
clearTagsButton.addEventListener("click", () => {
    tagsList.innerHTML = ""; // Clear all tags
});
