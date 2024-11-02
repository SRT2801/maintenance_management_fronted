import { DepartmentStatus } from '../enums/department/Status';
import { IActor } from './IActor';

export interface Department {
  id: number;
  name: string;
  description: string;
  phoneNumber: string;
  coordinator: IActor;
  status?: DepartmentStatus;
}
export interface IDepartment {
  message: string;
  data: Department[];
}
