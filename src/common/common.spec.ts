import { faker } from '@faker-js/faker';
import { pageTransform, stringBooleanTransform } from '@src/common/common';

describe('common.ts 단위 테스트', () => {
  describe('pageTransform', () => {
    it('들어는 value 가 string number 일 경우', () => {
      const randomNumber = faker.datatype.number();
      const randomStringNumber = String(randomNumber);
      const transformValue = pageTransform({ value: randomStringNumber });

      expect(typeof randomNumber).toBe('number');
      expect(typeof randomStringNumber).toBe('string');
      expect(transformValue).toBe(randomNumber - 1);
      expect(typeof transformValue).toBe('number');
    });

    it('들어온 value 가 string 일 경우', () => {
      const randomString = faker.datatype.string();
      const randomStringNumber = Number(randomString);
      const transformValue = pageTransform({ value: randomString });

      expect(randomStringNumber).toBeNaN();
      expect(typeof randomString).toBe('string');
      expect(transformValue).toBe(transformValue);
      expect(typeof transformValue).toBe('string');
    });
  });

  describe('stringBooleanTransform', () => {
    it('들어온 value 가 string boolean 일 경우', () => {
      const boolean = faker.datatype.boolean();
      const stringBoolean = String(boolean);
      const transformValue = stringBooleanTransform({ value: stringBoolean });

      expect(typeof boolean).toBe('boolean');
      expect(typeof stringBoolean).toBe('string');
      expect(transformValue).toBe(boolean);
    });

    it('들어온 value 가 string boolean 이 아닐 경우 경우', () => {
      const randomString = faker.datatype.string();
      const transformValue = stringBooleanTransform({ value: randomString });

      expect(typeof randomString).toBe('string');
      expect(randomString).not.toBe('true');
      expect(randomString).not.toBe('false');
      expect(transformValue).toBe(randomString);
    });
  });
});
