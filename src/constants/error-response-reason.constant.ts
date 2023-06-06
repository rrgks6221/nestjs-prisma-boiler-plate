import { ERROR_CODE } from '@src/constants/error-response-code.constant';

export const ERROR_REASON = {
  [ERROR_CODE.COMMON001]: 'server error',
  [ERROR_CODE.COMMON002]: 'api path not found',
  [ERROR_CODE.COMMON003]: 'invalid request parameter',
} as const;
