export interface Mooring {
  id: number;
  partnerId?: number;
  zoneId: string;
  vesselId?: string;
  waterConsumption?: number;
  electricityConsumption?: number;
  maintenanceService: boolean;
  assignmentDate?: string;
  purchaseDate?: string;
}
