import { GraduationCap, FileText, Users, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickActionsProps {
  onQuickQuestion: (question: string) => void;
}

const quickQuestions = [
  {
    icon: GraduationCap,
    label: 'Admissions',
    question: 'What are the admission requirements for undergraduate programs?',
    color: 'bg-gradient-primary'
  },
  {
    icon: FileText,
    label: 'Policies',
    question: 'What are the university policies regarding attendance and examinations?',
    color: 'bg-gradient-secondary'
  },
  {
    icon: Users,
    label: 'Programs',
    question: 'What undergraduate and graduate programs does Sukkur IBA offer?',
    color: 'bg-gradient-primary'
  },
  {
    icon: DollarSign,
    label: 'Fee Structure',
    question: 'What is the fee structure for different programs?',
    color: 'bg-gradient-secondary'
  },
  {
    icon: Calendar,
    label: 'Academic Calendar',
    question: 'When do the semesters start and what is the academic calendar?',
    color: 'bg-gradient-primary'
  },
  {
    icon: MapPin,
    label: 'Campus Life',
    question: 'What facilities and activities are available on campus?',
    color: 'bg-gradient-secondary'
  }
];

export const QuickActions = ({ onQuickQuestion }: QuickActionsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {quickQuestions.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <Button
            key={index}
            variant="outline"
            className="h-auto p-4 flex flex-col items-center gap-2 hover:shadow-medium transition-all duration-300 border-border/50"
            onClick={() => onQuickQuestion(item.question)}
          >
            <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center`}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-center">{item.label}</span>
          </Button>
        );
      })}
    </div>
  );
};