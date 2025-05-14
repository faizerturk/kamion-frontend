import DashboardLayout from '../layout/DashboardLayout';
import ShipmentTable from '../organisms/ShipmentTable';

export default function DashboardTemplate() {
  return (
    <DashboardLayout>
      <ShipmentTable />
    </DashboardLayout>
  );
}
