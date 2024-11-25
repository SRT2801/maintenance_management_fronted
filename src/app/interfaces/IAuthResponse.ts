export interface IAuthResponse {
  message: string;
  data: IData;
}

export interface IData {
  id: number;
  email: string;
  actor: IActor;
}

export interface IActor {
  id: number;
  name: string;
  lastName: string;
  phoneNumber: string;
  documentNumber: number;
  documentType: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  role: IRole;
  department: IDepartment;
}

export interface IDepartment {
  id: number;
  name: string;
  description: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
}
