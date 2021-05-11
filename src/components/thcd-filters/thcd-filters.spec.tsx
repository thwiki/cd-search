import { newSpecPage } from '@stencil/core/testing';
import { ThcdFilters } from './thcd-filters';

describe('thcd-filters', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [ThcdFilters],
			html: `<thcd-filters></thcd-filters>`,
		});
		expect(page.root).toEqualHtml(`
      <thcd-filters>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </thcd-filters>
    `);
	});
});
