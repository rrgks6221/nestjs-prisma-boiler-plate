import { TypeMatcher } from '@test/matchers/type.matcher';

describe(TypeMatcher, () => {
  let typeMatcher: TypeMatcher;

  beforeEach(() => {
    typeMatcher = new TypeMatcher();
  });

  describe(TypeMatcher.prototype.toBeNumber.name, () => {
    const options = { nullable: false };

    it('number type', () => {
      const { pass } = typeMatcher.toBeNumber(1, options);

      expect(pass).toBe(true);
    });

    it('string type number', () => {
      const { pass } = typeMatcher.toBeNumber('1', options);

      expect(pass).toBe(false);
    });

    it('not nullable null', () => {
      const { pass } = typeMatcher.toBeNumber(null, options);

      expect(pass).toBe(false);
    });

    it('nullable null', () => {
      const { pass } = typeMatcher.toBeNumber(null, { nullable: true });

      expect(pass).toBe(true);
    });
  });

  describe(TypeMatcher.prototype.toBeString.name, () => {
    const options = { nullable: false };

    it('number type', () => {
      const { pass } = typeMatcher.toBeString(1, options);

      expect(pass).toBe(false);
    });

    it('string type number', () => {
      const { pass } = typeMatcher.toBeString('1', options);

      expect(pass).toBe(true);
    });

    it('not nullable null', () => {
      const { pass } = typeMatcher.toBeString(null, options);

      expect(pass).toBe(false);
    });

    it('nullable null', () => {
      const { pass } = typeMatcher.toBeString(null, { nullable: true });

      expect(pass).toBe(true);
    });
  });

  describe(TypeMatcher.prototype.toBeBoolean.name, () => {
    it('boolean type true', () => {
      const { pass } = typeMatcher.toBeBoolean(true);

      expect(pass).toBe(true);
    });

    it('string type true', () => {
      const { pass } = typeMatcher.toBeBoolean('true');

      expect(pass).toBe(false);
    });
  });
});
