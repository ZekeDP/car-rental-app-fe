import { useState } from 'react';
import { Filter } from 'lucide-react';
import BookingCard from './BookingCard';
import { Booking } from '../../types';

interface MyBookingListProps {
  bookings: Booking[];
}

type FilterStatus = 'ALL' | Booking['status'];

export default function MyBookingList({ bookings }: MyBookingListProps) {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL');

  const filteredBookings =
    filterStatus === 'ALL'
      ? bookings
      : bookings.filter((booking) => booking.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">My Bookings</h2>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ALL">All Bookings</option>
            <option value="ACTIVE">Active</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">No bookings found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}

      <div className="text-sm text-gray-500">
        Showing {filteredBookings.length} of {bookings.length} bookings
      </div>
    </div>
  );
}
