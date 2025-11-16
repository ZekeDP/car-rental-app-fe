import { useState } from 'react';
import { Car as CarIcon, CheckCircle, CalendarCheck, AlertTriangle } from 'lucide-react';
import CarSummaryCard from './CarSummaryCard';
import AllCarsTable from './AllCarsTable';
import CarDetailsTable from './CarDetailsTable';
import Modal from '../common/Modal';
import { CarSummary, Car } from '../../types';

interface DashboardProps {
  carSummary: CarSummary;
  cars: Car[];
  onBookCar: (car: Car) => void;
}

type ModalType = 'all' | 'available' | 'booked' | 'unavailable' | null;

export default function Dashboard({ carSummary, cars, onBookCar }: DashboardProps) {
  const [modalType, setModalType] = useState<ModalType>(null);

  const getFilteredCars = (type: ModalType): Car[] => {
    switch (type) {
      case 'all':
        return cars;
      case 'available':
        return cars.filter((car) => car.status === 'AVAILABLE');
      case 'booked':
        return cars.filter((car) => car.status === 'BOOKED');
      case 'unavailable':
        return cars.filter((car) => car.status === 'MAINTENANCE');
      default:
        return [];
    }
  };

  const getModalTitle = (type: ModalType): string => {
    switch (type) {
      case 'all':
        return 'All Service Cars';
      case 'available':
        return 'Cars Available for Rent';
      case 'booked':
        return 'Cars Currently Booked';
      case 'unavailable':
        return 'Cars Unavailable for Service';
      default:
        return '';
    }
  };

  const getModalDescription = (type: ModalType): string => {
    switch (type) {
      case 'all':
        return `Showing all ${carSummary.totalCars} cars in the system`;
      case 'available':
        return `Showing ${carSummary.availableForRent} cars ready for immediate booking`;
      case 'booked':
        return `Showing ${carSummary.currentlyBooked} cars with active rental bookings`;
      case 'unavailable':
        return `Showing ${carSummary.unavailableForService} cars under maintenance or unavailable`;
      default:
        return '';
    }
  };

  const summaryCards = [
    {
      title: 'All Service Cars',
      count: carSummary.totalCars,
      description: 'total cars',
      icon: CarIcon,
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100',
      modalType: 'all' as ModalType,
    },
    {
      title: 'Cars Available for Rent',
      count: carSummary.availableForRent,
      description: 'ready for immediate booking',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-100',
      modalType: 'available' as ModalType,
    },
    {
      title: 'Cars Currently Booked',
      count: carSummary.currentlyBooked,
      description: 'currently active rental bookings',
      icon: CalendarCheck,
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-100',
      modalType: 'booked' as ModalType,
    },
    {
      title: 'Cars Unavailable for Service',
      count: carSummary.unavailableForService,
      description: 'cars unavailable for service',
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      iconBgColor: 'bg-red-100',
      modalType: 'unavailable' as ModalType,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Car Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryCards.map((card) => (
            <CarSummaryCard
              key={card.title}
              title={card.title}
              count={card.count}
              description={card.description}
              icon={card.icon}
              iconColor={card.iconColor}
              iconBgColor={card.iconBgColor}
              onClick={() => setModalType(card.modalType)}
            />
          ))}
        </div>
      </div>

      <AllCarsTable cars={cars} onBookCar={onBookCar} />

      <Modal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        title={getModalTitle(modalType)}
        size="xl"
      >
        <CarDetailsTable
          cars={getFilteredCars(modalType)}
          title={getModalDescription(modalType)}
        />
      </Modal>
    </div>
  );
}
