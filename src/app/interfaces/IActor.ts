import { IDepartment } from "./IDepartment";

export interface IActor {
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  documentNumber: string;
  documentType: string;
  status?: string;
  role: number;
  department: IDepartment
}
