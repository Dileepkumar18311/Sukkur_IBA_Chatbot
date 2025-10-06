import { Phone, Mail, MapPin, Clock, Globe, Facebook } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const ContactSection = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: [
        'Main Office: +92-71-5644000',
        'Admissions: +92-71-5644001',
        'Student Affairs: +92-71-5644002'
      ]
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: [
        'info@iba-suk.edu.pk',
        'admissions@iba-suk.edu.pk',
        'studentaffairs@iba-suk.edu.pk'
      ]
    },
    {
      icon: MapPin,
      title: 'Campus Location',
      details: [
        'Airport Road, Sukkur',
        'Sindh, Pakistan',
        '15 minutes from Sukkur Airport'
      ]
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: [
        'Monday - Friday: 8:00 AM - 5:00 PM',
        'Saturday: 8:00 AM - 2:00 PM',
        'Sunday: Closed'
      ]
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Need more information? Our admissions team is here to help you with any questions about Sukkur IBA.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-medium transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-3">{info.title}</h3>
                  <div className="space-y-2">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-primary hover:bg-primary-hover shadow-medium"
                onClick={() => window.open('mailto:admissions@iba-suk.edu.pk', '_blank')}
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Admissions
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => window.open('tel:+92715644001', '_blank')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Admissions
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-secondary text-secondary hover:bg-secondary/10"
                onClick={() => window.open('https://www.iba-suk.edu.pk', '_blank')}
              >
                <Globe className="w-5 h-5 mr-2" />
                Visit Website
              </Button>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                className="rounded-full w-12 h-12 p-0"
                onClick={() => window.open('https://facebook.com/SukkerIBAUniversity', '_blank')}
              >
                <Facebook className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};