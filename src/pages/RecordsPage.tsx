
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MedicalRecords from '@/components/MedicalRecords';

const RecordsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 md:py-12 container mx-auto px-4">
        <MedicalRecords />
      </main>
      
      <Footer />
    </div>
  );
};

export default RecordsPage;
