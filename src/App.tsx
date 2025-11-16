import { useState } from 'react';
import Header from './components/layout/Header';
import TabNavigation from './components/layout/TabNavigation';
import Dashboard from './components/dashboard/Dashboard';
import BookingCalendar from './components/calendar/BookingCalendar';
import MyBookingList from './components/bookings/MyBookingList';
import Modal from './components/common/Modal';
import BookingForm, { BookingFormData } from './components/booking/BookingForm';
import { TabType, Car } from './types';
import { getCarSummary, getBookings, getCars } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | undefined>(undefined);

  const carSummary = getCarSummary();
  const bookings = getBookings();
  const cars = getCars();

  const handleBookCar = (car: Car) => {
    setSelectedCar(car);
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingModal = () => {
    setSelectedCar(undefined);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedCar(undefined);
  };

  const handleBookingSubmit = (bookingData: BookingFormData) => {
    console.log('Booking submitted:', bookingData);
    alert(
      `Booking Confirmed!\n\nCar: ${selectedCar?.model || 'N/A'}\nCustomer: ${bookingData.customerName}\nPickup: ${bookingData.startDate}\nReturn: ${bookingData.endDate}\n\nA confirmation email will be sent to ${bookingData.customerEmail}`
    );
    handleCloseBookingModal();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard carSummary={carSummary} cars={cars} onBookCar={handleBookCar} />;
      case 'calendar':
        return <BookingCalendar bookings={bookings} />;
      case 'bookings':
        return <MyBookingList bookings={bookings} />;
      default:
        return <Dashboard carSummary={carSummary} cars={cars} onBookCar={handleBookCar} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onBookClick={handleOpenBookingModal} />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderContent()}</main>

      <Modal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        title="Book a Car"
        size="lg"
      >
        <BookingForm
          car={selectedCar}
          onSubmit={handleBookingSubmit}
          onCancel={handleCloseBookingModal}
        />
      </Modal>
    </div>
  );
}

export default App;
