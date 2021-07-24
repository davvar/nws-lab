import { INetworkImageWithDimensions, IRequestStatus } from '../../common/types';
import { ICategory } from '../categories';

export interface ICat extends INetworkImageWithDimensions {
  id: string,
  categories: ICategory[],
}

export interface ICatsState {
  cats: ICat[];
  status: IRequestStatus;
  loadingMore: boolean;
}

export interface ICatsQueryParams {
  limit?: number,
  page: number,
  category_id: string,
}
