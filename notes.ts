        console.log('Input Value:', inputValue); // Log the current input value
        
        let suggestion = '';
        
        // Split the input by spaces and get the last part
        const words = inputValue.split(' ');
        const lastWord = words.pop(); // Get the last word after the most recent space
        console.log('words:', words); 
        console.log('Last Word:', lastWord); 

            
        // Find the first suggestion that starts with the last word
        for (let i = 0; i < suggestionsArray.length; i++) {
            if (suggestionsArray[i].toLowerCase().startsWith(lastWord)) {
                suggestion = suggestionsArray[i];
                console.log('Suggestion Found:', suggestion); // Log the found suggestion
                break;
            }
        }