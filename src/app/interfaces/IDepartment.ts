import { DepartmentStatus } from '../enums/department/Status';
import { IActor } from './IActor';
import { IAuth } from './IAuth';

export interface Department {
  id: number;
  name: string;
  description: string;
  phoneNumber: string;
  coordinator: IActor;
  status?: DepartmentStatus;
  auth: IAuth;
}
export interface IDepartment {
  message: string;
  data: Department[];
}
