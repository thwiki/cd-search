import { newSpecPage } from '@stencil/core/testing';
import { InputRange } from './input-range';

describe('input-range', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [InputRange],
			html: `<input-range></input-range>`,
		});
		expect(page.root).toEqualHtml(`
      <input-range>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </input-range>
    `);
	});
});
