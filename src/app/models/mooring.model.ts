export interface Mooring {
  id: number;
  partnerId?: number;
  zoneId: string;
  vesselId?: string;
  boatName?: string;
  waterConsumption?: number;
  electricityConsumption?: number;
  maintenanceService: boolean;
  assignmentDate?: string;
  purchaseDate?: string;
}
