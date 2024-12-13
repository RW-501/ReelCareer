// Function in brain.js that you want to call later

  


   
        // Categories and keywords
        const categories = {
            job: [
                'job','jobs', 'work', 'employment', 'career', 'position', 'role', 
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
        
            vehicle: [
                'car', 'truck', 'vehicle', 'automobile','company car', 'company vehicle', 'bike', 'motorcycle', 'suv', 'van', 
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
  
            location: [
'state', 'my state', 'local', 'near me', 'nearby', 'close to me', 
'by me', 'city', 'town', 'area', 'in', 'by', 'around', 'close', 
'region', 'neighborhood', 'metro', 'jobs in', 'job in', 'downtown', 'uptown', 'suburb', 
'urban', 'rural', 'in my area', 'around me', 'my location', 
'current location', 'within city','find jobs', 'within town', 'travel nearby',


    "austin", "atlanta", "albuquerque", "arlington", "anaheim", "anchorage", "augusta", "alexandria", "amarillo", "anchorage",
    "asheville", "akron", "allentown", "aurora", "athens", "arvada", "abilene", "ann arbor", "avondale", "appleton",
    "birmingham", "baltimore", "buffalo", "boston", "boise", "bakersfield", "bridgeport", "brownsville", "bellevue", "bend",
    "boulder", "bismarck", "burlington", "bay area", "bridgeport", "blacksburg", "boca raton", "bentonville", "beaverton", "burlington",
    "columbus", "chicago", "charlotte", "cincinnati", "cleveland", "colorado springs", "corpus christi", "chattanooga", "chesapeake", "columbia",
    "cary", "charleston", "champaign", "culver city", "clinton", "clearwater", "charlottesville", "cedar rapids", "corona", "cleveland heights",
    "dallas", "denver", "detroit", "durham", "doral", "des moines", "denton", "dothan", "dayton", "draper",
    "el paso", "eugene", "evansville", "evanston", "erie", "escondido", "elgin", "encinitas", "evanston", "east lansing",
    "fort worth", "fresno", "fort lauderdale", "fayetteville", "frisco", "fullerton", "flint", "fort collins", "fargo", "fishers",
    "greensboro", "grand rapids", "glendale", "gloucester", "gainesville", "greenville", "grand prairie", "gilbert", "goodyear", "garden grove",
    "houston", "henderson", "honolulu", "hartford", "hollywood", "highland", "hialeah", "hickory", "huntington", "huntsville",
    "indianapolis", "irvine", "irving", "indianapolis", "jacksonville", "jersey city", "joliet", "joplin", "jackson", "juneau",
    "kansas city", "killeen", "knoxville", "kalamazoo", "kent", "kenner", "kirkland", "kingston", "katy", "kalamazoo",
    "lubbock", "louisville", "los angeles", "long beach", "lincoln", "lansing", "louisville", "laredo", "lafayette", "lakewood",
    "memphis", "miami", "milwaukee", "minneapolis", "madison", "mesa", "montgomery", "mobile", "madison", "mesa",
    "macon", "moreno valley", "missoula", "medford", "merced", "modesto", "myrtle beach", "montpelier", "manchester", "missouri city",
    "macon", "morristown", "marion", "montrose", "mountain view", "mountain brook", "mckinney", "mcallen", "middletown", "murrieta",
    "minot", "manteca", "marietta", "macon", "moline", "mount pleasant", "mississippi", "mission viejo", "monroe", "myrtle beach",
    "melbourne", "murfreesboro", "meridian", "madison", "milford", "menifee", "marietta", "minneapolis", "murrieta", "muncie",
    "mesa", "mobile", "moreno valley", "madison", "mckinney", "murphy", "mchenry", "montgomery", "mountain view", "mcallen",
    "nashville", "new york", "new orleans", "newark", "norfolk", "naperville", "novi", "north las vegas", "newport news", "nampa",
    "omaha", "orlando", "oakland", "overland park", "oxnard", "odessa", "ontario", "oceanside", "orangetown", "o'fallon",
    "philadelphia", "phoenix", "pittsburgh", "plano", "portland", "pomona", "peoria", "pasadena", "providence", "pueblo",
    "plano", "portland", "pittsburgh", "provo", "plano", "palmdale", "pompano beach", "poughkeepsie", "peoria", "parsons",
    "queens", "quincy", "quakertown", "queen creek", "quincy", "quartzsite", "quincy", "quantico", "quakertown", "quinton",
    "raleigh", "riverside", "richmond", "rochester", "reno", "rochester", "round rock", "riverside", "rancho cucamonga", "rockford",
    "san antonio", "seattle", "san diego", "san francisco", "sacramento", "st. louis", "san jose", "st. paul", "st. petersburg", "syracuse",
    "salt lake city", "st. louis", "springfield", "saginaw", "santa clarita", "sparks", "sherman", "shreveport", "springfield", "sarasota",
    "sioux falls", "san mateo", "st. cloud", "south bend", "sun city", "salem", "santa barbara", "salinas", "south gate", "san marcos",
    "quincy", "queen creek", "quakertown", "quantico", "quinton", "queens", "quick city", "quincy", "quaker hill", "quitman",
    "raleigh", "riverside", "richmond", "rochester", "reno", "rockford", "round rock", "rancho cucamonga", "rochester", "rock hill",
    "st. louis", "san antonio", "san diego", "san francisco", "sacramento", "st. paul", "seattle", "san jose", "st. petersburg", "syracuse",
    "salt lake city", "st. louis", "springfield", "saginaw", "santa clarita", "sparks", "shreveport", "south bend", "salem", "santa barbara",
    "sioux falls", "san mateo", "st. cloud", "south gate", "santa rosa", "salinas", "south carolina", "san marcos", "sun valley", "simi valley",
    "tucson", "tampa", "toledo", "tulsa", "tallahassee", "tempe", "torrance", "tacoma", "thornton", "tustin",
    "texas city", "tallahassee", "the woodlands", "thousand oaks", "trenton", "toms river", "temecula", "topeka", "tucson", "tampa",
    "utica", "upland", "university city", "union city", "urbana", "upstate", "vallejo", "vancouver", "visalia", "virginia beach",
    "vero beach", "victorville", "valdosta", "vicksburg", "vail", "vacaville", "venice", "vancouver", "van nuys", "vicksburg",
    "wilmington", "washington", "worcester", "wichita", "west palm beach", "west covina", "wilmington", "waco", "waterloo", "westlake",
    "west hollywood", "woodbridge", "waukesha", "westland", "wayne", "wilmington", "wellington", "woodland", "woodbury", "westfield",
    "yonkers", "yuba city", "yorba linda", "yakima", "ypsilanti", "yuma", "youngstown", "zanesville", "zion", "zebulon",
    "zion", "zephyrhills", "zachary", "zanesville", "zavalla", "zebulon", "zion", "zionsville", "zapato", "zanesville",
    "zion", "zamora", "zia", "zuni", "zia", "zigler", "zachary", "zaragoza", "zedekiah", "zebulon"
  
  

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
            ],
            states: {
                "AL": "alabama", "AK": "alaska", "AZ": "arizona", "AR": "arkansas", 
                "CA": "california", "CO": "colorado", "CT": "connecticut", "DE": "delaware", 
                "FL": "florida", "GA": "georgia", "HI": "hawaii", "ID": "idaho", "IL": "illinois", 
                "IN": "indiana", "IA": "iowa", "KS": "kansas", "KY": "kentucky", "LA": "louisiana", 
                "ME": "maine", "MD": "maryland", "MA": "massachusetts", "MI": "michigan", 
                "MN": "minnesota", "MS": "mississippi", "MO": "missouri", "MT": "montana", 
                "NE": "nebraska", "NV": "nevada", "NH": "new hampshire", "NJ": "new jersey", 
                "NM": "new mexico", "NY": "new york", "NC": "north carolina", "ND": "north dakota", 
                "OH": "ohio", "OK": "oklahoma", "OR": "oregon", "PA": "pennsylvania", "RI": "rhode island", 
                "SC": "south carolina", "SD": "south dakota", "TN": "tennessee", "TX": "texas", 
                "UT": "utah", "VT": "vermont", "VA": "virginia", "WA": "washington", 
                "WV": "west virginia", "WI": "wisconsin", "WY": "wyoming"
            },
            
            money: ['money', 'income', 'wage', 'earnings', 'cost', 'revenue', 'expenses', 'budget', 'finance', 'financial'],
            numbers: ["number", "digit", "quantity", "count", "figure", "value", "total", "sum", "amount", "statistic", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],

            compare: ['like', 'same','better', 'worse', 'higher', 'lower', 'greater', 'less', 'equal', 'more', 'fewer', 'increase', 'decrease'],
            conversation: ["talk", "chat", "speak", "discuss", "converse", "dialogue", "exchange", "communication", "interaction", "discussion", "conversing", "message", "question", "answer", "reply", "respond", "gather", "meeting", "meeting up", "speak up", "talking", "conversation"],
            sports: ["sport", "game", "team", "player", "match", "competition", "athlete", "league", "coach", "training", "goal", "score", "winning", "losing", "tournament", "championship", "referee", "fan", "stadium", "arena", "football", "basketball", "soccer", "baseball", "hockey", "tennis", "running", "swimming", "boxing", "wrestling", "volleyball", "rugby", "cycling", "gymnastics", "track", "field", "exercise", "workout"],
            shopping: ["buy", "purchase", "store", "shop", "sale", "discount", "coupon", "offer", "price", "expensive", "cheap", "cost", "market", "mall", "checkout", "cart", "product", "goods", "clothes", "shoes", "electronics", "accessories", "fashion", "shopping", "retail", "online", "shopper", "customer", "storefront", "brand", "deal", "bargain", "item", "order", "transaction"],
            people: ["person", "individual", "human", "people", "family", "friend", "relative", "acquaintance", "colleague", "neighbor", "stranger", "group", "crowd", "team", "community", "society", "audience", "member", "citizen", "resident", "tourist", "employee", "employer", "leader", "follower", "adult", "child", "teenager", "elder", "man", "woman", "boy", "girl", "couple", "parent", "sibling", "partner"],
            occupation: ["job", "career", "work", "profession", "employee", "employer", "occupation", "role", "position", "job title", "workplace", "office", "salary", "pay", "hourly", "freelance", "contract", "full-time", "part-time", "intern", "manager", "director", "supervisor", "staff", "worker", "entrepreneur", "business owner", "contractor", "consultant", "technician", "specialist", "designer", "developer", "engineer", "teacher", "nurse", "doctor", "lawyer", "developer", "writer"],
            holidays: ["holiday", "vacation", "break", "trip", "celebration", "season", "festivity", "celebrate", "party", "holiday season", "christmas", "new year", "thanksgiving", "easter", "summer vacation", "winter holiday", "spring break", "fall break", "public holiday", "national holiday", "long weekend", "tourism", "getaway", "journey", "trip", "travel", "destination", "holiday resort", "traveling", "staycation", "holiday destination", "festival"],
            testing: ["test", "exam", "quiz", "assessment", "evaluation", "check", "trial", "experiment", "survey", "analysis", "questionnaire", "test case", "testing", "assessment", "feedback", "score", "results", "marks", "pass", "fail", "rating", "grade", "measure", "verify", "review", "validate", "analysis", "study", "experimentation", "result", "sample", "sample size", "benchmark"],
            resume: ["resume", "CV", "curriculum vitae", "job application", "cover letter", "qualification", "experience", "education", "skills", "references", "professional", "career", "job history", "work experience", "profile", "career summary", "objective", "accomplishments", "certification", "portfolio", "application", "job seeker", "candidate", "job candidate", "summary", "employment history", "contact information", "personal details", "interests", "achievements", "skills"],
            interview: ["interview", "question", "answer", "panel", "hiring", "recruitment", "candidate", "applicant", "job interview", "selection", "screening", "interviewee", "interviewer", "interview questions", "resume", "behavioral interview", "technical interview", "phone interview", "video interview", "group interview", "one-on-one", "follow-up", "evaluation", "feedback", "offer", "discussion", "negotiation", "job offer", "rejection", "acceptance", "hire"],
            jobPosting: ["job posting", "job ad", "advertisement", "hiring", "career opening", "vacancy", "position", "job opportunity", "career opportunity", "employment", "work", "job description", "listing", "recruitment", "job opening", "staffing", "company", "recruitment ad", "job listing", "career announcement", "career page", "job vacancy", "new hire", "application", "job search", "post a job", "job board", "company career", "job seekers", "search for jobs"],          
            question: ['who', 'what', 'where', 'when', 'why', 'how', '?'],
            request: ['please', 'can you', 'could you', 'i need', 'would you', 'help', 'show me', 'tell me'],
            statement: ['is', 'am', 'are', 'was', 'were', 'will', 'it', 'this', 'that', '.', 'I'],
        
            math: ['salary', 'pay', 'annual', 'monthly', 'sum', 'add', 'subtract', 'multiply', 'divide', '+', '-', '*', '/'],
            quantity: ['much', 'many', 'few', 'several', 'lot', 'amount', 'count', 'number', 'how much', 'how many', 'volume'],
            verbs: ['is', 'are', 'was', 'were', 'be', 'being', 'been'], // Words serving as linking verbs or auxiliary verbs
            determiners: ['this', 'that', 'these', 'those', 'a', 'an', 'the', 'any', 'some'], // Words that specify nouns
            pronouns: ['it', 'he', 'she', 'they', 'we', 'you','i', 'I', 'me', 'us', 'them', 'him', 'her'],
        
            action: [
                'find', 'search', 'wash','make', 'create', 'build', 'develop', 'work', 'apply', 'find', 'search', 'submit', 'look', 'locate', 'searching', 
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
            ]
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
console.log("tokens:", tokens);
// Check if the token matches a state abbreviation
const normalizedToken = categories[token.toUpperCase()];
if (normalizedToken) {
    return normalizedToken.toLowerCase(); // Normalize state names to lowercase
}

// Check if the token matches a state name
const foundState = Object.values(categories.states).find(state => 
    state.toLowerCase() === token.toLowerCase()
);
if (foundState) {
    return foundState.toLowerCase(); // Normalize full state names to lowercase
}

// Return the token unchanged if not a state
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
            const categoryValues = categories[category];
            
            if (category === 'states') {
                // Check if token matches any state abbreviation or full name
                const regexState = new RegExp('\\b(' + Object.keys(categoryValues).join('|') + ')\\b', 'i');
                if (regexState.test(token) || Object.values(categoryValues).map(state => state.toLowerCase()).includes(token.toLowerCase())) {
                    mappedWords.push({ category: category, word: token });
                }
            } else if (Array.isArray(categoryValues) && categoryValues.includes(token)) {
                mappedWords.push({ category: category, word: token });
            }
        });
    });

    return mappedWords;
}





function prioritizeCategories(tokens, categorizedTokens, userPreferences = {}) { 
    console.log("prioritizeCategories=====================================, "); 
    console.log("categorizedTokens, ", categorizedTokens); 
    console.log( "userPreferences,", userPreferences); 
    console.log("tokens, ", tokens); 

    // Default priorities for categories
    const priorities = getDefaultPriorities();

    // Adjust priorities based on user preferences (e.g., favorite categories)
    adjustPrioritiesForUserPreferences(priorities, userPreferences);

    // Adjust priorities based on the input type (e.g., question, request, or statement)
    adjustPrioritiesByInputType(categorizedTokens, tokens, priorities);

    // Handle emotion-based prioritization if the input contains sentiment/emotion words
    handleEmotionPrioritization(categorizedTokens, priorities);

    getWeightAdjustmentFactor(tokens);
    // Adjust priorities if the query involves an action
    prioritizeActionTokens(categorizedTokens, tokens, priorities);

    // Sort tokens based on the adjusted priorities
    const sortedTokens = sortTokensByPriority(categorizedTokens, priorities);

    return sortedTokens[0]; // Return the highest-priority match
}

// Get default priorities for categories
function getDefaultPriorities() {
    return {
        math: 1,
        salary: 2,
        jobSearch: 3,
        websiteSupport: 4,
        generalInquiry: 5,
        jobRelated: 6,
        vehicle: 7,
        location: 8,
        jobCategories: 9,
        events: 10,
        technology: 11,
        health: 12,
        emotions: 13,
        time: 14,
        experience: 15,
        benefit: 16,
        company: 17,
        preferences: 18,
        relationships: 19,
        payments: 20,
        feedback: 21,
        action: 0  // Assign the highest priority to action by default
    };
}

// Adjust priorities based on user preferences (e.g., favorite categories)
function adjustPrioritiesForUserPreferences(priorities, userPreferences) {
    if (userPreferences && userPreferences.favoriteCategories) {
        userPreferences.favoriteCategories.forEach(category => {
            priorities[category] = 1; // Give priority to favorite categories
        });
    }
}

// Adjust priorities dynamically based on the input type (e.g., question, request, or statement)
let userPreferences = {};

function adjustPrioritiesByInputType(categorizedTokens, tokens) {
    console.log("tokens:", tokens);

    const categoryWeights = {};

    categorizedTokens.forEach(({ category }) => {
        categoryWeights[category] = (categoryWeights[category] || 1) * 1.5;
    });

    const favoriteCategories = Object.entries(categoryWeights)
        .sort(([, weightA], [, weightB]) => weightB - weightA)
        .map(([category]) => category);

    userPreferences = { favoriteCategories };

    console.log("Updated User Preferences:", userPreferences);
    return categorizedTokens.map(token => ({
        ...token,
        weight: categoryWeights[token.category] || 1
    }));
}

// Return a dynamic weight adjustment factor based on the input type
function getWeightAdjustmentFactor(inputType) {
    const factors = {
        question: 0.8,
        request: 1.2,  // Requests could have slightly higher priority (e.g., 'task' and 'payments')
        statement: 1.0,
        emotion: 0.9  // Emotion-related inputs could be weighted slightly lower
    };

    return factors[inputType] || 1;  // Default to 1 if inputType is not found
}

// Handle emotion-based prioritization if the input contains sentiment/emotion words
function handleEmotionPrioritization(categorizedTokens, priorities) {
    const emotionCategories = ['excitement', 'frustration', 'hope', 'regret'];
    categorizedTokens.forEach(token => {
        if (emotionCategories.includes(token.category)) {
            priorities.emotions = 1; // High priority if emotions are involved
        }
    });
}

// Adjust priorities if the query involves an action
function prioritizeActionTokens(categorizedTokens, inputType, priorities) {
    const actionToken = categorizedTokens.find(token => token.category === 'action');
    if (actionToken) {
        priorities.action = 0; // Override with highest priority if action is involved
    }

    // Prioritize action over other categories like technology, unless it's a question involving technology
    categorizedTokens.forEach(token => {
        if (actionToken && token.category === 'technology' && inputType === 'question') {
            priorities.technology = 2; // Reduce priority for technology in questions unless it's a direct match
        }
    });
}

// Sort tokens based on the adjusted priorities
function sortTokensByPriority(categorizedTokens, priorities) {
    return categorizedTokens.sort((a, b) => {
        return (priorities[a.category] || 99) - (priorities[b.category] || 99);
    });
}



// **Handle Job Search Query Logic:**


async function handleJobQuery( tokens,categorizedTokens, userPreferences) {
    try {

        const lowerTokens = tokens
    .map(t => t.trim().toLowerCase())
    .slice(0, 10); // Limit the array to the first 10 tokens

        const bestMatch = prioritizeCategories(tokens,categorizedTokens, userPreferences );

        console.log("bestMatch ",bestMatch); 
        

    //"question" | "request" | "self-reference" | "other-reference" | "statement"
    
    




        let constraints = []; // Holds query constraints
        
        // 1. Handle Requests/Actions with Specific Words
        if (bestMatch.category === 'request' || bestMatch.category === 'action') {
            const actionWords = ['please', 'can', 'can you', 'i need', 'would you', 'help', 
                                 'show me', 'create', 'build', 'edit', 'review', 'check',
                                 'fix', 'save', 'add', 'remember', 'enhance', 'improve'];
            
            // Check if tokens match any of the action words
            const matchedActions = tokens.filter(word => actionWords.includes(word.toLowerCase()));

            console.log(`categorizedTokens ${categorizedTokens} `);
            console.log(`categorizedTokens.category ${categorizedTokens.category} `);
            console.log(`categorizedTokens.word ${categorizedTokens.word} `);
            console.log(`bestMatch.word ${bestMatch.word} `);
            console.log(`tokens for creating ${tokens} `);
            console.log(`matchedActions for creating ${matchedActions} `);

            const  learningModel_DB =  'z_LearningModel';

            if (bestMatch.word ==='add' ){
            
                
                
                    }


            return `I will ${bestMatch.word}  ${learningModel_DB}`
        }



        if (bestMatch.category === 'question') {
            const actionWords = ['who', 'what', 'where', 'when', 'why', 'how', '?'];
            
            // Check if tokens match any of the action words
            const matchedActions = tokens.filter(word => actionWords.includes(word.toLowerCase()));

            console.log(`categorizedTokens ${categorizedTokens} `);
            console.log(`categorizedTokens.category ${categorizedTokens.category} `);
            console.log(`categorizedTokens.word ${categorizedTokens.word} `);
            console.log(`bestMatch.word ${bestMatch.word} `);
            console.log(`tokens for creating ${tokens} `);
            console.log(`matchedActions for creating ${matchedActions} `);

            const  learningModel_DB =  'z_LearningModel';

   

            return `I will search for ${tokens} in ${learningModel_DB}`
        }




        if (bestMatch.category === 'generalInquiry') {
            const actionWords = ['question', 'how', 'why', 'where', 'what', 'when', 'which', 'can', 'could', 'would', 'do', 'did', 
                'is', 'are', 'am', 'will', 'should', 'where can', 'what is', 'who', 'any', 'anyone', 'anybody', 
                'tell me', 'explain', 'information', 'inquire', 'ask', 'help', 'clarify', 'describe', 'details', 
                'understand', 'learn', 'suggest', 'recommend', 'advice', 'guide', 'directions', 'steps', 'assistance', 
                'know', 'need', 'looking for', 'looking to', 'interested in', 'how to', 'where to', 'is it possible', 
                'help me', 'can you explain', 'what do you mean', 'can you tell me'];
            
            // Check if tokens match any of the action words
            const matchedActions = tokens.filter(word => actionWords.includes(word.toLowerCase()));

            console.log(`categorizedTokens ${categorizedTokens} `);
            console.log(`categorizedTokens.category ${categorizedTokens.category} `);
            console.log(`categorizedTokens.word ${categorizedTokens.word} `);
            console.log(`bestMatch.word ${bestMatch.word} `);
            console.log(`tokens for creating ${tokens} `);
            console.log(`matchedActions for creating ${matchedActions} `);

            const  learningModel_DB =  'z_LearningModel';

   

            return `I will Inquiry for ${tokens} in ${learningModel_DB}`
        }












                //handleLearningModelQuery(bestMatch, tokens, constraints learningModel_DB);
        

// Function to handle LearnModel queries
async function  handleLearningModelQuery(bestMatch, tokens, constraints, learningModel_DB) {
    try {


        // Base reference to the 'LearnModel' collection
        const learnModelRef = collection(db, learningModel_DB); 

        const finalQuery = query(learnModelRef, ...constraints);

        // Fetch the results
        const snapshot = await getDocs(finalQuery);
        const results = snapshot.docs.map(doc => doc.data());


        // 2. Combine the query with constraints
        if (constraints.length > 0) {
  
            // Return the results
            if (results.length > 0) {
   

                return results;
            } else {

                console.log(`Found ${results.length} matching directions:`);

          


                handleLearningModelRequest(bestMatch, tokens, learningModel_DB); 

                return "No matching records found in LearnModel.";
            }

        } else {
            return "No valid query parameters provided.";
        }


    } catch (error) {
        console.error("Error querying LearnModel:", error);
        return "Sorry, there was an error processing your request.";
    }
}


        
    
//readLearningModel('searchableDirections', learningModel_DB);







// Function to handle LearnModel queries
async function handleLearningModelRequest(bestMatch, tokens, learningModel_DB) {
    try {
   
        
     
  
            
            if (results.length > 0) {


            
                return results;
            } else {

                if (bestMatch.category === 'request' || bestMatch.category === 'action') {
                    const actionWords = ['please', 'can', 'can you', 'i need', 'would you', 'help', 
                                         'show me', 'create', 'build', 'edit', 'review', 'check',
                                         'fix', 'save', 'add', 'remember', 'enhance', 'improve'];
                    
                    // Check if tokens match any of the action words
                    const matchedActions = tokens.filter(word => actionWords.includes(word.toLowerCase()));
                    console.log(`tokens for creating ${tokens} `);
                    console.log(`matchedActions for creating ${matchedActions} `);

                    if (matchedActions.length > 0) {
                    
                   
                        if (bestMatch.category === 'request' || bestMatch.category === 'action' &&
                             bestMatch.word ==='add' ) {
                         
                                console.log(` ${bestMatch.word}  to ${searchableDirections} `);

                               // dataToLearningModel(bestMatch.word, tokens, learningModel_DB);
                                
                               const directionsArray = [
                                { key: bestMatch.word , value: bestMatch.word },   // Add a key-value pair for bestMatch
                                { key: matchedActions, value: matchedActions } // Add a key-value pair for matchedActions
                              ];
                              dataToLearningModel('searchableDirections', learningModel_DB, directionsArray);

                             }



                        
                    }
                }


                
                return "No matching records found in LearnModel.";
            }

        


    } catch (error) {
        console.error("Error querying LearnModel:", error);
        return "Sorry, there was an error processing your request.";
    }
}








async function dataToLearningModel(docId, learningModel_DB, directionsArray) {
    try {
        // Reference to the document in Firestore
        const docRef = db.collection(learningModel_DB).doc(docId);

        // Use arrayUnion to append the array into a field, or replace entirely
        await docRef.set(
            {
                directions: firebase.firestore.FieldValue.arrayUnion(...directionsArray)
            },
            { merge: true } // Merge with existing data
        );

        console.log(`Array added/updated successfully in document '${docId}'.`);
    } catch (error) {
        console.error('Error adding/updating array: ', error);
    }
}

  
  /**
 * Reads the 'directions' array from a Firestore document.
 *
 * @param {string} docId - The ID of the document to read.
 * @param {string} learningModel_DB - The name of the collection.
 */
async function readLearningModel(docId, learningModel_DB) {
    try {
        // Reference to the document in the collection
        const docRef = db.collection(learningModel_DB).doc(docId);

        // Get the document snapshot
        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
            // Retrieve the 'directions' array
            const data = docSnapshot.data();
            const directionsArray = data.directions || []; // Default to an empty array if 'directions' doesn't exist

            console.log("Directions Array:", directionsArray);

            // Optional: Loop through the array to display key-value pairs
            directionsArray.forEach((item, index) => {
                console.log(`Item ${index + 1}: Key = ${item.key}, Value = ${item.value}`);
            });

            return directionsArray;
        } else {
            console.log(`No document found with ID '${docId}'.`);
            return [];
        }
    } catch (error) {
        console.error("Error reading document: ", error);
        return [];
    }
}





/*

else                      
                              if (bestMatch.category === 'request' || bestMatch.category === 'action' &&
                                bestMatch.word ==='save' ) {
                            
                                   console.log(` ${bestMatch.word} to ${learningModel_DB} `);
                                   
                                   const directionsArray = [bestMatch.word, matchedActions];
                                   dataToLearningModel('searchableDirections', learningModel_DB, directionsArray);
                                }else                       
                                if (bestMatch.category === 'request' || bestMatch.category === 'action' &&
                                    bestMatch.word ==='edit' ) {
                                
                                       console.log(` ${bestMatch.word}  ${learningModel_DB} `);
       
                                    }else                      
                                    if (bestMatch.category === 'request' || bestMatch.category === 'action' &&
                                      bestMatch.word ==='create' ) {
                                  
                                         console.log(` ${bestMatch.word}  ${learningModel_DB} `);
         
                                      }else                       
                                      if (bestMatch.category === 'request' || bestMatch.category === 'action' &&
                                          bestMatch.word ==='fix' ) {
                                      
                                             console.log(` ${bestMatch.word}  ${learningModel_DB} `);
             
                                          }



*/





    
        // Handle location-based searches (e.g., "jobs in New York")
        if (bestMatch.category === 'location' || bestMatch.category === 'states') {
            const location = normalizeLocations(tokens, categories);
            return fetchJobData(location);
        }
    
    
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

        // Category: Date/Time (New Jobs)
        if (['jobSearch', 'jobRelated', 'jobCategories'].includes(bestMatch.category) &&
            ['new', 'current', 'today', 'this week', 'this month'].includes(bestMatch.word)) {
            return fetchJobsByDate(bestMatch.word);
        }

        // Category: Industry
        if (bestMatch.category === 'industry') {
            const industry = bestMatch.word;
            return fetchJobsByIndustry(industry);
        }

        // Category: Requirements (Education, Experience, Skills)
        if (['education', 'experience', 'task'].includes(bestMatch.category) &&
            ['college', 'certificate', 'training', 'course', 'assessment', 'years', 'experience', 'project', 'duties', 'skills', 'talents', 'task', 'plan'].includes(bestMatch.word)) {
            return fetchJobsByRequirements(lowerTokens);
        }

        // Category: Title/Position
        if (['jobSearch', 'jobRelated', 'jobCategories'].includes(bestMatch.category) &&
            ['job', 'role', 'position', 'title', 'career', 'opportunity', 'employment'].includes(bestMatch.word)) {
            return fetchJobsByTitle(lowerTokens);
        }

        // Category: Job Count/Location
        if (['state', 'location'].includes(bestMatch.category) &&
            ['count', 'total', 'job count', 'job total', 'how', 'many'].includes(bestMatch.word)) {
            return fetchJobCountByLocation(lowerTokens);
        }

        // Category: Salary
        if (bestMatch.category === 'salary') {
            const salary = detectSalaryFromTokens(lowerTokens);
            return filterJobsBySalary(salary);
        }
 
        // Handle salary-related queries (e.g., "jobs that pay over $50,000")
  if (bestMatch.category === 'salary') {
    const salary = detectSalaryQuery(tokens);
    return filterJobsBySalary(salary);
}

        // Handle job-related queries (e.g., "jobs in [location]")
        if (bestMatch && bestMatch.category === 'jobSearch') {
        
            const location = lowerTokens.filter(token => 
                categories.location.includes(token) || 
                Object.values(categories.states).includes(token)
            ).join(' ') || 'all locations';
        
            const jobType = lowerTokens.filter(token => 
                categories.jobCategories.some(job => job.includes(token))
            ).join(' ') || 'all jobs';
        
            console.log('Location:', location, 'Job Type:', jobType);
            return fetchJobData({ location, jobType });
        }



        // Default: No Match
        return "No matching query criteria were found.";

    } catch (error) {
        console.error("Error handling job query:", error);
        return "An error occurred while processing the query.";
    }
}




import {
    db, getStorage, ref, uploadBytes, getDownloadURL, limit,
  doc, arrayUnion, RecaptchaVerifier, increment, getDoc, arrayRemove, signInWithPhoneNumber,
  query, updateDoc, setDoc, addDoc, signInAnonymously, orderBy, onAuthStateChanged,
  uploadBytesResumable, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, startAfter,
  OAuthProvider, signOut, deleteDoc, getFirestore, serverTimestamp,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteObject,
  where, getDocs, storage, getAuth, collection, auth, analytics, 
  googleProvider,onSnapshot ,  batch,
  facebookProvider,writeBatch ,
  getUserId // Export the function
  } from 'https://reelcareer.co/js/module.js';
  
  
  


// **Helper Functions for Fetching Job Data:**

async function fetchJobData({ location, jobType }) {
    try {
        // Create a base query on the 'Jobs' collection
        let jobQuery = collection(db, 'Jobs'); 
        
        // Array to hold query constraints
        let constraints = [];

        // Add query constraints based on input parameters
        if (location) {
            constraints.push(where('location', 'array-contains-any', location));
        }

        if (jobType) {
            constraints.push(where('category', '==', jobType));
        }

        // Combine query constraints
        const finalQuery = query(jobQuery, ...constraints);

        // Fetch data
        const snapshot = await getDocs(finalQuery);
        const jobs = snapshot.docs.map(doc => doc.data());

        // Return the result message
        if (jobs.length > 0) {
            return `Found ${jobs.length} job(s) matching your criteria.`;
        } else {
            return "No jobs found for your search criteria.";
        }

    } catch (error) {
        console.error("Error fetching job data:", error);
        return "Sorry, there was an error fetching job data.";
    }
}



/*
async function filterJobsBySalary(salaryData) {
    const salaryThreshold = salaryData.salary;

    // Check if salaryThreshold is valid
    if (typeof salaryThreshold !== 'number' || isNaN(salaryThreshold)) {
        return "Invalid salary value provided. Please provide a valid number.";
    }

    try {
        // Create query to fetch jobs with salary >= salaryThreshold
        const jobQuery = query(
            collection(db, 'Jobs'),
            where('salary', '>=', salaryThreshold)
        );

        // Fetch data
        const snapshot = await getDocs(jobQuery);
        const jobs = snapshot.docs.map(doc => doc.data());

        // Return result
        if (jobs.length > 0) {
            return `Found ${jobs.length} job(s) that pay over $${salaryThreshold}.`;
        } else {
            return "No jobs found that match your salary criteria.";
        }
    } catch (error) {
        console.error("Error fetching job data:", error);
        return "Sorry, there was an error filtering jobs by salary.";
    }
}
*/
async function fetchJobsByCategory(category) {
    const jobQuery = query(collection(db, 'Jobs'), where('category', '==', category));
    return executeQuery(jobQuery, `Jobs in category: ${category}`);
}


async function fetchJobsByBenefits(tokens) {
    const jobQuery = query(collection(db, 'Jobs'), where('benefits', 'array-contains-any', tokens));
    return executeQuery(jobQuery, `Jobs with benefits matching: ${tokens.join(', ')}`);
}


async function fetchJobsByDate(dateFilter) {
    const currentTime = new Date();
    let startDate;

    if (dateFilter === 'today') {
        startDate = new Date(currentTime.setHours(0, 0, 0, 0));
    } else if (dateFilter === 'this week') {
        startDate = new Date();
        startDate.setDate(currentTime.getDate() - 7);
    } else if (dateFilter === 'this month') {
        startDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);
    }

    const jobQuery = query(collection(db, 'Jobs'), where('createdAt', '>=', startDate));
    return executeQuery(jobQuery, `Jobs posted since ${dateFilter}`);
}

async function fetchJobsByIndustry(industry) {
    const jobQuery = query(collection(db, 'Jobs'), where('industry', '==', industry));
    return executeQuery(jobQuery, `Jobs in the industry: ${industry}`);
}


async function fetchJobsByRequirements(tokens) {
    const jobQuery = query(collection(db, 'Jobs'), where('searchableRequirements', 'array-contains-any', tokens));
    return executeQuery(jobQuery, `Jobs matching requirements: ${tokens.join(', ')}`);
}


async function fetchJobsByTitle(tokens) {
    const jobQuery = query(collection(db, 'Jobs'), where('searchableTitle', 'array-contains-any', tokens));
    return executeQuery(jobQuery, `Jobs matching titles: ${tokens.join(', ')}`);
}

async function fetchJobCountByLocation(tokens) {
    const jobQuery = query(collection(db, 'Jobs'), where('location', 'array-contains-any', tokens));
    const snapshot = await getDocs(jobQuery);
    return `Found ${snapshot.size} jobs in location(s): ${tokens.join(', ')}`;
}

async function filterJobsBySalary(salary) {
    const jobQuery = query(collection(db, 'Jobs'), where('salary', '>=', salary));
    return executeQuery(jobQuery, `Jobs paying over $${salary}`);
}

function detectSalaryFromTokens(tokens) {
    const salary = tokens.find(token => /^\d+$/.test(token)); // Extract numeric token
    return salary ? parseInt(salary, 10) : null;
}

async function executeQuery(jobQuery, message) {
    try {
        const snapshot = await getDocs(jobQuery);
        const jobs = snapshot.docs.map(doc => doc.data());

        if (jobs.length > 0) {
            return `${message}: Found ${jobs.length} job(s).`;
        } else {
            return `${message}: No jobs found.`;
        }
    } catch (error) {
        console.error("Error executing query:", error);
        return "An error occurred while fetching job data.";
    }
}















function determineInputType(tokens) { 
    const questionWords = ['what', 'how', 'why', 'when', 'where', 'who', 'which'];
    const requestVerbs = ['calculate', 'show', 'help', 'find', 'get', 'give'];

    // Pronouns for self and others
    const selfPronouns = ['i', 'me', 'my', 'mine', 'myself'];
    const otherPronouns = ['you', 'your', 'yours', 'he', 'she', 'they', 'them', 'their', 'theirs', 'him', 'her'];

    const lowerTokens = tokens.map(token => token.toLowerCase());

    // Check for a question
    if (lowerTokens.some(token => questionWords.includes(token)) || tokens.join(' ').trim().endsWith('?')) {
        return 'question';
    }

    // Check for a request
    if (lowerTokens.some(token => requestVerbs.includes(token))) {
        return 'request';
    }

    // Check for self-references
    if (lowerTokens.some(token => selfPronouns.includes(token))) {
        return 'self-reference';
    }

    // Check for references to others
    if (lowerTokens.some(token => otherPronouns.includes(token))) {
        return 'other-reference';
    }

    // Default to statement
    return 'statement';
}








function processMessage(message) {
const userInput = message.toLowerCase();
let tokens = tokenize(userInput);

// 1. Handle math expressions
const mathResponse = detectAndEvaluateMath(tokens);
if (mathResponse) {
return `Here's your result: ${mathResponse}`;
}

// 2. Handle salary queries
const { salary, keyword } = detectSalaryQuery(tokens);


//console.log("tokens:", tokens);

// 3. Categorize tokens
//tokens = normalizeLocations(tokens, categories);
const categorizedTokens = categorizeTokens(tokens, categories);
//console.log("categorizedTokens:", categorizedTokens);











// 5. Dynamic response based on context
const inputType = determineInputType(tokens, categories);

console.log("userPreferences:", inputType);




async function fetchJobQueryAndDisplay() {
    try {
        // Wait for handleJobQuery to resolve
        let JobQuery = await handleJobQuery(tokens, categorizedTokens, userPreferences = inputType);

      //  console.log("JobQuery Result:", JobQuery); // Log the result

        // Add a 3-second delay before calling displayMessage
        if (JobQuery) {
            setTimeout(async () => {
                await displayMessage("bot", JobQuery); // Call displayMessage with 'bot' as sender
             //   console.log("JobQuery Result Sent:", JobQuery); // Log the sent message
            }, 3000); // 3-second delay
        }
    } catch (error) {
        console.error("Error in JobQuery:", error);
    }
}

// Trigger the function
fetchJobQueryAndDisplay();



}

window.processMessage  = processMessage ;