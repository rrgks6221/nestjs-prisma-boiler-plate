import { HttpException } from '@src/http-exceptions/exceptions/http.exception';

/**
 * @deprecated 리펙토링 후 삭제 예정
 */
export type ExceptionError = {
  code: string;
  reason: string;
  messages: string[];
};

export type HttpError<E extends HttpException> = Pick<
  E,
  'errorCode' | 'message'
>;

export interface ResponseJson {
  timestamp: Date;
  statusCode: number;
  code: string;
  reason: string;
  messages: string[];
  stack?: any;
}
