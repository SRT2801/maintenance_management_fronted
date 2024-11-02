import { DeptMaintTypeAssignmentStatus } from "../enums/DeptMaintTypeAssigment/Status";


export interface IRequest {
  id: number;
  assignedAt: Date;
  updatedAt: Date;
  status?: DeptMaintTypeAssignmentStatus;
  name: string;
  description: string
  typeMaintenance: string;

}
