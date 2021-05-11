import { newE2EPage } from '@stencil/core/testing';

describe('input-checklist', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<input-checklist></input-checklist>');

    const element = await page.find('input-checklist');
    expect(element).toHaveClass('hydrated');
  });
});
