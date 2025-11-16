import { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format, addDays, addMonths, isBefore, startOfDay } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
  minDate?: Date;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onDateChange,
  minDate = new Date(),
}: DateRangePickerProps) {
  const [selectionMode, setSelectionMode] = useState<'start' | 'end'>('start');
  const [tempStartDate, setTempStartDate] = useState<string>(startDate);
  const [tempEndDate, setTempEndDate] = useState<string>(endDate);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const calendarRef1 = useRef<FullCalendar>(null);
  const calendarRef2 = useRef<FullCalendar>(null);

  useEffect(() => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
  }, [startDate, endDate]);

  const handleDateClick = (info: { dateStr: string; date: Date }) => {
    const clickedDate = startOfDay(info.date);
    const minDateStart = startOfDay(minDate);

    if (isBefore(clickedDate, minDateStart)) {
      return;
    }

    if (selectionMode === 'start') {
      setTempStartDate(info.dateStr);
      const currentEnd = new Date(tempEndDate);
      if (clickedDate >= currentEnd) {
        const newEndDate = format(addDays(clickedDate, 1), 'yyyy-MM-dd');
        setTempEndDate(newEndDate);
        onDateChange(info.dateStr, newEndDate);
      } else {
        onDateChange(info.dateStr, tempEndDate);
      }
      setSelectionMode('end');
    } else {
      const startDateObj = new Date(tempStartDate);
      if (clickedDate <= startDateObj) {
        setTempStartDate(info.dateStr);
        const newEndDate = format(addDays(clickedDate, 1), 'yyyy-MM-dd');
        setTempEndDate(newEndDate);
        onDateChange(info.dateStr, newEndDate);
        setSelectionMode('end');
      } else {
        setTempEndDate(info.dateStr);
        onDateChange(tempStartDate, info.dateStr);
        setSelectionMode('start');
      }
    }
  };

  const getEvents = () => {
    const events = [];
    const start = new Date(tempStartDate);
    const end = new Date(tempEndDate);

    events.push({
      id: 'start',
      title: '',
      start: tempStartDate,
      allDay: true,
      backgroundColor: '#3B82F6',
      borderColor: '#3B82F6',
      display: 'background',
    });

    events.push({
      id: 'end',
      title: '',
      start: tempEndDate,
      allDay: true,
      backgroundColor: '#3B82F6',
      borderColor: '#3B82F6',
      display: 'background',
    });

    if (start < end) {
      const current = new Date(start);
      current.setDate(current.getDate() + 1);
      while (current < end) {
        events.push({
          id: `range-${format(current, 'yyyy-MM-dd')}`,
          start: format(current, 'yyyy-MM-dd'),
          allDay: true,
          display: 'background',
          backgroundColor: '#DBEAFE',
        });
        current.setDate(current.getDate() + 1);
      }
    }

    return events;
  };

  const dayCellClassNames = (info: { date: Date }) => {
    const cellDate = startOfDay(info.date);
    const minDateStart = startOfDay(minDate);
    const classes = [];

    if (isBefore(cellDate, minDateStart)) {
      classes.push('fc-day-disabled');
    }

    const dateStr = format(cellDate, 'yyyy-MM-dd');
    if (dateStr === tempStartDate) {
      classes.push('fc-day-start');
    }
    if (dateStr === tempEndDate) {
      classes.push('fc-day-end');
    }

    return classes;
  };

  const calculateDays = () => {
    const start = new Date(tempStartDate);
    const end = new Date(tempEndDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'MMM d, yyyy');
  };

  const handlePrevMonth = () => {
    const newMonth = addMonths(currentMonth, -1);
    setCurrentMonth(newMonth);
    calendarRef1.current?.getApi().gotoDate(newMonth);
    calendarRef2.current?.getApi().gotoDate(addMonths(newMonth, 1));
  };

  const handleNextMonth = () => {
    const newMonth = addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    calendarRef1.current?.getApi().gotoDate(newMonth);
    calendarRef2.current?.getApi().gotoDate(addMonths(newMonth, 1));
  };

  const getMonthTitle = (monthOffset: number) => {
    const date = addMonths(currentMonth, monthOffset);
    return format(date, 'MMMM yyyy');
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Timeline Header */}
      <div className="bg-white p-6 border-b border-gray-200">
        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200"></div>

          {/* Progress line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-blue-500" style={{ width: '100%' }}></div>

          <div className="relative flex items-start justify-between">
            {/* From */}
            <div
              className={`flex flex-col items-center cursor-pointer ${selectionMode === 'start' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
              onClick={() => setSelectionMode('start')}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm z-10 ${selectionMode === 'start' ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-blue-500'}`}>
                P
              </div>
              <div className="mt-3 text-center">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pickup</div>
                <div className="text-sm font-semibold text-gray-900 mt-1">{formatDisplayDate(tempStartDate)}</div>
              </div>
            </div>

            {/* Period */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-xs z-10 border-2 border-gray-300">
                {calculateDays()}
              </div>
              <div className="mt-3 text-center">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Duration</div>
                <div className="text-sm font-semibold text-gray-900 mt-1">{calculateDays()} {calculateDays() === 1 ? 'day' : 'days'}</div>
              </div>
            </div>

            {/* To */}
            <div
              className={`flex flex-col items-center cursor-pointer ${selectionMode === 'end' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
              onClick={() => setSelectionMode('end')}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm z-10 ${selectionMode === 'end' ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-blue-500'}`}>
                R
              </div>
              <div className="mt-3 text-center">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Return</div>
                <div className="text-sm font-semibold text-gray-900 mt-1">{formatDisplayDate(tempEndDate)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selection mode indicator */}
      <div className="bg-blue-50 px-4 py-2 border-b border-blue-100">
        <div className="flex items-center justify-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-blue-600" />
          <span className="text-blue-700">
            Click on calendar to select{' '}
            <span className="font-semibold">
              {selectionMode === 'start' ? 'pickup' : 'return'}
            </span>{' '}
            date
          </span>
        </div>
      </div>

      {/* Side-by-side Calendars */}
      <div className="p-4">
        <style>
          {`
            .fc-day-disabled {
              background-color: #f9fafb !important;
              cursor: not-allowed;
            }
            .fc-day-disabled .fc-daygrid-day-number {
              color: #d1d5db;
            }
            .fc .fc-daygrid-day:not(.fc-day-disabled):hover {
              background-color: #eff6ff;
              cursor: pointer;
            }
            .fc .fc-daygrid-day-frame {
              min-height: 40px;
            }
            .fc-day-start .fc-daygrid-day-number,
            .fc-day-end .fc-daygrid-day-number {
              background-color: #3B82F6;
              color: white !important;
              border-radius: 50%;
              width: 28px;
              height: 28px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
            }
            .fc .fc-toolbar {
              display: none;
            }
            .fc-theme-standard td, .fc-theme-standard th {
              border-color: #e5e7eb;
            }
            .fc .fc-col-header-cell {
              background-color: #f9fafb;
              padding: 0.5rem 0;
            }
            .fc .fc-col-header-cell-cushion {
              font-weight: 500;
              font-size: 0.7rem;
              color: #6b7280;
              text-transform: uppercase;
            }
            .fc-daygrid-day-number {
              padding: 4px 8px;
              font-size: 0.8rem;
            }
            .fc-scrollgrid {
              border: none !important;
            }
            .fc-scrollgrid td:last-of-type {
              border-right: none !important;
            }
            .fc-scrollgrid-section > td {
              border: none !important;
            }
          `}
        </style>

        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="text-center font-semibold text-gray-900">{getMonthTitle(0)}</div>
            <div className="text-center font-semibold text-gray-900">{getMonthTitle(1)}</div>
          </div>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Two Calendars Side by Side */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <FullCalendar
              ref={calendarRef1}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              initialDate={currentMonth}
              headerToolbar={false}
              height="auto"
              dateClick={handleDateClick}
              events={getEvents()}
              dayCellClassNames={dayCellClassNames}
              selectable={false}
              editable={false}
              eventDisplay="background"
              fixedWeekCount={false}
              showNonCurrentDates={false}
            />
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <FullCalendar
              ref={calendarRef2}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              initialDate={addMonths(currentMonth, 1)}
              headerToolbar={false}
              height="auto"
              dateClick={handleDateClick}
              events={getEvents()}
              dayCellClassNames={dayCellClassNames}
              selectable={false}
              editable={false}
              eventDisplay="background"
              fixedWeekCount={false}
              showNonCurrentDates={false}
            />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-[10px] font-medium">P</span>
            </div>
            <span>Pickup</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-[10px] font-medium">R</span>
            </div>
            <span>Return</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded bg-blue-100"></div>
            <span>Rental Period</span>
          </div>
        </div>
      </div>
    </div>
  );
}
