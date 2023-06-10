import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryHelper {
  buildWherePropForFind<M>(
    filter: Partial<Record<keyof M, M[keyof M]>>,
    likeSearchFields?: (keyof Partial<M>)[],
  ): Record<keyof Partial<M>, any> {
    const where = <Record<keyof Partial<M>, any>>{};

    for (const key in filter) {
      if (!filter[key]) continue;

      if (likeSearchFields?.includes(key)) {
        where[key] = { contains: filter[key] };
      } else {
        where[key] = filter[key];
      }
    }

    return where;
  }
}
