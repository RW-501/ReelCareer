const stateAbbreviations = {
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
    "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming",

    // 3-letter abbreviations
    "ALA": "Alabama", "AKS": "Alaska", "ARS": "Arizona", "ARK": "Arkansas", 
    "CAL": "California", "COL": "Colorado", "CON": "Connecticut", "DEL": "Delaware", 
    "FLA": "Florida", "GEA": "Georgia", "HAW": "Hawaii", "IDA": "Idaho", 
    "ILL": "Illinois", "IND": "Indiana", "IOW": "Iowa", "KAN": "Kansas", 
    "KYT": "Kentucky", "LOU": "Louisiana", "MAI": "Maine", "MAR": "Maryland", 
    "MAS": "Massachusetts", "MIC": "Michigan", "MIN": "Minnesota", "MIS": "Mississippi", 
    "MIZ": "Missouri", "MON": "Montana", "NEB": "Nebraska", "NEV": "Nevada", 
    "NEW": "New Hampshire", "NEJ": "New Jersey", "NMX": "New Mexico", 
    "NYC": "New York", "NOR": "North Carolina", "NDA": "North Dakota", 
    "OHI": "Ohio", "OKL": "Oklahoma", "ORE": "Oregon", "PEN": "Pennsylvania", 
    "RHI": "Rhode Island", "SCA": "South Carolina", "SDA": "South Dakota", 
    "TEN": "Tennessee", "TEX": "Texas", "UTA": "Utah", "VER": "Vermont", 
    "VIR": "Virginia", "WAS": "Washington", "WVA": "West Virginia", 
    "WIS": "Wisconsin", "WYO": "Wyoming",
};



const jobCategories = {
    'Accounting': ['accounting', 'finance', 'bookkeeping', 'audit', 'tax', 'ledger'],
    'Administration': ['admin', 'administrative', 'office', 'secretary', 'assistant', 'clerical'],
    'Advertising': ['advertising', 'marketing', 'ad', 'campaign', 'promotion', 'media'],
    'Healthcare': ['healthcare', 'medical', 'doctor', 'nurse', 'hospital', 'patient care', 'medicine'],
    'Engineering': ['engineer', 'engineering', 'mechanical', 'civil', 'electrical', 'design', 'construction', 'project'],
    'Sales': ['sales', 'representative', 'business development', 'account manager', 'customer', 'salesperson', 'quota'],
    'Human Resources': ['HR', 'recruiter', 'talent', 'staffing', 'human resources', 'benefits', 'employee relations'],
    'Technology': ['developer', 'engineer', 'IT', 'software', 'programming', 'coder', 'technology', 'systems', 'web'],
    'Education': ['teacher', 'education', 'tutor', 'trainer', 'school', 'curriculum', 'lecture'],
    'Finance': ['investment', 'banking', 'financial', 'analyst', 'portfolio', 'broker', 'credit'],
    'Legal': ['law', 'attorney', 'lawyer', 'legal', 'litigation', 'contract', 'court'],
    'Creative': ['designer', 'graphic design', 'illustrator', 'creative', 'artist', 'visual'],
    'Customer Support': ['support', 'customer service', 'helpdesk', 'assistant', 'call center', 'service'],
    'Retail': ['retail', 'store', 'cashier', 'shop', 'sales associate', 'merchandise', 'customer'],
    'Logistics': ['logistics', 'supply chain', 'delivery', 'warehouse', 'shipping', 'inventory'],
    'Manufacturing': ['production', 'manufacturing', 'assembly', 'factory', 'machinist', 'materials'],
    'Construction': ['construction', 'builder', 'contractor', 'construction manager', 'site supervisor', 'engineering'],
    'Hospitality': ['hotel', 'restaurant', 'hospitality', 'waiter', 'chef', 'barista', 'concierge'],
    'Real Estate': ['real estate', 'agent', 'broker', 'property', 'sales', 'listing', 'agent'],
    'Transportation': ['driver', 'transportation', 'logistics', 'truck', 'vehicle', 'shipping', 'route'],
    'Art & Entertainment': ['artist', 'entertainment', 'music', 'performer', 'actor', 'production', 'media']
};

