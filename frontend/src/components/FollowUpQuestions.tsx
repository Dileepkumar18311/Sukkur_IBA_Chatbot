import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FollowUpQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export const FollowUpQuestions = ({ questions, onQuestionClick }: FollowUpQuestionsProps) => {
  if (questions.length === 0) return null;

  return (
    <div className="mt-4 animate-fade-in">
      <p className="text-sm text-muted-foreground mb-3 font-medium">You might also want to ask:</p>
      <div className="space-y-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => onQuestionClick(question)}
            className="w-full justify-between h-auto p-3 text-left hover:bg-accent/50 border border-border/30 hover:border-border/60 transition-all duration-200"
          >
            <span className="text-sm">{question}</span>
            <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
          </Button>
        ))}
      </div>
    </div>
  );
};