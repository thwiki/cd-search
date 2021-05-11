import { newE2EPage } from '@stencil/core/testing';

describe('thcd-i18n', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<thcd-i18n></thcd-i18n>');

    const element = await page.find('thcd-i18n');
    expect(element).toHaveClass('hydrated');
  });
});
