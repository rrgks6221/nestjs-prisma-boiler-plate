import { FormatMatcher } from '@test/matchers/format-matcher';

describe(FormatMatcher.name, () => {
  let formatMatcher: FormatMatcher;

  beforeEach(() => {
    formatMatcher = new FormatMatcher();
  });

  describe(FormatMatcher.prototype.toBeInteger.name, () => {
    const options = { nullable: false };

    it('number type float format', () => {
      const { pass } = formatMatcher.toBeInteger(1.1, options);

      expect(pass).toBe(false);
    });

    it('number type integer format', () => {
      const { pass } = formatMatcher.toBeInteger(1, options);

      expect(pass).toBe(true);
    });

    it('string type float format', () => {
      const { pass } = formatMatcher.toBeInteger('1.1', options);

      expect(pass).toBe(false);
    });

    it('string type integer format', () => {
      const { pass } = formatMatcher.toBeInteger('1', options);

      expect(pass).toBe(false);
    });

    it('not nullable null', () => {
      const { pass } = formatMatcher.toBeInteger(null);

      expect(pass).toBe(false);
    });

    it('nullable null', () => {
      const { pass } = formatMatcher.toBeInteger(null, { nullable: true });

      expect(pass).toBe(true);
    });
  });
});
