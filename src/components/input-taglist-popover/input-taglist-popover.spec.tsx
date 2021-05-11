import { newSpecPage } from '@stencil/core/testing';
import { InputTaglistPopover } from './input-taglist-popover';

describe('input-taglist-popover', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [InputTaglistPopover],
			html: `<input-taglist-popover></input-taglist-popover>`,
		});
		expect(page.root).toEqualHtml(`
      <input-taglist-popover>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </input-taglist-popover>
    `);
	});
});
