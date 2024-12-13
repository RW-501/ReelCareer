/*

Jobs collection...

    if (bestMatch.category === 'jobCategories') {
    bestMatch.word
 category =, 
}

    if (bestMatch.category === 'benefit' bestMatch.category === 'travel' || bestMatch.category === 'health'
    || bestMatch.category === 'vehicle' || bestMatch.category === 'technology'|| bestMatch.category === 'education'  && 
    bestMatch.word === 'job' || bestMatch.word === 'company' || bestMatch.word === 'food' || bestMatch.word === 'hotel'
     || bestMatch.word === 'travel' || bestMatch.word === 'benefit'|| bestMatch.word === 'training'  || bestMatch.word === 'insurance' || bestMatch.word === 'health' ) {
    tokens
benefits Array, 
}

    if (bestMatch.category === 'jobSearch' || bestMatch.category === 'jobRelated' ||  bestMatch.category === 'jobCategories' && 
    bestMatch.word === 'new' || bestMatch.word === 'current' ||
    bestMatch.word === 'today' || bestMatch.word === 'this week' || 
    bestMatch.word === 'this month' 
    
    ) {
if date or time > , <, == bestMatch.word
createdAt timmestamp, 
}



    if (bestMatch.category === 'industry') {
bestMatch.word
industry =, 
}


    if (bestMatch.category === 'jobSearch' || bestMatch.category === 'jobRelated' ||  bestMatch.category === 'jobCategories'
    bestMatch.category === 'education' ||bestMatch.category === 'experience' ||bestMatch.category === 'task' || && 
    bestMatch.word === 'college' || bestMatch.word === 'certificate' ||
    bestMatch.word === 'training' || bestMatch.word === 'course' || 
    bestMatch.word === 'assessment'  ||
    bestMatch.word === 'years' || bestMatch.word === 'experience' ||  bestMatch.word === 'project' || bestMatch.word === 'duties' ||
    bestMatch.word === 'skills'  || bestMatch.word === 'history' || bestMatch.word === 'talents' 
    bestMatch.word === 'task' || bestMatch.word === 'plan' 
    
    ) {
    tokens
searchableRequirements Array,
}



        if (bestMatch.category === 'jobSearch' || bestMatch.category === 'jobRelated' ||  bestMatch.category === 'jobCategories' && 
    bestMatch.word === 'job' || bestMatch.word === 'role' ||
    bestMatch.word === 'position' || bestMatch.word === 'title' || 
    bestMatch.word === 'career' || bestMatch.word === 'opportunity' || bestMatch.word === 'employment' 
    ) {
    tokens
searchableTitle Array,
}

    if (bestMatch.category === 'jobSearch' || bestMatch.category === 'jobRelated' ||  bestMatch.category === 'jobCategories' && 
    bestMatch.word === 'new' || bestMatch.word === 'current' ||
    bestMatch.word === 'today' || bestMatch.word === 'this week' || 
    bestMatch.word === 'this month' 
    
    ) {
    bestMatch.word
type = map full_time : full time part_time : part time, 
}

    if (bestMatch.category === 'jobSearch' || bestMatch.category === 'jobRelated' ||  
    bestMatch.category === 'state' || bestMatch.category === 'location' && 
    bestMatch.word === 'count' || bestMatch.word === 'total' ||
    bestMatch.word === 'job count' || bestMatch.word === 'job total' || 
    bestMatch.word === 'how' ||
    bestMatch.word === 'many' 
    
    ) {
        tokens
location Array count,
}

where status = "active"














        if (bestMatch.category === 'request' || bestMatch.category === 'action' && 
    bestMatch.word === 'please' || bestMatch.word === 'can' ||
    bestMatch.word === 'can you' || bestMatch.word === 'i need' || 
    bestMatch.word === 'would you' || bestMatch.word === 'help' ||
     bestMatch.word === 'show me' || bestMatch.word === 'create' ||
    bestMatch.word === 'build' || bestMatch.word === 'edit' || 
    bestMatch.word === 'review' || bestMatch.word === 'check' ||
     bestMatch.word === 'fix' || bestMatch.word === 'save' ||
    bestMatch.word === 'add' || bestMatch.word === 'remember' || 
    bestMatch.word === 'enhance' || bestMatch.word === 'improve' 
    ) {
    tokens
searchableTitle Array,
}





AI


make if statments and query functions for each quary type...  LearnModel collection... 

        if (bestMatch.category === 'request' || bestMatch.category === 'action' && 
    bestMatch.word === 'please' || bestMatch.word === 'can' ||
    bestMatch.word === 'can you' || bestMatch.word === 'i need' || 
    bestMatch.word === 'would you' || bestMatch.word === 'help' ||
     bestMatch.word === 'show me' || bestMatch.word === 'create' ||
    bestMatch.word === 'build' || bestMatch.word === 'edit' || 
    bestMatch.word === 'review' || bestMatch.word === 'check' ||
     bestMatch.word === 'fix' || bestMatch.word === 'save' ||
    bestMatch.word === 'add' || bestMatch.word === 'remember' || 
    bestMatch.word === 'enhance' || bestMatch.word === 'improve' 
    ) {
    tokens

searchableDirections Array,
}





import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

async function handleJobQuery(bestMatch, tokens) {
    try {
        // Common Filters
        const lowerTokens = tokens.map(t => t.trim().toLowerCase());

        // Category: Job Categories
        if (bestMatch.category === 'jobCategories') {
            const jobCategory = bestMatch.word;
            return fetchJobsByCategory(jobCategory);
        }

        // Category: Benefits
        if (['benefit', 'travel', 'health', 'vehicle', 'technology', 'education'].includes(bestMatch.category) &&
            ['job', 'company', 'food', 'hotel', 'travel', 'benefit', 'training', 'insurance', 'health'].includes(bestMatch.word)) {
            return fetchJobsByBenefits(lowerTokens);
        }

   

        // Default: No Match
        return "No matching query criteria were found.";

    } catch (error) {
        console.error("Error handling job query:", error);
        return "An error occurred while processing the query.";
    }
}








































Blogs collection...
category =, postDate string "2024-12-04", tags Array, 
where activate = true

FAQs collection...
tags Array, category =, question =,

Users collection...
displayName =, jobInterest Array, position =, location =,
where publicProfile true

VideoResumes collection...
tags Array, 
where status = "posted"

Companies collection...
companyName =, jobTitles Array, location =, jobs count,





Analytics collection...
doc count,

Users collection...
doc count

VideoResumes collection...
doc count

Jobs collection...
doc count

Applications collection...
doc count

SupportTickets collection...
tags Array, 
where status = "posted"


*/










