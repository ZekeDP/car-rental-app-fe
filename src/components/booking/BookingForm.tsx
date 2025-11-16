import { useState } from 'react';
import { User, Mail, Phone, CreditCard } from 'lucide-react';
import { Car } from '../../types';
import { format, addDays } from 'date-fns';
import DateRangePicker from './DateRangePicker';

interface BookingFormProps {
  car?: Car;
  onSubmit: (bookingData: BookingFormData) => void;
  onCancel: () => void;
}

export interface BookingFormData {
  carId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
}

export default function BookingForm({ car, onSubmit, onCancel }: BookingFormProps) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');

  const [formData, setFormData] = useState<BookingFormData>({
    carId: car?.id || 0,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    startDate: today,
    endDate: tomorrow,
    pickupLocation: '',
    dropoffLocation: '',
  });

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              stepNum <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {stepNum}
          </div>
          {stepNum < 3 && (
            <div
              className={`w-16 h-1 mx-2 ${stepNum < step ? 'bg-blue-600' : 'bg-gray-200'}`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const handleDateRangeChange = (newStartDate: string, newEndDate: string) => {
    setFormData({
      ...formData,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h4 className="text-md font-medium text-gray-900 mb-4">Trip Details</h4>

      {car && (
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm font-medium text-blue-900">Selected Car</p>
          <p className="text-lg font-semibold text-blue-700">{car.model}</p>
          <p className="text-sm text-blue-600">{car.plateNumber} • {car.carType}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Rental Period
        </label>
        <DateRangePicker
          startDate={formData.startDate}
          endDate={formData.endDate}
          onDateChange={handleDateRangeChange}
          minDate={new Date()}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pickup Location
        </label>
        <input
          type="text"
          name="pickupLocation"
          value={formData.pickupLocation}
          onChange={handleChange}
          placeholder="Enter pickup address"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Drop-off Location
        </label>
        <input
          type="text"
          name="dropoffLocation"
          value={formData.dropoffLocation}
          onChange={handleChange}
          placeholder="Enter drop-off address"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h4 className="text-md font-medium text-gray-900 mb-4">Customer Information</h4>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <User className="inline h-4 w-4 mr-1" />
          Full Name
        </label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Mail className="inline h-4 w-4 mr-1" />
          Email Address
        </label>
        <input
          type="email"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Phone className="inline h-4 w-4 mr-1" />
          Phone Number
        </label>
        <input
          type="tel"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h4 className="text-md font-medium text-gray-900 mb-4">Confirm Booking</h4>

      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Car:</span>
          <span className="text-sm font-medium">{car?.model || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Plate Number:</span>
          <span className="text-sm font-medium">{car?.plateNumber || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Pickup Date:</span>
          <span className="text-sm font-medium">{formData.startDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Return Date:</span>
          <span className="text-sm font-medium">{formData.endDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Pickup Location:</span>
          <span className="text-sm font-medium">{formData.pickupLocation}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Drop-off Location:</span>
          <span className="text-sm font-medium">{formData.dropoffLocation}</span>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Customer:</span>
          <span className="text-sm font-medium">{formData.customerName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Email:</span>
          <span className="text-sm font-medium">{formData.customerEmail}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Phone:</span>
          <span className="text-sm font-medium">{formData.customerPhone}</span>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">Payment will be processed upon confirmation</span>
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      {renderStepIndicator()}

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}

      <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={step === 1 ? onCancel : prevStep}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {step === 1 ? 'Cancel' : 'Previous'}
        </button>

        {step < totalSteps ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
          >
            Confirm Booking
          </button>
        )}
      </div>
    </form>
  );
}
