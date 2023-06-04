import { InternalServerErrorException, applyDecorators } from '@nestjs/common';
import { SortOrder } from '@src/constants/enum';
import { Transform } from 'class-transformer';

export type OrderBy<T extends string[]> = Record<T[number], SortOrder>;

export const CsvToOrderBy = <T extends string[] = string[]>(
  fields: T,
  defaultOrderBy: Record<T[number], SortOrder> = {
    id: SortOrder.Desc,
  } as Record<T[number], SortOrder>,
): PropertyDecorator => {
  return applyDecorators(
    Transform(({ value }: { value: unknown }): OrderBy<T> => {
      const getField = (field: string): T[number] => {
        return field.startsWith('-') ? field.slice(1) : field;
      };

      const getSortOrder = (field: string): SortOrder => {
        const startsWithDash = field.startsWith('-');

        return startsWithDash ? SortOrder.Asc : SortOrder.Desc;
      };

      // queryString 에 들어가는 transformer 인데 string 형태가 아닌 경우는 서버에러로 판단한다.
      if (typeof value !== 'string') {
        throw new InternalServerErrorException();
      }

      const requestOrders = value.split(',');

      if (requestOrders.length === 0) {
        return defaultOrderBy;
      }

      const allowFields = requestOrders.filter((requestOrder) => {
        const field = getField(requestOrder);

        return fields.includes(field);
      });

      if (allowFields.length === 0) {
        return defaultOrderBy;
      }

      return allowFields.reduce((orderBy, cur) => {
        const field = getField(cur);

        orderBy[field] = getSortOrder(cur);

        return orderBy;
      }, <Record<T[number], SortOrder>>{});
    }),
  );
};
