import { newSpecPage } from '@stencil/core/testing';
import { InputTaglist } from './input-taglist';

describe('input-taglist', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [InputTaglist],
			html: `<input-taglist></input-taglist>`,
		});
		expect(page.root).toEqualHtml(`
      <input-taglist>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </input-taglist>
    `);
	});
});
