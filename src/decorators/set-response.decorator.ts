import { SetMetadata } from '@nestjs/common';

export const SET_RESPONSE = 'SET_RESPONSE';

export enum ResponseType {
  Base = 'base',
  Pagination = 'pagination',
  Delete = 'delete',
}

export interface Args {
  type: ResponseType;
  key?: string;
}

export const SetResponse = (args: Args) => {
  return SetMetadata(SET_RESPONSE, args);
};
