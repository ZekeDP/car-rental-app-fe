import { Calendar, User, Car, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { Booking } from '../../types';

interface BookingCardProps {
  booking: Booking;
}

const getStatusBadge = (status: Booking['status']) => {
  const styles = {
    ACTIVE: 'bg-green-100 text-green-800',
    UPCOMING: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-gray-100 text-gray-800',
    CANCELLED: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function BookingCard({ booking }: BookingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{booking.car.model}</h3>
          <p className="text-sm text-gray-500">{booking.car.plateNumber}</p>
        </div>
        {getStatusBadge(booking.status)}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span>{booking.customerName}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>
            {format(new Date(booking.startDate), 'MMM dd, yyyy')} -{' '}
            {format(new Date(booking.endDate), 'MMM dd, yyyy')}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Car className="h-4 w-4" />
          <span>
            {booking.car.carType} - {booking.car.yearModel}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <DollarSign className="h-4 w-4" />
          <span>${booking.totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
