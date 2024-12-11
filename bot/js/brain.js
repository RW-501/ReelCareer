// Function in brain.js that you want to call later

  


   
        // Categories and keywords
        const categories = {
            job: [
                'job', 'work', 'employment', 'career', 'position', 'role', 
                'hire', 'recruit', 'vacancy', 'occupation', 'profession', 
                'trade', 'gig', 'opportunity', 'opening', 'posting', 'listing', 
                'internship', 'contract', 'freelance', 'staffing', 'assignment', 
                'task', 'placement', 'workplace', 'duties', 'responsibilities', 
                'employment opportunity', 'job search', 'job hunt', 'recruitment', 
                'onboarding', 'job offer', 'workload', 'shift', 'occupation field', 
                'payroll', 'career path', 'promotion', 'job board', 'staffing agency', 
                'headhunter', 'employment agency', 'job placement', 'career fair', 
                'job market', 'career development', 'professional development', 'career growth', 
                'full-time job', 'part-time job', 'temporary position', 'permanent position', 
                'entry-level job', 'senior position', 'leadership role', 'supervisory position', 
                'management role', 'executive role', 'skilled labor', 'manual labor', 
                'blue-collar job', 'white-collar job', 'remote work', 'flexible job', 
                'contractor', 'consultant', 'job opening', 'job vacancy', 'recruiting agency', 
                'employment listing', 'job listing', 'vacancy posting', 'career opportunity', 
                'job advertisement', 'job posting site', 'job board platform', 'job seeker', 
                'job candidate', 'applicant', 'employee', 'employer', 'work environment', 
                'work culture', 'office job', 'field job', 'work assignment', 'work shift', 
                'shift work', 'temp job', 'part-time role', 'full-time position', 'job responsibilities', 
                'hiring process', 'employee benefits', 'salary negotiation', 'on-the-job training', 
                'orientation', 'new hire', 'placement agency', 'job listing site', 'career placement', 
                'staffing firm', 'job marketplace', 'workforce', 'talent pool', 'job referral', 
                'hiring event', 'job interview', 'job contract', 'job description', 'job title', 
                'workforce development', 'corporate job', 'labor market', 'job specification', 
                'training program', 'job description post', 'position title', 'headhunting'
            ],
            
            math: ['salary', 'pay', 'annual', 'monthly', 'sum', 'add', 'subtract', 'multiply', 'divide', '+', '-', '*', '/'],
  
            vehicle: [
                'car', 'truck', 'vehicle', 'automobile', 'bike', 'motorcycle', 'suv', 'van', 
                'sedan', 'coupe', 'hatchback', 'convertible', 'wagon', 'pickup', 'jeep', 
                'minivan', 'camper', 'bus', 'lorry', 'limousine', 'sports car', 'electric car', 
                'hybrid', 'electric vehicle', 'ev', 'diesel', 'compact car', 'luxury car', 
                'motorbike', 'moped', 'scooter', 'three-wheeler', 'quad bike', 'dirt bike', 
                'off-road vehicle', 'roadster', 'crossover', 'racing car', 'classic car', 
                'muscle car', 'taxi', 'ride share', 'fleet vehicle', 'cargo van', 'panel van', 
                'pickup truck', 'tow truck', 'trailer', 'tractor', 'semi truck', '18-wheeler', 
                'recreational vehicle', 'rv', 'caravan', 'truck bed', 'snowmobile', 'motorized vehicle', 
                'tricycle', 'electric scooter', 'go-kart', 'mini-van', 'all-terrain vehicle', 
                'utility vehicle', 'city car', 'luxury suv', 'fuel-efficient car', 'sports utility vehicle', 
                'hybrid suv', 'four-door', 'two-door', 'hybrid truck', 'motorized bike', 'chopper', 
                'street bike', 'custom bike', 'bicycle', 'cargo bike', 'electric bike', 'mountain bike', 
                'road bike', 'fixed-gear', 'trailer truck', 'cargo truck', 'container truck', 'box truck', 
                'flatbed truck', 'dump truck', 'log truck', 'cement truck', 'fire truck', 'ambulance', 
                'police car', 'sheriff car', 'patrol car', 'emergency vehicle', 'ambulance', 'tow dolly', 
                'recreational car', 'golf cart', 'electric golf cart', 'streetcar', 'light rail', 
                'trolley', 'hovercraft', 'autonomous vehicle', 'self-driving car', 'futuristic vehicle'
            ],

            action: [
                'find', 'search', 'wash', 'apply', 'look', 'locate', 'searching', 
                'submit', 'interview', 'complete', 'start', 'create', 'build', 
                'check', 'review', 'post', 'update', 'edit', 'delete', 'organize', 
                'manage', 'plan', 'prepare', 'schedule', 'track', 'verify', 'explore', 
                'read', 'write', 'type', 'develop', 'run', 'fix', 'install', 'remove', 
                'solve', 'handle', 'support', 'deliver', 'connect', 'contact', 'send', 
                'receive', 'share', 'move', 'navigate', 'select', 'choose', 'pick', 
                'upload', 'download', 'save', 'process', 'apply for', 'hire', 'recruit', 
                'train', 'test', 'evaluate', 'calculate', 'measure', 'examine', 'gather', 
                'execute', 'improve', 'enhance', 'launch', 'implement', 'monitor', 
                'oversee', 'collaborate', 'follow', 'lead', 'respond', 'click', 'scroll', 
                'buy', 'sell', 'search for', 'clean', 'design', 'research', 'submit for', 
                'approve', 'decline', 'accept', 'report', 'assist', 'present', 'attend', 
                'join', 'register', 'apply to', 'log in', 'sign up', 'sign in', 'reset', 
                'activate', 'customize', 'update profile', 'post job', 'take', 'give', 
                'focus', 'skip', 'cancel', 'analyze', 'compare', 'rank', 'sort', 'filter',
                'optimize', 'rearrange', 'evaluate', 'write down', 'fill in', 'fill out',
                'ask', 'answer', 'teach', 'learn', 'coach', 'request', 'download file',
                'approve request', 'add', 'add to', 'remove from', 'clear', 'backup',
                'replace', 'pause', 'resume', 'stop', 'start over', 'retry', 'sync'
            ],
            location: [
                'state', 'my state', 'local', 'near me', 'nearby', 'close to me', 'by me', 
                'city', 'town', 'area', 'region', 'neighborhood', 'metro', 'downtown', 
                'uptown', 'suburb', 'urban', 'rural', 'in my area', 'around me', 
                'dallas', 'los angeles', 'chicago', 'miami', 'houston', 'new york', 
                'nyc', 'boston', 'seattle', 'atlanta', 'san francisco', 'san diego', 
                'las vegas', 'phoenix', 'philadelphia', 'denver', 'washington', 'dc', 
                'austin', 'orlando', 'san antonio', 'detroit', 'minneapolis', 'tampa', 
                'charlotte', 'nashville', 'portland', 'st louis', 'pittsburgh', 
                'new orleans', 'sacramento', 'oakland', 'long beach', 'raleigh', 
                'cleveland', 'salt lake city', 'baltimore', 'kansas city', 'columbus', 
                'indianapolis', 'memphis', 'oklahoma city', 'milwaukee', 'albuquerque', 
                'fresno', 'tucson', 'colorado springs', 'san jose', 'el paso', 
                'fort worth', 'jacksonville', 'louisville', 'richmond', 'hartford',
                'buffalo', 'birmingham', 'mesa', 'omaha', 'anchorage', 'stockton', 
                'virginia beach', 'honolulu', 'bakersfield', 'newark', 'toledo', 
                'chandler', 'rochester', 'madison', 'greensboro', 'durham', 'lincoln', 
                'plano', 'henderson', 'orleans', 'wilmington', 'dayton', 'springfield', 
                'my location', 'current location', 'within city', 'within town', 'travel nearby'
            ],
      
            jobCategories: [
                'developer', 'designer', 'engineer', 'manager', 'director', 'analyst', 'sales', 'marketing', 'HR', 'consultant', 'administrator', 'architect', 'specialist', 'assistant', 'technician', 'leader', 'executive',
                // Tech and IT
                'software engineer', 'frontend developer', 'backend developer', 'full-stack developer', 'data scientist', 'data analyst', 'web developer', 'mobile developer', 'app developer', 'cloud engineer', 'network administrator', 'systems architect', 'devops engineer', 'QA engineer', 'UI/UX designer', 'database administrator',
                
                // Business and Management
                'business analyst', 'project manager', 'product manager', 'operations manager', 'business consultant', 'supply chain manager', 'strategic planner', 'account manager', 'brand manager', 'team lead', 'program manager', 'sales manager', 'customer success manager',
                
                // Marketing and Sales
                'marketing manager', 'digital marketing strategist', 'SEO specialist', 'content marketer', 'sales representative', 'sales associate', 'inside sales', 'account executive', 'business development manager', 'social media manager', 'marketing director', 'growth hacker', 'advertising manager', 'media planner',
                
                // Finance and Accounting
                'financial analyst', 'accountant', 'financial advisor', 'tax consultant', 'auditor', 'controller', 'treasury manager', 'investment banker', 'credit analyst', 'portfolio manager', 'financial planner', 'risk manager', 'compliance officer',
                
                // Healthcare
                'nurse', 'doctor', 'surgeon', 'therapist', 'dentist', 'healthcare administrator', 'pharmacist', 'medical assistant', 'radiologist', 'physician assistant', 'nurse practitioner', 'health insurance agent',
                
                // Legal
                'lawyer', 'attorney', 'paralegal', 'legal consultant', 'judge', 'legal assistant', 'corporate lawyer', 'litigation attorney', 'contract manager', 'compliance officer', 'legal advisor',
                
                // Education
                'teacher', 'professor', 'education coordinator', 'principal', 'academic advisor', 'special education teacher', 'teaching assistant', 'school administrator', 'counselor', 'tutor',
                
                // Creative Arts
                'graphic designer', 'photographer', 'videographer', 'content creator', 'illustrator', 'animator', 'art director', 'fashion designer', 'music producer', 'editor', 'screenwriter', 'copywriter', 'web designer', '3D artist',
                
                // Customer Service
                'customer service representative', 'call center agent', 'support specialist', 'customer care agent', 'help desk technician', 'account coordinator', 'service manager', 'technical support specialist',
                
                // Human Resources
                'HR manager', 'recruiter', 'talent acquisition specialist', 'HR assistant', 'HR coordinator', 'HR business partner', 'compensation and benefits specialist', 'employee relations manager', 'HR director', 'training manager',
                
                // Manufacturing and Engineering
                'production manager', 'manufacturing engineer', 'quality control manager', 'plant manager', 'assembly line worker', 'machinist', 'mechanical engineer', 'electrical engineer', 'civil engineer', 'process engineer',
                
                // Retail and Hospitality
                'store manager', 'cashier', 'sales associate', 'barista', 'chef', 'waiter', 'hotel manager', 'housekeeper', 'concierge', 'event planner', 'bartender', 'restaurant manager', 'retail assistant',
                
                // Science and Research
                'research scientist', 'biologist', 'chemist', 'physicist', 'lab technician', 'medical researcher', 'clinical trial manager', 'environmental scientist', 'data scientist', 'geologist', 'statistician',
                
                // Logistics and Transportation
                'logistics coordinator', 'supply chain analyst', 'truck driver', 'forklift operator', 'shipping coordinator', 'warehouse manager', 'delivery driver', 'logistics manager', 'transportation planner', 'inventory manager',
                
                // Real Estate
                'real estate agent', 'real estate broker', 'property manager', 'real estate consultant', 'leasing agent', 'mortgage broker', 'real estate analyst', 'real estate developer', 'construction manager',
                
                // IT Support
                'IT support specialist', 'help desk technician', 'network support', 'technical support engineer', 'systems administrator', 'IT coordinator', 'IT manager', 'IT consultant',
                
                // Other Miscellaneous
                'event coordinator', 'security officer', 'facility manager', 'driver', 'chef', 'personal assistant', 'delivery manager', 'receptionist', 'janitor', 'event planner', 'office manager', 'project coordinator'
            ],
            jobSearch: [
                'job', 'vacancy', 'position', 'career', 'opportunity', 'listing', 'search', 'apply', 'offer', 
                'opening', 'employment', 'recruitment', 'work', 'hiring', 'placement', 'job opening', 
                'job offer', 'career opportunity', 'job posting', 'application', 'job search', 
                'recruitment', 'seek', 'searching', 'apply for', 'available position', 'employment opportunity', 
                'job vacancy', 'looking for', 'job hunt', 'recruit', 'employment listing', 'talent search'
            ],
            jobType: [
                'full-time', 'part-time', 'contract', 'temporary', 'remote', 'on-site', 'freelance', 'internship', 
                'permanent', 'fixed-term', 'consultant', 'part-time', 'seasonal', 'work from home', 'hybrid', 
                'flexible hours', 'remote work', 'shift work', 'independent contractor', 'consulting', 
                'short-term', 'long-term', 'job-sharing', 'telecommute', 'work-from-anywhere'
            ],
            videoReel: [
                'video', 'reel', 'video resume', 'showreel', 'portfolio', 'video application', 'video introduction', 
                'demo reel', 'video submission', 'personal video', 'video CV', 'digital resume', 'resume video', 
                'video portfolio', 'self-introduction video', 'professional reel', 'video interview', 'video clip', 
                'video profile', 'presentation video', 'introduction reel', 'applicant reel', 'career reel', 
                'demo video', 'self-presentation video', 'video showcase', 'job reel', 'candidate reel', 'reel submission'
            ],            
            food: [
                'food', 'meal', 'recipe', 'cooking', 'ingredient', 'dish', 'snack', 'breakfast', 'lunch', 'dinner', 
                'cuisine', 'restaurant', 'menu', 'gourmet', 'tasting', 'chef', 'baking', 'grilling', 'vegetarian', 
                'vegan', 'fast food', 'organic', 'healthy eating', 'nutrition', 'diet', 'takeout', 'delivery', 
                'foodie', 'coffee', 'tea', 'dessert', 'appetizer', 'entree', 'salad', 'soup', 'smoothie'
            ],
            business: [
                'business', 'company', 'corporation', 'startup', 'entrepreneur', 'CEO', 'founder', 'manager', 
                'employee', 'team', 'leadership', 'strategy', 'marketing', 'finance', 'investment', 'sales', 'growth', 
                'revenue', 'profit', 'startup', 'MVP', 'pitch', 'partnership', 'expansion', 'business plan', 'market research', 
                'corporate', 'negotiation', 'lead generation', 'consulting', 'business development', 'corporate culture', 
                'brand', 'branding', 'e-commerce', 'B2B', 'B2C', 'SMB', 'industry', 'commercial', 'franchise'
            ],
            travel: [
                'travel', 'vacation', 'trip', 'tour', 'destination', 'hotel', 'flight', 'passport', 'visa', 'tourism', 
                'tourist', 'holiday', 'adventure', 'exploration', 'backpacking', 'cruise', 'resort', 'holiday package', 
                'explore', 'journey', 'excursion', 'itinerary', 'trip planning', 'travel guide', 'airline', 'road trip', 
                'sightseeing', 'cultural exchange', 'backpacker', 'tour operator', 'travel agent', 'traveller', 'staycation', 
                'foreign travel', 'local tourism', 'globetrotter', 'wanderlust', 'roadtrip', 'travel blog'
            ],
            health: [
                'health', 'fitness', 'wellness', 'diet', 'exercise', 'nutrition', 'mental health', 'workout', 
                'meditation', 'yoga', 'medication', 'therapy', 'doctor', 'healthcare', 'hospital', 'treatment', 
                'doctor’s appointment', 'vaccine', 'chronic', 'disease', 'condition', 'health insurance', 'mental wellness', 
                'physical therapy', 'well-being', 'stress management', 'rehabilitation', 'counseling', 'health risks', 
                'immune system', 'preventative care', 'healthy lifestyle', 'sleep', 'hydration', 'weight loss', 
                'cardio', 'strength training', 'flexibility', 'personal trainer', 'health tips'
            ],
            technology: [
                'technology', 'tech', 'innovation', 'software', 'hardware', 'AI', 'artificial intelligence', 'machine learning', 
                'blockchain', 'cloud computing', 'data', 'big data', 'internet of things', 'IoT', 'cybersecurity', 
                'cybersecurity', 'virtual reality', 'VR', 'augmented reality', 'AR', 'mobile', 'app', 'application', 
                'programming', 'coding', 'developer', 'engineer', 'website', 'web development', 'tech support', 'gadget', 
                'smartphone', 'laptop', 'tablet', 'electronics', 'startups', 'tech news', 'tech industry', 'cloud', 
                'data science', 'digital transformation', 'automation', '5G', 'smart devices', 'robots', 'wearables'
            ],
            events: [
                'event', 'conference', 'seminar', 'workshop', 'webinar', 'summit', 'gathering', 'meetup', 'expo', 
                'convention', 'festival', 'party', 'celebration', 'launch', 'show', 'presentation', 'trade show', 
                'training', 'symposium', 'networking', 'discussion', 'forum', 'panel', 'ceremony', 'concert', 'performance', 
                'broadcast', 'award ceremony', 'anniversary', 'holiday', 'tour', 'event planning', 'event coordination', 
                'schedule', 'calendar', 'RSVP', 'invite', 'attendance', 'ticket', 'live stream', 'event registration', 
                'opening', 'closing', 'event venue', 'venue', 'sponsor', 'exhibition', 'congrats', 'ticket sale', 'event marketing'
            ],
            
            question: ['who', 'what', 'where', 'when', 'why', 'how', '?'],
            request: ['please', 'can you', 'could you', 'i need', 'would you', 'help', 'show me', 'tell me'],
            statement: ['is', 'am', 'are', 'was', 'were', 'will', 'it', 'this', 'that', '.', 'I'],
          
            
            education: [
                'degree', 'education', 'school', 'university', 'college', 'certificate', 
                'diploma', 'studies', 'graduate', 'postgraduate', 'undergraduate', 
                'doctorate', 'phd', 'master\'s', 'bachelor\'s', 'associate', 'training', 
                'course', 'classes', 'program', 'curriculum', 'lecture', 'tutorial', 
                'learning', 'academic', 'academy', 'seminar', 'workshop', 'qualification', 
                'scholarship', 'tuition', 'enroll', 'admission', 'credential', 'certification', 
                'high school', 'secondary school', 'elementary school', 'middle school', 
                'kindergarten', 'preschool', 'homeschool', 'distance learning', 'online classes', 
                'e-learning', 'education system', 'graduate school', 'honors', 'gpa', 
                'exam', 'test', 'quiz', 'assessment', 'finals', 'project', 'thesis', 
                'research', 'dissertation', 'internship', 'apprenticeship', 'vocational', 
                'trade school', 'skill development', 'student', 'teacher', 'professor', 
                'mentor', 'educator', 'coach', 'school district', 'campus', 'alumni', 
                'library', 'laboratory', 'textbook', 'notes', 'study group', 'scholarly', 
                'literacy', 'education loan', 'tuition fees', 'degree plan', 'capstone', 
                'honor roll', 'classroom', 'board exam', 'extracurricular', 'credit hours',
                'academic year', 'semester', 'trimester', 'quarter', 'placement', 'career counseling'
            ],
                        
            salary: [
                'salary', 'pay', 'wage', 'income', 'compensation', 'bonus', 'stipend', 'earnings', 
                'hourly rate', 'annual salary', 'weekly pay', 'bi-weekly pay', 'monthly pay', 'commission', 
                'overtime', 'double time', 'gross pay', 'net pay', 'base salary', 'base pay', 'contract pay', 
                'performance bonus', 'holiday pay', 'stock options', 'equity', 'profit sharing', 'tip', 'tips', 
                'gratuity', 'incentive', 'allowance', 'living wage', 'pension', 'retirement fund', 'health benefits', 
                'dental benefits', 'vision benefits', 'insurance', '401k', 'retirement plan', 'pension plan', 
                'payroll', 'salary increase', 'raise', 'merit increase', 'pay scale', 'pay grade', 'pay band', 
                'pay structure', 'gross income', 'net income', 'freelance rate', 'contractor rate', 'salary package', 
                'compensation package', 'stipend payment', 'exempt salary', 'non-exempt salary', 'minimum wage', 
                'living wage', 'target salary', 'guaranteed pay', 'bonus structure', 'equity compensation', 
                'sign-on bonus', 'referral bonus', 'holiday bonus', 'profit sharing plan', 'bounty', 'end-of-year bonus', 
                'commission-based', 'payment terms', 'salary negotiation', 'base compensation', 'salary expectations', 
                'pay increase', 'pay for performance', 'pay transparency', 'compensation review', 'salary cap', 
                'wage gap', 'salary survey', 'wage increase', 'salary benchmark', 'employee stock options', 
                'performance-based pay', 'pay for skill', 'salary structure', 'cost of living adjustment'
            ],
            demographics: [
                'age', 'gender', 'ethnicity', 'race', 'background', 'diversity', 
                'sexual orientation', 'disability', 'ability', 'nationality', 'language', 
                'religion', 'culture', 'generation', 'generation z', 'millennials', 'baby boomer', 
                'gen x', 'generation y', 'hispanic', 'latino', 'african american', 'black', 'caucasian', 
                'asian', 'native american', 'pacific islander', 'middle eastern', 'european', 'african', 
                'caribbean', 'south asian', 'east asian', 'west indian', 'arab', 'indigenous', 'multicultural', 
                'immigrant', 'first-generation', 'second-generation', 'lgbtq+', 'bisexual', 'lesbian', 'gay', 
                'transgender', 'queer', 'non-binary', 'genderfluid', 'asexual', 'intersex', 'gender identity', 
                'gender expression', 'pronouns', 'veteran status', 'military service', 'mental health', 'psychological health',
                'socioeconomic status', 'socioeconomic background', 'income level', 'poverty', 'working class', 
                'middle class', 'upper class', 'education level', 'educational background', 'schooling', 'college degree', 
                'high school diploma', 'graduate degree', 'doctoral degree', 'associate degree', 'vocational training', 
                'work experience', 'work history', 'unemployment status', 'marital status', 'single', 'married', 
                'divorced', 'widowed', 'parental status', 'parent', 'single parent', 'caregiver', 'non-parent', 
                'fertility', 'family structure', 'household composition', 'urban', 'rural', 'suburban', 'immigrant status', 
                'refugee status', 'citizenship status', 'adopted', 'foster care', 'religious affiliation', 'atheism', 
                'agnosticism', 'spirituality', 'cultural heritage', 'regional background', 'community', 'locality', 'region'
            ],
            time: [
                'today', 'tomorrow', 'week', 'month', 'year', 'hour', 'minute', 'deadline', 'season', 
                'morning', 'afternoon', 'evening', 'night', 'next week', 'last week', 'next month', 'last month', 
                'next year', 'last year', 'quarter', 'quarterly', 'half year', 'semester', 'decade', 'century', 
                'decade', 'yesterday', 'this week', 'this month', 'this year', 'current', 'ongoing', 
                'upcoming', 'future', 'past', 'recent', 'soon', 'soon after', 'soon enough', 'long term', 
                'short term', 'long run', 'short run', 'dawn', 'dusk', 'midday', 'midnight', 'morning shift', 
                'evening shift', 'noon', 'today morning', 'tomorrow morning', 'today afternoon', 'tomorrow afternoon', 
                'tonight', 'this morning', 'this afternoon', 'this evening', 'this night', 'within a week', 
                'within a month', 'within a year', 'within hours', 'within minutes', 'in the future', 'in the past',
                'time frame', 'time period', 'timeline', 'schedule', 'appointment', 'deadline', 'due date', 
                'time limit', 'delay', 'wait', 'wait time', 'elapsed', 'elapsed time', 'timing', 'clock', 
                'watch', 'countdown', 'moment', 'instant', 'urgent', 'immediate', 'long ago', 'ancient', 
                'age', 'era', 'epoch', 'time span', 'time window', 'calendar', 'agenda', 'chronological', 'hourly',
                'daily', 'weekly', 'monthly', 'yearly', 'annually', 'biweekly', 'bimonthly', 'quarterly', 
                'seasonal', 'anniversary', 'decadal', 'biannual', 'time zone', 'timezone', 'am', 'pm', 
                'timezone conversion', 'daylight savings', 'sunrise', 'sunset', 'solstice', 'equinox'
            ],
            experience: [
                'experience', 'years', 'knowledge', 'skills', 'expertise', 'background', 'internship', 
                'training', 'apprenticeship', 'qualification', 'proficiency', 'mastery', 'competence', 
                'ability', 'capability', 'expert', 'specialist', 'novice', 'beginner', 'intermediate', 
                'advanced', 'seasoned', 'veteran', 'professional', 'novice', 'competent', 'proficient', 
                'skilled', 'accomplished', 'certification', 'licensing', 'diploma', 'degree', 'credentials', 
                'relevant', 'practical', 'hands-on', 'fieldwork', 'real-world', 'applied', 'classroom', 
                'formal education', 'on-the-job training', 'work experience', 'employment history', 
                'career history', 'resume', 'portfolio', 'projects', 'personal projects', 'side projects', 
                'volunteer work', 'volunteer experience', 'freelance', 'freelancing', 'self-taught', 'learning', 
                'self-study', 'growth', 'development', 'advancement', 'leadership experience', 'management experience',
                'teamwork', 'collaboration', 'problem-solving', 'communication', 'interpersonal', 'analytical', 
                'critical thinking', 'time management', 'organization', 'responsibility', 'supervision', 
                'mentorship', 'coaching', 'training others', 'teaching', 'consulting', 'advisory', 'public speaking', 
                'presentation', 'negotiation', 'customer service', 'sales', 'marketing', 'IT skills', 'technical skills', 
                'software proficiency', 'coding', 'programming', 'research experience', 'creative experience', 
                'artistic experience', 'project management', 'leadership roles', 'managerial experience', 'assistant', 
                'team leader', 'director', 'executive', 'entrepreneurial experience', 'startup experience', 'startup', 
                'business experience', 'strategic experience', 'decision-making', 'multitasking', 'working under pressure',
                'client-facing experience', 'stakeholder management', 'cross-functional', 'cross-departmental', 
                'global experience', 'international experience', 'cultural experience', 'industry experience', 'sector experience', 
                'training courses', 'workshops', 'seminars', 'conferences', 'continuous learning', 'upskilling', 'reskilling', 
                'learning opportunities', 'talent development', 'skill-building'
            ],
            
            benefit: [
                'benefit', 'healthcare', 'vacation', 'bonus', 'insurance', 'pension', '401k', 
                'retirement', 'paid time off', 'PTO', 'sick leave', 'parental leave', 'maternity leave', 
                'paternity leave', 'holiday pay', 'paid holidays', 'personal days', 'mental health days', 
                'wellness program', 'gym membership', 'fitness reimbursement', 'stock options', 'equity', 
                'profit sharing', 'performance bonus', 'commission', 'incentive', 'employee discount', 
                'company car', 'tuition reimbursement', 'education assistance', 'training stipend', 
                'continuing education', 'childcare assistance', 'transportation subsidy', 'public transit pass', 
                'relocation assistance', 'work-from-home stipend', 'internet reimbursement', 'mobile phone allowance', 
                'meal reimbursement', 'company laptop', 'company phone', 'dental insurance', 'vision insurance', 
                'life insurance', 'disability insurance', 'accident insurance', 'short-term disability', 
                'long-term disability', 'health savings account', 'HSA', 'flexible spending account', 'FSA', 
                'employee assistance program', 'EAP', 'legal assistance', 'financial planning', 'mental health support', 
                'identity theft protection', 'compliance training', 'team-building activities', 'employee recognition', 
                'employee of the month', 'paid parental leave', 'adoption assistance', 'employee stock purchase plan', 
                'sabbatical leave', 'time off for volunteering', 'company retreats', 'wellness allowance', 'corporate discounts', 
                'peer recognition', 'bonus structure', 'salary increase', 'cost-of-living adjustment', 'paid training', 
                'job security', 'professional development', 'growth opportunities', 'career advancement', 
                'work-life balance', 'family leave', 'personal growth program', 'employee-driven projects', 
                'company culture', 'employee feedback program', 'career coaching', 'mentoring', 'coaching programs', 
                'vacation days', 'unlimited PTO', 'job sharing', 'part-time benefits', 'freelancer benefits', 'intern benefits', 
                'on-site childcare', 'company events', 'work-life flexibility', 'in-office perks', 'remote work benefits', 
                'virtual wellness program', 'home office stipend', 'networking opportunities', 'travel allowances', 
                'paid volunteer time', 'creative freedom', 'employee engagement activities', 'company-sponsored events', 
                'birthday leave', 'social events', 'company parties', 'team lunch', 'cultural holidays', 'family-friendly benefits'
            ],
            company: [
                'company', 'corporation', 'business', 'startup', 'organization', 'firm', 'enterprise', 
                'brand', 'startup', 'multinational', 'LLC', 'inc', 'incorporated', 'partnership', 'cooperative', 
                'association', 'agency', 'consultancy', 'nonprofit', 'ngo', 'foundation', 'social enterprise', 
                'public company', 'private company', 'family business', 'tech company', 'software company', 
                'e-commerce', 'retail', 'manufacturer', 'supplier', 'distributor', 'wholesaler', 'franchise', 
                'conglomerate', 'holding company', 'venture capital', 'angel investment', 'business venture', 
                'joint venture', 'subsidiary', 'affiliate', 'small business', 'local business', 'global company', 
                'tech startup', 'digital agency', 'consulting firm', 'real estate company', 'law firm', 
                'investment firm', 'banking institution', 'financial institution', 'insurance company', 
                'media company', 'publishing house', 'construction company', 'design studio', 'ad agency', 
                'public relations firm', 'accounting firm', 'law office', 'healthcare provider', 'hospital', 
                'medical practice', 'restaurant chain', 'food service', 'hotel chain', 'travel agency', 
                'tourism company', 'educational institution', 'research institute', 'think tank', 'event planning', 
                'marketing agency', 'tech startup', 'content creator', 'solopreneur', 'freelance business', 
                'cloud service provider', 'consulting agency', 'PR firm', 'real estate agency', 'production company', 
                'design agency', 'media outlet', 'app developer', 'product manufacturer', 'tech conglomerate', 
                'multinational corporation', 'trading company', 'retail business', 'investment company', 
                'sports team', 'broadcasting company', 'publishing company', 'creative agency', 
                'e-learning company', 'corporate brand', 'multinational enterprise', 'innovative business', 
                'government agency', 'startup accelerator', 'incubator', 'research and development firm', 
                'education company', 'distribution center', 'manufacturing firm', 'logistics company', 
                'customer service provider', 'IT company', 'tech conglomerate', 'biotech company', 'pharmaceutical company'
            ],
            preferences: [
                'remote', 'full-time', 'part-time', 'flexible', 'on-site', 'contract', 
                'freelance', 'temporary', 'internship', 'volunteer', 'seasonal', 'shift work', 
                'night shift', 'weekend shift', 'early shift', 'late shift', 'compressed workweek', 
                'telecommute', 'hybrid', 'freelancer', 'project-based', 'contract-to-hire', 
                'gig work', 'consulting', 'salaried', 'hourly', 'overtime', 'weekdays', 'weekends', 
                '9-5', 'flex hours', 'split shifts', 'remote-first', 'work from home', 'work-life balance', 
                'travel required', 'no travel', 'relocation', 'no relocation', 'international', 'domestic', 
                'part-time remote', 'full-time remote', 'remote-first company', 'local candidates only', 
                'open to relocation', 'position open to contract', 'fixed term', 'open to temporary work', 
                'available immediately', 'available soon', 'immediate start', 'no weekend work', 
                'flexible hours', 'flex-time', 'work from anywhere', 'office-based', 'in-office', 
                'work schedule flexibility', 'non-traditional hours', 'family-friendly hours', 
                'creative work schedule', 'location independent', 'no overtime', 'high salary expectations', 
                'competitive salary', 'job stability', 'remote work flexibility', 'company culture fit', 
                'career growth opportunities', 'autonomy in work', 'team-oriented work', 'project management', 
                'leadership opportunities', 'collaborative environment', 'mentorship', 'skill development', 
                'workplace wellness', 'benefits package', 'health insurance', 'professional development', 
                'no commute', 'commuting distance', 'transportation stipend', 'no commuting necessary'
            ],
            relationship: [
                'family', 'partner', 'friend', 'colleague', 'supervisor', 'manager', 'team', 
                'boss', 'employee', 'mentor', 'mentee', 'co-worker', 'leader', 'fellow', 'peer', 
                'assistant', 'director', 'executive', 'HR', 'recruiter', 'consultant', 'advisor', 
                'client', 'customer', 'vendor', 'supplier', 'stakeholder', 'business partner', 
                'business associate', 'account manager', 'project manager', 'team lead', 'subordinate', 
                'assistant manager', 'team member', 'group member', 'collaborator', 'helper', 'staff', 
                'intern', 'apprentice', 'trainee', 'chief', 'chief officer', 'founder', 'entrepreneur', 
                'co-founder', 'director of operations', 'strategist', 'administrator', 'facilitator', 
                'executive assistant', 'personal assistant', 'department head', 'division manager', 
                'customer service representative', 'salesperson', 'marketing manager', 'IT specialist', 
                'content creator', 'social media manager', 'developer', 'designer', 'engineer', 
                'creative director', 'team coordinator', 'event coordinator', 'service provider', 
                'service manager', 'consulting partner', 'board member', 'investor', 'donor', 
                'volunteer', 'charity worker', 'NGO worker', 'support staff', 'caregiver', 'spouse', 
                'child', 'parent', 'sibling', 'in-law', 'grandparent', 'uncle', 'aunt', 'cousin', 
                'neighbor', 'roommate', 'flatmate', 'housemate', 'acquaintance', 'best friend', 
                'close friend', 'trusted friend', 'loyal friend', 'team player', 'team collaborator', 
                'business contact', 'networking connection', 'work friend', 'work spouse', 'personal assistant', 
                'leadership team', 'cofounder', 'partner in crime', 'confidant'
            ],
            interest: [
                'hobby', 'interest', 'passion', 'leisure', 'sport', 'activity', 'entertainment', 
                'music', 'art', 'painting', 'drawing', 'sculpture', 'photography', 'filmmaking', 
                'writing', 'reading', 'books', 'literature', 'poetry', 'novels', 'fiction', 'non-fiction', 
                'travel', 'exploration', 'adventure', 'nature', 'outdoor', 'camping', 'hiking', 'fishing', 
                'cycling', 'swimming', 'surfing', 'skiing', 'snowboarding', 'boating', 'scuba diving', 
                'running', 'walking', 'biking', 'climbing', 'yoga', 'meditation', 'fitness', 'gym', 'workout', 
                'exercise', 'health', 'wellness', 'nutrition', 'gardening', 'cooking', 'baking', 'crafting', 
                'DIY', 'home improvement', 'knitting', 'sewing', 'puzzles', 'board games', 'card games', 
                'video games', 'chess', 'strategy games', 'e-sports', 'watching movies', 'TV shows', 'streaming', 
                'comedy', 'theater', 'musicals', 'dance', 'ballet', 'hip hop', 'street dance', 'salsa', 'zumba', 
                'photography', 'fashion', 'styling', 'modeling', 'design', 'interior design', 'architecture', 
                'auto mechanics', 'cars', 'motorcycles', 'technology', 'gadgets', 'electronics', 'coding', 
                'programming', 'app development', 'gaming', 'anime', 'comics', 'graphic novels', 'collecting', 
                'stamp collecting', 'coin collecting', 'collectible toys', 'antique collecting', 'bird watching', 
                'astrology', 'astronomy', 'science', 'history', 'philosophy', 'politics', 'volunteering', 
                'charity work', 'environmentalism', 'activism', 'community service', 'humanitarian work', 
                'languages', 'learning languages', 'public speaking', 'writing poetry', 'storytelling', 
                'debate', 'public relations', 'photography', 'social media', 'blogging', 'vlogging', 'podcasting', 
                'cooking', 'mixology', 'fashion design', 'handcrafting', 'woodworking', 'metalworking', 
                'electronics repair', 'carpentry', 'furniture making', 'upcycling', 'sustainability', 'environment', 
                'mental health awareness', 'self-improvement', 'personal growth', 'spirituality', 'religion', 
                'philanthropy', 'giving back', 'mindfulness', 'parenting', 'relationship building', 'networking', 
                'mind games', 'brain exercises', 'escape rooms', 'cardio', 'weightlifting', 'martial arts', 
                'tai chi', 'boxing', 'kickboxing', 'fencing', 'equestrian', 'horseback riding', 'zoology', 
                'volleyball', 'basketball', 'football', 'soccer', 'baseball', 'golf', 'rugby', 'boxing', 'hockey', 
                'tennis', 'badminton', 'ping pong', 'croquet', 'archery', 'bowling', 'bowling leagues'
            ],
            task: [
                'task', 'job', 'work', 'project', 'assignment', 'duty', 'responsibility', 'job description', 
                'role', 'mission', 'goal', 'objective', 'target', 'workload', 'chore', 'undertaking', 'function', 
                'operation', 'action', 'activity', 'obligation', 'commitment', 'charge', 'errand', 'job task', 
                'responsibility', 'project task', 'work assignment', 'work duty', 'objective', 'initiative', 
                'deliverable', 'deadline', 'milestone', 'priority', 'work item', 'task list', 'to-do', 'checklist', 
                'step', 'process', 'procedure', 'plan', 'schedule', 'routine', 'execution', 'management', 'supervision', 
                'coordination', 'leadership', 'consulting', 'negotiation', 'collaboration', 'problem-solving', 
                'strategy', 'analysis', 'research', 'planning', 'development', 'evaluation', 'review', 'feedback', 
                'update', 'modification', 'improvement', 'innovation', 'optimization', 'administration', 'reporting', 
                'documentation', 'communication', 'presentation', 'training', 'learning', 'assessment', 'monitoring', 
                'execution', 'testing', 'launch', 'implementation', 'coordination', 'preparation', 'pre-planning', 
                'follow-up', 'implementation', 'finalization', 'maintenance', 'support', 'testing', 'debugging', 
                'modification', 'quality assurance', 'auditing', 'recruiting', 'delegation', 'supervision', 'evaluation'
            ],
            websiteSupport: [
                'help', 'support', 'issue', 'problem', 'assistance', 'bug', 'error', 'technical support', 
                'customer service', 'troubleshoot', 'outage', 'glitch', 'fix', 'solution', 'issue report', 
                'faq', 'guide', 'tutorial', 'documentation', 'knowledge base', 'user manual', 'support ticket', 
                'contact support', 'chat support', 'feedback', 'complaint', 'response time', 'service interruption'
            ],
            payments: [
                'payment', 'pay', 'invoice', 'billing', 'transaction', 'fee', 'charge', 'refund', 'discount', 
                'subscription', 'purchase', 'confirmation', 'receipt', 'account balance', 'payment gateway', 
                'stripe', 'paypal', 'credit card', 'debit card', 'billing address', 'payment method', 'payment plan', 
                'paywall', 'funds', 'deposit', 'withdraw', 'purchase confirmation', 'fund transfer', 'refund status'
            ],
            userAccount: [
                'account', 'login', 'register', 'profile', 'settings', 'username', 'password', 'email', 'verification', 
                'sign up', 'sign in', 'password reset', 'two-factor authentication', 'security', 'update details', 
                'privacy settings', 'notification preferences', 'account management', 'user permissions', 'admin access'
            ],
            security: [
                'security', 'privacy', 'data protection', 'encryption', 'secure', 'login attempt', 'two-factor', 'firewall', 
                'hack', 'breach', 'malware', 'spyware', 'virus', 'identity theft', 'phishing', 'scam', 'fraud', 
                'secure connection', 'password strength', 'user authentication', 'privacy policy', 'user consent'
            ],
            jobRelated: [
                'job', 'work', 'employment', 'career', 'position', 'role', 'hire', 'recruit', 'vacancy', 'opportunity', 
                'contract', 'full-time', 'part-time', 'remote', 'flexible', 'temporary', 'freelance', 'internship', 
                'gig', 'offer', 'posting', 'listing', 'job description', 'company', 'employee', 'employer', 
                'job search', 'job seeker', 'recruitment', 'onboarding', 'resume', 'cover letter', 'interview', 'salary'
            ],
            feedback: [
                'review', 'rating', 'feedback', 'comment', 'suggestion', 'opinion', 'survey', 'testimonials', 
                'experience', 'user review', 'product feedback', 'service review', 'critique', 'response', 'input', 
                'recommendation', 'survey results', 'recommendation', 'user ratings', 'star rating'
            ],
            generalInquiry: [
                'question', 'how', 'why', 'where', 'what', 'when', 'which', 'can', 'could', 'would', 'do', 'did', 
                'is', 'are', 'am', 'will', 'should', 'where can', 'what is', 'who', 'any', 'anyone', 'anybody', 
                'tell me', 'explain', 'information', 'inquire', 'ask', 'help', 'clarify', 'describe', 'details', 
                'understand', 'learn', 'suggest', 'recommend', 'advice', 'guide', 'directions', 'steps', 'assistance', 
                'know', 'need', 'looking for', 'looking to', 'interested in', 'how to', 'where to', 'is it possible', 
                'help me', 'can you explain', 'what do you mean', 'can you tell me'
            ],
            technical: [
                'technical', 'issue', 'bug', 'problem', 'error', 'malfunction', 'glitch', 'failure', 'crash', 'corrupt', 
                'broken', 'not working', 'not functioning', 'unexpected', 'fault', 'defect', 'slow', 'lag', 'delay', 
                'timeout', 'configuration', 'setup', 'incompatibility', 'missing', 'disconnected', 'unresponsive', 
                'diagnostic', 'repair', 'fix', 'troubleshoot', 'solution', 'resolve', 'support', 'help', 'technical issue', 
                'error message', 'failed', 'bug report', 'server error', 'connection', 'reboot', 'restart', 'patch', 
                'update', 'upgrade', 'support ticket', 'tech help', 'tech support', 'troubleshooting', 'hardware', 
                'software', 'technical assistance', 'code error', 'system error', 'application failure', 'config issue', 
                'network issue', 'service down', 'outage'
            ],
            positive: [
                'joy', 'cheerful', 'content', 'excited', 'elated', 'pleased', 'blissful', 'delighted', 'euphoric', 'satisfied', 
                'thrilled', 'grateful', 'affectionate', 'caring', 'passionate', 'romantic', 'fond', 'tender', 'devoted', 
                'attached', 'enamored', 'proud', 'self-assured', 'empowered', 'strong', 'capable', 'determined', 'assertive', 
                'hopeful', 'optimistic', 'calm', 'peaceful', 'serene', 'tranquil', 'laid-back', 'chill', 'at ease', 'unworried', 
                'appreciative', 'thankful', 'indebted', 'blessed', 'fortunate', 'relieved'
            ],
            negative: [
                'depressed', 'sorrowful', 'melancholic', 'down', 'heartbroken', 'gloomy', 'blue', 'disheartened', 'miserable', 
                'low', 'teary', 'frustrated', 'furious', 'irritable', 'enraged', 'bitter', 'annoyed', 'infuriated', 'resentful', 
                'mad', 'hostile', 'upset', 'anxious', 'worried', 'terrified', 'scared', 'nervous', 'panicked', 'uneasy', 'stressed', 
                'fearful', 'horrified', 'let down', 'disillusioned', 'upset', 'dissatisfied', 'defeated', 'regretful', 'remorseful', 
                'ashamed', 'embarrassed', 'self-blame'
            ],
            neutral: [
                'indifferent', 'uninterested', 'restless', 'apathetic', 'disengaged', 'dull', 'tired', 'unstimulated', 'neutral', 
                'detached', 'passive', 'unmoved', 'unconcerned', 'reflective', 'sentimental', 'wistful', 'yearning', 'reminiscent', 
                'pensive', 'melancholic'
            ],
            excitement: [
                'energetic', 'hyped', 'pumped', 'exhilarated', 'eager', 'enthusiastic', 'eager', 'thrilled', 'zealous', 'anticipatory', 
                'inquisitive', 'intrigued', 'puzzled', 'fascinated', 'questioning', 'thoughtful', 'searching', 'investigative'
            ],
            frustration: [
                'stressed', 'overwhelmed', 'irritated', 'annoyed', 'vexed', 'upset', 'agitated', 'troubled', 'perplexed', 'confused', 
                'unclear', 'uncertain', 'lost', 'unsure', 'bewildered'
            ],
            loneliness: [
                'isolated', 'lonely', 'abandoned', 'neglected', 'alienated', 'disconnected', 'desolate', 'solitary', 'withdrawn', 
                'detached', 'excluded', 'separate', 'unsupported', 'unimportant'
            ],
            hope: [
                'optimistic', 'hopeful', 'inspired', 'believing', 'positive', 'uplifting', 'encouraged', 'aspiring', 'motivated', 
                'driven', 'focused', 'determined', 'goal-oriented', 'enthusiastic', 'ambitious', 'purposeful'
            ],
            surprise: [
                'astonished', 'amazed', 'shocked', 'surprised', 'taken aback', 'dumbfounded', 'startled', 'wide-eyed', 'speechless', 
                'astounded', 'wowed', 'in awe', 'stunned', 'overwhelmed', 'flabbergasted'
            ],
            peace: [
                'tranquil', 'serene', 'calm', 'peaceful', 'restful', 'zen', 'relaxed', 'composed', 'placid', 'at peace', 'resigned', 
                'content', 'neutral', 'nonchalant', 'unconcerned', 'adjusted'
            ],
            skepticism: [
                'suspicious', 'doubtful', 'unsure', 'questioning', 'hesitant', 'unconvinced', 'skeptical', 'cynical'
            ],
            regret: [
                'disappointed', 'remorseful', 'sorry', 'contrite', 'apologetic', 'regretful', 'upset', 'sorrowful', 'self-doubt', 
                'insecure', 'uncertain', 'unconfident', 'doubtful', 'hesitant', 'second-guessing'
            ],
            disgust: [
                'nauseous', 'repulsed', 'revolted', 'sickened', 'disgusted', 'horrified', 'appalled', 'offended'
            ],
            grief: [
                'mourning', 'bereaved', 'devastated', 'heartbroken', 'sorrowful', 'heavy', 'weeping', 'downcast', 'empty', 'mournful', 
                'bereft', 'desolate', 'lonely', 'grieving', 'abandoned'
            ]
        };
        
        
        
    let states = {
            "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", 
            "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", 
            "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", 
            "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", 
            "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", 
            "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", 
            "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", 
            "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", 
            "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", 
            "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", 
            "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", 
            "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming"
        };



        const categoryKeys = Object.keys(categories);

        console.log(categoryKeys);
        


// Tokenize the input, including math symbols and numbers
function tokenize(input) {
    const regex = /[\w'-]+|[+\-*/()]|[\d,.]+/g; // Match words, numbers, and math symbols
    return input.match(regex) || [];
}


// Detect and evaluate math-related queries
function detectAndEvaluateMath(tokens) {
    const mathTokens = [];
    let containsMathSymbol = false;

    tokens.forEach(token => {
        if (categories.math.includes(token) || token.match(/[+\-*/]/)) {
            containsMathSymbol = true; // Math-related symbol detected
        }
        mathTokens.push(token); // Add to potential math expression
    });

    // If math symbols or terms are detected, evaluate the math expression
    if (containsMathSymbol) {
        try {
            const mathExpression = mathTokens.join(' ').replace(/,/g, ''); // Join tokens into a valid expression
            const result = eval(mathExpression); // Safely evaluate the expression
            return `The result of your calculation (${mathExpression}) is ${result.toFixed(2)}.`;
        } catch (error) {
            return "I couldn't evaluate that expression. Please check your input.";
        }
    }
    return null; // No math-related input detected
}

// Function to calculate monthly salary
function calculateMonthlySalary(annualSalary) {
    return annualSalary / 12;
}

// Detect salary queries
function detectSalaryQuery(tokens) {
    let salary = null;
    let keyword = null;

    tokens.forEach(token => {
        if (token.match(/^\$?\d{1,3}(?:,\d{3})*(?:\.\d+)?$/)) { // Detect currency values
            salary = parseFloat(token.replace(/[^0-9.-]+/g, "")); // Clean and convert to number
        }
        if (categories.math.includes(token)) {
            keyword = token;
        }
    });

    return { salary, keyword };
}



// Normalize locations by matching location abbreviations and full names
function normalizeLocations(tokens, categories) {
    return tokens.map(token => {
        if (categories.states.includes(token)) {
            return token.toLowerCase();
        }
        return token;
    });
}

// Implement basic fuzzy matching using Levenshtein distance
function fuzzyMatch(word, categoryWords, threshold = 0.8) {
    const matches = categoryWords.filter(categoryWord => {
        const similarity = calculateLevenshteinDistance(word, categoryWord);
        const maxLength = Math.max(word.length, categoryWord.length);
        return (similarity / maxLength) >= threshold;  // Return words that are at least 80% similar
    });
    return matches;
}

// Function to calculate Levenshtein distance between two words
function calculateLevenshteinDistance(a, b) {
    const tmp = [];
    for (let i = 0; i <= b.length; i++) {
        tmp[i] = [i];
    }
    for (let i = 0; i <= a.length; i++) {
        tmp[0][i] = i;
    }
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            tmp[j][i] = Math.min(
                tmp[j - 1][i] + 1,
                tmp[j][i - 1] + 1,
                tmp[j - 1][i - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
            );
        }
    }
    return tmp[b.length][a.length];
}

// Expand synonyms by using fuzzy matching
function expandSynonyms(tokens, category, categories) {
    return tokens.map(token => {
        if (categories[category]) {
            const matches = fuzzyMatch(token, categories[category]);
            if (matches.length > 0) {
                return matches[0]; // Return the first match
            }
        }
        return token;  // Return token as-is if no match found
    });
}

// Categorize tokens into predefined categories and return both category and word
function categorizeTokens(tokens, categories) {
    const mappedWords = [];

    tokens.forEach(token => {
        // Match against each category
        Object.keys(categories).forEach(category => {
            const regexLocation = new RegExp('\\b(' + categories.location.join('|') + ')\\b', 'i');
            if (categories[category].includes(token) || (category === 'location' && regexLocation.test(token))) {
                mappedWords.push({ category: category, word: token });
            }
        });
    });

    return mappedWords;
}
function generateSuggestions(categorizedTokens) {
    const suggestions = [];
    const dynamicPhrases = {
        excitement: [
            "You sound thrilled! How can I assist you further?",
            "That's awesome to hear! What would you like to explore today?",
            "I love the excitement! Need any help?"
        ],
        frustration: [
            "I'm sorry to hear that. How can I make things easier for you?",
            "It seems you're frustrated. Let’s fix this together. What's the issue?",
            "I’m here to help—let me know what’s going on."
        ],
        math: [
            "Math question? I’ve got you! Ask me something like 'What's 45 times 12?'.",
            "Need calculations? Just type something like 'Calculate 5000/12'.",
        ],
        salary: [
            "To calculate monthly pay, just say something like 'What’s $60,000 annually per month?'.",
            "Curious about your pay? I can break down annual salaries for you!"
        ]
    };

    categorizedTokens.forEach(({ category, word }) => {
        switch (category) {
            case 'job':
                suggestions.push(`Looking for jobs related to "${word}"? Start browsing on our [Job Listings Page](#).`);
                break;
            case 'jobSearch':
                suggestions.push(`Want to search by keyword, location, or company? Head to our [Job Search Page](#).`);
                break;
            case 'jobType':
                suggestions.push(`Whether it's full-time, freelance, or remote work—explore your options [here](#).`);
                break;
            case 'salary':
                suggestions.push(randomChoice(dynamicPhrases.salary));
                break;
            case 'math':
                suggestions.push(randomChoice(dynamicPhrases.math));
                break;
            case 'websiteSupport':
                suggestions.push(`For technical help, check out our [Support Center](#) or contact us.`);
                break;
            case 'excitement':
                suggestions.push(randomChoice(dynamicPhrases.excitement));
                break;
            case 'frustration':
                suggestions.push(randomChoice(dynamicPhrases.frustration));
                break;
            default:
                suggestions.push(`Looking for more details about "${word}"? Let me know how I can assist.`);
                break;
        }
    });

    return suggestions;
}

// Utility function to randomize similar responses
function randomChoice(options) {
    return options[Math.floor(Math.random() * options.length)];
}

function processMessage(message, categories) {
    const userInput = message.toLowerCase();
    let tokens = tokenize(userInput);

    // 1. Handle math expressions
    const mathResponse = detectAndEvaluateMath(tokens);
    if (mathResponse) {
        return `Here's your result: ${mathResponse}`;
    }

    // 2. Handle salary queries
    const { salary, keyword } = detectSalaryQuery(tokens);
    if (salary && keyword) {
        const monthlySalary = calculateMonthlySalary(salary);
        return `Your monthly salary is approximately **$${monthlySalary.toFixed(2)}** if you earn **$${salary} annually**.`;
    }

    // 3. Categorize tokens
    tokens = normalizeLocations(tokens, categories);
    const categorizedTokens = categorizeTokens(tokens, categories);

    // 4. Generate and prioritize suggestions
    const suggestions = generateSuggestions(categorizedTokens);

    // 5. Dynamic response based on context
    const inputType = determineInputType(tokens, categories);
    let response = '';

    switch (inputType) {
        case 'question':
            response = "Great question! Here's what I found:";
            break;
        case 'request':
            response = "Let’s get that sorted for you! Here's what I suggest:";
            break;
        case 'statement':
            response = "Got it! Here's something that might help:";
            break;
        default:
            response = "I’m here to assist you. Here's what I found:";
    }

    // Return the main response and suggestions
    return `${response}\n\n${suggestions.join('\n')}`;
}
