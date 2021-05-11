import { Item, ItemCriteria, Options } from '@utils/options';
import { CountResponse } from './count-response';
//import { QueryResponse } from './query-response';

export class SearchRequest {
	results: Array<Item> = [];
	private valid = false;
	hash = '';
	count = 0;
	limit = 50;
	offset = 0;
	more = true;
	lock = false;

	static newFromCriterion(criterion: ItemCriteria) {
		const criteria = {
			...Options.ExtraCriteria,
		};
		let fieldName: keyof ItemCriteria;
		let fieldCount = 0;
		for (fieldName in criterion) {
			if (criterion.hasOwnProperty(fieldName)) {
				const field = criterion[fieldName];
				if (field != null && field.length > 0) {
					criteria[fieldName] = field;
					++fieldCount;
				}
			}
		}
		if (fieldCount > 0) {
			return new SearchRequest(criteria);
		} else {
			return null;
		}
	}

	constructor(public criteria: ItemCriteria) {}

	async getCount() {
		if (this.lock) return;
		this.lock = true;
		try {
			const result: CountResponse = await (
				await fetch(this.getApiUrl(`/count`), { method: 'POST', body: JSON.stringify(this.criteria) })
			).json();
			this.count = result.count;
			this.hash = result.hash;
			this.valid = true;
		} catch (e) {
			console.log(e);
			this.valid = false;
		}
		this.lock = false;
	}

	async getNext() {
		if (this.lock || !this.valid || !this.more || this.offset >= this.count) return;
		this.lock = true;
		try {
			const response = await this.getResult(this.limit, this.offset);
			this.offset += this.limit;
			this.more = response.more;
			this.lock = false;
			this.results.push(...response.results);
		} catch (e) {
			this.lock = false;
			console.log(e);
		}
	}

	async getResult(limit = 50, offset = 0) {
		return await (
			await fetch(this.getApiUrl(`/query?limit=${limit}&offset=${offset}`), { method: 'POST', body: JSON.stringify(this.criteria) })
		).json();
	}

	getApiUrl(endpoint: string) {
		return `${Options.Api}${endpoint}${endpoint.includes('?') ? '&' : '?'}origin=${encodeURIComponent(location.origin).replace(
			/\./g,
			'%2E'
		)}`;
	}

	isValid() {
		return this.valid;
	}
}
