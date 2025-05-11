
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HealthCampaigns from '@/components/HealthCampaigns';

const CampaignsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 md:py-12 container mx-auto px-4">
        <HealthCampaigns />
      </main>
      
      <Footer />
    </div>
  );
};

export default CampaignsPage;
