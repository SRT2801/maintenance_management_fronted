export interface IMaintenanceTypeResponse {
  message: string;
  data: IMaintenanceType[];
}

export interface IMaintenanceType {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
