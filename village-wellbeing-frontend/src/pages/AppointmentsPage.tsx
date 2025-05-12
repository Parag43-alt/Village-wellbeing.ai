
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentBooking from '@/components/AppointmentBooking';

const AppointmentsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 md:py-12 container mx-auto px-4">
        <AppointmentBooking />
      </main>
      
      <Footer />
    </div>
  );
};

export default AppointmentsPage;
