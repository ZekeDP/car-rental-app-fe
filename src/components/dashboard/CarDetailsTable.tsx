import { Car } from '../../types';

interface CarDetailsTableProps {
  cars: Car[];
  title: string;
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

export default function CarDetailsTable({ cars, title }: CarDetailsTableProps) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No cars found in this category
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">{title}</p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plate Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map((car) => (
              <tr key={car.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {car.plateNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {car.model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.carType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.yearModel}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(car.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
