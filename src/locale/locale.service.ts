import { getAssetPath } from '@stencil/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export type Language = 'zh' | 'en';
export interface LocaleData {
	[key: string]: LocaleData | string;
}

export class LocaleService {
	localeMap = new Map<Language, LocaleData>();
	defaultLang: Language = 'zh';
	currentLang: Language = null;
	useDefaultLang = false;
	languages: Language[] = ['zh', 'en'];

	onChangeLang: BehaviorSubject<LocaleData> = new BehaviorSubject<LocaleData>({});

	constructor() {
		//this.detectLanguage();
	}

	async detectLanguage(): Promise<boolean> {
		//if (this.cookieService.check("lang") && this.use(this.cookieService.get("lang").substr(0, 2))) return;
		//this.use('zh');
		if ('languages' in navigator) {
			for (let index = 0; index < navigator.languages.length; index++) {
				if (await this.use(navigator.languages[index].substr(0, 2))) return true;
			}
		}
		return false;
	}

	async use(lang: string): Promise<boolean> {
		if (this.currentLang === lang) return true;
		if (this.languages.includes(lang as Language)) {
			this.currentLang = lang as Language;
			//this.cookieService.set("lang", this.currentLang, 30, "/", undefined, true, "Strict");
			let localeData: LocaleData = this.localeMap.get(this.currentLang);
			if (localeData == null) {
				localeData = await (await fetch(getAssetPath(`../assets/i18n/${this.currentLang}.json`))).json();
				this.localeMap.set(this.currentLang, localeData);
			}
			this.onChangeLang.next(localeData);
			return true;
		} else {
			return false;
		}
	}

	get(key: string) {
		if (typeof key === 'undefined' || !key.length) {
			throw new Error(`Parameter "key" required`);
		}
		const path = key.split('|');
		return this.onChangeLang.pipe(map((data) => this.traverse(data, path)));
	}

	private traverse(data: LocaleData, path: string[]): string {
		let value: any = data;
		let i = 0;
		for (; i < path.length && value.hasOwnProperty(path[i]); ++i) {
			value = value[path[i]];
		}
		if (typeof value === 'string') {
			if (path.length - i > 0) return this.interpolate(value, path.slice(i));
			return value;
		}
		if (value.hasOwnProperty('')) {
			return this.interpolate(value[''], path.slice(i));
		}
		if (value == null || path.length - i > 1) return `⧼${path.join('|')}⧽`;
		return path[i] ?? '';
	}

	private interpolate(expr: string, params?: string[]) {
		if (params == null || expr.indexOf('$') === -1) {
			return expr;
		}
		if (params.length > 1) {
			return this.strtr(expr, params.map((v, k: number) => '$' + (k + 1)).reverse(), params.map((v) => v.toString()).reverse());
		}
		const single = typeof params[0] !== 'undefined' ? params[0] : '';
		return expr.replace(/\$1/g, single.toString());
	}

	private strtr(str: string, from: string[], to: string[]) {
		let ret = '';
		let match = false;

		const lenStr = str.length;
		const lenFrom = from.length;

		for (let i = 0; i < lenStr; i++) {
			match = false;
			let j = 0;
			for (; j < lenFrom; j++) {
				if (str.substr(i, from[j].length) === from[j]) {
					match = true;
					i += from[j].length - 1;
					break;
				}
			}
			ret += match ? to[j] : str.charAt(i);
		}

		return ret;
	}
}
