export interface IStageResponse {
  message: string;
  data: IStage[];
}

export interface IStage {
  id: number;
  name: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
