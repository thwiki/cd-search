import { newSpecPage } from '@stencil/core/testing';
import { InputChecklist } from './input-checklist';

describe('input-checklist', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [InputChecklist],
			html: `<input-checklist></input-checklist>`,
		});
		expect(page.root).toEqualHtml(`
      <input-checklist>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </input-checklist>
    `);
	});
});
