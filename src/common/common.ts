import { BooleanString } from '@src/constants/enum';
import { TransformFnParams } from 'class-transformer';

export const transformPage = ({ value }: Partial<TransformFnParams>) => {
  return Number(value) ? Number(value) - 1 : value;
};

export const transformStringBoolean = ({
  value,
}: Partial<TransformFnParams>) => {
  if (value === BooleanString.True) return true;
  if (value === BooleanString.False) return false;
  return value;
};
