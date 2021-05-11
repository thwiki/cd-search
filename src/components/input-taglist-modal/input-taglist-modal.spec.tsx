import { newSpecPage } from '@stencil/core/testing';
import { InputTaglistModal } from './input-taglist-modal';

describe('input-taglist-modal', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [InputTaglistModal],
			html: `<input-taglist-modal></input-taglist-modal>`,
		});
		expect(page.root).toEqualHtml(`
      <input-taglist-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </input-taglist-modal>
    `);
	});
});
