export interface IDimensions {
  width: number;
  height: number;
}

export interface INetworkImageWithDimensions extends IDimensions {
  url: string;
}

export type IRequestStatus = 'idle' | 'loading' | 'failed';
