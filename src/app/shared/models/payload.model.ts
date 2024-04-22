export interface IPayLoad<T> {}
export interface IResponse<T> {
  data: T;
  message: string;
  status: number;
}
export interface IResponseError {
  message: string;
  status: number;
}