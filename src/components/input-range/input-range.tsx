import { RangeChangeEventDetail } from '@ionic/core';
import { Component, Host, h, Prop, State, Event, EventEmitter, Watch, Method, Element } from '@stencil/core';
import { FieldElement } from '@utils/options';
import { Bind } from '@utils/utils';
import { InputBase, InputBaseValueChangedEventDetial, InputBaseValueChangeEventDetial } from '../input-base/input-base';
import { FilterOption } from '../thcd-filters/filter-options';

@Component({
	tag: 'input-range',
	styleUrl: 'input-range.less',
	shadow: true,
})
export class InputRange implements InputBase {
	@Element() element: HTMLInputRangeElement;

	@Prop() option: FilterOption;

	@Prop() query: string;

	@State() _value: [number, number] = [null, null];

	@Watch('query')
	queryChanged() {
		this._value = this.routeToValue(this.query);
		this.valueChanged.emit({ [this.option.id]: this.valueToCriteria(this._value) });
	}

	@Event({ eventName: 'value-change' }) valueChange: EventEmitter<InputBaseValueChangeEventDetial>;
	@Event({ eventName: 'value-changed' }) valueChanged: EventEmitter<InputBaseValueChangedEventDetial>;

	@Method()
	async addValue(value: string) {
		const number = this.getInt(value);
		if (number != null) {
			let [min, max] = this._value;
			if (min != null && max !== null) {
				if (number < min) min = number;
				else if (number > max) max = number;
			} else if (min == null && max == null) {
				min = number;
				max = number;
			} else if (min == null) {
				if (number > max) max = number;
			} else if (max == null) {
				if (number < min) min = number;
			}
			this.value = [min, max];
		}
	}

	@Method()
	async removeValue(value: string) {
		//const number = this.getInt(value);
		//this.setChecked(value, false);
	}

	@Method()
	async hasValue(value: string) {
		const number = this.getInt(value);
		if (number != null) {
			let [min, max] = this._value;
			if (min != null && max !== null) {
				return min <= number && number <= max;
			} else if (min == null && max == null) {
				return false;
			} else if (min == null) {
				return number <= max;
			} else if (max == null) {
				return number >= min;
			}
		}
		return false;
	}

	connectedCallback() {
		FieldElement.set(this.option.id, this.element);

		this.queryChanged();

		if (this._value[0] == null) this._value[0] = this.option.content.min;
		if (this._value[1] == null) this._value[1] = this.option.content.max;
	}

	@Bind
	handleValueChange(e: CustomEvent<RangeChangeEventDetail>) {
		if (typeof e.detail.value === 'number') {
			this.value = [e.detail.value, e.detail.value];
		} else {
			this.value = [e.detail.value.lower, e.detail.value.upper];
		}
	}

	get value(): [number, number] {
		return this._value;
	}

	set value(value: [number, number]) {
		if (value[0] !== this._value[0] || value[1] !== this._value[1]) {
			this.valueChange.emit({ [this.option.id]: this.valueToRoute(value) });
		}
	}

	valueToCriteria(value: [number, number]) {
		const [start, end] = value;
		if (start === this.option.content.min && end === this.option.content.max) return null;
		if (start === end) {
			return start === 0 ? ['=', start.toString()] : [start.toString()];
		}
		if (start === this.option.content.min) return ['<=' + end];
		if (end === this.option.content.max) return ['>=' + start];
		return ['>=' + start, '<=' + end];
	}

	valueToRoute(value: [number, number]): string {
		return value[0] === this.option.content.min && value[1] === this.option.content.max ? null : value.join(':');
	}

	routeToValue(route: string): [number, number] {
		if (route == null) return [this.option.content.min, this.option.content.max];
		const array = route.split(':');
		return [this.getInt(array[0]), this.getInt(array[1])];
	}

	componentShouldUpdate(newValue: any, oldValue: any, prop: string) {
		return prop !== 'query';
	}

	render() {
		return (
			<Host id={this.option.id}>
				<ion-range
					name={this.option.id}
					dual-knobs
					pin={true}
					snaps={true}
					step={1}
					min={this.option.content.min}
					max={this.option.content.max}
					value={{ lower: this._value[0], upper: this._value[1] }}
					onIonChange={this.handleValueChange}
				>
					<ion-label slot="start">{this.option.content.min}</ion-label>
					<ion-label slot="end">{this.option.content.max}</ion-label>
				</ion-range>
			</Host>
		);
	}

	private getInt(value: string | number): number {
		return value == null || value === ''
			? null
			: Math.min(
					Math.max((typeof value === 'number' ? value : parseFloat(value)) || 0, this.option.content.min),
					this.option.content.max
			  );
	}
}
