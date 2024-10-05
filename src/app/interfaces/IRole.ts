export interface IRole {
  message: string;
  data: Role[];
}

export interface Role {
  id: number;
  name: string;
  description: string;
}
