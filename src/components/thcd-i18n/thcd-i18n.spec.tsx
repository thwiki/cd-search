import { newSpecPage } from '@stencil/core/testing';
import { ThcdI18n } from './thcd-i18n';

describe('thcd-i18n', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [ThcdI18n],
			html: `<thcd-i18n></thcd-i18n>`,
		});
		expect(page.root).toEqualHtml(`
      <thcd-i18n>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </thcd-i18n>
    `);
	});
});
