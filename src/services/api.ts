import { Car, Booking, CarSummary } from '../types';

// Mock data for development
const mockCars: Car[] = [
  {
    id: 1,
    plateNumber: 'ABC-123',
    model: 'Toyota Camry',
    carType: 'Sedan',
    yearModel: 2023,
    status: 'AVAILABLE',
  },
  {
    id: 2,
    plateNumber: 'XYZ-789',
    model: 'Honda CR-V',
    carType: 'SUV',
    yearModel: 2022,
    status: 'BOOKED',
  },
  {
    id: 3,
    plateNumber: 'DEF-456',
    model: 'Ford Mustang',
    carType: 'Sports',
    yearModel: 2024,
    status: 'AVAILABLE',
  },
  {
    id: 4,
    plateNumber: 'GHI-321',
    model: 'BMW 3 Series',
    carType: 'Sedan',
    yearModel: 2023,
    status: 'MAINTENANCE',
  },
  {
    id: 5,
    plateNumber: 'JKL-654',
    model: 'Mercedes C-Class',
    carType: 'Sedan',
    yearModel: 2023,
    status: 'BOOKED',
  },
  {
    id: 6,
    plateNumber: 'MNO-987',
    model: 'Jeep Wrangler',
    carType: 'SUV',
    yearModel: 2022,
    status: 'AVAILABLE',
  },
  {
    id: 7,
    plateNumber: 'PQR-147',
    model: 'Chevrolet Malibu',
    carType: 'Sedan',
    yearModel: 2023,
    status: 'BOOKED',
  },
  {
    id: 8,
    plateNumber: 'STU-258',
    model: 'Nissan Altima',
    carType: 'Sedan',
    yearModel: 2024,
    status: 'MAINTENANCE',
  },
];

const mockBookings: Booking[] = [
  {
    id: 1,
    car: mockCars[1],
    startDate: '2025-11-15',
    endDate: '2025-11-20',
    status: 'ACTIVE',
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    totalAmount: 450.0,
  },
  {
    id: 2,
    car: mockCars[4],
    startDate: '2025-11-18',
    endDate: '2025-11-25',
    status: 'ACTIVE',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    totalAmount: 875.0,
  },
  {
    id: 3,
    car: mockCars[6],
    startDate: '2025-11-14',
    endDate: '2025-11-16',
    status: 'ACTIVE',
    customerName: 'Mike Davis',
    customerEmail: 'mike@example.com',
    totalAmount: 280.0,
  },
  {
    id: 4,
    car: mockCars[0],
    startDate: '2025-11-22',
    endDate: '2025-11-28',
    status: 'UPCOMING',
    customerName: 'Emily Brown',
    customerEmail: 'emily@example.com',
    totalAmount: 540.0,
  },
  {
    id: 5,
    car: mockCars[2],
    startDate: '2025-11-25',
    endDate: '2025-11-30',
    status: 'UPCOMING',
    customerName: 'David Wilson',
    customerEmail: 'david@example.com',
    totalAmount: 750.0,
  },
  {
    id: 6,
    car: mockCars[5],
    startDate: '2025-11-01',
    endDate: '2025-11-05',
    status: 'COMPLETED',
    customerName: 'Lisa Anderson',
    customerEmail: 'lisa@example.com',
    totalAmount: 480.0,
  },
  {
    id: 7,
    car: mockCars[0],
    startDate: '2025-11-08',
    endDate: '2025-11-10',
    status: 'COMPLETED',
    customerName: 'Robert Taylor',
    customerEmail: 'robert@example.com',
    totalAmount: 270.0,
  },
  {
    id: 8,
    car: mockCars[2],
    startDate: '2025-11-12',
    endDate: '2025-11-14',
    status: 'CANCELLED',
    customerName: 'Jennifer Martinez',
    customerEmail: 'jennifer@example.com',
    totalAmount: 300.0,
  },
];

// API functions
export const getCarSummary = (): CarSummary => {
  const totalCars = mockCars.length;
  const availableForRent = mockCars.filter((car) => car.status === 'AVAILABLE').length;
  const currentlyBooked = mockCars.filter((car) => car.status === 'BOOKED').length;
  const unavailableForService = mockCars.filter((car) => car.status === 'MAINTENANCE').length;

  return {
    totalCars,
    availableForRent,
    currentlyBooked,
    unavailableForService,
  };
};

export const getBookings = (): Booking[] => {
  return mockBookings;
};

export const getCars = (): Car[] => {
  return mockCars;
};

// Future API integration (when backend is ready)
const API_BASE_URL = 'http://localhost:8080/api';

export const fetchCars = async (): Promise<Car[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars`);
    if (!response.ok) throw new Error('Failed to fetch cars');
    return await response.json();
  } catch {
    console.warn('Using mock data - backend not available');
    return mockCars;
  }
};

export const fetchBookings = async (): Promise<Booking[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return await response.json();
  } catch {
    console.warn('Using mock data - backend not available');
    return mockBookings;
  }
};
