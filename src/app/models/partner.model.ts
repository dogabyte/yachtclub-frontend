import { Boat } from './boat.model';
import { Mooring } from './mooring.model';

export interface Partner {
  id: number;
  name: string;
  lastName: string;
  address: string;
  dni: string;
  phone: string;
  registrationDate: string;
  username: string;
  password?: string;
  role: string;
  moorings?: Mooring[];
  boats?: Boat[];
}