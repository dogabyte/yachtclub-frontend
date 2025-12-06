import { EmployeeZone } from './employee-zone.model';
import { Mooring } from './mooring.model';

export interface Zone {
    id: number;
    name: string;
    boatType: string;
    depth: number;
    width: number;
    boatCapacity: number;
    employeeZones?: EmployeeZone[];
    moorings?: Mooring[];
}
