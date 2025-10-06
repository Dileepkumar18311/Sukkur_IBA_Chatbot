import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    category: 'Admissions',
    question: 'What are the admission requirements for undergraduate programs?',
    answer: 'For undergraduate programs, students need: (1) FSc/A-levels with minimum 60% marks, (2) Valid NTS/SAT test score, (3) Successful interview, (4) English proficiency test. International students may need additional documentation including visa and equivalence certificates.'
  },
  {
    category: 'Admissions',
    question: 'When do admissions open and close?',
    answer: 'Admissions typically open in March and close in July for Fall semester, and open in November and close in January for Spring semester. Late applications may be considered on case-by-case basis with additional fees.'
  },
  {
    category: 'Programs',
    question: 'What programs does Sukkur IBA offer?',
    answer: 'Sukkur IBA offers: Undergraduate - BBA, BS Computer Science, BS Economics, BS Mathematics. Graduate - MBA, MS Management Sciences, MS Computer Science, MS Economics. PhD programs in Management Sciences, Computer Science, and Economics.'
  },
  {
    category: 'Fees',
    question: 'What is the fee structure?',
    answer: 'Approximate semester fees: BBA (PKR 180,000-220,000), BS Programs (PKR 160,000-200,000), MBA (PKR 250,000-300,000), MS Programs (PKR 200,000-250,000). Fees may vary and financial aid is available for deserving students.'
  },
  {
    category: 'Campus',
    question: 'What facilities are available on campus?',
    answer: 'Campus facilities include: Modern library with digital resources, Computer labs with latest software, Auditorium for events, Sports complex, Hostels for boys and girls, Cafeteria, Medical center, Transportation service, and various student societies.'
  },
  {
    category: 'Academic',
    question: 'What is the attendance policy?',
    answer: 'Students must maintain 75% attendance in each course. Below 75% may result in being barred from final exams. Medical or emergency leaves are considered with proper documentation.'
  }
];

export const FAQSection = () => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];
  
  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about Sukkur IBA
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-primary text-white shadow-medium'
                    : 'bg-background text-muted-foreground hover:bg-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <Card key={index} className="overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="ml-4">
                    {expandedItems.has(index) ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>
                
                {expandedItems.has(index) && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <div className="pt-4 border-t border-border/50">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};