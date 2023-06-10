import { SetMetadata } from '@nestjs/common';

export const SET_RESPONSE = 'SET_RESPONSE';

export enum ResponseType {
  Base = 'base',
  Pagination = 'pagination',
  Delete = 'delete',
}

export type Args =
  | {
      type: Extract<ResponseType, ResponseType.Base | ResponseType.Pagination>;
      key: string;
    }
  | {
      type: Extract<ResponseType, ResponseType.Delete>;
    };

export const SetResponse = (args: Args) => {
  return SetMetadata(SET_RESPONSE, args);
};
