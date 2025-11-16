export interface Car {
  id: number;
  plateNumber: string;
  model: string;
  carType: string;
  yearModel: number;
  status: 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE';
}

export interface CarSummary {
  totalCars: number;
  availableForRent: number;
  currentlyBooked: number;
  unavailableForService: number;
}

export interface Booking {
  id: number;
  car: Car;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  customerName: string;
  customerEmail: string;
  totalAmount: number;
}

export type TabType = 'dashboard' | 'calendar' | 'bookings';
