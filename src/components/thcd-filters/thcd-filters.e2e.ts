import { newE2EPage } from '@stencil/core/testing';

describe('thcd-filters', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<thcd-filters></thcd-filters>');

    const element = await page.find('thcd-filters');
    expect(element).toHaveClass('hydrated');
  });
});
