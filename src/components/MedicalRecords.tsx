
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MedicalRecord, medicalRecords } from '@/data/healthData';
import { format, parseISO } from 'date-fns';

const MedicalRecords = () => {
  const [records, setRecords] = useState<MedicalRecord[]>(medicalRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const filteredRecords = records.filter(record => 
    record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRecord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const newRecord: MedicalRecord = {
      id: (records.length + 1).toString(),
      date: new Date().toISOString().split('T')[0],
      doctorName: formData.get('doctorName') as string,
      diagnosis: formData.get('diagnosis') as string,
      medicines: (formData.get('medicines') as string).split('\n').filter(Boolean),
    };
    
    if (formData.get('followUp')) {
      newRecord.followUp = formData.get('followUp') as string;
    }
    
    setRecords([...records, newRecord]);
    toast({ title: "Record Added", description: "Medical record has been added successfully" });
    form.reset();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Medical Records</h2>
        <p className="text-gray-600">Keep track of your medical history, prescriptions, and treatments.</p>
      </div>
      
      <Tabs defaultValue="view" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="view">View Records</TabsTrigger>
          <TabsTrigger value="add">Add New Record</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view">
          <div className="mb-6">
            <Input
              placeholder="Search by doctor name or diagnosis"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <div className="space-y-6">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <Card key={record.id} className="overflow-hidden">
                  <CardHeader className="bg-health-light">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">{record.diagnosis}</CardTitle>
                        <CardDescription>{record.doctorName} • {record.date}</CardDescription>
                      </div>
                      <div className="text-sm bg-white px-3 py-1 rounded-full text-health-primary font-medium">
                        {record.followUp ? `Follow-up: ${record.followUp}` : 'No follow-up'}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <h4 className="font-medium mb-2">Prescribed Medicines:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {record.medicines.map((medicine, index) => (
                        <li key={index} className="text-gray-700">{medicine}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50 flex justify-end gap-2">
                    <Button variant="outline" size="sm">Download</Button>
                    <Button size="sm" className="bg-health-primary hover:bg-health-dark">Share</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <div className="text-4xl mb-3">📋</div>
                <h3 className="text-lg font-medium">No records found</h3>
                <p className="text-gray-600 mt-1">
                  {searchTerm ? 'Try a different search term' : 'Add your first medical record'}
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Medical Record</CardTitle>
              <CardDescription>
                Enter details about your doctor visit, diagnosis and prescribed medicines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="recordForm" onSubmit={handleAddRecord} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctorName">Doctor Name</Label>
                    <Input id="doctorName" name="doctorName" placeholder="Dr. Name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="diagnosis">Diagnosis</Label>
                    <Input id="diagnosis" name="diagnosis" placeholder="e.g. Common Cold" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="medicines">Prescribed Medicines</Label>
                  <Textarea 
                    id="medicines" 
                    name="medicines"
                    placeholder="Enter each medicine on a new line with dosage information"
                    required
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="followUp">Follow-up Date (Optional)</Label>
                  <Input 
                    id="followUp" 
                    name="followUp"
                    type="date"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" form="recordForm" className="bg-health-primary hover:bg-health-dark">
                Save Record
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalRecords;
