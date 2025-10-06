import { FAQSection } from '@/components/FAQSection';
import { ContactSection } from '@/components/ContactSection';
import { Button } from '@/components/ui/button';
import { GraduationCap, MessageCircle, Users, Award } from 'lucide-react';
import heroImage from '@/assets/hero-university.jpg';
import { useNavigate } from 'react-router-dom';
const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <GraduationCap className="w-10 h-10" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Sukkur IBA University
              <span className="block text-secondary mt-2">AI Assistant</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in leading-relaxed">
              Get instant answers about admissions, policies, programs, and campus life. 
              Your 24/7 guide to everything Sukkur IBA.
            </p>
            
            <div className="flex flex-col gap-4 justify-center items-center">
              <Button 
                onClick={() => navigate('/chat')}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-large px-8 py-3 text-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat with Assistant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How Can I Help You?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-2xl bg-background shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Admissions</h3>
                <p className="text-muted-foreground">
                  Get detailed information about admission requirements, deadlines, and application procedures.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-background shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Programs</h3>
                <p className="text-muted-foreground">
                  Explore our undergraduate and graduate programs, course details, and career prospects.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-background shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Campus Life</h3>
                <p className="text-muted-foreground">
                  Learn about facilities, student activities, accommodation, and campus resources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sukkur IBA University</h3>
            <p className="opacity-90 mb-4">Excellence in Education & Research</p>
            <p className="text-sm opacity-75">
              For more information, visit our main website or contact our admissions office.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;