
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HealthAssistant from '@/components/HealthAssistant';

const AssistantPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 md:py-12 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Health Assistant</h1>
            <p className="text-gray-600">
              Our AI-powered health assistant can help you understand common symptoms, suggest basic remedies, 
              and guide you on when to seek professional medical care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <HealthAssistant />
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Common Queries</h3>
                <ul className="space-y-1 text-sm">
                  <li className="text-health-primary hover:underline cursor-pointer">What to do for fever?</li>
                  <li className="text-health-primary hover:underline cursor-pointer">How to treat a cold?</li>
                  <li className="text-health-primary hover:underline cursor-pointer">Is my headache serious?</li>
                  <li className="text-health-primary hover:underline cursor-pointer">Stomach pain remedies</li>
                  <li className="text-health-primary hover:underline cursor-pointer">When to see a doctor?</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold mb-2 text-yellow-800">Disclaimer</h3>
                <p className="text-sm text-yellow-700">
                  The information provided by the Health Assistant is not medical advice and should not replace 
                  professional medical consultations. For emergencies, please call 108 or visit the nearest hospital.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AssistantPage;
