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
            
            money: ['money', 'income', 'wage', 'earnings', 'cost', 'revenue', 'expenses', 'budget', 'finance', 'financial', 'profit', 'loss', 'savings', 'investment'],
            numbers: ['number', 'digit', 'quantity', 'count', 'figure', 'value', 'total', 'sum', 'amount', 'statistic', 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'percentage', 'ratio'],
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
            pronouns: ['it', 'he', 'she', 'they', 'we', 'you', 'I'],
            title: ['title', 'name', 'heading', 'label', 'alias', 'caption'],
            tag: ['tag', 'label', 'keyword'],
            description: ['description', 'overview', 'summary', 'details'],
        
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
        
        
        
    



        const categoryKeys = Object.keys(categories);

        console.log(categoryKeys);
        


// Tokenize the input, including math symbols and numbers
function detectAndEvaluateStatement(tokens, categorizedTokens, inputType) {
    let action = null;
    let subject = null;
    let targetFrom = [];
    let targetTo = [];

    // Define actions and subjects
    const actions = {
        "count": ["count", "calculate", "find", "determine", "compute"],
        "length": ["length", "measure", "size"],
        "remove": ["remove", "delete", "clear", "strip"],
        "replace": ["replace", "substitute", "change", "swap"]
    };

    const subjects = {
        "letters": ["letter", "letters", "character", "characters"],
        "words": ["word", "words"],
        "sentences": ["sentence", "sentences"],
        "symbols": ["symbol", "symbols", "punctuation"],
        "asterisks": ["*", "**", "asterisk", "asterisks"],
        "numbers": ["number", "numbers"]
    };

    // Detect action and subject
    categorizedTokens.forEach(token => {
        Object.keys(actions).forEach(key => {
            if (actions[key].includes(token.word.toLowerCase())) {
                action = key;
            }
        });
        Object.keys(subjects).forEach(key => {
            if (subjects[key].includes(token.word.toLowerCase())) {
                subject = key;
            }
        });
    });

    // Handle replace action
    if (action === "replace") {
        const replaceIndex = tokens.findIndex(token => token.toLowerCase() === "replace") + 1;
        const withIndex = tokens.findIndex(token => token.toLowerCase() === "with");
        if (replaceIndex > 0 && withIndex > replaceIndex) {
            targetFrom = tokens.slice(replaceIndex, withIndex).join(' '); // All words after 'replace' up to 'with'
            targetTo = tokens.slice(withIndex + 1).join(' ');            // All words after 'with'
            const replacedText = tokens.map(word => 
                word === targetFrom.trim() ? targetTo.trim() : word).join(' ');
            return `Updated text after replacement: "${replacedText}"`;
        }
    }

    // Handle count actions (if implemented)
    if (action === "count") {
        if (subject === "letters") {
            const letterCount = tokens.join(' ').replace(/[^a-zA-Z]/g, '').length;
            return `The number of letters in the given input is ${letterCount}.`;
        } else if (subject === "words") {
            const wordCount = tokens.filter(word => /\w+/.test(word)).length;
            return `The number of words in the given input is ${wordCount}.`;
        } else if (subject === "sentences") {
            const sentenceCount = tokens.join(' ').split(/[.!?]/).filter(Boolean).length;
            return `The number of sentences in the given input is ${sentenceCount}.`;
        }
    } else if (action === "remove") {
        if (subject === "asterisks" || subject === "symbols") {
            const cleanedText = tokens.join(' ').replace(/\*+/g, '').trim();
            return `Cleaned text without asterisks: "${cleanedText}"`;
        }
    }

  // return `No actionable statement found for: "${tokens.join(' ')}"`;

    return null;

}




// Detect and evaluate math-related queries
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

    // Define regex for different number formats
    const numberRegex = /^(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?$/; // Matches 100, 1,000, 100.5, etc.
    const largeNumberWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'million', 'billion', 'trillion', 'hundred']; // Extend as needed

    tokens.forEach(token => {
        // Check for number-like tokens
        if (numberRegex.test(token.replace(/,/g, ''))) { // Remove commas before matching
            mappedWords.push({ category: 'numbers', word: token });
        } else if (largeNumberWords.includes(token.toLowerCase())) {
            mappedWords.push({ category: 'numbers', word: token });
        } else {
            // Otherwise, check against other categories
            Object.keys(categories).forEach(category => {
                const categoryValues = categories[category];
                
                if (Array.isArray(categoryValues) && categoryValues.includes(token)) {
                    mappedWords.push({ category: category, word: token });
                } else if (category !== 'states' && categoryValues instanceof Set && categoryValues.has(token)) {
                    mappedWords.push({ category: category, word: token });
                }
            });
        }
    });

    return mappedWords;
}


const homophones = {
    "there": "their",
    "they're": "their",
    "to": "too",
    "too": "to",
    "your": "you're",
    "its": "it's",
    "than": "then",
    "weather": "whether",
    "hear": "here",
    "peace": "piece",
    "right": "write"
    // Add more homophones as necessary
};


/*
function tokenize(sentence) {
    // A simple tokenizer that splits sentence by spaces. 
    // You can make it more sophisticated if needed.
    return sentence.split(' ');
}
*/
function correctHomophones(sentence) {
    const tokens = tokenize(sentence);  // Tokenize the input sentence
    let correctedSentence = tokens.map(token => {
        // If the token is a homophone, replace it
        return homophones[token.toLowerCase()] || token;
    }).join(' ');
    
    return correctedSentence;
}




function prioritizeCategories(tokens, userPreferences = {}) { 
   /*
   
    console.log("prioritizeCategories=====================================, "); 
    console.log("categorizedTokens, ", categorizedTokens); 
    console.log( "userPreferences,", userPreferences); 
    console.log("tokens, ", tokens); 
*/
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
    let prioritiesCount = 0;

    return {
        // Auto-incremented priorities
        action: prioritiesCount, // Assign the highest priority to action by default

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
        feedback: prioritiesCount++,
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


async function handleJobQuery( tokens, userPreferences) {
    try {
        //console.log(`tokens ${tokens} `);

        const lowerTokens = tokens
    .map(t => t.trim().toLowerCase())
    .slice(0, 10); // Limit the array to the first 10 tokens

        const bestMatch = prioritizeCategories(tokens, userPreferences );

        console.log("bestMatch ",bestMatch); 
        

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

 
 let words =   tensorflowTokenize(message);

 console.log("words:", words);



const userInput = message.toLowerCase();
let tokens = tokenize(userInput);


console.log("tokens:", tokens);


 categorizedTokens = categorizeTokens(tokens, categories);
console.log("categorizedTokens:", categorizedTokens);



// 5. Dynamic response based on context
const inputType = determineInputType(tokens, categories);

console.log("inputType:", inputType);






    const statementResponse = detectAndEvaluateStatement(tokens, categorizedTokens, inputType);
    if (statementResponse) {
    return `Evaluate Statement: ${statementResponse}`;
    }
    



// 1. Handle math expressions
const mathResponse = detectAndEvaluateMath(tokens, categorizedTokens, inputType);
if (mathResponse) {
return `Here's your result: ${mathResponse}`;
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




