
// Function to inject CSS styles into the document
function addStyles() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        /* General Styles */

   /* Styles for the suggestion dropdown */

   input::selection {
    background: #d0eaff; /* Light blue background for the suggestion part */
    color: #000; /* Text color for the suggestion part */
}


@media (max-width: 768px) {
    .navbar-brand {
        font-size: 1.2rem; /* Increase the brand text size on mobile */
    }

    .nav-link {
        font-size: 0.9rem; /* Decrease the nav link text size */
    }

    .company-media img {
        width: 100%; /* Make company media images responsive */
        height: auto; /* Maintain aspect ratio */
    }

    /* Adjust video size on mobile */
    video {
        width: 100%;
        height: auto;
    }
}
@media (max-width: 768px) {
    body {
        font-size: 14px; /* Smaller text on mobile */
    }

    .navbar {
        flex-direction: column; /* Stack navbar items */
    }
}

@media (max-width: 576px) {
    .navbar-brand {
        font-size: 1.5rem; /* Adjust brand size */
    }
}

img {
    max-width: 100%;
    height: auto;
}
button, .nav-link {
    padding: 10px 15px;
    font-size: 16px;
}

        
    footer {
        margin-top: 50px;
    }
    footer p {
        margin-bottom: 0;
    }
    `;
    document.head.appendChild(style);
}


function formatSalary(input) {
    // Remove any non-numeric characters except for commas and dollar sign
    let value = input.value.replace(/[^0-9,]/g, '');

    // Remove any commas for easier processing
    value = value.replace(/,/g, '');

    // Ensure the input is valid: it should only be numeric
    if (!/^\d*$/.test(value)) {
        value = ''; // Reset to empty if invalid input
    }

    // Format the number with commas
    if (value) {
        value = Number(value).toLocaleString();
    }

    // Set the formatted value back to the input with a dollar sign
    input.value = value ? `$${value}` : '';
}
function restrictKeys(event) {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter', 'Escape'];
    if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
        event.preventDefault();
    }
}




const suggestions = [
    "Developer",
    "Data Scientist",
    "Web Designer",
    "Project Manager",
    "Software Engineer",
    "Product Manager",
    "HR Manager",
    "Teacher",
    "Marketing Specialist",
    "Sales Associate",
    "Graphic Designer",
    "UX/UI Designer",
    "Data Analyst",
    "Business Analyst",
    "Systems Administrator",
    "Network Engineer",
    "Content Writer",
    "SEO Specialist",
    "Social Media Manager",
    "Web Developer",
    "Full Stack Developer",
    "Mobile App Developer",
    "Cloud Engineer",
    "Database Administrator",
    "Cybersecurity Analyst",
    "Financial Analyst",
    "Operations Manager",
    "Sales Manager",
    "Customer Service Representative",
    "Research Scientist",
    "Pharmaceutical Sales Representative",
    "Logistics Coordinator",
    "Quality Assurance Tester",
    "Technical Support Specialist",
    "Event Coordinator",
    "Public Relations Specialist",
    "Account Executive",
    "Video Producer",
    "Brand Strategist",
    "E-commerce Specialist",
    "Digital Marketing Manager",
    "Content Strategist",
    "User Researcher",
    "Market Research Analyst",
    "IT Support Specialist",
    "Project Coordinator",
    "Recruiter",
    "Compliance Officer",
    "Interior Designer",
    "Real Estate Agent",
    "Financial Planner",
    "Retail Manager",
    "Insurance Agent",
    "Human Resources Assistant",
    "Training Coordinator",
    "Purchasing Agent",
    "Corporate Trainer",
    "Executive Assistant",
    "Software Tester",
    "Supply Chain Manager",
    "Manufacturing Engineer",
    "Civil Engineer",
    "Mechanical Engineer",
    "Electrical Engineer",
    "Marketing Coordinator",
    "Information Technology Manager",
    "Administrative Assistant",
    "Hospitality Manager",
    "Business Development Manager",
    "Data Entry Clerk",
    "Health and Safety Officer",
    "Legal Assistant",
    "Architect",
    "Veterinarian",
    "Psychologist",
    "Nurse Practitioner",
    "Phlebotomist",
    "Dentist",
    "Physical Therapist",
    "Web Analyst",
    "Desktop Support Technician",
    "Systems Engineer",
    "IT Project Manager",
    "Quality Control Inspector",
    "Training Specialist",
    "Technical Writer",
    "Network Administrator",
    "Environmental Scientist",
    "Content Editor",
    "SEO Analyst",
    "Copywriter",
    "Creative Director",
    "Film Director",
    "Voice Over Artist",
    "HR Business Partner",
    "Product Designer",
    "Social Worker",
    "Speech Pathologist",
    "Clinical Research Coordinator",
    "Marine Biologist",
    "Game Developer",
    "Sports Coach",
    "Travel Agent",
    "Compliance Analyst",
    "Tax Consultant",
    "Clinical Psychologist",
    "Dietitian",
    "Chiropractor",
    "Occupational Therapist",
    "Pharmacist",
    "IT Consultant",
    "Business Intelligence Analyst",
    "Database Developer",
    "Hardware Engineer",
    "Robotics Engineer",
    "Aerospace Engineer",
    "Web Application Developer",
    "Database Architect",
    "Image Editor",
    "UI Developer",
    "Chief Technology Officer",
    "Chief Financial Officer",
    "Data Governance Specialist",
    "Telecommunications Specialist",
    "Corporate Communications Specialist",
    "Marketing Research Analyst",
    "Copy Editor",
    "Corporate Lawyer",
    "Mergers and Acquisitions Analyst",
    "Digital Content Creator",
    "App Tester",
    "Quality Assurance Engineer",
    "IT Security Specialist"
];

function autoSuggest(input) { 
    const inputValue = input.value ? input.value.toLowerCase() : ''; // Check if input.value is defined
    let suggestion = '';

    // Find the first suggestion that starts with the input value
    for (let i = 0; i < suggestions.length; i++) {
        if (suggestions[i].toLowerCase().startsWith(inputValue)) {
            suggestion = suggestions[i];
            break;
        }
    }

    if (suggestion && inputValue !== '') {
        // If a suggestion is found and input isn't empty
        input.setAttribute('data-suggestion', suggestion); // Set a custom data attribute for handling auto-suggestion
        input.value = suggestion; // Temporarily set the input value to the suggestion
        input.selectionStart = inputValue.length; // Set the selection start after the typed characters
        input.selectionEnd = suggestion.length; // Set the selection end to the suggestion length
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('keywordInput').addEventListener('keydown', function(e) {
        const suggestion = this.getAttribute('data-suggestion');
        const inputValue = this.value ? this.value.toLowerCase() : ''; // Check if this.value is defined

        if (suggestion && suggestion.toLowerCase().startsWith(inputValue)) {
            if (e.key === 'Tab' || e.key === 'Enter') {
                e.preventDefault();
                this.value = suggestion;
                this.setSelectionRange(suggestion.length, suggestion.length);
            }
        }
    });
});



const userINFO = getUserInfo();
console.log("userINFO  ",userINFO);
