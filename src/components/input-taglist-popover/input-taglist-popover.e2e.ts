import { newE2EPage } from '@stencil/core/testing';

describe('input-taglist-popover', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<input-taglist-popover></input-taglist-popover>');

    const element = await page.find('input-taglist-popover');
    expect(element).toHaveClass('hydrated');
  });
});
