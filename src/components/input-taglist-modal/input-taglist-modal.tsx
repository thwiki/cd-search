import { SearchbarChangeEventDetail } from '@ionic/core';
import { Component, Host, h, Element, Prop, State } from '@stencil/core';
import { Options } from '@utils/options';
import { FilterOption, TaglistItem } from '../thcd-filters/filter-options';

@Component({
	tag: 'input-taglist-modal',
	styleUrl: 'input-taglist-modal.less',
	shadow: true,
})
export class InputTaglistModal {
	searchbar: HTMLIonSearchbarElement;
	typeahead = '';
	selected: string = null;
	private isStatic = false;
	private debounceTimeout: ReturnType<typeof setTimeout>;

	@Element() element: HTMLInputTaglistModalElement;

	@Prop() option: FilterOption;

	@State() loading = false;

	@State() suggestions: TaglistItem[] = [];

	handleSearchChange = (e: CustomEvent<SearchbarChangeEventDetail>) => {
		const typeahead = e.detail.value;
		if (this.typeahead.trim() !== typeahead.trim()) {
			this.typeahead = typeahead;
			clearTimeout(this.debounceTimeout);
			this.debounceTimeout = setTimeout(async () => {
				this.suggestions = await this.search(this.typeahead);
			}, 500);
		}
	};

	dismissModal = () => {
		(this.element.closest('ion-modal') as any).dismiss({
			selected: this.selected,
		});
	};

	connectedCallback() {}

	componentDidRender() {
		setTimeout(() => this.searchbar.setFocus(), 50);
	}

	render() {
		return (
			<Host>
				<ion-header translucent>
					<ion-toolbar>
						<ion-title>
							<thcd-i18n>label|searchfor</thcd-i18n>
							<thcd-i18n>field|{this.option.id}|label</thcd-i18n>
						</ion-title>
						<ion-buttons slot="end">
							<ion-button onClick={this.dismissModal}>
								<thcd-i18n>label|close</thcd-i18n>
							</ion-button>
						</ion-buttons>
					</ion-toolbar>
					<ion-toolbar>
						<ion-searchbar
							ref={(el) => {
								this.searchbar = el;
							}}
							type="text"
							enterKeyHint="search"
							onIonChange={this.handleSearchChange}
							onIonBlur={() => {
								this.searchbar.setFocus();
							}}
						></ion-searchbar>
					</ion-toolbar>
				</ion-header>
				<ion-content fullscreen>
					<ion-progress-bar type={this.loading ? 'indeterminate' : 'determinate'}></ion-progress-bar>
					<ion-list>
						{this.suggestions.map((suggestion) => {
							return (
								<ion-item
									button={true}
									onClick={() => {
										this.searchbar.value = '';
										this.typeahead = '';
										this.selected = suggestion.value;
										this.dismissModal();
									}}
								>
									{suggestion.value}
								</ion-item>
							);
						})}
					</ion-list>
				</ion-content>
			</Host>
		);
	}

	private async search(typeahead: string): Promise<TaglistItem[]> {
		return this.isStatic ? this.staticSearch(typeahead) : this.remoteSearch(typeahead);
	}

	private staticSearch(term: string) {
		if (term.length === 0) return [];
		const segs = term
			.split(/\s+/)
			.filter((t) => t !== '')
			.map((t) => t.toLowerCase());
		if (segs.length === 0) return [];
		return this.option.content.tagList.filter((v) => segs.every((seg) => v.value.toLowerCase().indexOf(seg) > -1)).slice(0, 10);
	}

	private async remoteSearch(term: string) {
		if (term.trim() === '') {
			return [];
		}
		this.loading = true;
		const result = await (
			await fetch(
				Options.SuggestApi +
					'?' +
					new URLSearchParams({
						action: 'inopt',
						title: this.option.content.tagListSource,
						value: term,
					})
			)
		).text();
		const html = new DOMParser().parseFromString(result, 'text/html');
		this.loading = false;
		return Array.from(html.querySelectorAll('div')).map((child) => {
			return {
				value: child.getAttribute('value') || child.textContent,
			};
		});
	}
}
