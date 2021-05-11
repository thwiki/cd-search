export type DataTypeid = '_wpg' | '_txt' | '_num' | '_dat' | '_pri' | '_dur' | '_lin';

export interface DataValue {
	_wpg: WpgValue;
	_txt: TxtValue;
	_num: NumValue;
	_dat: DatValue;
	_pri: PriValue;
	_dur: DurValue;
	_lin: LinValue;
}

export interface WpgValue {
	fulltext: string;
	fullurl: string;
	namespace: number;
	exists: boolean;
	displaytitle: string;
}
export type TxtValue = string;
export type NumValue = number;
export type DatValue = number;
export interface PriValue {
	value: number;
	unit: string;
}
export type DurValue = number;
export interface LinValue {
	url: string;
	alter: string;
}

export type DataValuePrinter<T extends DataTypeid> = (value: DataValue[T]) => string;

export const DataValuePrinter: { [key in DataTypeid]: DataValuePrinter<key> } = {
	_wpg: (value) => (value.displaytitle === '' ? value.fulltext : value.displaytitle),
	_txt: (value) => value,
	_num: (value) => value.toString(10),
	_dat: (value) => {
		const date = new Date(value);
		return date.toDateString();
	},
	_pri: (value) => `${value.value} ${value.unit}`,
	_dur: (value) => {
		return (
			Math.floor(value / 60)
				.toString()
				.padStart(2, '0') +
			':' +
			Math.floor(value % 60)
				.toString()
				.padStart(2, '0')
		);
	},
	_lin: (value) => {
		return value.url;
	},
};
