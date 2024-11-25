export interface IAssignmentResponse {
  message: string;
  data: IAssignmentData;
}

export interface IAssignmentData {
  department: number;
  maintenanceType: number;
  priority: null;
  comments: null;
  id: number;
  assignedAt: Date;
  updatedAt: Date;
  status: string;
}
