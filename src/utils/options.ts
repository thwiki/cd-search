import { DataValue } from '@apis/smw/data-types';

export type InputType = 'range' | 'mltor' | 'dropd' | 'sgnot' | 'price' | 'durat';
export interface InputOption<T> {
	id: ItemField;
	type: InputType;
	content: T;
}
export interface InputContentRange {
	min: number;
	minDefault: string;
	max: number;
	maxDefault: string;
}
export interface InputContentMltor {
	suggestList: string;
}
export interface InputContentDropd {
	options: Array<string>;
}

export interface HashMap<T> {
	[hash: string]: T;
}

export const ItemPropTypeid = {
	self: '_wpg' as '_wpg',
	circle: '_wpg' as '_wpg',
	date: '_dat' as '_dat',
	type: '_wpg' as '_wpg',
	time: '_dur' as '_dur',
	ogmusic: '_wpg' as '_wpg',
	ogmusicno: '_num' as '_num',
	noth: '_wpg' as '_wpg',
	ogwork: '_wpg' as '_wpg',
	ogworkno: '_num' as '_num',
	original: '_wpg' as '_wpg',
	arrange: '_wpg' as '_wpg',
	vocal: '_wpg' as '_wpg',
	lyric: '_wpg' as '_wpg',
	compose: '_wpg' as '_wpg',
	script: '_wpg' as '_wpg',
	dub: '_wpg' as '_wpg',
	perform: '_wpg' as '_wpg',
	name: '_txt' as '_txt',
	discno: '_num' as '_num',
	trackno: '_num' as '_num',
	alname: '_txt' as '_txt',
	event: '_wpg' as '_wpg',
	year: '_num' as '_num',
	rate: '_txt' as '_txt',
	//number: '_txt' as '_txt',
	disc: '_num' as '_num',
	track: '_num' as '_num',
	property: '_txt' as '_txt',
	style: '_txt' as '_txt',
	only: '_txt' as '_txt',
	price: '_pri' as '_pri',
	eventprice: '_pri' as '_pri',
	shopprice: '_pri' as '_pri',
	cover: '_wpg' as '_wpg',
	official: '_lin' as '_lin',
	shop: '_lin' as '_lin',
	coverchar: '_wpg' as '_wpg',
	region: '_txt' as '_txt',
	establish: '_num' as '_num',
	work: '_txt' as '_txt',
	state: '_txt' as '_txt',
};

export type ItemField = keyof typeof ItemPropTypeid;

export type Item = {
	id: string;
	self: DataValue[typeof ItemPropTypeid['self']];
} & {
	[field in ItemField]?: Array<DataValue[typeof ItemPropTypeid[field]]>;
};

export type ItemCriteria = {
	[field in ItemField]?: Array<string>;
};

export namespace Options {
	// 设定主要参数
	export const Api = 'https://thwiki.cc/rest/asktrack/v0'; // 搜寻器Api地址
	export const SuggestApi = 'https://thwiki.cc/ajax.php'; // 输入建议Api根地址

	export const ExtraCriteria: ItemCriteria = {
		// 设定查询结果固定请求的属性
		name: [],
		alname: null,
		circle: null,
		time: null,
		arrange: null,
		vocal: null,
		lyric: null,
		ogmusic: null,
		discno: null,
		trackno: null,
		ogwork: null,
		cover: null,
	};
}

export const FieldElement = new Map<ItemField, HTMLInputChecklistElement | HTMLInputRangeElement | HTMLInputTaglistElement>();
