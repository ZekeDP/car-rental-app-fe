import { Car } from '../../types';

interface AllCarsTableProps {
  cars: Car[];
  onBookCar: (car: Car) => void;
}

const getStatusBadge = (status: Car['status']) => {
  const styles = {
    AVAILABLE: 'bg-green-100 text-green-800',
    BOOKED: 'bg-purple-100 text-purple-800',
    MAINTENANCE: 'bg-red-100 text-red-800',
  };

  const labels = {
    AVAILABLE: 'Available',
    BOOKED: 'Booked',
    MAINTENANCE: 'Maintenance',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export default function AllCarsTable({ cars, onBookCar }: AllCarsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">All Cars</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plate Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map((car) => (
              <tr key={car.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {car.plateNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.carType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {car.model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(car.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onBookCar(car)}
                    disabled={car.status !== 'AVAILABLE'}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      car.status === 'AVAILABLE'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
