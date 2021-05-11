import { newSpecPage } from '@stencil/core/testing';
import { ThcdTrack } from './thcd-track';

describe('thcd-track', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [ThcdTrack],
			html: `<thcd-track></thcd-track>`,
		});
		expect(page.root).toEqualHtml(`
      <thcd-track>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </thcd-track>
    `);
	});
});
