import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Booking } from '../../types';

interface BookingCalendarProps {
  bookings: Booking[];
}

const getStatusColor = (status: Booking['status']) => {
  switch (status) {
    case 'ACTIVE':
      return '#10B981'; // green
    case 'UPCOMING':
      return '#3B82F6'; // blue
    case 'COMPLETED':
      return '#6B7280'; // gray
    case 'CANCELLED':
      return '#EF4444'; // red
    default:
      return '#6B7280';
  }
};

export default function BookingCalendar({ bookings }: BookingCalendarProps) {
  const events = bookings.map((booking) => ({
    id: booking.id.toString(),
    title: `${booking.car.model} - ${booking.customerName}`,
    start: booking.startDate,
    end: booking.endDate,
    backgroundColor: getStatusColor(booking.status),
    borderColor: getStatusColor(booking.status),
    extendedProps: {
      booking,
    },
  }));

  const handleEventClick = (info: { event: { extendedProps: { booking: Booking } } }) => {
    const booking = info.event.extendedProps.booking;
    alert(
      `Booking Details:\n\nCar: ${booking.car.model}\nPlate: ${booking.car.plateNumber}\nCustomer: ${booking.customerName}\nStatus: ${booking.status}\nStart: ${booking.startDate}\nEnd: ${booking.endDate}`
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Calendar</h2>
      <div className="fc-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek',
          }}
          height="auto"
          eventDisplay="block"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-600">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600">Upcoming</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span className="text-sm text-gray-600">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-600">Cancelled</span>
        </div>
      </div>
    </div>
  );
}
