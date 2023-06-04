import { Injectable } from '@nestjs/common';
import { SortOrder } from '@src/constants/enum';

@Injectable()
export class QueryHelper {
  buildWherePropForFind(
    filter: Record<string, any>,
    likeSearchFields?: string[],
  ): Record<string, any> {
    const where: Record<string, any> = {};

    for (const key in filter) {
      if (filter[key] === '') continue;

      if (likeSearchFields?.includes(key)) {
        where[key] = { contains: filter[key] };
      } else {
        where[key] = filter[key];
      }
    }

    return where;
  }

  buildOrderByPropForFind<K extends string>(
    options: {
      sortBy?: K[];
      orderBy?: SortOrder[];
    } = {},
  ): { [x: string]: SortOrder }[] {
    const { orderBy, sortBy } = options;
    const order: { [x: string]: SortOrder }[] = [];

    if (!sortBy) return [];
    if (!orderBy) return [];
    if (orderBy.length !== sortBy.length) return [];

    for (let i = 0; i < orderBy.length; i += 1) {
      if (sortBy[i] && orderBy[i]) {
        order.push({ [sortBy[i]]: orderBy[i] });
      }
    }

    return order;
  }
}
