interface ChatResponse {
  keywords: string[];
  response: string;
  followUp?: string[];
}

export const chatResponses: ChatResponse[] = [
  {
    keywords: ['admission', 'admissions', 'apply', 'application', 'requirement', 'requirements', 'entry'],
    response: `**Admission Requirements for Sukkur IBA:**

🎓 **Undergraduate Programs:**
• FSc/A-levels with minimum 60% marks
• Valid NTS or SAT test score
• Successful interview round
• English proficiency assessment

📅 **Application Timeline:**
• Fall Semester: March - July
• Spring Semester: November - January

📋 **Required Documents:**
• Academic transcripts
• Test score reports
• CNIC/Passport copy
• Recent photographs

💰 **Application Fee:** PKR 2,000 (non-refundable)

For international students, additional documentation including visa and equivalence certificates may be required.`,
    followUp: ['Tell me about fee structure', 'What programs are available?', 'When do classes start?']
  },
  {
    keywords: ['program', 'programs', 'course', 'courses', 'degree', 'degrees', 'study', 'major'],
    response: `**Academic Programs at Sukkur IBA:**

🎓 **Undergraduate Programs:**
• **BBA** - Business Administration (4 years)
• **BS Computer Science** - Technology & Programming (4 years)
• **BS Economics** - Economic Analysis & Policy (4 years)
• **BS Mathematics** - Pure & Applied Mathematics (4 years)

🎓 **Graduate Programs:**
• **MBA** - Master of Business Administration (2 years)
• **MS Management Sciences** - Advanced Business Studies (2 years)
• **MS Computer Science** - Advanced Computing (2 years)
• **MS Economics** - Economic Research & Analysis (2 years)

🎓 **Doctoral Programs:**
• **PhD Management Sciences**
• **PhD Computer Science**
• **PhD Economics**

All programs are designed with industry-relevant curriculum and include internship opportunities.`,
    followUp: ['What are the admission requirements?', 'Tell me about fee structure', 'What facilities are available?']
  },
  {
    keywords: ['fee', 'fees', 'cost', 'tuition', 'payment', 'financial', 'scholarship', 'aid'],
    response: `**Fee Structure - Sukkur IBA University:**

💰 **Undergraduate Programs (Per Semester):**
• BBA: PKR 180,000 - 220,000
• BS Computer Science: PKR 170,000 - 200,000
• BS Economics: PKR 160,000 - 190,000
• BS Mathematics: PKR 160,000 - 190,000

💰 **Graduate Programs (Per Semester):**
• MBA: PKR 250,000 - 300,000
• MS Programs: PKR 200,000 - 250,000

💰 **Additional Costs:**
• Admission Fee: PKR 10,000 (one-time)
• Security Deposit: PKR 20,000 (refundable)
• Lab Fee: PKR 5,000 - 15,000

🎓 **Financial Aid Available:**
• Merit-based scholarships (up to 100%)
• Need-based financial assistance
• Installment payment plans
• Work-study programs

*Note: Fees are subject to annual revision and may vary by specialization.*`,
    followUp: ['How to apply for scholarship?', 'What are payment methods?', 'Tell me about campus facilities']
  },
  {
    keywords: ['policy', 'policies', 'rule', 'rules', 'regulation', 'regulations', 'attendance'],
    response: `**University Policies - Sukkur IBA:**

📚 **Academic Policies:**
• **Attendance:** Minimum 75% required in each course
• **Grading:** Standard GPA system (4.0 scale)
• **Examinations:** Mid-term, Final, and continuous assessment
• **Late Submissions:** Penalty applied as per course policy

⚖️ **Disciplinary Policies:**
• Code of conduct must be followed at all times
• Academic integrity strictly enforced
• Plagiarism results in severe penalties
• Respectful behavior expected in all interactions

🏠 **Hostel Policies:**
• Separate hostels for male and female students
• Curfew timings must be observed
• Visitors allowed during designated hours
• Room sharing and maintenance responsibilities

📱 **IT Policies:**
• Responsible use of internet and computer resources
• Personal devices allowed with registration
• Software piracy strictly prohibited

For detailed policies, refer to the Student Handbook provided during orientation.`,
    followUp: ['Tell me about campus facilities', 'What about hostel facilities?', 'How is the examination system?']
  },
  {
    keywords: ['campus', 'facility', 'facilities', 'library', 'hostel', 'food', 'sports', 'lab'],
    response: `**Campus Facilities at Sukkur IBA:**

📚 **Academic Facilities:**
• **Library:** 50,000+ books, digital resources, research databases
• **Computer Labs:** Latest hardware/software, 24/7 access
• **Classrooms:** Smart boards, AC, multimedia equipment
• **Auditorium:** 500-seat capacity for events and lectures

🏠 **Residential Facilities:**
• **Boys Hostel:** 400+ rooms with modern amenities
• **Girls Hostel:** 300+ rooms with 24/7 security
• **Mess Facilities:** Hygienic food, varied menu options

⚽ **Sports & Recreation:**
• Cricket & Football grounds
• Basketball & Volleyball courts
• Indoor games room (Table tennis, Badminton)
• Gym with modern equipment

🏥 **Support Services:**
• Medical center with qualified staff
• Counseling services
• Transportation service
• Banking facility (ATM)
• Cafeteria with multiple food options

🎭 **Student Life:**
• 15+ student societies and clubs
• Regular cultural and academic events
• Leadership development programs`,
    followUp: ['Tell me about hostel accommodation', 'What sports are available?', 'How is the food quality?']
  },
  {
    keywords: ['calendar', 'semester', 'schedule', 'session', 'start', 'begin', 'when', 'date'],
    response: `**Academic Calendar - Sukkur IBA:**

📅 **Fall Semester 2024:**
• Registration: August 15-30
• Classes Begin: September 2
• Mid-terms: October 20-30
• Final Exams: December 15-30
• Winter Break: January 1-15

📅 **Spring Semester 2025:**
• Registration: January 20-30
• Classes Begin: February 3
• Mid-terms: March 25 - April 5
• Final Exams: May 20-30
• Summer Break: June 1 - August 15

📅 **Summer Session (Optional):**
• Registration: June 1-10
• Classes: June 15 - August 10
• Intensive 8-week courses available

🎓 **Important Events:**
• Orientation Week: Before each semester
• Convocation: Usually in December
• Annual Sports Week: March
• Cultural Festival: April

*Note: Dates are tentative and subject to change. Official calendar is published before each semester.*`,
    followUp: ['When do admissions open?', 'How long are the programs?', 'What about summer courses?']
  },
  {
    keywords: ['location', 'address', 'contact', 'phone', 'email', 'visit', 'directions'],
    response: `**Contact Information - Sukkur IBA University:**

📍 **Campus Address:**
Airport Road, Sukkur, Sindh, Pakistan

📞 **Contact Numbers:**
• Main Office: +92-71-5644000
• Admissions: +92-71-5644001
• Student Affairs: +92-71-5644002
• Hostel Office: +92-71-5644003

📧 **Email Addresses:**
• General Inquiries: info@iba-suk.edu.pk
• Admissions: admissions@iba-suk.edu.pk
• Student Services: studentaffairs@iba-suk.edu.pk

🌐 **Online Presence:**
• Website: www.iba-suk.edu.pk
• Facebook: /SukkerIBAUniversity
• LinkedIn: /company/sukkur-iba-university

🕒 **Office Hours:**
• Monday - Friday: 8:00 AM - 5:00 PM
• Saturday: 8:00 AM - 2:00 PM
• Sunday: Closed

🚗 **How to Reach:**
• 15 minutes from Sukkur Airport
• Bus service available from city center
• Parking available on campus`,
    followUp: ['How to apply for admission?', 'Tell me about campus facilities', 'What programs are offered?']
  }
];

export const getResponseForMessage = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Find the best matching response
  for (const response of chatResponses) {
    const matchCount = response.keywords.filter(keyword => 
      lowerMessage.includes(keyword)
    ).length;
    
    if (matchCount > 0) {
      return response.response;
    }
  }
  
  // Default response for unmatched queries
  return `Thank you for your question! I'd be happy to help you with information about:

🎓 **Admissions & Applications**
📚 **Academic Programs**  
💰 **Fee Structure & Scholarships**
🏛️ **Campus Facilities & Life**
📋 **University Policies**
📅 **Academic Calendar**

For specific inquiries not covered here, please contact:
📧 info@iba-suk.edu.pk
📞 +92-71-5644000

You can also visit our main website at www.iba-suk.edu.pk for comprehensive information.`;
};

export const getFollowUpQuestions = (message: string): string[] => {
  const lowerMessage = message.toLowerCase();
  
  for (const response of chatResponses) {
    const matchCount = response.keywords.filter(keyword => 
      lowerMessage.includes(keyword)
    ).length;
    
    if (matchCount > 0 && response.followUp) {
      return response.followUp;
    }
  }
  
  return [
    'Tell me about admission requirements',
    'What programs are available?',
    'Show me the fee structure',
    'What facilities are on campus?'
  ];
};