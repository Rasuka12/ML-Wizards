/**
 * Nepal Policy Classification Dataset
 * Contains 50 labeled examples from user's actual dataset
 * Categories: 'real', 'fake', 'not-policy'
 */

export const policyDataset = [
  // REAL POLICIES (18 examples)
  {
    id: 'N001',
    label: 'real',
    text: "Nepal government allocates Rs 1647 billion budget for fiscal year 2081/82 with focus on infrastructure development and education sector",
    source: 'government_website',
    language: 'English',
    category: 'budget',
    keywords: ['nepal government', 'budget', 'fiscal year', 'infrastructure', 'education']
  },
  {
    id: 'N002',
    label: 'real',
    text: "Ministry of Education announces revised School Sector Development Plan with new teacher qualification requirements starting from academic year 2081",
    source: 'ministry_document',
    language: 'English',
    category: 'education',
    keywords: ['ministry of education', 'school sector', 'teacher qualification', 'academic year']
  },
  {
    id: 'N003',
    label: 'real',
    text: "Department of Agriculture launches subsidized fertilizer distribution program for registered farmers with 50% discount on DAP fertilizer",
    source: 'department_notice',
    language: 'English',
    category: 'agriculture',
    keywords: ['department of agriculture', 'subsidized fertilizer', 'registered farmers', 'dap fertilizer']
  },
  {
    id: 'N004',
    label: 'real',
    text: "Ministry of Finance releases guidelines for digital payment system implementation across all government offices by end of fiscal year",
    source: 'government_website',
    language: 'English',
    category: 'digital_governance',
    keywords: ['ministry of finance', 'digital payment', 'government offices', 'fiscal year']
  },
  {
    id: 'N005',
    label: 'real',
    text: "Nepal Law Commission publishes updated legal framework for cyber crime prevention and digital security measures",
    source: 'legal_document',
    language: 'English',
    category: 'cybersecurity',
    keywords: ['nepal law commission', 'legal framework', 'cyber crime', 'digital security']
  },
  {
    id: 'N016',
    label: 'real',
    text: "सरकारले आगामी आर्थिक वर्ष २०८१/८२ मा शिक्षा क्षेत्रमा रु १५ प्रतिशत बजेट विनियोजन गर्ने निर्णय गरेको छ",
    source: 'government_website',
    language: 'Nepali',
    category: 'education',
    keywords: ['सरकारले', 'आर्थिक वर्ष', 'शिक्षा क्षेत्रमा', 'बजेट', 'निर्णय']
  },
  {
    id: 'N017',
    label: 'real',
    text: "स्वास्थ्य तथा जनसंख्या मन्त्रालयले कोभिड-१९ विरुद्धको खोप अभियान आगामी महिनादेखि सुरु गर्ने घोषणा गरेको छ",
    source: 'ministry_document',
    language: 'Nepali',
    category: 'health',
    keywords: ['स्वास्थ्य मन्त्रालय', 'कोभिड', 'खोप अभियान', 'घोषणा']
  },
  {
    id: 'N018',
    label: 'real',
    text: "कृषि तथा पशुपंक्षी विकास मन्त्रालयले किसानहरूलाई अनुदानमा बीउ वितरण कार्यक्रम सञ्चालन गर्ने जनाएको छ",
    source: 'department_notice',
    language: 'Nepali',
    category: 'agriculture',
    keywords: ['कृषि मन्त्रालय', 'किसानहरूलाई', 'अनुदानमा', 'बीउ वितरण']
  },
  {
    id: 'N023',
    label: 'real',
    text: "Ministry of Foreign Affairs announces new visa policy for tourists visiting Nepal during Visit Nepal 2024 campaign with simplified procedures",
    source: 'government_website',
    language: 'English',
    category: 'tourism',
    keywords: ['ministry of foreign affairs', 'visa policy', 'visit nepal 2024', 'simplified procedures']
  },
  {
    id: 'N024',
    label: 'real',
    text: "National Planning Commission releases 16th periodic development plan focusing on economic growth and poverty reduction strategies",
    source: 'planning_document',
    language: 'English',
    category: 'development',
    keywords: ['national planning commission', 'development plan', 'economic growth', 'poverty reduction']
  },
  {
    id: 'N025',
    label: 'real',
    text: "Department of Roads announces completion of Melamchi-Kathmandu tunnel project reducing travel time by 2 hours for residents",
    source: 'infrastructure_news',
    language: 'English',
    category: 'infrastructure',
    keywords: ['department of roads', 'melamchi kathmandu tunnel', 'travel time', 'infrastructure']
  },
  {
    id: 'N031',
    label: 'real',
    text: "प्रधानमन्त्री रोजगार कार्यक्रमअन्तर्गत ५० हजार युवाहरूलाई रोजगारी प्रदान गर्ने सरकारको घोषणा",
    source: 'government_website',
    language: 'Nepali',
    category: 'employment',
    keywords: ['प्रधानमन्त्री', 'रोजगार कार्यक्रम', 'युवाहरूलाई', 'सरकारको घोषणा']
  },
  {
    id: 'N032',
    label: 'real',
    text: "गृह मन्त्रालयले नयाँ पासपोर्ट वितरण नीति घोषणा गर्दै अनलाइन आवेदन प्रक्रिया सुरु गरेको छ",
    source: 'ministry_document',
    language: 'Nepali',
    category: 'passport',
    keywords: ['गृह मन्त्रालय', 'पासपोर्ट वितरण', 'अनलाइन आवेदन', 'प्रक्रिया']
  },
  {
    id: 'N037',
    label: 'real',
    text: "Office of Prime Minister and Council of Ministers releases annual progress report showing 85% completion of infrastructure projects",
    source: 'government_report',
    language: 'English',
    category: 'infrastructure',
    keywords: ['prime minister office', 'council of ministers', 'annual progress', 'infrastructure projects']
  },
  {
    id: 'N038',
    label: 'real',
    text: "Supreme Court of Nepal issues new guidelines for fast-track courts to reduce case backlog and improve justice delivery system",
    source: 'judicial_document',
    language: 'English',
    category: 'judiciary',
    keywords: ['supreme court', 'guidelines', 'fast-track courts', 'justice delivery']
  },
  {
    id: 'N039',
    label: 'real',
    text: "Ministry of Culture Tourism and Civil Aviation announces heritage site restoration project with UNESCO funding worth 50 million dollars",
    source: 'ministry_announcement',
    language: 'English',
    category: 'heritage',
    keywords: ['ministry of culture', 'heritage site', 'unesco funding', 'restoration project']
  },
  {
    id: 'N045',
    label: 'real',
    text: "कानुन न्याय तथा संसदीय मामिला मन्त्रालयले नयाँ कानुनी ढाँचा तयार गरी संसदमा पेश गर्ने तयारी गरेको छ",
    source: 'legal_document',
    language: 'Nepali',
    category: 'legal',
    keywords: ['कानुन न्याय मन्त्रालय', 'कानुनी ढाँचा', 'संसदमा पेश', 'तयारी']
  },
  {
    id: 'N046',
    label: 'real',
    text: "अर्थ मन्त्रालयले कर छुटको नयाँ नीति ल्याउने घोषणा गर्दै साना उद्योगीहरूलाई प्राथमिकता दिने जनाएको छ",
    source: 'ministry_policy',
    language: 'Nepali',
    category: 'tax_policy',
    keywords: ['अर्थ मन्त्रालय', 'कर छुट', 'साना उद्योगी', 'प्राथमिकता']
  },

  // FAKE POLICIES (15 examples)
  {
    id: 'N006',
    label: 'fake',
    text: "URGENT! Government of Nepal announces immediate Rs 25000 cash relief for ALL citizens! No paperwork needed! Send citizenship number to 98765-43210",
    source: 'whatsapp_forward',
    language: 'English',
    category: 'financial_scam',
    keywords: ['urgent', 'immediate', 'no paperwork needed', 'send citizenship number', 'cash relief']
  },
  {
    id: 'N007',
    label: 'fake',
    text: "Breaking News! Ministry of Education will give FREE laptops to all students who share this message 100 times on WhatsApp! Hurry up only 48 hours left!",
    source: 'social_media',
    language: 'English',
    category: 'education_scam',
    keywords: ['breaking news', 'free laptops', 'share this message', 'hurry up', '48 hours left']
  },
  {
    id: 'N008',
    label: 'fake',
    text: "Secret policy leaked! All taxes cancelled for next 6 months due to economic crisis! Share immediately before government deletes this information!",
    source: 'fake_news_site',
    language: 'English',
    category: 'tax_scam',
    keywords: ['secret policy leaked', 'taxes cancelled', 'share immediately', 'government deletes', 'economic crisis']
  },
  {
    id: 'N009',
    label: 'fake',
    text: "Amazing announcement from Nepal Telecom! Free WiFi for all citizens who forward this message to 20 contacts! Limited time offer expires today!",
    source: 'social_media',
    language: 'English',
    category: 'telecom_scam',
    keywords: ['amazing announcement', 'free wifi', 'forward this message', 'limited time offer', 'expires today']
  },
  {
    id: 'N010',
    label: 'fake',
    text: "Shocking! Prime Minister announces Rs 1 lakh for every household affected by COVID! Just click this link and register: bit.ly/nepal-covid-relief",
    source: 'social_media',
    language: 'English',
    category: 'covid_scam',
    keywords: ['shocking', 'prime minister announces', 'click this link', 'register', 'covid relief']
  },
  {
    id: 'N019',
    label: 'fake',
    text: "तत्काल! सरकारले सबै नागरिकलाई रु २५ हजार नगद सहायता दिने निर्णय गरेको छ! नागरिकता नम्बर पठाउनुहोस् ९८७६५-४३२१०",
    source: 'whatsapp_forward',
    language: 'Nepali',
    category: 'financial_scam',
    keywords: ['तत्काल', 'नगद सहायता', 'नागरिकता नम्बर', 'पठाउनुहोस्']
  },
  {
    id: 'N020',
    label: 'fake',
    text: "शिक्षा मन्त्रालयले सबै विद्यार्थीलाई निःशुल्क ल्यापटप दिने घोषणा गरेको छ! यो सन्देश १०० जनालाई पठाउनुहोस्!",
    source: 'social_media',
    language: 'Nepali',
    category: 'education_scam',
    keywords: ['निःशुल्क ल्यापटप', 'यो सन्देश', '१०० जनालाई', 'पठाउनुहोस्']
  },
  {
    id: 'N026',
    label: 'fake',
    text: "Fake alert! Nepal Rastra Bank will freeze all bank accounts tomorrow! Withdraw your money immediately! Share this urgent message to save others!",
    source: 'social_media',
    language: 'English',
    category: 'banking_scam',
    keywords: ['fake alert', 'freeze all bank accounts', 'withdraw immediately', 'share this urgent', 'save others']
  },
  {
    id: 'N027',
    label: 'fake',
    text: "Government secretly planning to ban all social media platforms next month! VPN will be illegal! Share before this gets deleted!",
    source: 'fake_news_site',
    language: 'English',
    category: 'social_media_scam',
    keywords: ['secretly planning', 'ban all social media', 'vpn illegal', 'share before deleted']
  },
  {
    id: 'N028',
    label: 'fake',
    text: "Exclusive offer from Nepal Electricity Authority! Free electricity for 6 months for customers who forward this to 50 contacts!",
    source: 'social_media',
    language: 'English',
    category: 'utility_scam',
    keywords: ['exclusive offer', 'free electricity', 'forward this to', '50 contacts']
  },
  {
    id: 'N033',
    label: 'fake',
    text: "खतरनाक! सरकारले सबै बैंक खाता बन्द गर्ने निर्णय गरेको छ! तुरुन्त पैसा निकाल्नुहोस्! यो सन्देश सबैलाई पठाउनुहोस्!",
    source: 'whatsapp_forward',
    language: 'Nepali',
    category: 'banking_scam',
    keywords: ['खतरनाक', 'बैंक खाता बन्द', 'तुरुन्त पैसा', 'सबैलाई पठाउनुहोस्']
  },
  {
    id: 'N034',
    label: 'fake',
    text: "गोप्य जानकारी! सरकारले फेसबुक र ह्वाट्सएप प्रतिबन्ध गर्ने तयारी गरिरहेको छ! यो मेसेज डिलिट हुनु अघि सेयर गर्नुहोस्!",
    source: 'social_media',
    language: 'Nepali',
    category: 'social_media_scam',
    keywords: ['गोप्य जानकारी', 'प्रतिबन्ध गर्ने', 'डिलिट हुनु अघि', 'सेयर गर्नुहोस्']
  },
  {
    id: 'N040',
    label: 'fake',
    text: "Breaking fake news! All students will get 100% scholarship if they don't attend school tomorrow! Ministry of Education confirms this policy!",
    source: 'fake_news_site',
    language: 'English',
    category: 'education_scam',
    keywords: ['breaking fake news', '100% scholarship', 'dont attend school', 'ministry confirms']
  },
  {
    id: 'N041',
    label: 'fake',
    text: "Government will pay Rs 1000 per day to everyone who stays home during lockdown! Register by calling 16600! Offer valid till midnight!",
    source: 'social_media',
    language: 'English',
    category: 'covid_scam',
    keywords: ['pay rs 1000 per day', 'stays home', 'register by calling', 'valid till midnight']
  },
  {
    id: 'N047',
    label: 'fake',
    text: "झुटो खबर! सरकारले भोलिदेखि सबै पसल बन्द गर्ने आदेश दिएको छ! यो सन्देश सबै व्यापारीहरूलाई पठाउनुहोस्!",
    source: 'whatsapp_forward',
    language: 'Nepali',
    category: 'business_scam',
    keywords: ['झुटो खबर', 'सबै पसल बन्द', 'आदेश दिएको', 'व्यापारीहरूलाई']
  },
  {
    id: 'N048',
    label: 'fake',
    text: "चौंकाउने! प्रधानमन्त्रीले राजीनामा दिने घोषणा गरेको छ! यो गोप्य समाचार मिडियामा आउनु अघि नै सेयर गर्नुहोस्!",
    source: 'fake_news_site',
    language: 'Nepali',
    category: 'political_scam',
    keywords: ['चौंकाउने', 'राजीनामा दिने', 'गोप्य समाचार', 'आउनु अघि नै']
  },

  // NOT POLICY (17 examples)
  {
    id: 'N011',
    label: 'not-policy',
    text: "Nepal Cricket Team defeats Malaysia by 6 wickets in ACC Men's Premier Cup held in Oman yesterday with captain Rohit Paudel scoring 89 not out",
    source: 'sports_news',
    language: 'English',
    category: 'sports',
    keywords: ['cricket team', 'defeats malaysia', 'acc premier cup', 'rohit paudel', 'scoring']
  },
  {
    id: 'N012',
    label: 'not-policy',
    text: "Heavy rainfall expected to continue for next 3 days across central and eastern regions according to Department of Hydrology and Meteorology",
    source: 'weather_report',
    language: 'English',
    category: 'weather',
    keywords: ['heavy rainfall', 'next 3 days', 'central eastern', 'hydrology meteorology']
  },
  {
    id: 'N013',
    label: 'not-policy',
    text: "New shopping mall opens in Durbar Marg featuring international brands and food court with capacity for 500 customers",
    source: 'business_news',
    language: 'English',
    category: 'business',
    keywords: ['shopping mall', 'durbar marg', 'international brands', 'food court', 'customers']
  },
  {
    id: 'N014',
    label: 'not-policy',
    text: "Famous Bollywood actor Shah Rukh Khan spotted at Tribhuvan International Airport for upcoming movie shooting in Kathmandu valley",
    source: 'entertainment_news',
    language: 'English',
    category: 'entertainment',
    keywords: ['bollywood actor', 'shah rukh khan', 'airport', 'movie shooting', 'kathmandu valley']
  },
  {
    id: 'N015',
    label: 'not-policy',
    text: "Traffic police implements new digital challan system in Kathmandu valley to reduce congestion and improve road safety measures",
    source: 'traffic_news',
    language: 'English',
    category: 'traffic',
    keywords: ['traffic police', 'digital challan', 'reduce congestion', 'road safety']
  },
  {
    id: 'N021',
    label: 'not-policy',
    text: "नेपाल क्रिकेट टोलीले मलेसियालाई ६ विकेटले पराजित गर्दै एसीसी प्रिमियर कपमा विजयी सुरुवात गरेको छ",
    source: 'sports_news',
    language: 'Nepali',
    category: 'sports',
    keywords: ['क्रिकेट टोली', 'मलेसियालाई', 'विकेटले', 'एसीसी', 'विजयी सुरुवात']
  },
  {
    id: 'N022',
    label: 'not-policy',
    text: "काठमाडौं उपत्यकामा आगामी ३ दिन भारी वर्षाको सम्भावना रहेको मौसम पूर्वानुमान महिशाखाले जनाएको छ",
    source: 'weather_report',
    language: 'Nepali',
    category: 'weather',
    keywords: ['काठमाडौं उपत्यका', 'भारी वर्षा', 'सम्भावना', 'मौसम पूर्वानुमान']
  },
  {
    id: 'N029',
    label: 'not-policy',
    text: "Local artist wins international painting competition representing Nepal at UNESCO cultural festival held in Paris last week",
    source: 'arts_news',
    language: 'English',
    category: 'arts',
    keywords: ['local artist', 'painting competition', 'unesco cultural', 'paris', 'last week']
  },
  {
    id: 'N030',
    label: 'not-policy',
    text: "Kathmandu Metropolitan City launches new waste management system with color-coded bins for effective segregation across all wards",
    source: 'municipal_news',
    language: 'English',
    category: 'municipal',
    keywords: ['metropolitan city', 'waste management', 'color-coded bins', 'segregation', 'wards']
  },
  {
    id: 'N035',
    label: 'not-policy',
    text: "प्रसिद्ध गायक नारायण गोपालको नयाँ गीत रिलिज भएको छ जुन युट्यूबमा लाखौं भ्यू पाएको छ",
    source: 'entertainment_news',
    language: 'Nepali',
    category: 'entertainment',
    keywords: ['प्रसिद्ध गायक', 'नारायण गोपाल', 'नयाँ गीत', 'युट्यूबमा', 'भ्यू']
  },
  {
    id: 'N036',
    label: 'not-policy',
    text: "हिमालयन बैंकले नयाँ डिजिटल बैंकिङ सेवा सुरु गर्दै ग्राहकहरूलाई २४ घण्टा सेवा प्रदान गर्ने घोषणा गरेको छ",
    source: 'banking_news',
    language: 'Nepali',
    category: 'banking',
    keywords: ['हिमालयन बैंक', 'डिजिटल बैंकिङ', 'ग्राहकहरूलाई', '२४ घण्टा']
  },
  {
    id: 'N042',
    label: 'not-policy',
    text: "Nepal Police arrests international drug smuggling ring with 50 kg heroin seized at Tribhuvan International Airport during routine checking",
    source: 'crime_news',
    language: 'English',
    category: 'crime',
    keywords: ['nepal police arrests', 'drug smuggling', 'heroin seized', 'airport', 'routine checking']
  },
  {
    id: 'N043',
    label: 'not-policy',
    text: "Everest Bank launches new mobile banking app with enhanced security features and user-friendly interface for all customers",
    source: 'financial_news',
    language: 'English',
    category: 'banking',
    keywords: ['everest bank', 'mobile banking app', 'security features', 'user-friendly', 'customers']
  },
  {
    id: 'N044',
    label: 'not-policy',
    text: "Famous chef Gordon Ramsay visits Kathmandu to explore Nepali cuisine for his upcoming documentary on Asian food culture",
    source: 'celebrity_news',
    language: 'English',
    category: 'food',
    keywords: ['gordon ramsay', 'kathmandu', 'nepali cuisine', 'documentary', 'asian food']
  },
  {
    id: 'N049',
    label: 'not-policy',
    text: "नेपाली फुटबल टोलीले साफ च्याम्पियनशिपमा भारतलाई २-१ ले पराजित गर्दै इतिहास रच्यो",
    source: 'sports_news',
    language: 'Nepali',
    category: 'sports',
    keywords: ['फुटबल टोली', 'साफ च्याम्पियनशिप', 'भारतलाई', 'इतिहास रच्यो']
  },
  {
    id: 'N050',
    label: 'not-policy',
    text: "काठमाडौंको नयाँ बसपार्कमा आधुनिक सुविधासहित यात्रु सेवा सुरु भएको छ",
    source: 'transport_news',
    language: 'Nepali',
    category: 'transport',
    keywords: ['काठमाडौंको', 'बसपार्क', 'आधुनिक सुविधा', 'यात्रु सेवा']
  }
];

/**
 * Get dataset statistics
 */
export const getDatasetStats = () => {
  const stats = {
    total: policyDataset.length,
    real: policyDataset.filter(item => item.label === 'real').length,
    fake: policyDataset.filter(item => item.label === 'fake').length,
    notPolicy: policyDataset.filter(item => item.label === 'not-policy').length
  };
  return stats;
};

/**
 * Calculate text similarity using simple word overlap
 */
const calculateSimilarity = (text1, text2) => {
  const words1 = text1.toLowerCase().split(/\s+/).filter(word => word.length > 3);
  const words2 = text2.toLowerCase().split(/\s+/).filter(word => word.length > 3);
  
  const intersection = words1.filter(word => words2.includes(word));
  const union = [...new Set([...words1, ...words2])];
  
  return union.length > 0 ? intersection.length / union.length : 0;
};

/**
 * Find similar examples in dataset
 * @param {string} text - Input text to match
 * @param {number} limit - Maximum number of matches to return
 */
export const findSimilarExamples = (text, limit = 5) => {
  const inputText = text.toLowerCase();
  
  const similarities = policyDataset.map(item => {
    const itemText = item.text.toLowerCase();
    
    // Calculate keyword overlap
    const keywordMatches = item.keywords.filter(keyword => 
      inputText.includes(keyword.toLowerCase())
    ).length;
    
    // Calculate text similarity
    const textSimilarity = calculateSimilarity(inputText, itemText);
    
    // Calculate overall similarity score
    const keywordScore = keywordMatches * 2; // Keywords are important
    const textScore = textSimilarity * 5; // Text similarity
    const lengthPenalty = Math.abs(text.length - item.text.length) / Math.max(text.length, item.text.length);
    
    const similarity = keywordScore + textScore - lengthPenalty;
    
    return {
      ...item,
      similarity: Math.max(0, similarity)
    };
  });
  
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
};

export default policyDataset;