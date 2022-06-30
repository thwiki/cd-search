import { Component, Host, h, Element, Prop, Event, EventEmitter } from '@stencil/core';
import { ItemCriteria, ItemField } from '@utils/options';
import { RouteQuery } from '@utils/router';
import { beautifyUrl } from '@utils/utils';
import { InputBaseValueChangedEventDetial, InputBaseValueChangeEventDetial } from '../input-base/input-base';
import { FilterOption, filterOptions } from './filter-options';

@Component({
	tag: 'thcd-filters',
	styleUrl: 'thcd-filters.less',
})
export class ThcdFilters {
	@Element() element: HTMLThcdFiltersElement;

	@Prop() query: RouteQuery = {};

	@Prop() criteria: ItemCriteria = Object.fromEntries(filterOptions.map((filterOption) => [filterOption.id, null]));

	@Event({ eventName: 'criteria-change' }) criteriaChange: EventEmitter<ItemCriteria>;

	propSuggestion: {
		[key in ItemField]?: Array<any>;
	} = {};

	componentWillLoad() {
		this.updateOptions();
	}

	handleValueChange = (event: CustomEvent<InputBaseValueChangeEventDetial>) => {
		const currentHref = location.href;
		const url = new URL(currentHref);
		for (const key in event.detail) {
			if (Object.prototype.hasOwnProperty.call(event.detail, key)) {
				const value = event.detail[key];
				if (value == null || value === '') url.searchParams.delete(key);
				else url.searchParams.set(key, value);
			}
		}
		url.searchParams.sort();

		const newHref = beautifyUrl(url.href);
		if (beautifyUrl(currentHref) !== newHref) {
			window.history.pushState(null, '', newHref);
		}
	};

	handleValueChanged = (event: CustomEvent<InputBaseValueChangedEventDetial>) => {
		let changed = false;
		for (const key in event.detail) {
			if (Object.prototype.hasOwnProperty.call(event.detail, key)) {
				const value = event.detail[key];
				if (this.criteria[key] !== value) {
					this.criteria[key] = event.detail[key];
					changed = true;
				}
			}
		}
		if (changed) {
			this.criteriaChange.emit(this.criteria);
		}
	};

	updateOptions() {
		filterOptions.forEach((option) => {
			if (option.content == null) option.content = {};
			if (option.init) {
				const suggestion: Array<any> = this.propSuggestion[option.id as keyof ThcdFilters['propSuggestion']];
				option.init.call(this, option, suggestion || []);
			}
		});
	}

	getInputComponent(filterOption: FilterOption) {
		switch (filterOption.type) {
			case 'range':
				return (
					<input-range
						option={filterOption}
						query={this.query[filterOption.id]}
						onValue-change={this.handleValueChange}
						onValue-changed={this.handleValueChanged}
					></input-range>
				);
			case 'checklist':
				return (
					<input-checklist
						option={filterOption}
						query={this.query[filterOption.id]}
						onValue-change={this.handleValueChange}
						onValue-changed={this.handleValueChanged}
					></input-checklist>
				);
			case 'taglist':
				return (
					<input-taglist
						option={filterOption}
						query={this.query[filterOption.id]}
						onValue-change={this.handleValueChange}
						onValue-changed={this.handleValueChanged}
					></input-taglist>
				);
		}
		//return <pre>{JSON.stringify(filterOption, undefined, 2)}</pre>;
	}

	render() {
		return (
			<Host>
				{filterOptions.map((filterOption) => {
					return (
						<ion-list>
							<ion-list-header>
								<thcd-i18n>field|{filterOption.id}|label</thcd-i18n>
							</ion-list-header>
							<ion-item class={{ [`input-${filterOption.type}-item`]: true }} lines="none">
								{this.getInputComponent(filterOption)}
							</ion-item>
							<ion-note>
								<thcd-i18n>field|{filterOption.id}|desc</thcd-i18n>
							</ion-note>
						</ion-list>
					);
				})}
			</Host>
		);
	}
}
