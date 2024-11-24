import { IAuth } from './IAuth';
import { IDepartment } from './IDepartment';

export interface IActor {
  name: string;
  lastName: string;
  phoneNumber: string;
  documentNumber: string;
  documentType: string;
  status?: string;
  role: number;
  department: IDepartment;
  auth: IAuth;
}
