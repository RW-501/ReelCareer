// Function in brain.js that you want to call later

  
  
function stemTokens(tokens) {
    return tokens.map(token => {
        // Handle common verb endings
        if (token.endsWith('in')) {
            return token.slice(0, -2);  // Handle "washin" -> "wash"
        }
        if (token.endsWith('ing')) {
            return token.slice(0, -3);  // Handle "washing" -> "wash"
        }
        if (token.endsWith('ed')) {
            return token.slice(0, -2);  // Handle "worked" -> "work"
        }
        
        // Handle plural noun endings
        if (token.endsWith('es')) {
            return token.slice(0, -2);  // Handle "cars" -> "car"
        }

        // Handle common adjective/adverb endings
        if (token.endsWith('ly')) {
            return token.slice(0, -2);  // Handle "quickly" -> "quick"
        }

        // Handle comparative and superlative adjectives
        if (token.endsWith('er')) {
            return token.slice(0, -2);  // Handle "bigger" -> "big"
        }
        if (token.endsWith('est')) {
            return token.slice(0, -3);  // Handle "fastest" -> "fast"
        }

        // Handle noun endings
        if (token.endsWith('ness')) {
            return token.slice(0, -4);  // Handle "happiness" -> "happi"
        }
        if (token.endsWith('ity')) {
            return token.slice(0, -3);  // Handle "activity" -> "activ"
        }

        // Handle suffixes like 'ment' for nouns
        if (token.endsWith('ment')) {
            return token.slice(0, -4);  // Handle "government" -> "govern"
        }
        
        // Handle other common suffixes like 'tion', 'sion'
        if (token.endsWith('tion') || token.endsWith('sion')) {
            return token.slice(0, -4);  // Handle "action" -> "act"
        }

        // Return token if no changes
        return token;
    });
}




        // List of stop words to exclude from tokenization
        const stopWords = ['i', 'need', 'to', 'in', 'the', 'and', 'n', 'a', 'of', 'on', 'for', 'with', 'is', 'at', 'by', 'as'];

        // Categories and keywords
        const categories = {
            job: ['job', 'work', 'employment', 'career', 'position', 'role', 'hire', 'recruit', 'vacancy', 'career'],
            vehicle: ['car', 'truck', 'vehicle', 'automobile', 'bike', 'motorcycle', 'suv', 'van'],
            action: ['find', 'search', 'wash', 'apply', 'look', 'locate', 'searching', 'submit', 'interview', 'complete'],
            location: ['dallas', 'tx', 'california', 'new york', 'ny', 'texas', 'los angeles', 'chicago', 'miami', 'florida', 'houston', 'boston', 'seattle'],
            education: ['degree', 'education', 'school', 'university', 'college', 'certificate', 'diploma', 'studies', 'graduate'],
            salary: ['salary', 'pay', 'wage', 'income', 'compensation', 'bonus', 'stipend', 'earnings'],
            time: ['today', 'tomorrow', 'week', 'month', 'year', 'hour', 'minute', 'deadline', 'season'],
            experience: ['experience', 'years', 'knowledge', 'skills', 'expertise', 'background', 'internship'],
            benefit: ['benefit', 'healthcare', 'vacation', 'bonus', 'insurance', 'pension', '401k'],
            company: ['company', 'corporation', 'business', 'startup', 'organization', 'firm', 'enterprise'],
            preferences: ['remote', 'full-time', 'part-time', 'flexible', 'on-site', 'contract'],
            demographics: ['age', 'gender', 'ethnicity', 'race', 'background', 'diversity'],
            relationship: ['family', 'partner', 'friend', 'colleague', 'supervisor', 'manager', 'team'],
            interest: ['hobby', 'interest', 'passion', 'leisure', 'sport', 'activity', 'entertainment'],
            task: ['task', 'job', 'work', 'project', 'assignment', 'duty', 'responsibility']
        };


// Tokenize the input by splitting on spaces and punctuation
function tokenize(input) {
    const regex = /[\w'-]+/g;
    return input.match(regex) || [];
}



// Categorize tokens into predefined categories and return both category and word
function categorizeTokens(tokens) {
    const mappedWords = [];

    // Remove stop words and match remaining tokens to categories
    tokens.forEach(token => {
        if (!stopWords.includes(token)) {
            // Match against each category
            Object.keys(categories).forEach(category => {
                // Check if the token matches a category using a regex for locations (e.g., 'TX', 'New York')
                const regexLocation = new RegExp('\\b(' + categories.location.join('|') + ')\\b', 'i');
                if (categories[category].includes(token) || (category === 'location' && regexLocation.test(token))) {
                    mappedWords.push({ category: category, word: token });
                }
            });
        }
    });

    return mappedWords;
}





        // Tokenize input and map to categories
     // Function to process the input message
     function processMessage(message) { 
        const userInput = message.toLowerCase();
        let tokens = tokenize(userInput);
        tokens = stemTokens(tokens);  // Apply basic stemming
        let categorizedTokens = categorizeTokens(tokens);
    
        return `Mapped: ${JSON.stringify(categorizedTokens)}`;
    }
    