import { CheckboxChangeEventDetail, modalController } from '@ionic/core';
import { Component, Host, h, Prop, State, Watch, Event, EventEmitter, Method, Element } from '@stencil/core';
import { FieldElement } from '@utils/options';
import { Bind } from '@utils/utils';
import { InputBase, InputBaseValueChangedEventDetial, InputBaseValueChangeEventDetial } from '../input-base/input-base';
import { FilterOption } from '../thcd-filters/filter-options';

@Component({
	tag: 'input-taglist',
	styleUrl: 'input-taglist.less',
	shadow: true,
})
export class InputTaglist implements InputBase {
	private checked: string[] = [];
	private isStatic: boolean;

	@Element() element: HTMLInputTaglistElement;

	@Prop() option: FilterOption;

	@Prop() query: string;

	@State() _value: string[] = [];

	@Watch('query')
	queryChanged() {
		this._value = this.routeToValue(this.query);
		this.checked = this._value;
		this.valueChanged.emit({ [this.option.id]: this.valueToCriteria(this._value) });
	}

	@Event({ eventName: 'value-change' }) valueChange: EventEmitter<InputBaseValueChangeEventDetial>;
	@Event({ eventName: 'value-changed' }) valueChanged: EventEmitter<InputBaseValueChangedEventDetial>;

	@Method()
	async addValue(value: string) {
		this.setChecked(value, true);
	}

	@Method()
	async removeValue(value: string) {
		this.setChecked(value, false);
	}

	@Method()
	async hasValue(value: string) {
		return this.getChecked(value);
	}

	connectedCallback() {
		FieldElement.set(this.option.id, this.element);
		this.isStatic = this.option.content.tagList != null || this.option.content.tagListSource == null;
		if (this.option.content.list == null) this.option.content.list = [];
		this.queryChanged();
	}

	@Bind
	handleValueChange(e: CustomEvent<CheckboxChangeEventDetail>) {
		const {
			detail: { checked, value },
		} = e;
		this.setChecked(value, checked);
	}

	@Bind
	async handleSearchFocus() {
		await this.presentModal();
	}

	get value(): string[] {
		return this._value;
	}

	set value(value: string[]) {
		this.valueChange.emit({ [this.option.id]: this.valueToRoute(value) });
	}

	valueToCriteria(value: Array<string>) {
		return value.length === 0 ? null : value;
	}

	valueToRoute(value: Array<string>): string {
		return value.length === 0 ? null : value.join('!-!');
	}

	routeToValue(route: string) {
		const value =
			route == null
				? []
				: route
						.trim()
						.split(/\s*!-!\s*/g)
						.filter((v) => v !== '');
		value.forEach((key) => this.setChecked(key, true));
		return value;
	}

	componentShouldUpdate(newValue: any, oldValue: any, prop: string) {
		return prop !== 'query';
	}

	async presentModal() {
		const modal = await modalController.create({
			component: 'input-taglist-modal',
			componentProps: { option: this.option },
		});
		await modal.present();
		const event = await modal.onWillDismiss();
		if (event?.data?.selected != null) {
			if (event.data.selected !== '') {
				this.setChecked(event.data.selected, true);
			}
		}
	}

	render() {
		return (
			<Host id={this.option.id}>
				<ion-searchbar type="text" enterKeyHint="search" onIonFocus={this.handleSearchFocus}></ion-searchbar>
				<ion-item>
					<ion-checkbox
						slot="start"
						value={'_'}
						checked={this.getChecked('_')}
						disabled={this.getChecked('_')}
						onIonChange={this.handleValueChange}
					></ion-checkbox>
					<ion-label>
						<thcd-i18n>field|{this.option.id}|option|_</thcd-i18n>
					</ion-label>
				</ion-item>
				{this.option.content.list.map((item) => (
					<ion-item class={{ [item.class ?? '']: true }}>
						<ion-checkbox
							slot="start"
							value={item.value}
							checked={this.getChecked(item.value)}
							onIonChange={this.handleValueChange}
						></ion-checkbox>
						<ion-label>
							<thcd-i18n>
								field|{this.option.id}|option|{item.value}
							</thcd-i18n>
						</ion-label>
					</ion-item>
				))}
			</Host>
		);
	}

	private getChecked(key: string) {
		if (key === '_') {
			return this.checked.length === 0;
		}
		return this.checked.includes(key);
	}

	private setChecked(key: string, value: boolean) {
		key = key.trim();
		if (key === '_') {
			if (value) {
				this.checked = [];
				this.value = this.checked;
			}
			return true;
		}
		if (value === this.checked.includes(key)) return true;
		if (value) {
			if (this.option.content.list.every(({ value: cmpKey }) => cmpKey !== key)) {
				if (this.isStatic) {
					const item = this.option.content.tagList.find(({ value: cmpKey }) => cmpKey === key);
					if (item != null) {
						this.option.content.list.push(item);
						this.checked.push(key);
					}
				} else {
					this.option.content.list.push({ value: key });
					this.checked.push(key);
				}
			} else {
				this.checked.push(key);
			}
		} else {
			this.checked = this.checked.filter((c) => c !== key);
		}

		this.value = this.checked;
		return true;
	}
}
