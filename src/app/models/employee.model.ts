import { EmployeeZone } from './employee-zone.model';

export interface Employee {
    id: number;
    code: string;
    name: string;
    address: string;
    phone: string;
    specialty: string;
    username: string;
    password?: string;
    role: string;
    assignedZones?: EmployeeZone[];
}
