import logger from '@/lib/logger';

describe('lib/logger', () => {
  it('_buildLabel', () => {
    const label = logger._buildLabel('info');
    expect(label).toBe('[info]');
  });
});
