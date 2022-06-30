import { newE2EPage } from '@stencil/core/testing';

describe('thcd-track', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<thcd-track></thcd-track>');

		const element = await page.find('thcd-track');
		expect(element).toHaveClass('hydrated');
	});
});
