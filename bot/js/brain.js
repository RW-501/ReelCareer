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
            healthCare: [
                'healthcare', 'medicine', 'doctor', 'nurse', 'hospital', 'clinic', 'patient', 'treatment', 'surgery', 
                'wellness', 'physical therapy', 'medical', 'pharmacy', 'care', 'rehabilitation', 'mental health', 'psychiatrist', 
                'psychologist', 'nursing', 'health insurance', 'vaccine', 'medication', 'disease', 'disability', 'healthcare provider',
                'elderly care', 'pediatric care', 'dentistry', 'optometry', 'ambulance', 'health checkup', 'health screening'
            ],
            artsAndEntertainment: [
                'art', 'performance', 'painting', 'sculpture', 'gallery', 'artist', 'exhibition', 'theater', 'cinema', 'filmmaker', 
                'director', 'musician', 'band', 'composer', 'performer', 'actor', 'actress', 'studio', 'gallery', 'animation', 
                'creative writing', 'poetry', 'novel', 'book', 'publishing', 'dance', 'theater production', 'stage', 'voice acting', 
                'music production', 'sound engineer', 'composer', 'musician', 'film editing', 'soundtrack', 'vocalist'
            ],
            retail: [
                'retail', 'store', 'shop', 'shopping', 'customer service', 'sales associate', 'cashier', 'manager', 'inventory', 
                'merchandising', 'display', 'promotion', 'retail marketing', 'sales representative', 'salesperson', 'shop assistant', 
                'store manager', 'team lead', 'product display', 'online store', 'e-commerce', 'sales floor', 'product knowledge', 
                'POS system', 'returns', 'product launching', 'brand ambassador', 'seasonal sales', 'customer satisfaction', 'store opening'
            ],
            manufacturing: [
                'manufacturing', 'factory', 'production', 'assembly', 'industrial', 'machinery', 'automation', 'engineering', 
                'production line', 'workshop', 'blue-collar', 'skilled labor', 'machine operator', 'quality control', 'workforce', 
                'manufacturing plant', 'product design', 'supply chain', 'logistics', 'material handling', 'warehouse', 'packaging', 
                'process improvement', 'lean manufacturing', 'supply management', 'inventory control', 'factory worker', 'maintenance'
            ],
            construction: [
                'construction', 'contractor', 'builder', 'blueprints', 'site', 'project manager', 'architect', 'engineer', 'electrician', 
                'plumber', 'carpenter', 'laborer', 'heavy equipment', 'excavator', 'foundation', 'framing', 'construction site', 
                'roofing', 'building materials', 'structural', 'renovation', 'remodeling', 'contracting', 'civil engineering', 'building', 
                'construction management', 'surveying', 'landscaping', 'interior design', 'architecture', 'construction worker'
            ],
            customerSupport: [
                'customer support', 'customer service', 'help desk', 'support agent', 'technical support', 'call center', 
                'client relations', 'client care', 'service representative', 'help center', 'contact center', 'live chat', 
                'phone support', 'email support', 'product support', 'issue resolution', 'client communication', 'troubleshooting', 
                'feedback', 'satisfaction', 'service recovery', 'customer experience', 'customer loyalty', 'ticketing system', 
                'CRM', 'customer inquiries', 'customer care', 'client success', 'service escalation'
            ],
            education: [
                'education', 'teaching', 'learning', 'instructor', 'tutor', 'student', 'classroom', 'school', 'university', 
                'college', 'curriculum', 'course', 'degree', 'bachelor', 'master', 'doctoral', 'certification', 'training', 
                'homework', 'assignment', 'lecturer', 'pedagogy', 'study', 'reading', 'learning style', 'student success', 
                'academic advisor', 'exam', 'test', 'study group', 'school project', 'online education', 'e-learning', 'study plan', 
                'mentor', 'research', 'lab', 'teaching assistant', 'faculty', 'graduate'
            ],
            lawAndCompliance: [
                'law', 'legal', 'attorney', 'lawyer', 'court', 'litigation', 'judiciary', 'compliance', 'contract', 'lawsuit', 
                'corporate law', 'criminal law', 'intellectual property', 'patent', 'trademark', 'employment law', 'tax law', 
                'legal advice', 'legal documents', 'law enforcement', 'criminal justice', 'family law', 'legal counsel', 'regulations', 
                'court proceedings', 'trial', 'arbitration', 'mediation', 'legal compliance', 'policy', 'law firm', 'judicial', 
                'insurance', 'regulatory affairs', 'dispute resolution', 'negotiation'
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
            duration: ["second", "seconds", "minute", "minutes", "hour", "hours", "day", "days", "week", "weeks", "month", "months"],
            money: ['money', 'income', 'wage', 'earnings', 'cost', 'revenue', 'expenses', 'budget', 'finance', 'financial', 'profit', 'loss', 'savings', 'investment'],
            numbers: ['number', 'digit', 'quantity', 'count', 'figure', 'value', 'total', 'sum', 'amount', 'statistic', 'zero', 'one', 'two', 'three', 'four', 'five',
                 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'thirty',
                  'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred', 'thousand', 'million', 'billion', 'trillion', 'percentage', 'percent', 'ratio', '0', '1', '2',
                   '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '30', '40', '50', '60', '70', '80', '90', '100', '1000', '1000000', '1000000000', '1e3', '1e6', '1e9'],

            average: ['average', 'mean', 'median', 'mode', 'balance', 'rate', 'percentage'],
            paragraphs: ['paragraph', 'sentence', 'text', 'section', 'block', 'content', 'document', 'line', 'phrase'],
            compare: ['like', 'same', 'better', 'worse', 'higher', 'lower', 'greater', 'less', 'equal', 'more', 'fewer', 'increase', 'decrease', 'similar', 'different', 'versus'],
            conversation: ['talk', 'chat', 'speak', 'discuss', 'dialogue', 'exchange', 'communication', 'interaction', 'discussion', 'message', 'reply', 'conversation', 'debate', 'negotiation'],
            sports: ['sport', 'game', 'match', 'competition', 'athlete', 'league', 'team', 'training', 'score', 'tournament', 'referee', 'football', 'basketball', 'tennis'],
            shopping: ['buy', 'purchase', 'store', 'shop', 'sale', 'discount', 'cart', 'product', 'goods', 'price', 'checkout', 'customer', 'order', 'transaction'],
            people: ['person', 'individual', 'human', 'family', 'friend', 'colleague', 'crowd', 'community', 'citizen', 'employee', 'employer', 'leader'],
            occupation: ['job', 'career', 'profession', 'role', 'position', 'employment', 'contract', 'freelance', 'manager', 'engineer', 'teacher', 'nurse', 'developer'],
            holidays: ['holiday', 'vacation', 'trip', 'season', 'celebration', 'festival', 'christmas', 'new year', 'thanksgiving', 'travel'],
            testing: ['test', 'exam', 'quiz', 'assessment', 'survey', 'analysis', 'check', 'results', 'feedback', 'rating', 'score', 'evaluation'],
            resume: ['resume', 'CV', 'curriculum vitae', 'cover letter', 'job application', 'skills', 'experience', 'education', 'references'],
            interview: ['interview', 'question', 'answer', 'hiring', 'screening', 'interviewer', 'candidate', 'feedback', 'negotiation'],
            jobPosting: ['job posting', 'job ad', 'career opening', 'vacancy', 'position', 'recruitment', 'job listing'],
            question: ['who', 'what', 'where', 'when', 'why', 'how', '?'],
            request: ['please', 'can you', 'could you', 'would you', 'help', 'show me', 'tell me'],
            statement: ['is', 'am', 'are', 'was', 'will', 'it', 'this', 'that', '.'],
            math: ['salary', 'pay', 'sum', 'add', 'subtract', 'multiply', 'divide', '+', '-', '*', '/'],
            quantity: ['much', 'many', 'few', 'several', 'amount', 'count', 'number', 'volume'],
            verbs: ['is', 'are', 'was', 'be', 'been', 'do', 'does', 'make'],
            determiners: ['this', 'that', 'these', 'those', 'a', 'an', 'the'],
            pronouns: ['I', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'who', 'what', 'which'],
            title: ['title', 'name', 'heading', 'label', 'alias', 'caption'],
            tag: ['tag', 'label', 'keyword'],
            description: ['description', 'overview', 'summary', 'details'],
            articles: ['the', 'a', 'an'],
            conjunctions: ['and', 'but', 'or', 'nor', 'for', 'so', 'yet'],

            prepositions: ['in', 'on', 'at', 'by', 'with', 'to', 'from', 'about', 'over', 'under', 'between', 'through', 'during'],
            auxiliaryVerbs: ['is', 'are', 'was', 'were', 'be', 'been', 'being', 'has', 'had', 'have', 'do', 'does', 'did', 'can', 'may', 'will', 'would'],
            adverbs: ['not', 'more', 'most', 'less', 'least', 'how', 'when', 'where', 'there', 'here', 'also', 'always', 'never', 'too'],
            interrogatives: ['who', 'what', 'where', 'when', 'how', 'why'],

            determiners: ['this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'their', 'our', 'some', 'any', 'each'],
            comparativesSuperlatives: ['more', 'most', 'less', 'least', 'better', 'best', 'worse', 'worst'],
            possessives: ['my', 'your', 'his', 'her', 'its', 'our', 'their'],


            misspellings: [
                'teh', 'recieve', 'definately', 'seperate', 'occurence', 'acommodate', 
                'embarras', 'concious', 'neccessary', 'publically', 'truely', 'untill', 
                'wich', 'comming', 'mispell', 'persue', 'guage', 'acheive', 'arguement', 'beleive', 'calender', 'carribean', 'cemetary', 'collegue',  
'concieve', 'decieve', 'dilema', 'enviroment', 'existince', 'familliar', 'finaly', 'foriegn', 'freind', 'goverment',
'grafic', 'gratefull', 'hight', 'idiosyncracy', 'ignorence', 'imediately', 'independant', 'interupt', 'jewelery', 
'judgement', 'knowlege', 'liason', 'lightening', 'maintainance', 'medeval', 'millenium', 'mispellings', 'misterious',  
'mixure', 'morgage', 'neccessity', 'ocasion', 'oppurtunity', 'parliment', 'pavillion', 'permenant', 'playwrite',  
'possable', 'potatos', 'prefered', 'professer', 'pronounciation', 'propoganda', 'protocal', 'reciept', 'reconize', 
'refering', 'relise', 'religous', 'remeber', 'renumeration', 'reposess', 'resistence', 'rythm', 'satelite', 'scedule',
'sence', 'seige', 'seperately', 'signiture', 'sillhouette', 'similiar', 'smoothe', 'speach', 'stong', 'strenght',  
'strenghen', 'subconsious', 'substract', 'succesful', 'suceed', 'supprise', 'surpress', 'temperment', 'thier',  
'tommorow', 'tounge', 'twelth', 'tyrany', 'unforseen', 'unfortunatly', 'useing', 'vacume', 'vehical', 'volcanoe', 
'wierd', 'withold', 'wich', 'realy', 'teh', 'recieve', 'adress', 'wich', 'untill', 'truely', 'suprise', 'comming', 'buisness', 'neccessary',
'occuring', 'dont', 'wont', 'cant', 'thier', 'alot', 'its', 'whos', 'there', 'your',  
'youre', 'wether', 'wierd', 'finnaly', 'heros', 'aswell', 'wich', 'peice', 'becuase', 'definately',  
'seperate', 'occurence', 'acommodate', 'embarras', 'concious', 'publically', 'ocassion', 'miniture',  
'tommorrow', 'oppisite', 'alright', 'arguement', 'beleive', 'carreer', 'freind', 'interupt', 'liquify',  
'mentaly', 'mispell', 'movment', 'nowdays', 'procede', 'remeber', 'restraunt', 'similer', 'strenght',  
'thier', 'tommorow', 'truely', 'unfortunatly', 'vaccum', 'vehical', 'verticle', 'wierd', 'wich',  
'agian', 'bellow', 'definate', 'empyt', 'futher', 'gues', 'ignor', 'insted', 'jepardy', 'knolwedge',  
'lable', 'medcine', 'necesary', 'ninty', 'offcially', 'perhas', 'pritty', 'quater', 'realize',  
'reffer', 'seige', 'simpy', 'stricly', 'threshhold', 'usualy', 'warrent', 'wholy', 'adress', 'suprise', 'buisness', 'occuring'
            ],
            Slang : [ 'ya', 'gonna', 'wanna', 'ain\'t', 'lemme', 'gotta', 'sorta', 'kinda', 'ainy', 'coulda',  
'thang', 'neva', 'whassup', 'brotha', 'sistah', 'dat', 'dis', 'finna', 'boutta', 'bruh',  
'thot', 'bae', 'fr', 'cap', 'lit', 'dope', 'onfleek', 'noob', 'stfu', 'yall',  
'cuz', 'nuffin', 'tryna', 'gimme', 'hunnid', 'omw', 'yolo', 'sus', 'fam', 'rofl',  
'lmfao', 'runnin', 'ppl', 'srsly', 'plz', 'idk', 'tbh', 'ikr', 'gr8', 'luv',  
'nah', 'yea', 'smh', 'fren', 'mofo', 'hella', 'bouta', 'aint', 'creepin', 'chillin',  
'flexin', 'drippin', 'flava', 'holla', 'icedout', 'lamez', 'noice', 'peeps', 'pimpin', 'reppin',  
'scaredycat', 'sk8', 'savage', 'snap', 'salty', 'whip', 'props', 'turnt', 'vibe', 'lowkey',  
'wet', 'squad', 'werk', 'yaaas', 'bro', 'sis', 'gucci', 'dope', 'swaggy', 'toof',  
'woke', 'yeet', 'zaddy', 'fiddy', 'fo’', 'mood'   ],


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
                'replace', 'pause', 'resume', 'stop', 'start over', 'retry',        'apply for', 'search for', 'submit for', 'apply to', 'log in', 'sign up', 
                'sign in', 'reset password', 'update profile', 'post job', 'write down', 
                'fill in', 'fill out', 'download file', 'approve request', 'add to', 
                'remove from', 'start over', 'sync', 'set timer', 'turn off', 'play music',
            ],
            dataBaseTerms: [
                'firebase', 'firestore', 'database', 
                'document', 'collection', 'field', 'snapshot', 'query', 'set', 'get', 
                'update', 'delete', 'add', 'push', 'doc', 'collection group', 'reference', 
                'where', 'orderBy', 'limit', 'orderByChild', 'orderByKey', 'orderByValue', 
                'transaction', 'batch', 
                'fieldValue', 'serverTimestamp', 'arrayUnion', 'arrayRemove', 'increment', 
                 'setDoc', 'getDoc', 'updateDoc', 'deleteDoc', 'writeBatch', 
                
            ],
                // Set document (overwrite a document completely or create a new one)
    setDocument: [
        'set', 'setDoc','setDocs', 'set document', 'overwrite', 'create new', 'update completely', 
        'save document', 'write document', 'initialize', 'write data', 'add new data',
        'document creation', 'replace document'
    ],

    // Add document (add a new document to a collection)
    addDocument: [
        'add', 'addDoc', 'addDocs', 'add document', 'create', 'insert', 'insert document', 
        'push document', 'add new record', 'append document', 'new entry', 'new document',
        'document addition', 'add record', 'submit new doc', 'create new record', 
        'push data', 'create entry'
    ],

    // Update document (modify an existing document)
    updateDocument: [
        'update', 'updateDoc', 'updateDocs', 'modify', 'change document', 'edit document', 'update fields', 
        'change fields', 'update data', 'document edit', 'edit record', 'modify data', 
        'alter document', 'update information', 'update record', 'patch document', 
        'document modification', 'change record', 'revise document', 'update details'
    ]
    
        };
        
        
        
    



const abbreviations = {
    "pls": "please",
    "thx": "thanks",
    "omg": "oh my god",
    "brb": "be right back",
    "idk": "I don't know",
    "smh": "shaking my head",
    "imo": "in my opinion",
    "btw": "by the way",
    "afk": "away from keyboard",
    "np": "no problem",
    "lmk": "let me know",
    "tbh": "to be honest",
    "fyi": "for your information",
    "wfh": "working from home",
    "gtg": "got to go",
    "rofl": "rolling on the floor laughing",
    "irl": "in real life",
    "afaik": "as far as I know",
    "bbl": "be back later",
    "gr8": "great",
    "hmu": "hit me up",
    "imo": "in my opinion",
    "icymi": "in case you missed it",
    "asap": "as soon as possible",
    "ty": "thank you",
    "yw": "you're welcome",
    "nvm": "never mind",
    "ily": "I love you",
    "jk": "just kidding",
    "idc": "I don’t care",
    "ttyl": "talk to you later",
    "omw": "on my way",
    "wbu": "what about you?",
    "bff": "best friend forever",
    "tldr": "too long; didn't read",
    // Add more as necessary
};

const timeAndNumbers = {
    "sec": "second",
    "secs": "seconds",
    "min": "minute",
    "mins": "minutes",
    "hr": "hour",
    "hrs": "hours",
    "wk": "week",
    "wks": "weeks",
    "yr": "year",
    "yrs": "years",
    "tmrw": "tomorrow",
    "yday": "yesterday",
    "mo": "month",
    "mos": "months",
    "cent": "century",
    "msec": "millisecond",
    "tues": "Tuesday",
    "wed": "Wednesday",
    "thurs": "Thursday",
    "fri": "Friday",
    // Add more as necessary
};

const contextSynonyms = {
    "bad": ["poor", "awful", "terrible", "horrible", "atrocious", "dreadful", "lousy"],
    "good": ["great", "excellent", "awesome", "superb", "outstanding", "fantastic", "wonderful"],
    "fast": ["quick", "speedy", "rapid", "swift", "brisk", "nimble"],
    "slow": ["sluggish", "lethargic", "delayed", "creeping", "snail-paced"],
    "smart": ["intelligent", "clever", "brilliant", "genius", "sharp", "wise", "savvy"],
    "sick": ["awesome", "cool", "amazing"],  // In slang context
    "happy": ["joyful", "content", "pleased", "cheerful", "delighted", "elated", "thrilled"],
    "sad": ["unhappy", "miserable", "downcast", "melancholy", "heartbroken", "sorrowful", "dejected"],
    "rich": ["wealthy", "affluent", "prosperous", "loaded", "well-off"],
    "poor": ["impoverished", "needy", "destitute", "broke", "penniless"],
    "hot": ["warm", "boiling", "blazing", "scorching", "searing", "sweltering"],
    "cold": ["chilly", "freezing", "icy", "frosty", "bitter", "frigid"],
    "angry": ["mad", "furious", "irritated", "annoyed", "enraged", "exasperated"],
    "calm": ["peaceful", "serene", "tranquil", "composed", "relaxed"],
    "bright": ["luminous", "shining", "radiant", "vivid", "dazzling"],
    "dark": ["dim", "gloomy", "shadowy", "murky", "pitch-black"],
    "strong": ["powerful", "sturdy", "tough", "resilient", "robust"],
    "weak": ["fragile", "frail", "feeble", "delicate", "brittle"],
    "big": ["large", "huge", "enormous", "gigantic", "massive", "immense"],
    "small": ["tiny", "miniature", "diminutive", "petite", "compact"],
    "easy": ["simple", "effortless", "straightforward", "uncomplicated"],
    "hard": ["difficult", "challenging", "tough", "arduous"],
    "funny": ["hilarious", "amusing", "comical", "witty", "entertaining"],
    "boring": ["dull", "tedious", "uninteresting", "monotonous", "mind-numbing"],
    "beautiful": ["pretty", "gorgeous", "stunning", "lovely", "attractive"],
    "ugly": ["hideous", "unsightly", "unattractive", "repulsive"],
    "tired": ["exhausted", "weary", "fatigued", "drained", "worn-out"],
    "hungry": ["starving", "famished", "ravenous", "peckish"],
    "thirsty": ["parched", "dehydrated"],
    "lazy": ["idle", "sluggish", "lethargic", "indolent"],
    "brave": ["courageous", "fearless", "valiant", "bold", "daring"],
    "scared": ["frightened", "terrified", "afraid", "panicked", "spooked"],
    "kind": ["nice", "thoughtful", "considerate", "compassionate", "generous"],
    "mean": ["cruel", "unkind", "harsh", "nasty", "spiteful"],
    "important": ["crucial", "vital", "essential", "significant", "key"],
    "cheap": ["inexpensive", "affordable", "low-cost", "bargain"],
    "expensive": ["costly", "pricey", "high-priced", "luxurious"],
    "strong-willed": ["determined", "resolute", "tenacious", "persistent"],
    "confident": ["self-assured", "bold", "fearless", "assertive"],
    "polite": ["courteous", "respectful", "gracious", "well-mannered"],
    "rude": ["impolite", "disrespectful", "insolent", "unmannered"],
    "clean": ["tidy", "neat", "orderly", "spotless"],
    "dirty": ["filthy", "grimy", "messy", "soiled"],
    "healthy": ["fit", "robust", "vigorous", "strong"],
    "sick": ["ill", "unwell", "ailing", "feverish"],
    "quiet": ["silent", "hushed", "mute", "tranquil"],
    "noisy": ["loud", "boisterous", "clamorous", "deafening"],
    "friendly": ["amiable", "kind", "sociable", "affable", "warm"],
    "unfriendly": ["hostile", "cold", "distant", "aloof", "rude"],
    "new": ["fresh", "recent", "modern", "novel"],
    "old": ["ancient", "antique", "vintage", "aged"],
    "creative": ["innovative", "imaginative", "original", "inventive"],
    "destructive": ["damaging", "harmful", "devastating", "ruinous"],
    // Add more as needed...
};


const leetspeak = {
    "leet": "l33t",
    "hello": "h3ll0",
    "good": "g00d",
    "you": "u",
    "please": "plz",
    "speak": "sp34k",
    "elite": "3l1t3",
    "hacker": "h4ck3r",
    "password": "p4ssw0rd",
    "friend": "fr13nd",
    "cool": "c00l",
    "thanks": "thx",
    "love": "l0v3",
    "skill": "sk1ll",
    "quick": "qu1ck",
    "success": "succ3ss",
    // Add more as necessary
};




const homophones = { 
    "there": { correct: "their", category: "location" },
    "their": { correct: "they're", category: "pronouns" },
    "they're": { correct: "their", category: "pronouns" },
    "to": { correct: "too", category: "quantity" },
    "too": { correct: "to", category: "direction" },
    "your": { correct: "you're", category: "pronouns" },
    "you're": { correct: "your", category: "possessives" },
    "its": { correct: "it's", category: "possessives" },
    "it's": { correct: "its", category: "possessives" },
    "than": { correct: "then", category: "comparison" },
    "then": { correct: "than", category: "time" },
    "weather": { correct: "whether", category: "generalInquiry" },
    "whether": { correct: "weather", category: "generalInquiry" },
    "hear": { correct: "here", category: "location" },
    "here": { correct: "hear", category: "actions" },
    "peace": { correct: "piece", category: "abstractConcepts" },
    "piece": { correct: "peace", category: "abstractConcepts" },
    "right": { correct: "write", category: "actions" },
    "write": { correct: "right", category: "actions" },
    "affect": { correct: "effect", category: "causation" },
    "effect": { correct: "affect", category: "causation" },
    "site": { correct: "sight", category: "location" },
    "sight": { correct: "site", category: "vision" },
    "accept": { correct: "except", category: "inclusion" },
    "except": { correct: "accept", category: "exclusion" }
};



const slang = {
    "ya": "you",
    "gonna": "going to",
    "wanna": "want to",
    "ain't": "isn't",
    "lemme": "let me",
    "gotta": "got to",
    "sorta": "sort of",
    "kinda": "kind of",
    "ainy": "any",
    "coulda": "could have",
    "thang": "thing",
    "neva": "never",
    "whassup": "what's up",
    "brotha": "brother",
    "sistah": "sister",
    "dat": "that",
    "dis": "this",
    "finna": "fixing to",
    "boutta": "about to",
    "bruh": "bro",
    "thot": "that hoe over there",
    "bae": "before anyone else",
    "fr": "for real",
    "cap": "lie",
    "lit": "cool",
    "dope": "cool",
    "onfleek": "on point",
    "noob": "newbie",
    "stfu": "shut the f*ck up",
    "yall": "you all",
    "cuz": "because",
    "nuffin": "nothing",
    "tryna": "trying to",
    "gimme": "give me",
    "hunnid": "hundred",
    "omw": "on my way",
    "yolo": "you only live once",
    "sus": "suspicious",
    "fam": "family",
    "rofl": "rolling on the floor laughing",
    "lmfao": "laughing my f*cking ass off",
    "runnin": "running",
    "ppl": "people",
    "srsly": "seriously",
    "plz": "please",
    "idk": "I don't know",
    "tbh": "to be honest",
    "ikr": "I know, right?",
    "gr8": "great",
    "luv": "love",
    "nah": "no",
    "yea": "yes",
    "smh": "shaking my head",
    "fren": "friend",
    "mofo": "motherf*cker",
    "hella": "a lot",
    "creepin": "creeping",
    "chillin": "chilling",
    "flexin": "flexing",
    "drippin": "dripping",
    "flava": "flavor",
    "holla": "holla at me",
    "icedout": "jewelry (diamond-studded)",
    "lamez": "lame",
    "noice": "nice",
    "peeps": "people",
    "pimpin": "pimping",
    "reppin": "representing",
    "scaredycat": "someone who is easily frightened",
    "sk8": "skate",
    "savage": "brutally honest or cool",
    "snap": "quick photo or moment",
    "salty": "upset or bitter",
    "whip": "car",
    "props": "respect",
    "turnt": "excited or high energy",
    "vibe": "feeling or atmosphere",
    "lowkey": "secretly or quietly",
    "wet": "cool",
    "squad": "group of friends",
    "werk": "work",
    "yaaas": "yes (exclamation)",
    "bro": "brother",
    "sis": "sister",
    "gucci": "good or okay",
    "dope": "cool or impressive",
    "swaggy": "stylish",
    "toof": "tooth",
    "woke": "aware or enlightened",
    "yeet": "throw something with force or excitement",
    "zaddy": "attractive man",
    "fiddy": "fifty",
    "fo'": "for",
    "mood": "current feeling or vibe"
};

const misspellings = {
    "teh": "the",
    "recieve": "receive",
    "definately": "definitely",
    "seperate": "separate",
    "occurence": "occurrence",
    "acommodate": "accommodate",
    "embarras": "embarrass",
    "concious": "conscious",
    "neccessary": "necessary",
    "publically": "publicly",
    "truely": "truly",
    "untill": "until",
    "wich": "which",
    "comming": "coming",
    "mispell": "misspell",
    "persue": "pursue",
    "guage": "gauge",
    "acheive": "achieve",
    "arguement": "argument",
    "beleive": "believe",
    "calender": "calendar",
    "carribean": "Caribbean",
    "cemetary": "cemetery",
    "collegue": "colleague",
    "concieve": "conceive",
    "decieve": "deceive",
    "dilema": "dilemma",
    "enviroment": "environment",
    "existince": "existence",
    "familliar": "familiar",
    "finaly": "finally",
    "foriegn": "foreign",
    "freind": "friend",
    "goverment": "government",
    "grafic": "graphic",
    "gratefull": "grateful",
    "hight": "height",
    "idiosyncracy": "idiosyncrasy",
    "ignorence": "ignorance",
    "imediately": "immediately",
    "independant": "independent",
    "interupt": "interrupt",
    "jewelery": "jewelry",
    "judgement": "judgment",
    "knowlege": "knowledge",
    "liason": "liaison",
    "lightening": "lightning",
    "maintainance": "maintenance",
    "medeval": "medieval",
    "millenium": "millennium",
    "mispellings": "misspellings",
    "misterious": "mysterious",
    "mixure": "mixture",
    "morgage": "mortgage",
    "neccessity": "necessity",
    "ocasion": "occasion",
    "oppurtunity": "opportunity",
    "parliment": "parliament",
    "pavillion": "pavilion",
    "permenant": "permanent",
    "playwrite": "playwright",
    "possable": "possible",
    "potatos": "potatoes",
    "prefered": "preferred",
    "professer": "professor",
    "pronounciation": "pronunciation",
    "propoganda": "propaganda",
    "protocal": "protocol",
    "reciept": "receipt",
    "reconize": "recognize",
    "refering": "referring",
    "relise": "realize",
    "religous": "religious",
    "remeber": "remember",
    "renumeration": "remuneration",
    "reposess": "repossess",
    "resistence": "resistance",
    "rythm": "rhythm",
    "satelite": "satellite",
    "scedule": "schedule",
    "sence": "sense",
    "seige": "siege",
    "seperately": "separately",
    "signiture": "signature",
    "sillhouette": "silhouette",
    "similiar": "similar",
    "smoothe": "smooth",
    "speach": "speech",
    "stong": "strong",
    "strenght": "strength",
    "strenghen": "strengthen",
    "subconsious": "subconscious",
    "substract": "subtract",
    "succesful": "successful",
    "suceed": "succeed",
    "supprise": "surprise",
    "surpress": "suppress",
    "temperment": "temperament",
    "thier": "their",
    "tommorow": "tomorrow",
    "tounge": "tongue",
    "twelth": "twelfth",
    "tyrany": "tyranny",
    "unforseen": "unforeseen",
    "unfortunatly": "unfortunately",
    "useing": "using",
    "vacume": "vacuum",
    "vehical": "vehicle",
    "volcanoe": "volcano",
    "wierd": "weird",
    "withold": "withhold",
    "realy": "really",
    "adress": "address",
    "buisness": "business",
    "occuring": "occurring",
    "dont": "don't",
    "wont": "won't",
    "cant": "can't",
    "alot": "a lot",
    "its": "it's",
    "whos": "who's",
    "there": "their",
    "your": "you're",
    "youre": "you're",
    "wether": "whether",
    "wierd": "weird",
    "finnaly": "finally",
    "heros": "heroes",
    "aswell": "as well",
    "peice": "piece",
    "becuase": "because",
    "carreer": "career",
    "interupt": "interrupt",
    "liquify": "liquefy",
    "mentaly": "mentally",
    "movment": "movement",
    "nowdays": "nowadays",
    "procede": "proceed",
    "restraunt": "restaurant",
    "similer": "similar",
    "vaccum": "vacuum",
    "verticle": "vertical",
    "agian": "again",
    "bellow": "below",
    "empyt": "empty",
    "futher": "further",
    "gues": "guess",
    "ignor": "ignore",
    "insted": "instead",
    "jepardy": "jeopardy",
    "knolwedge": "knowledge",
    "lable": "label",
    "medcine": "medicine",
    "necesary": "necessary",
    "ninty": "ninety",
    "offcially": "officially",
    "perhas": "perhaps",
    "pritty": "pretty",
    "quater": "quarter",
    "realize": "realise",
    "reffer": "refer",
    "simpy": "simply",
    "stricly": "strictly",
    "threshhold": "threshold",
    "usualy": "usually",
    "warrent": "warrant",
    "wholy": "wholly",
    "occuring": "occurring"
};


        const categoryKeys = Object.keys(categories);

        console.log(categoryKeys);
        


// Tokenize the input, including math symbols and numbers
function tokenize(input) {
    const regex = /[\w'-?]+|[+\-*/()]|[\d,.]+/g; // Match words, numbers, math symbols, and '?'
    return input.match(regex) || [];
}


function tokenize2(input) {
    return input.match(/\b[\w']+\b|[.,!?;:]/g) || [];
}



function detectAndEvaluateStatement(tokens, categorizedTokens, inputType) {
    const actionsToPerform = [];
    const subjectsToEvaluate = [];
    const context = {}; // To store contextual information that may influence the actions
    const statementStart = tokens.indexOf("statement") + 1;

    const bestMatch = prioritizeCategories(categorizedTokens, tokens, inputType);

    console.log("bestMatch ", bestMatch); 
    console.log("categorizedTokens", categorizedTokens);
    console.log("tokens ", tokens);
    console.log("statementStart ", statementStart);

    // Define actions, subjects, verbs, and predicates
    const actions = {
        "setTimer": ["set timer", "start timer", "begin timer", "countdown", "schedule"], // action to set the timer
        "count": ["count", "calculate", "find", "determine", "compute"],
        "length": ["length", "measure", "size", "size of"],
        "remove": ["remove", "delete", "clear", "strip"],
        "replace": ["replace", "substitute", "change", "swap"],
        "capitalize": ["capitalize", "upper", "title"],
        "reverse": ["reverse", "invert", "flip"],
        "transform": ["transform", "convert", "change case"],
        "sort": ["sort", "order"],
        "multiply": ["multiply", "times"],
        "add": ["add", "plus"],
        "subtract": ["subtract", "minus"],
        "concatenate": ["concatenate", "join", "combine"],
        "substring": ["substring", "extract part", "slice"],
        "trim": ["trim", "remove spaces", "strip spaces"],
        "find": ["find", "locate", "position"],
        "split": ["split", "divide", "separate"],
        "countOccurrences": ["count occurrences", "count times", "how many times"],
        "extract": ["extract", "pull out", "find pattern"],
        "convert": ["convert", "change format", "to snake_case", "to camelCase"],
        "encode": ["encode", "base64 encode", "url encode"],
        "decode": ["decode", "base64 decode", "url decode"],
        "palindrome": ["palindrome", "check palindrome"],
        "shuffle": ["shuffle", "randomize", "scramble"],
        "merge": ["merge", "combine sets"],
        "highlight": ["highlight", "mark", "emphasize"],
        "convertToArray": ["convert to array", "to array", "split into array"],
        "countUnique": ["count unique", "unique count", "distinct count"]
    };

    const subjects = {
        "timer": ["timer", "countdown", "time duration", "alarm"],
        "letters": ["letter", "letters", "character", "characters", "alphabets", "letters of the alphabet"],
        "numbers": ["number", "numbers", "digits", "numerals"],
        "words": ["word", "words"],
        "sentences": ["sentence", "sentences"],
        "symbols": ["symbol", "symbols", "punctuation"],
        "asterisks": ["*", "**", "asterisk", "asterisks"],
        "phrases": ["phrase", "phrases"],
        "vowels": ["vowel", "vowels", "a", "e", "i", "o", "u"],
        "consonants": ["consonant", "consonants"],
        "digits": ["digit", "digits"],
        "spaces": ["space", "spaces"],
        "capital_letters": ["capital letter", "capital letters"],
        "lowercase_letters": ["lowercase letter", "lowercase letters"],
        "even_numbers": ["even number", "even numbers"],
        "odd_numbers": ["odd number", "odd numbers"],
        "alphabets": ["alphabet", "alphabets"],
        "symbols_emojis": ["symbol", "emoji", "emojis"],
        "dates": ["date", "dates", "calendar", "time"],
        "urls": ["url", "urls"],
        "phone_numbers": ["phone number", "phone numbers"],
        "emails": ["email", "emails"],
        "hashtags": ["hashtag", "hashtags"],
        "quotes": ["quote", "quotes"],
        "tags": ["tag", "tags", "html tag", "html tags"],
        "capitalized_words": ["capitalized word", "capitalized words"]
    };

    // Check if the statement contains math-related tokens and evaluate it
    const mathResult = detectAndEvaluateMath(tokens, categorizedTokens, inputType);
    if (mathResult) {
        return mathResult; // Return the result if it's a math expression
    }

    categorizedTokens.forEach((token, index) => {
        // Matching action verbs
        Object.keys(actions).forEach(actionKey => {
            const actionPhrases = actions[actionKey];
    
            // Loop through all possible action phrases
            actionPhrases.forEach(phrase => {
                // We are matching full words (or phrases) stored in 'word'
                let phraseIndex = 0;
                while (phraseIndex < actionPhrases.length && index + phraseIndex < categorizedTokens.length) {
                    // Check if the word matches the phrase sequence
                    if (categorizedTokens[index + phraseIndex].word.toLowerCase() === actionPhrases[phraseIndex].toLowerCase()) {
                        console.log("actionKey  ", actionKey);
                        phraseIndex++;

                        if (phraseIndex === actionPhrases.length) {
                            actionsToPerform.push(actionKey);
                        }
                     
                    } else {
                        break;
                    }
                }
    

            });
        });
    
        // Matching subjects
        Object.keys(subjects).forEach(subjectKey => {
            if (subjects[subjectKey].includes(token.word.toLowerCase())) {
                subjectsToEvaluate.push(subjectKey);
            }
        });

        

});
    // Handle cases with multiple actions and context-aware detection
    if (actionsToPerform.length > 1 && subjectsToEvaluate.length > 0) {
        context.multipleActions = true;
        // If multiple actions are found, prioritize based on context or user's intent
        // Here, simply return the first action and subject as an example:
        return handleMultipleActions(actionsToPerform, subjectsToEvaluate);
    }

    // Construct the result with actions and subjects
    const results = actionsToPerform.map(action => {
        return subjectsToEvaluate.map(subject => {
            return handleActionWithSubject(action, subject, tokens, statementStart, context, categorizedTokens, inputType);
        });
    }).flat();

    return results.length ? results.join(' | ') : `No actionable statement found for: "${tokens.join(' ')}"`;
}


// Helper function to handle multiple actions
function handleMultipleActions(actionsToPerform, subjectsToEvaluate) {
    // This function is a placeholder; the logic for handling multiple actions can be refined based on intent
    const primaryAction = actionsToPerform[0]; // Take the first action as a fallback
    const primarySubject = subjectsToEvaluate[0]; // Take the first subject as a fallback
    return handleActionWithSubject(primaryAction, primarySubject);
}



// Handle actions dynamically
function handleActionWithSubject(action, subject, tokens, statementStart, context, categorizedTokens,inputType ) {
    let actionResult = "";
    const textToModify = tokens.slice(statementStart).join(' ');


    const bestMatch = prioritizeCategories(categorizedTokens, tokens,  inputType );

    console.log("handleActionWithSubject bestMatch ",bestMatch); 
    console.log(`categorizedTokens`, categorizedTokens);
    console.log("tokens  ",tokens);
    console.log("textToModify  ",textToModify);
    console.log("action  ",action);
    console.log("statementStart  ",statementStart);
    console.log("context  ",context);

    switch(action) {
        case "count":
            actionResult = handleCountAction(tokens, textToModify, subject); // Pass subject to the handler
            break;
            case "setTimer":
    actionResult = handleSetTimerAction(tokens, textToModify, subject);
    break;

        case "length":
            actionResult = handleLengthAction(tokens, textToModify, subject);
            break;
        case "remove":
            actionResult = handleRemoveAction(tokens, textToModify, subject);
            break;
        case "replace":
            actionResult = handleReplaceAction(tokens, textToModify, subject);
            break;
        case "capitalize":
            actionResult = handleCapitalizeAction(tokens, textToModify, subject);
            break;
        case "reverse":
            actionResult = handleReverseAction(tokens, textToModify, subject);
            break;
        case "sort":
            actionResult = handleSortAction(tokens, textToModify, subject);
            break;
        case "multiply":
            actionResult = handleMathAction(tokens, textToModify, 'multiply', subject);
            break;
        case "add":
            actionResult = handleMathAction(tokens, textToModify, 'add', subject);
            break;
        case "subtract":
            actionResult = handleMathAction(tokens, textToModify, 'subtract', subject);
            break;
        case "transform":
            actionResult = handleTransformAction(tokens, textToModify, subject);
            break;
        case "concatenate":
            actionResult = handleConcatenateAction(tokens, textToModify, subject);
            break;
        case "substring":
            actionResult = handleSubstringAction(tokens, textToModify, subject);
            break;
        case "trim":
            actionResult = handleTrimAction(tokens, textToModify, subject);
            break;
        case "find":
            actionResult = handleFindAction(tokens, textToModify, subject);
            break;
        case "split":
            actionResult = handleSplitAction(tokens, textToModify, subject);
            break;
        case "countOccurrences":
            actionResult = handleCountOccurrencesAction(tokens, textToModify, subject);
            break;
        case "extract":
            actionResult = handleExtractAction(tokens, textToModify, subject);
            break;
        case "convert":
            actionResult = handleConvertAction(tokens, textToModify, subject);
            break;
        case "encode":
            actionResult = handleEncodeAction(tokens, textToModify, subject);
            break;
        case "decode":
            actionResult = handleDecodeAction(tokens, textToModify, subject);
            break;
        case "palindrome":
            actionResult = handlePalindromeAction(tokens, textToModify, subject);
            break;
        case "shuffle":
            actionResult = handleShuffleAction(tokens, textToModify, subject);
            break;
        case "merge":
            actionResult = handleMergeAction(tokens, textToModify, subject);
            break;
        case "highlight":
            actionResult = handleHighlightAction(tokens, textToModify, subject);
            break;
        case "convertToArray":
            actionResult = handleConvertToArrayAction(tokens, textToModify, subject);
            break;
        case "countUnique":
            actionResult = handleCountUniqueAction(tokens, textToModify, subject);
            break;
        default:
            actionResult = `Action "${action}" not implemented.`;
    }

    return actionResult;
}


// Math expression evaluation function
function detectAndEvaluateMath(tokens, categorizedTokens, inputType) {
    const numberWords = {
        "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, 
        "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10, 
        "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14, "fifteen": 15, 
        "sixteen": 16, "seventeen": 17, "eighteen": 18, "nineteen": 19, 
        "twenty": 20, "thirty": 30, "forty": 40, "fifty": 50, 
        "sixty": 60, "seventy": 70, "eighty": 80, "ninety": 90,
        "hundred": 100, "thousand": 1000, "million": 1000000, "billion": 1000000000
    };
    
    function parseWordNumber(words) {
        let total = 0, current = 0;
        words.forEach(word => {
            let value = numberWords[word.toLowerCase()];
            if (value === undefined) return; // Skip unknown words
            if (value >= 100) {
                current *= value; // Apply multiplier for "hundred", "thousand", etc.
            } else {
                current += value; // Sum tens, units, etc.
            }
            if (value >= 1000) {
                total += current;
                current = 0;
            }
        });
        return total + current;
    }
    
    let containsMathSymbol = categorizedTokens.some(token => token.category === 'math');
    
    let mathTokens = [];
    let tempWordNumber = [];
    
    categorizedTokens.forEach(token => {
        if (token.category === 'numbers') {
            tempWordNumber.push(token.word);
        } else {
            if (tempWordNumber.length > 0) {
                mathTokens.push(parseWordNumber(tempWordNumber));
                tempWordNumber = [];
            }
            mathTokens.push(token.word);
        }
    });

    if (tempWordNumber.length > 0) {
        mathTokens.push(parseWordNumber(tempWordNumber));
    }

    if (containsMathSymbol) {
        try {
            const mathExpression = mathTokens.join(' ');
            const result = new Function(`return ${mathExpression}`)();
            if (isNaN(result)) throw new Error('Invalid calculation');
            return `The result of your calculation (${mathExpression}) is ${result.toFixed(0)}.`;
        } catch (error) {
            return "I couldn't evaluate that expression. Please check your input.";
        }
    }
    return null; // No math-related input detected
}









function convertToMilliseconds(timeString) {
    const timeValue = parseInt(timeString.match(/\d+/)[0]);
    if (timeString.includes("min")) {
        return timeValue * 60000; // Minutes to milliseconds
    } else if (timeString.includes("second")) {
        return timeValue * 1000;  // Seconds to milliseconds
    } else if (timeString.includes("hour")) {
        return timeValue * 3600000; // Hours to milliseconds
    }
    return 0;
}

function startTimer(duration) {
    setTimeout(() => {
        alert("Timer ended!");
    }, duration);
}




function handleSetTimerAction(tokens, textToModify, subject) {
    const timePattern = /\d+\s*(mins?|seconds?|hours?)/i;
    const timeMatch = textToModify.match(timePattern);

    if (timeMatch) {
        const timeString = timeMatch[0];
        // Convert timeString to milliseconds or appropriate unit
        const duration = convertToMilliseconds(timeString); // Define this helper
        startTimer(duration); // Implement your timer logic
        return `Timer set for ${timeString}.`;
    }
    return `Could not set timer. Please specify a valid time duration.`;
}



// Handle count action (count words, sentences, letters)
// Handle count action (count words, sentences, letters)
function handleCountAction(tokens, textToModify, subject) {
    let result = "";
    if (tokens.includes("sentence")) {
        const sentenceCount = textToModify.split('.').length;
        result += `${subject} - Sentence count: "${sentenceCount}" `;
    }
    if (tokens.includes("word")) {
        const wordCount = textToModify.split(' ').length;
        result += `${subject} - Word count: "${wordCount}" `;
    }
    if (tokens.includes("letter")) {
        const letterCount = textToModify.replace(/\s/g, '').length;
        result += `${subject} - Letter count: "${letterCount}" `;
    }
    return result;
}


// Handle length-related action
function handleLengthAction(tokens, textToModify, subject) {
    let result = "";
    if (tokens.includes("sentence")) {
        const sentenceLength = textToModify.length;
        result += `${subject} - Length of sentence: "${sentenceLength}" characters `;
    }
    if (tokens.includes("word")) {
        const words = textToModify.split(' ');
        const wordLength = words.map(word => word.length);
        result += `${subject} - Word lengths: "${wordLength.join(', ')}" `;
    }
    return result;
}


// Handle removal of symbols
function handleRemoveAction(tokens, textToModify, subject) {
    const removedText = textToModify.replace(/[^\w\s]/g, '');
    return `${subject} - Text after removing symbols: "${removedText}" `;
}

// Handle replacement of words or characters
function handleReplaceAction(tokens, textToModify, subject) { 
    // Define a mapping of words that can be used in place of "with"
    const replacementKeywords = ["with", "by", "using", "via"];

    // Find the token that matches any of the keywords in the replacementKeywords array
    const match = tokens.find(token => token.word && replacementKeywords.includes(token.word.toLowerCase()));
    console.log("match  ",match);

    // If a matching word is found
    if (match) {
        // Get the word before the matching token (the target to replace)
        const replaceTarget = tokens[tokens.indexOf(match) - 1]?.word; // Safe navigation operator
      
        console.log("replaceTarget  ",replaceTarget);

        // Get the word after the matching token (the word to replace with)
        const replaceWith = tokens[tokens.indexOf(match) + 1]?.word; // Safe navigation operator
        console.log("replaceWith  ",replaceWith);

        // Check if both replaceTarget and replaceWith are valid words
        if (replaceTarget && replaceWith) {
            // Perform the replacement in the text
            const replacedText = textToModify.replace(new RegExp(replaceTarget, 'g'), replaceWith);

            return `${subject} - Updated text after replacement: "${replacedText}"`;
        } else {
            return `${subject} - Incomplete replacement: missing target or replacement word.`;
        }
    }

    return null;
}

// Handle capitalization of words
function handleCapitalizeAction(tokens, textToModify) {
    const capitalizedText = textToModify.replace(/\b\w/g, char => char.toUpperCase());
    return `Updated text after capitalization: "${capitalizedText}" `;
}

// Handle reversing the text
function handleReverseAction(tokens, textToModify) {
    const reversedText = textToModify.split('').reverse().join('');
    return `Reversed text: "${reversedText}" `;
}

// Handle sorting words alphabetically
function handleSortAction(tokens, textToModify) {
    const words = textToModify.split(' ').sort();
    return `Sorted words: "${words.join(' ')}" `;
}

// Handle basic math operations (Multiply/Add/Subtract)
function handleMathAction(tokens, textToModify, operation) {
    const numbers = textToModify.split(' ').map(Number).filter(num => !isNaN(num));
    let result = 0;
    if (operation === 'multiply') {
        result = numbers.reduce((acc, num) => acc * num, 1);
    } else if (operation === 'add') {
        result = numbers.reduce((acc, num) => acc + num, 0);
    } else if (operation === 'subtract') {
        result = numbers.reduce((acc, num) => acc - num);
    }
    return `${operation.charAt(0).toUpperCase() + operation.slice(1)} result: "${result}"`;
}

// Handle transforming the case of text
function handleTransformAction(tokens, textToModify) {
    if (tokens.includes("upper")) {
        return `Text in uppercase: "${textToModify.toUpperCase()}" `;
    } else if (tokens.includes("lower")) {
        return `Text in lowercase: "${textToModify.toLowerCase()}" `;
    } else if (tokens.includes("title")) {
        return `Text in title case: "${textToModify.replace(/\b\w/g, char => char.toUpperCase())}" `;
    }
    return `No transformation found.`;
}




// Handle Concatenate action
function handleConcatenateAction(tokens, text) {
    const words = text.split(' ');
    return words.join('');
}

// Handle Substring action
function handleSubstringAction(tokens, text) {
    const [start, end] = tokens.slice(-2).map(Number);
    return text.substring(start, end);
}

// Handle Trim action
function handleTrimAction(tokens, text) {
    return text.trim();
}

// Handle Find action
function handleFindAction(tokens, text) {
    const wordToFind = tokens.slice(-1).join(' ').toLowerCase();
    const position = text.toLowerCase().indexOf(wordToFind);
    return position !== -1 ? `Found at position ${position}` : `Word not found`;
}

// Handle Split action
function handleSplitAction(tokens, text) {
    const separator = tokens.slice(-1).join(' ');
    return text.split(separator).join(', ');
}

// Handle CountOccurrences action
function handleCountOccurrencesAction(tokens, text) {
    const wordToCount = tokens.slice(-1).join(' ');
    const count = (text.match(new RegExp(wordToCount, 'gi')) || []).length;
    return `The word "${wordToCount}" appears ${count} times.`;
}

// Handle Extract action
function handleExtractAction(tokens, text) {
    const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;  // example pattern for email extraction
    const matches = text.match(regex);
    return matches ? `Extracted email(s): ${matches.join(', ')}` : 'No emails found';
}






// Example function for handling the "convert" action
function handleConvertAction(tokens, text) {
    // For simplicity, let's implement a basic conversion (e.g., camelCase to snake_case)
    const convertedText = text.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    return `Converted text: ${convertedText}`;
}

// Example function for handling the "encode" action (Base64 encoding)
function handleEncodeAction(tokens, text) {
    const encodedText = btoa(text); // Simple Base64 encoding
    return `Encoded text in Base64: ${encodedText}`;
}

// Example function for handling the "decode" action (Base64 decoding)
function handleDecodeAction(tokens, text) {
    try {
        const decodedText = atob(text); // Base64 decoding
        return `Decoded Base64 text: ${decodedText}`;
    } catch (e) {
        return `Error decoding Base64: ${e.message}`;
    }
}

// Example function for handling the "palindrome" action
function handlePalindromeAction(tokens, text) {
    const isPalindrome = text === text.split('').reverse().join('');
    return `Is "${text}" a palindrome? ${isPalindrome}`;
}

// Example function for handling the "shuffle" action
function handleShuffleAction(tokens, text) {
    const shuffledText = text.split('').sort(() => Math.random() - 0.5).join('');
    return `Shuffled text: ${shuffledText}`;
}

// Example function for handling the "merge" action
function handleMergeAction(tokens, text) {
    const mergedText = text.replace(/\s+/g, ''); // Remove spaces and merge
    return `Merged text: ${mergedText}`;
}

// Example function for handling the "highlight" action
function handleHighlightAction(tokens, text) {
    const highlightedText = `<mark>${text}</mark>`; // Wrap the text with a <mark> tag to highlight
    return `Highlighted text: ${highlightedText}`;
}

// Example function for handling the "convertToArray" action
function handleConvertToArrayAction(tokens, text) {
    const arrayOfWords = text.split(' '); // Convert the sentence into an array of words
    return `Array of words: [${arrayOfWords.join(', ')}]`;
}

// Example function for handling the "countUnique" action
function handleCountUniqueAction(tokens, text) {
    const words = text.split(' ');
    const uniqueWords = new Set(words);
    return `Number of unique words: ${uniqueWords.size}`;
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















// Function to correct slang terms
function correctSlang(token) {
    return slang[token.toLowerCase()] || token; // Return corrected slang or original token
}

// Function to correct misspelled words
function correctMisspellings(token) {
    return misspellings[token.toLowerCase()] || token; // Return corrected misspelling or original token
}



  

  const punctuationNormalization = (text) => {
    return text.replace(/[!]+/g, "!").replace(/[?]+/g, "?").replace(/[.]+/g, ".");
  };
  

// Normalize abbreviations
function normalizeAbbreviations(token) {
    return abbreviations[token.toLowerCase()] || token;
}

// Normalize time and numbers
function normalizeTimeAndNumbers(token) {
    return timeAndNumbers[token.toLowerCase()] || token;
}

// Optimized synonym lookup with a scoring mechanism
function applyContextSynonyms(token, previous, next) {
    const lowerToken = token.toLowerCase();
    
    // Quick lookup using a Trie for synonyms
    const synonyms = contextSynonyms[lowerToken];
    if (!synonyms) return token;

    // Contextual scoring logic
    let bestMatch = lowerToken; // Default to the original token
    let highestScore = 0;

    // Iterate over synonyms and calculate contextual relevance
    synonyms.forEach((synonym) => {
        let score = 0;

        // Boost score if previous or next context matches specific categories
        if (previous && contextSynonyms[synonym]?.includes(previous.toLowerCase())) {
            score += 5; // High match for context before
        }
        if (next && contextSynonyms[synonym]?.includes(next.toLowerCase())) {
            score += 5; // High match for context after
        }

        // Add token frequency or relevance score (can integrate with ML models)
        score += synonym.length / lowerToken.length; // Prefer longer synonyms for clarity

        // Update the best match if the score is higher
        if (score > highestScore) {
            highestScore = score;
            bestMatch = synonym;
        }
    });

    // Return the highest-scoring synonym
    return highestScore > 0 ? bestMatch : token;
}

/*
// Example usage
const result = applyContextSynonyms("smart", "a", "student");
console.log(result); // Outputs: "intelligent" if context matches
*/


// Convert leetspeak to normal words
function convertLeetspeak(token) {
    for (const [key, value] of Object.entries(leetspeak)) {
        if (token.toLowerCase() === value) {
            return key; // Replace with original word
        }
    }
    return token;
}

// Normalize plural forms and conjugations
function normalizeWordForms(token) {
    if (token.endsWith("'s") || token.endsWith("s'")) {
        return token.slice(0, -2); // Normalize possessive plurals
    } else if (token.endsWith("s")) {
        return token.slice(0, -1); // Normalize plurals
    }
    return token;
}

// Intent detection (e.g., questions or emphasis)
function detectIntent(tokens) {
    if (tokens.includes("?")) return "question";
    if (tokens.includes("!")) return "exclamation";
    return "statement";
}

// Main normalization function
function normalizeInput(userInput) {
    const tokens = tokenize(userInput); // Tokenize input
    const normalizedTokens = tokens.map((token, index) => {
        const previous = tokens[index - 1] || "";
        const next = tokens[index + 1] || "";

        // Step-by-step normalization
        token = normalizeAbbreviations(token);
        token = normalizeTimeAndNumbers(token);
        token = convertLeetspeak(token);
        token = normalizeWordForms(token);
        token = applyContextSynonyms(token, previous, next);

        return token;
    });

    // Detect intent
    const intent = detectIntent(tokens);

    // Reconstruct normalized sentence
    const normalizedSentence = punctuationNormalization(normalizedTokens.join(" "));

    return { normalizedSentence, intent };
}

// Example input
//const userInput = "OMG! idk if tomrrow's hrs are enough to h3ll0!";

// Output:
// {
//   normalizedSentence: "oh my god! I don't know if tomorrow hours are enough to hello!",
//   intent: "exclamation"
// }


// Extended correctHomophones function to handle slang and misspellings
function correctHomophonesAndMore(tokens, categories) {
    //console.log("tokens before processing:", tokens);  // Log tokens to check input type

    if (!Array.isArray(tokens)) {
        throw new TypeError("Expected 'tokens' to be an array.");
    }

    let correctedSentence = tokens.map((token, index) => {

        let lowerToken = token.toLowerCase();

        // Correct homophones
        if (homophones[lowerToken]) {
            const homophoneData = homophones[lowerToken];
            let previous = tokens[index - 1] || '';
            let next = tokens[index + 1] || '';
            let context = categorizeTokens([previous, token, next], categories);

            if (context.some(c => c.category === homophoneData.category)) {
                return homophoneData.correct; // Apply homophone correction
            }
        }

        // Correct slang
        let correctedSlang = correctSlang(token);
        if (correctedSlang !== token) {
            return correctedSlang; // Return corrected slang
        }

        // Correct misspellings
        let correctedMisspelling = correctMisspellings(token);
        if (correctedMisspelling !== token) {
            return correctedMisspelling; // Return corrected misspelling
        }

        return token; // Return original token if no correction
    }).join(' ');



    return correctedSentence;
}




// Categorize tokens into predefined categories and return both category and word
function categorizeTokens(tokens, categories) {

    

    const mappedWords = [];
    const tokensCopy = [...tokens]; // Clone to avoid modifying the original

    for (let i = 0; i < tokensCopy.length; i++) {
        let foundMatch = false;

        // Check for multi-word phrases dynamically within each category
        for (const [category, words] of Object.entries(categories)) {
            if (Array.isArray(words)) { // Ensure words is an array
                words.forEach(phrase => {
                    const splitPhrase = phrase.split(' '); // Split multi-word phrases
                    const joinedPhrase = tokensCopy.slice(i, i + splitPhrase.length).join(' '); // Reconstruct phrase
                    if (joinedPhrase.toLowerCase() === phrase.toLowerCase()) { // Case-insensitive comparison
                        mappedWords.push({ category, word: joinedPhrase });
                        i += splitPhrase.length - 1; // Skip processed tokens
                        foundMatch = true;
                    }
                });
            }
        }

        if (!foundMatch) {
            // Check single-word tokens for each category
            for (const [category, words] of Object.entries(categories)) {
                if (Array.isArray(words)) { // Check words is an array
                    const wordArray = words.map(word => word.toLowerCase()); // Convert all to lowercase
                    if (wordArray.includes(tokensCopy[i].toLowerCase())) { // Case-insensitive matching
                        mappedWords.push({ category, word: tokensCopy[i] });
                        break; // Exit the loop once a match is found
                    }
                }
            }
        }
    }

    return mappedWords;
}







function prioritizeCategories(categorizedTokens, tokens, inputType = 'statement') {
    if (!Array.isArray(categorizedTokens)) {
        console.error("Invalid input: categorizedTokens is not an array", categorizedTokens);
        return []; // Exit early for invalid input
    }

        // Default priorities for categories
        const priorities = getDefaultPriorities();
   /*
    console.log("prioritizeCategories=====================================, "); 
    console.log("categorizedTokens, ", categorizedTokens); 
    console.log( "inputType,", inputType); 
    console.log("tokens, ", tokens); 


    console.log("priorities, ", priorities); 
*/
    // Adjust priorities based on inputType (e.g., favorite categories)
    adjustPrioritiesForInputType(priorities, inputType);

    // Adjust priorities based on the input type (e.g., question, request, or statement)
    adjustPrioritiesByInputType(categorizedTokens, priorities);

    // Handle emotion-based prioritization if the input contains sentiment/emotion words
    handleEmotionPrioritization(categorizedTokens, priorities);
    prioritizeActionTokens(categorizedTokens, inputType, priorities);

    // Sort and return the highest-priority token
    const sortedTokens = sortTokensByPriority(categorizedTokens, priorities);
    console.log("Sorted tokens:", sortedTokens);

    return sortedTokens[0] || null; // Return the highest-priority match or null
}


// Default priorities setup
function getDefaultPriorities() {
    let prioritiesCount = 0;
    return {
        action: prioritiesCount++,
        setDocument: prioritiesCount++,
        addDocument: prioritiesCount++,
        updateDocument: prioritiesCount++,
        generalInquiry: prioritiesCount++,
        question: prioritiesCount++,
        dataBaseTerms: prioritiesCount++,
        jobSearch: prioritiesCount++,
        jobRelated: prioritiesCount++,
        title: prioritiesCount++,
        tag: prioritiesCount++,
        description: prioritiesCount++,
        math: prioritiesCount++,
        location: prioritiesCount++,
        time: prioritiesCount++,
        salary: prioritiesCount++,
        websiteSupport: prioritiesCount++,
        conversation: prioritiesCount++,
        vehicle: prioritiesCount++,
        jobCategories: prioritiesCount++,
        events: prioritiesCount++,
        technology: prioritiesCount++,
        health: prioritiesCount++,
        emotions: prioritiesCount++,
        experience: prioritiesCount++,
        benefit: prioritiesCount++,
        company: prioritiesCount++,
        preferences: prioritiesCount++,
        relationships: prioritiesCount++,
        payments: prioritiesCount++,
        feedback: prioritiesCount++
    };
}
// Adjust priorities based on input type
function adjustPrioritiesForInputType(priorities, inputType) {
    const inputTypeAdjustments = {
        question: ['question', 'generalInquiry'],
        request: ['action', 'payments'],
        statement: ['conversation']
    };

    (inputTypeAdjustments[inputType] || []).forEach(category => {
        if (priorities[category] !== undefined) {
            priorities[category] = Math.max(0, priorities[category] - 1); // Higher priority
        }
    });
}


// Adjust priorities dynamically based on the input type (e.g., question, request, or statement)
let userPreferences = {};


// Dynamically adjust priorities by category weights
function adjustPrioritiesByInputType(categorizedTokens, priorities) {
    const categoryWeights = {};

    categorizedTokens.forEach(({ category }) => {
        if (category) {
            categoryWeights[category] = (categoryWeights[category] || 1) * 1.5;
        }
    });

    Object.entries(categoryWeights).forEach(([category, weight]) => {
        if (priorities[category] !== undefined) {
            priorities[category] /= weight; // Adjust priority by weight
        }
    });
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

// Handle emotion-based prioritization
function handleEmotionPrioritization(categorizedTokens, priorities) {
    const emotionCategories = ['excitement', 'frustration', 'hope', 'regret'];

    categorizedTokens.forEach(({ category }) => {
        if (emotionCategories.includes(category)) {
            priorities.emotions = Math.min(priorities.emotions || 99, 1); // High priority for emotions
        }
    });
}

// Prioritize action tokens
function prioritizeActionTokens(categorizedTokens, inputType, priorities) {
    const actionToken = categorizedTokens.find(({ category }) => category === 'action');

    if (actionToken) {
        priorities.action = 0; // Highest priority for action
    }

    if (inputType === 'question') {
        categorizedTokens.forEach(({ category }) => {
            if (category === 'technology') {
                priorities.technology = Math.min(priorities.technology || 99, 2);
            }
        });
    }
}


// Sort tokens by priority and weight
function sortTokensByPriority(categorizedTokens, priorities) {
    return categorizedTokens.sort((a, b) => {
        const priorityA = (priorities[a.category] || 99) * (a.weight || 1);
        const priorityB = (priorities[b.category] || 99) * (b.weight || 1);
        return priorityA - priorityB;
    });
}




// **Handle Job Search Query Logic:**


async function handleJobQuery( tokens, userPreferences) {
    try {
        //console.log(`tokens ${tokens} `);

        const lowerTokens = tokens
    .map(t => t.trim().toLowerCase())
    .slice(0, 10); // Limit the array to the first 10 tokens

        const bestMatch = prioritizeCategories(categorizedTokens, tokens,  userPreferences );

        console.log("handleJobQuery bestMatch ",bestMatch); 

        

    //"question" | "request" | "self-reference" | "other-reference" | "statement"
    

    

/*


          const userDataSaved = getUserData() || [];
          const userlocationData = JSON.parse(sessionStorage.getItem('userLocation'));
*/


        let constraints = []; // Holds query constraints
        
        // 1. Handle Requests/Actions with Specific Words
        if (bestMatch.word === 'create' || bestMatch.category === 'dataBaseTerms' || bestMatch.category === 'setDocument' || 
            bestMatch.category === 'addDocument' || bestMatch.category === 'updateDocument' || 

            bestMatch.category === 'request' || bestMatch.category === 'action') {
            const actionWords = ['please', 'can', 'can you', 'i need', 'would you', 'help', 
                                 'show me', 'create', 'build', 'edit', 'review', 'check',
                                 'fix', 'save', 'add', 'remember', 'enhance', 'improve'];
            
            // Check if tokens match any of the action words
            const matchedActions = tokens.filter(word => actionWords.includes(word.toLowerCase()));

            console.log(`categorizedTokens ${categorizedTokens} `);
       
            
            console.log(`bestMatch.word ${bestMatch.word} `);
            console.log(`tokens for creating ${tokens} `);
            console.log(`matchedActions for creating ${matchedActions} `);

            const  learningModel_DB =  'z_LearningModel';

        
            
                handleLearningModelRequest(bestMatch, matchedActions, tokens, 
                    categorizedTokens, constraints, learningModel_DB);


                    
        }



        if (bestMatch.category === 'question' || bestMatch.category === 'generalInquiry') {
            const questionWords = ['who', 'what', 'where', 'when', 'why', 'how', '?'];
            
                        
            const inquiryWords = ['question', 'how', 'why', 'where', 'what', 'when', 'which', 'can', 'could', 'would', 'do', 'did', 
                'is', 'are', 'am', 'will', 'should', 'where can', 'what is', 'who', 'any', 'anyone', 'anybody', 
                'tell me', 'explain', 'information', 'inquire', 'ask', 'help', 'clarify', 'describe', 'details', 
                'understand', 'learn', 'suggest', 'recommend', 'advice', 'guide', 'directions', 'steps', 'assistance', 
                'know', 'need', 'looking for', 'looking to', 'interested in', 'how to', 'where to', 'is it possible', 
                'help me', 'can you explain', 'what do you mean', 'can you tell me'];
            
            // Check if tokens match any of the action words
            const matchedQuestion = tokens.filter(word => questionWords.includes(word.toLowerCase()));
            const matchedInquiry = tokens.filter(word => inquiryWords.includes(word.toLowerCase()));

            console.log(`categorizedTokens ${categorizedTokens} `);
            console.log(`bestMatch.word ${bestMatch.word} `);
            console.log(`tokens for creating ${tokens} `);
            console.log(`matchedQuestion for creating ${matchedQuestion} `);
            console.log(`matchedInquiry for creating ${matchedInquiry} `);

            const  learningModel_DB =  'z_LearningModel';

  

            handleLearningModelQuery(bestMatch, matchedQuestion,matchedInquiry  , tokens, 
                categorizedTokens, constraints, learningModel_DB);

         

            return `I see you have a  ${bestMatch.category} about ${tokens}, i will check in ${learningModel_DB}`
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
  } from 'https://reelcareer.co/scripts/js/load/module.js';
  
  
  


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

        // Add the limit of 25 to the query
        constraints.push(limit(25));

        // Combine query constraints
        const finalQuery = query(jobQuery, ...constraints);

        // Fetch data
        const snapshot = await getDocs(finalQuery);
        const jobs = snapshot.docs.map(doc => doc.data());

        // Return the result message
        if (jobs.length > 0) {
            return `Found ${jobs.length} job(s) matching your criteria. Visit [ReelCareer Job Listings](https://reelcareer.co/job-listings/) for a more in-depth search.`;
        } else {
            return "No jobs found for your search criteria. Visit [ReelCareer Job Listings](https://reelcareer.co/job-listings/) for a more in-depth search.";
        }

    } catch (error) {
        console.error("Error fetching job data:", error);
        return "Sorry, there was an error fetching job data.";
    }
}

async function fetchJobsByCategory(category) {
    const jobQuery = query(collection(db, 'Jobs'), where('category', '==', category), limit(25));
    return executeQuery(jobQuery, `Jobs in category: ${category}`);
}

async function fetchJobsByBenefits(tokens) {
    const jobQuery = query(collection(db, 'Jobs'), where('benefits', 'array-contains-any', tokens), limit(25));
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

    const jobQuery = query(collection(db, 'Jobs'), where('createdAt', '>=', startDate), limit(25));
    return executeQuery(jobQuery, `Jobs posted since ${dateFilter}`);
}

async function fetchJobsByIndustry(industry) {
    const jobQuery = query(collection(db, 'Jobs'), where('industry', '==', industry), limit(25));
    return executeQuery(jobQuery, `Jobs in the industry: ${industry}`);
}

async function fetchJobsByRequirements(tokens) {
    const jobQuery = query(collection(db, 'Jobs'), where('searchableRequirements', 'array-contains-any', tokens), limit(25));
    return executeQuery(jobQuery, `Jobs matching requirements: ${tokens.join(', ')}`);
}

async function fetchJobsByTitle(tokens) {
    const jobQuery = query(collection(db, 'Jobs'), where('searchableTitle', 'array-contains-any', tokens), limit(25));
    return executeQuery(jobQuery, `Jobs matching titles: ${tokens.join(', ')}`);
}

async function fetchJobCountByLocation(tokens) {
    const jobQuery = query(collection(db, 'Jobs'), where('location', 'array-contains-any', tokens), limit(25));
    const snapshot = await getDocs(jobQuery);
    return `Found ${snapshot.size} job(s) in location(s): ${tokens.join(', ')}. Visit [ReelCareer Job Listings](https://reelcareer.co/job-listings/) for more results.`;
}

async function filterJobsBySalary(salary) {
    const jobQuery = query(collection(db, 'Jobs'), where('salary', '>=', salary), limit(25));
    return executeQuery(jobQuery, `Jobs paying over $${salary}`);
}

async function executeQuery(jobQuery, message) {
    try {
        const snapshot = await getDocs(jobQuery);
        const jobs = snapshot.docs.map(doc => doc.data());

        const botQueryId = "botQuery";
        let botQueryDiv = document.getElementById(botQueryId);

        // If the hidden div doesn't exist, create it
        if (!botQueryDiv) {
            botQueryDiv = document.createElement("div");
            botQueryDiv.id = botQueryId;
            botQueryDiv.style.cssText = `
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 500;
                background-color: rgba(255, 255, 255, 0.95);
                overflow-y: auto;
                padding: 20px;
            `;
            
            const closeButton = document.createElement("button");
            closeButton.textContent = "Close";
            closeButton.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                padding: 10px 15px;
                cursor: pointer;
            `;
            closeButton.addEventListener("click", () => {
                botQueryDiv.style.display = "none"; // Hide div on close
            });

            botQueryDiv.appendChild(closeButton);

            const contentArea = document.createElement("div");
            contentArea.id = "jobContentArea";
            botQueryDiv.appendChild(contentArea);

            document.body.appendChild(botQueryDiv);
        }

        const jobContentArea = document.getElementById("jobContentArea");
        jobContentArea.innerHTML = "";

        jobs.forEach(job => createJobCard(job, jobContentArea));

        const botButton = document.createElement("button");
        botButton.className = "botJobs";
        botButton.textContent = `We found ${jobs.length} job(s). Tap here to see them.`;
        botButton.style.cssText = `
            margin: 10px;
            padding: 10px 20px;
            cursor: pointer;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
        `;

        botButton.addEventListener("click", () => {
            botQueryDiv.style.display = "block";
        });

        document.body.appendChild(botButton);

        if (jobs.length > 0) {
            return `${message}: Found ${jobs.length} job(s).`;
        } else {
            return `${message}: No jobs found. Visit [ReelCareer Job Listings](https://reelcareer.co/job-listings/) for more results.`;
        }
    } catch (error) {
        console.error("Error executing query:", error);
        return "An error occurred while fetching job data.";
    }
}

// Helper function to create job cards
function createJobCard(job, container) {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";
    jobCard.style.cssText = `
        border: 1px solid #ccc;
        border-radius: 5px;
        margin: 10px 0;
        padding: 15px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background-color: white;
    `;

    jobCard.innerHTML = `
        <h3>${job.title || "Untitled Job"}</h3>
        <p><strong>Company:</strong> ${job.company?.display_name || "N/A"}</p>
        <p><strong>Location:</strong> ${job.location?.display_name || "N/A"}</p>
        <p><strong>Category:</strong> ${job.category?.tag || "N/A"}</p>
        <p><strong>Salary:</strong> ${job.salary_min || "N/A"} - ${job.salary_max || "N/A"}</p>
        <p><strong>Description:</strong> ${job.description || "No description available"}</p>
    `;

    container.appendChild(jobCard);
}













// Predefined sets for faster lookups
const questionWords = new Set(['what', 'how', 'why', 'when', 'where', 'who', 'which']);
const requestVerbs = new Set(['calculate', 'show', 'help', 'find', 'get', 'give']);
const selfPronouns = new Set(['i', 'me', 'my', 'mine', 'myself']);
const otherPronouns = new Set(['you', 'your', 'yours', 'he', 'she', 'they', 'them', 'their', 'theirs', 'him', 'her']);

/**
 * Function to determine the input type based on tokens.
 * @param {string[]} tokens - Array of input words.
 * @returns {string} - Type of input: 'question', 'request', 'self-reference', 'other-reference', or 'statement'.
 */
function determineInputType(tokens) {
    if (!Array.isArray(tokens) || tokens.length === 0) return 'statement';

    const lowerTokens = tokens.map(token => token.toLowerCase());

    // Check for a question (question words or ends with a '?')
    if (lowerTokens.some(token => questionWords.has(token)) || tokens.join(' ').trim().endsWith('?')) {
        return 'question';
    }

    // Check for a request (request verbs)
    if (lowerTokens.some(token => requestVerbs.has(token))) {
        return 'request';
    }

    // Check for self-references (pronouns like "I", "me")
    if (lowerTokens.some(token => selfPronouns.has(token))) {
        return 'self-reference';
    }

    // Check for references to others (pronouns like "you", "he", "they")
    if (lowerTokens.some(token => otherPronouns.has(token))) {
        return 'other-reference';
    }

    // Default to statement if none of the above match
    return 'statement';
}



function tensorflowTokenize(sentence) {
    const words = sentence.toLowerCase().split(" ");
    return words.map((word) => (categories[word] || 0));
}



let categorizedTokens;

function processMessage(message) {

 
 
    console.log("Starting Message:", message);

const userInput = message.toLowerCase();

// Normalize input and get result object
const result = normalizeInput(userInput);


//




let tokens = tokenize(result.normalizedSentence);  // Ensure tokens is an array of words

// Tokenize the normalized sentence before passing it to correctHomophonesAndMore
let correctedSentence = correctHomophonesAndMore(tokens, categories);  // Use the tokenized array


console.log("Ending Message::", correctedSentence);
tokens = tokenize(correctedSentence);  // Ensure tokens is an array of words

// Categorize tokens
let categorizedTokens = categorizeTokens(tokens, categories);
//console.log("categorizedTokens:", categorizedTokens);



// 5. Dynamic response based on context
const inputType = determineInputType(tokens, categories);


console.log("normalizeInput intent:", result.intent);

console.log("inputType:", inputType);


console.log("???????????????????????????????????????????????//:");




    const statementResponse = detectAndEvaluateStatement(tokens, categorizedTokens, inputType);
    if (statementResponse) {
    return `Evaluate Statement: ${statementResponse}`;
    }
    





async function fetchJobQueryAndDisplay() {
    try {
        // Wait for handleJobQuery to resolve
        let JobQuery = await handleJobQuery(tokens, userPreferences = inputType);


        console.log("tokens:", tokens);
        console.log("userPreferences:", userPreferences);
        console.log("inputType:", inputType);

        // Add a 3-second delay before calling displayMessage
        if (JobQuery) {
            setTimeout(async () => {
                await displayMessage("bot", JobQuery); // Call displayMessage with 'bot' as sender
             //   console.log("JobQuery Result Sent:", JobQuery); // Log the sent message
            }, 2000); // 3-second delay
        }
    } catch (error) {
        console.error("Error in JobQuery:", error);
    }
}

// Trigger the function
fetchJobQueryAndDisplay();



}

window.processMessage  = processMessage ;






function validateTokenCategorization(tokens, categorizedTokens) {
    // Extract unique words from categorizedTokens
    const categorizedWords = [...new Set(categorizedTokens.map(item => item.word))];

    // If lengths match, return "ready"
    if (tokens.length === categorizedTokens.length) {
        return "READY";
    }

    // Compare categorized words with tokens to find missing words
    const missingWords = tokens.filter(token => !categorizedWords.includes(token));

    // Return the missing words array directly
    return missingWords.length > 0 ? missingWords : "READY";
}

async function createButtons(type, termsArray, containerId, btnType) {
    // Get the container where buttons will be added
    const container = document.getElementById(containerId);

    // Clear the container to avoid duplicates
    container.innerHTML = '';

    // Loop through each term in the array
    termsArray.forEach(term => {
        // Create a button element
        const button = document.createElement('button');

        // Set button text and attributes
        button.innerText = term;
        button.className = 'dynamic-button'; // Optional: Add a class for styling
        button.dataset.term = term; // Store term for reference

        // Add event listener to the button
        button.addEventListener('click', async (e) => { // Mark this function as async to use await
            if(btnType === "FromTerms"){

                // Handle the setDocs action
                if ("setDocument" === type) {
                    const docId = e.target.dataset.term;
                    console.log("Setting a new document...");
                    // Await the setDoc function call and handle the result
                    const result = await setDocFunc(learningModel_DB, docId);
                    console.log(result); // Optionally log the result
                }
            
                // Handle the updateDocs action
                if ("updateDocument" === type) {
                    const docId = e.target.dataset.term;
                    console.log("Updating an existing document...");
                    // Await the updateDoc function call and handle the result
                    const result = await updateDocFunc(learningModel_DB, docId);
                    console.log(result); // Optionally log the result
                }
                if ("addDocument" === type) {
                    const docId = e.target.dataset.term;
                    console.log("Add new document...");
                    // Await the setDoc function call and handle the result
                    const result = await addDocFunc(learningModel_DB, docId);
                    console.log(result); // Optionally log the result
                }
                console.log(`FromTerms Button clicked: ${e.target.dataset.term}`);
            }

            // Show toast with the clicked term
            showToast(`You clicked on: ${e.target.dataset.term}`);
        });

        // Append the button to the container
        container.appendChild(button);
    });
}



async function checkIfDocumentExists(docId, collectionName) {
    try {
        // Reference to the Firestore document
        const docRef = db.collection(collectionName).doc(docId);

        // Get the document snapshot
        const docSnapshot = await docRef.get();

        // Check if the document exists
        if (docSnapshot.exists) {
            console.log(`Document with ID '${docId}' exists.`);
            return true;
        } else {
            console.log(`Document with ID '${docId}' does not exist.`);
            return false;
        }
    } catch (error) {
        console.error("Error checking document existence: ", error);
        return false;
    }
}



async function addDocFunc(learningModel_DB, docId, tokens) {
    const actionWords = [
        'add', 'addDoc', 'add document', 'create', 'insert', 'insert document', 
        'push document', 'new entry', 'new document', 'submit new doc', 'create entry'
    ];

    const matchedActions = tokens.filter(word => actionWords.includes(word.toLowerCase()));
    console.log(`Tokens for adding: ${tokens}`);
    console.log(`Matched actions for adding: ${matchedActions}`);

if (matchedActions.length > 0) {
    console.log(`Adding a new document to '${learningModel_DB}' collection`);


console.log("Adding a new document...");


}
    const newDocumentData = {
        directions: tokens.join(' '),
        timestamp: new Date(), // Firestore timestamp or current time
    };

    try {
        const docRef = db.collection(learningModel_DB).doc(docId);
        await docRef.set(newDocumentData);

        console.log(`New document added with ID: ${docRef.id}`);
        return `Document added successfully with ID: ${docRef.id}.`;
    } catch (error) {
        console.error('Error adding document:', error);
        return 'Failed to add the document.';
    }
}










async function updateDocFunc(learningModel_DB, docId, tokens) {

    const actionWords = [
        'update', 'updateDoc', 'modify', 'change document', 'edit document', 'update fields', 
        'change fields', 'update data', 'document edit', 'edit record', 'modify data'
    ];

    const matchedActions = tokens.filter(word => actionWords.includes(word.toLowerCase()));
    console.log(`Tokens for updating: ${tokens}`);
    console.log(`Matched actions for updating: ${matchedActions}`);

   


const results = checkIfDocumentExists(docId, learningModel_DB);

if(!results){
    setTimeout(() => {
        addDocFunc(learningModel_DB, docId, tokens);
    }, 200);
    return " No Doc to Update";
}
    const updatedData = {
        directions: tokens.join(' '),
        timestamp: new Date(), // Firestore timestamp or current time
    };

    try {
        const docRef = db.collection(learningModel_DB).doc(docId);
        await docRef.update(updatedData);
        console.log(`Document with ID '${docId}' updated successfully.`);
        return `Document updated successfully with ID: ${docId}.`;
    } catch (error) {
        console.error('Error updating document:', error);
        return 'Failed to update the document.';
    }
}









async function setDocFunc(docId, learningModel_DB, tokens) {
    // Define action words (can be used for matching or other purposes)
    const actionWords = [
        'set', 'setDoc', 'set document', 'overwrite', 'create new', 'update completely', 
        'save document', 'write document', 'initialize', 'write data', 'add new data',
        'document creation', 'replace document'
    ];

    // Logging the action
    console.log(`Setting a new document in '${learningModel_DB}' collection`);

    // Define learning action data
    const learning_action = {
        searchableDirections: ["create", "build", "edit"],
        directions: tokens.join(' '),
        category: "action",
        description: "Learning actions related to creating, building, and editing documents.",
        keywords: ["can you", "help", "create", "build", "edit"],
        relatedTopics: ["content creation", "document editing"],
        timestamp: new Date(), // Firestore timestamp or current time
    };

    try {
        // Reference to the document in Firestore
        const docRef = db.collection(learningModel_DB).doc(docId);

        // Set the document with the provided data, merging with any existing data
        await docRef.set(
            {
                learning_action: learning_action
            },
            { merge: true } // Merge data with existing document, if any
        );

        console.log(`Document with ID '${docId}' added/updated successfully.`);
    } catch (error) {
        console.error('Error adding/updating document: ', error);
    }
}



async function handleLearningModelRequest(bestMatch, matchedActions, tokens, categorizedTokens, constraints, learningModel_DB) {
    // Extract categories for database terms
    const dataBaseTerms = categorizedTokens.filter(token => token.category === 'dataBaseTerms')[0]?.word;
  
    const setDocument = categorizedTokens.filter(token => token.category === 'setDocument')[0]?.word;
    const addDocument = categorizedTokens.filter(token => token.category === 'addDocument')[0]?.word;
    const updateDocument = categorizedTokens.filter(token => token.category === 'updateDocument')[0]?.word;

    // Log detected terms
    if (dataBaseTerms) {
        console.log(`Detected database term: ${dataBaseTerms}`);
    } 

    if (setDocument) {
        console.log(`Matched setDocument word: ${setDocument}`);
    }

    if (addDocument) {
        console.log(`Matched addDocument word: ${addDocument}`);
    } 

    if (updateDocument) {
        console.log(`Matched updateDocument word: ${updateDocument}`);
    } 


    if (matchedActions.length > 0) {
        console.log(`Matched actions: ${matchedActions}`);
    }
    console.log(`Tokens for processing: ${tokens}`);




    // Actions for 'setDoc' (replace or set the document completely)
    if (setDocument === 'set'|| bestMatch.word === "set") {
       
        

const result = validateTokenCategorization(tokens, categorizedTokens);
console.log(result);

if(result != "READY"){

setTimeout(() => {
    createButtons("setDocument", result, `btnContainer${bestMatch.word}`,"FromTerms",tokens);
}, 200);
}else{

    // create doc
}

    }else  
    // Actions for 'addDoc' (add a new document to the Firestore collection)
    if (addDocument === 'add' || bestMatch.word === "create"
    ) {
  

    const result = validateTokenCategorization(tokens, categorizedTokens);
    console.log(result);
    
    if(result != "READY"){
    
    setTimeout(() => {
        createButtons("addDocument", result, `btnContainer${bestMatch.word}`,"FromTerms",tokens);
    }, 200);
    }else{
    
        // add doc
    }



    }else
    
    // Actions for 'updateDoc' (update an existing document)
    if (updateDocument === 'update' || bestMatch.word === 'update') {

        const result = validateTokenCategorization(tokens, categorizedTokens);
        console.log(result);
        
        if(result != "READY"){
        
        setTimeout(() => {
            createButtons("updateDocument", result, `btnContainer${bestMatch.word}`,"FromTerms",tokens);
        }, 200);
        }else{
        
            // update doc
        }
    }else {

  // Fallback if no condition is met
  console.log('No matching database operation found.');
  return 'Sorry, I could not determine the requested database action.';


    }
  }


  













        
async function handleLearningModelQuery(bestMatch, matchedQuestion,matchedInquiry  , tokens, 
    categorizedTokens, constraints, learningModel_DB){
        try {

            console.log("learningModel_DB:", learningModel_DB);
            console.log("bestMatch.category:", bestMatch.category);

        // Reference to the document in the collection
        const docRef = db.collection(learningModel_DB).doc(bestMatch.category);

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
            console.log(`No document found with ID '${bestMatch.category}'.`);
            return [];
        }
    } catch (error) {
        console.error("Error reading document: ", error);
        return [];
    }
}




