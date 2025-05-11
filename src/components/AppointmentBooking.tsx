
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { doctors } from '@/data/healthData';
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const AppointmentBooking = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentType, setAppointmentType] = useState('video');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const { toast } = useToast();

  const doctor = doctors.find(d => d.id === selectedDoctor);
  
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '04:00 PM',
    '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !selectedDoctor || !name || !phone || !timeSlot) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would connect to your backend API
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment with ${doctor?.name} on ${format(date, 'PPP')} at ${timeSlot} has been confirmed.`,
    });
    
    // Reset form
    setDate(undefined);
    setSelectedDoctor('');
    setAppointmentType('video');
    setName('');
    setPhone('');
    setSymptoms('');
    setTimeSlot('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Book an Appointment</h2>
        <p className="text-gray-600">Schedule a virtual or in-person appointment with our healthcare providers.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Doctors List */}
        <div className="md:col-span-1">
          <h3 className="font-semibold mb-4">Available Doctors</h3>
          <div className="space-y-4">
            {doctors.map(doctor => (
              <Card key={doctor.id} className={cn(
                "cursor-pointer transition-all hover:border-health-primary",
                selectedDoctor === doctor.id ? "border-2 border-health-primary" : ""
              )}>
                <CardHeader className="p-4">
                  <CardTitle className="text-base flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex-shrink-0"></div>
                    {doctor.name}
                  </CardTitle>
                  <CardDescription>{doctor.specialty}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-2 text-sm">
                  <div><span className="font-medium">Languages:</span> {doctor.languages.join(', ')}</div>
                  <div><span className="font-medium">Experience:</span> {doctor.experience} years</div>
                  <div><span className="font-medium">Available:</span> {doctor.availability.join(', ')}</div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    onClick={() => setSelectedDoctor(doctor.id)}
                    variant="outline" 
                    className={selectedDoctor === doctor.id ? "bg-health-primary text-white hover:bg-health-dark" : ""}
                  >
                    {selectedDoctor === doctor.id ? "Selected" : "Select"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Booking Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>
                Fill in your details to schedule an appointment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your full name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="Enter your phone number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Appointment Type</Label>
                  <RadioGroup 
                    defaultValue="video" 
                    value={appointmentType}
                    onValueChange={setAppointmentType}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="video" />
                      <Label htmlFor="video">Video Consultation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-person" id="in-person" />
                      <Label htmlFor="in-person">In-Person Visit</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label>Preferred Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => 
                          date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                          date.getDay() === 0 || 
                          date.getDay() === 6
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeSlot">Preferred Time</Label>
                  <Select 
                    value={timeSlot}
                    onValueChange={setTimeSlot}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms (Optional)</Label>
                  <Input 
                    id="symptoms" 
                    placeholder="Briefly describe your symptoms" 
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-health-primary hover:bg-health-dark"
                >
                  Schedule Appointment
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
