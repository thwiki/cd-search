import { newE2EPage } from '@stencil/core/testing';

describe('input-taglist-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<input-taglist-modal></input-taglist-modal>');

    const element = await page.find('input-taglist-modal');
    expect(element).toHaveClass('hydrated');
  });
});
