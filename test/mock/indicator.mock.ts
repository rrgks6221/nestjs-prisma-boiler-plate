import { PrismaHealthIndicator } from '@src/apis/health/indicators/prisma-health-indicator';
import { MockClass } from '@test/mock/type';

export class MockPrismaHealthIndicator
  implements MockClass<PrismaHealthIndicator>
{
  isHealthy = jest.fn();
}
