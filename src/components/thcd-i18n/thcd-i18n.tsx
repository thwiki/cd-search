import { Component, Host, h, Element, State } from '@stencil/core';
import { Bind } from '@utils/utils';
import { Subscription } from 'rxjs';

@Component({
	tag: 'thcd-i18n',
	shadow: false,
})
export class ThcdI18n {
	private localeSubscription: Subscription;
	//private mutationObserver: MutationObserver;

	@Element() host: HTMLThcdI18nElement;

	@State() parsed = '';

	connectedCallback() {
		this.handleRawChange();

		//this.mutationObserver = new MutationObserver(this.handleRawChange);
		//this.mutationObserver.observe(this.host, { childList: true, characterData: true, subtree: true });
	}

	disconnectedCallback() {
		this.localeSubscription?.unsubscribe();
	}

	@Bind
	private async handleRawChange() {
		const key = this.host.textContent;
		this.localeSubscription?.unsubscribe();
		const locale = await document.querySelector('app-root').getLocale();
		this.localeSubscription = locale.get(key).subscribe((value) => {
			this.parsed = value;
		});
		//this.parsed = `[${this.host.textContent.split('|').join(',')}]`;
	}

	render() {
		return <Host innerHTML={this.parsed}></Host>;
	}
}
