import { Test, TestingModule } from '@nestjs/testing';
import { QueryHelper } from '@src/helpers/query.helper';

describe('QueryHelper', () => {
  let helper: QueryHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryHelper],
    }).compile();

    helper = module.get<QueryHelper>(QueryHelper);
  });

  it('should be defined', () => {
    expect(helper).toBeDefined();
  });

  describe('buildWherePropForFind', () => {
    it('build where', () => {
      const likeSearchFields = ['name'] as any;
      const filter = {
        id: 1,
        name: 'name',
        emptyString: '',
        und: undefined,
        nul: null,
        nan: NaN,
      };

      expect(
        helper.buildWherePropForFind(filter, likeSearchFields),
      ).toStrictEqual({
        id: 1,
        name: {
          contains: 'name',
        },
      });
    });
  });
});
