import { ItemField } from '@utils/options';

export interface ChecklistItem {
	value: string;
	color?: string;
	class?: string;
	count?: number;
	omit?: boolean;
}

export interface TaglistItem {
	value: string;
	color?: string;
	class?: string;
	count?: number;
	omit?: boolean;
}

function stringToTaglistItem(list: Array<string>): Array<TaglistItem> {
	return list.map((value) => ({
		value,
	}));
}

//export type FilterOptionInit = (this: FilterService, option: FilterOption, suggestion: Array<any>) => any;
export type FilterInputType = 'range' | 'checklist' | 'taglist';

export interface FilterOption {
	id: ItemField;
	name?: string;
	type: FilterInputType;
	collapse?: boolean;
	content?: {
		sliderOptions?: any /*Options*/;
		min?: number;
		max?: number;
		list?: Array<ChecklistItem>;
		tagList?: Array<TaglistItem>;
		tagListSource?: string;
		noOmit?: boolean;
		noSort?: boolean;
	};
	component?: any /*InputBaseComponent*/;
	init?: any;
}

export const filterOptions: Array<FilterOption> = [
	{
		id: 'establish',
		collapse: true,
		type: 'range',
		content: { min: 2000, max: 2032 },
	},
	{
		id: 'year',
		type: 'range',
		content: { min: 2000, max: 2032 },
	},
	{
		id: 'disc',
		type: 'range',
		content: { min: 1, max: 20 },
	},
	{
		id: 'track',
		type: 'range',
		content: { min: 1, max: 99 },
	},
	{
		id: 'ogmusicno',
		type: 'range',
		content: { min: 1, max: 30 },
	},
	{
		id: 'ogworkno',
		type: 'range',
		content: { min: 1, max: 20 },
	},

	// 设定类型为允许多值的属性
	{
		id: 'event',
		type: 'taglist',
		content: { tagListSource: '发售展会建议' },
	},
	{
		id: 'circle',
		type: 'taglist',
		content: { tagListSource: '制作方建议' },
	},
	//{ id: 'number', name: '', type: 'taglist', content: { tagListSource: '' } },
	{
		id: 'ogmusic',
		type: 'taglist',
		content: { tagListSource: '曲目原曲建议' },
	},
	{
		id: 'ogwork',
		type: 'taglist',
		content: { tagListSource: '曲目来源建议' },
	},
	{
		id: 'style',
		type: 'taglist',
		content: { tagListSource: '风格类型建议' },
	},
	{
		id: 'arrange',
		type: 'taglist',
		content: { tagListSource: '编曲建议' },
	},
	{
		id: 'vocal',
		type: 'taglist',
		content: { tagListSource: '演唱建议' },
	},
	{
		id: 'lyric',
		type: 'taglist',
		content: { tagListSource: '作词建议' },
	},
	{
		id: 'compose',
		type: 'taglist',
		content: { tagListSource: '作曲建议' },
	},
	{
		id: 'script',
		type: 'taglist',
		content: { tagListSource: '剧本建议' },
	},
	{
		id: 'dub',
		type: 'taglist',
		content: { tagListSource: '配音建议' },
	},
	{
		id: 'coverchar',
		type: 'taglist',
		content: { list: stringToTaglistItem(['博丽灵梦', '雾雨魔理沙']), tagListSource: '封面角色建议' },
	},

	// 设定类型为允许非的属性
	{
		id: 'region',
		type: 'checklist',
		content: {
			list: stringToTaglistItem(['日本', '中国', '台湾', '香港', '韩国', '美国', '英国', '德国', '加拿大']),
		},
	},
	{
		id: 'work',
		type: 'checklist',
		content: {
			list: stringToTaglistItem(['同人音乐', '同人游戏', '同人志', '同人动画', '周边', '其他']),
		},
	},
	{
		id: 'state',
		type: 'checklist',
		content: { list: stringToTaglistItem(['活动', '休止', '解散']) },
	},
	{
		id: 'property',
		type: 'checklist',
		content: {
			list: stringToTaglistItem(['单曲', 'Demo', '合作', '精选集', 'B面', '盒装', 'Live', '混音集', '原声集', '印象集']),
		},
	},
	{
		id: 'rate',
		type: 'checklist',
		content: { list: stringToTaglistItem(['R18', 'R15', '一般向']) },
	},
	{
		id: 'only',
		type: 'checklist',
		content: { list: [] },
	},
	{
		id: 'type',
		type: 'checklist',
		content: {
			list: stringToTaglistItem(['Arrange', 'Vocal', '再编曲', '翻唱', '配音', '合唱', '纯东方', '混合']),
		},
	},
	{ id: 'noth', name: '', type: 'checklist', content: { list: stringToTaglistItem(['非东方']) } },
	{ id: 'original', name: '', type: 'checklist', content: { list: stringToTaglistItem(['原创']) } },

	// 设定类型为价格的属性
	/*{ id: "price", name: "", type: "price", content: false },
  { id: "eventprice", name: "", type: "price", content: false },
  { id: "shopprice", name: "", type: "price", content: false },*/

	// 设定类型为时间范围的属性
	/*{
    id: "date",
    type: "range",
    content: [
      { type: "date", placeholder: "2009-01-01" },
      { type: "date", placeholder: "2010-01-01" }
    ]
  },*/
	{
		id: 'time',
		type: 'range',
		content: {
			sliderOptions: {
				translate: (value: number) =>
					Math.floor(value / 60).toString() +
					':' +
					Math.floor(value % 60)
						.toString()
						.padStart(2, '0'),
			},
			min: 0,
			max: 2100,
		},
	},
];
