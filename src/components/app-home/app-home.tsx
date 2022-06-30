import { Component, h, Prop, State } from '@stencil/core';
import { SearchRequest } from '@apis/search/search-request';
import { Item } from '@utils/options';
import { RouteQuery, injectQuery, disinjectQuery } from '@utils/router';

@Component({
	tag: 'app-home',
	styleUrl: 'app-home.less',
})
export class AppHome {
	private filters: HTMLThcdFiltersElement;
	infiniteScroll: HTMLIonInfiniteScrollElement;
	request: SearchRequest = null;

	@Prop({ mutable: true }) query: RouteQuery;

	@State() language: string;

	@State() result: Item[] = [];

	async connectedCallback() {
		injectQuery(this);
	}

	disconnectedCallback() {
		disinjectQuery(this);
	}

	handleSearchClick = async (event: MouseEvent) => {
		this.request = SearchRequest.newFromCriterion({ ...this.filters.criteria });
		console.log(this.request);
		if (this.request) {
			await this.request.getCount();
			await this.loadResult();
		}
	};

	loadResult = async () => {
		if (this.request != null) {
			await this.request.getNext();
			console.log(this.result.length, this.request.count);
			this.result = [...this.request.results];
			console.log(this.result);

			if (!this.request.more) {
				this.infiniteScroll.disabled = true;
			}
			this.infiniteScroll.complete();
		}
	};

	render() {
		console.log('render');
		return [
			<ion-content class="ion-padding">
				<ion-split-pane content-id="main" when="lg">
					<ion-menu id="filters" content-id="main">
						<ion-header>
							<ion-toolbar>
								<ion-icon name="filter-outline" slot="start"></ion-icon>
								<ion-title>
									<thcd-i18n>label|filters</thcd-i18n>
								</ion-title>
								<ion-buttons slot="end">
									<ion-button color="secondary" href="/">
										<thcd-i18n>label|clear</thcd-i18n>
									</ion-button>
								</ion-buttons>
							</ion-toolbar>
						</ion-header>
						<ion-content>
							<thcd-filters ref={(el) => (this.filters = el)} query={this.query}></thcd-filters>
						</ion-content>
					</ion-menu>

					<ion-content id="main" class="ion-padding">
						{/* <pre>{JSON.stringify(this.query, undefined, 2)}</pre> */}

						<ion-button expand="block" onClick={this.handleSearchClick}>
							<thcd-i18n>label|search</thcd-i18n>
						</ion-button>

						<ion-list>
							{this.result.map((item) => (
								<thcd-track item={item}></thcd-track>
							))}
						</ion-list>
						<ion-list>
							<ion-infinite-scroll ref={(el) => (this.infiniteScroll = el)} onIonInfinite={this.loadResult}>
								<ion-infinite-scroll-content
									loadingSpinner="crescent"
									loadingText="Loading..."
								></ion-infinite-scroll-content>
							</ion-infinite-scroll>
							<ion-label id="resultend" class={this.request != null && !this.request.more ? 'active' : ''}>
								<thcd-i18n>label|resultend</thcd-i18n>
							</ion-label>
						</ion-list>
					</ion-content>
				</ion-split-pane>
			</ion-content>,
		];
	}
}
