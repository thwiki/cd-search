import { newE2EPage } from '@stencil/core/testing';

describe('input-range', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<input-range></input-range>');

    const element = await page.find('input-range');
    expect(element).toHaveClass('hydrated');
  });
});
