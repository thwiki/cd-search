import { newE2EPage } from '@stencil/core/testing';

describe('input-taglist', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<input-taglist></input-taglist>');

    const element = await page.find('input-taglist');
    expect(element).toHaveClass('hydrated');
  });
});
