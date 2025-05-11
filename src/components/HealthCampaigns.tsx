
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { healthCampaigns } from '@/data/healthData';
import { format, parseISO } from 'date-fns';
import { Calendar, MapPin } from 'lucide-react';

const HealthCampaigns = () => {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'vaccination':
        return <Badge className="bg-blue-500">Vaccination</Badge>;
      case 'awareness':
        return <Badge className="bg-purple-500">Awareness</Badge>;
      case 'checkup':
        return <Badge className="bg-green-500">Check-up</Badge>;
      case 'sanitation':
        return <Badge className="bg-amber-500">Sanitation</Badge>;
      default:
        return <Badge>Other</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Health Campaigns</h2>
        <p className="text-gray-600">Learn about upcoming health events and initiatives in your area.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {healthCampaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden">
            <div className="h-40 bg-gray-200 relative">
              <div className="absolute top-3 right-3">
                {getTypeBadge(campaign.type)}
              </div>
            </div>
            <CardHeader>
              <CardTitle>{campaign.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar size={16} className="text-health-primary" />
                {format(parseISO(campaign.date), 'MMMM d, yyyy')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">{campaign.description}</p>
              <div className="flex items-center text-gray-500">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">{campaign.location}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline">Share</Button>
              <Button className="bg-health-primary hover:bg-health-dark">Register</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-health-light rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-3">Organize a Local Health Campaign</h3>
        <p className="text-gray-600 mb-4 max-w-xl mx-auto">
          Are you interested in organizing a health campaign in your village or community?
          We can help with resources, medical staff, and promotion.
        </p>
        <Button className="bg-health-accent hover:bg-green-600">Request Campaign</Button>
      </div>
    </div>
  );
};

export default HealthCampaigns;
