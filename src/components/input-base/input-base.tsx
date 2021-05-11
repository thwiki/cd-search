import { EventEmitter } from '@stencil/core';
import { FilterOption } from '../thcd-filters/filter-options';

export type InputBaseValueChangeEventDetial = Record<string, string>;

export type InputBaseValueChangedEventDetial = Record<string, string[]>;

export interface InputBase {
	option: FilterOption;

	query: string;

	_value: any;

	value: any;

	queryChanged(): void;

	valueChange: EventEmitter<InputBaseValueChangeEventDetial>;
	valueChanged: EventEmitter<InputBaseValueChangedEventDetial>;

	addValue(value: any): Promise<void>;

	removeValue(value: any): Promise<void>;

	hasValue(value: any): Promise<boolean>;

	valueToCriteria(value: any): Array<string>;

	valueToRoute(value: any): string;

	routeToValue(route: string): any;
}
