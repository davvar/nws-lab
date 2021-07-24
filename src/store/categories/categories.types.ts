import { IRequestStatus } from '../../common/types';

export interface ICategory {
  id: number;
  name: string;
}

export interface ICategoriesState {
  categories: ICategory[];
  status: IRequestStatus;
}
