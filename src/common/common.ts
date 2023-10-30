import { BooleanString } from '@src/constants/enum';

export const transformPage = ({ value }: { value: unknown }): number => {
  const page = Number(value);

  if (Number.isNaN(page)) {
    return page;
  }
  if (page <= 0) {
    return page;
  }
  return page - 1;
};

export const transformStringBoolean = ({ value }: { value: unknown }) => {
  if (typeof value !== 'string') {
    return value;
  }

  const lowerStr = value.toLowerCase();

  if (lowerStr === BooleanString.True) return true;
  if (lowerStr === BooleanString.False) return false;
  return value;
};
