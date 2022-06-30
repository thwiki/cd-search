import { Component, h, Prop, Watch, Method } from '@stencil/core';
import { LocaleService } from '@locale';
import { SelectChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
	tag: 'app-root',
	styleUrl: 'app-root.less',
})
export class AppRoot {
	private locale = new LocaleService();
	private localeSubscription: Subscription;

	@Prop({ attribute: 'lang', mutable: true })
	language: string;

	@Watch('language')
	handleLanguageChange() {
		this.locale.use(this.language);
	}

	@Method()
	async getLocale() {
		return this.locale;
	}

	componentWillLoad() {
		this.localeSubscription = this.locale.onChangeLang.subscribe(() => {
			this.language = this.locale.currentLang;
			console.log(this.language);
		});
		this.locale.detectLanguage();
	}

	disconnectedCallback() {
		this.localeSubscription?.unsubscribe();
	}

	handleLanguageChange2 = async (event: CustomEvent<SelectChangeEventDetail<any>>) => {
		await this.locale.use(event.detail.value);
	};

	render() {
		return (
			<ion-app>
				<ion-header>
					<ion-toolbar color="primary">
						<ion-buttons slot="start">
							<ion-menu-button>
								<ion-icon name="filter-outline"></ion-icon>
							</ion-menu-button>
						</ion-buttons>
						<ion-title>cd.thwiki.cc</ion-title>
						<ion-buttons slot="primary">
							<ion-button>
								<ion-icon slot="icon-only" name="search"></ion-icon>
							</ion-button>
							<ion-select
								placeholder="Language"
								interface="popover"
								value={this.language}
								onIonChange={this.handleLanguageChange2}
							>
								{this.locale.languages.map((language) => (
									<ion-select-option value={language}>{language}</ion-select-option>
								))}
							</ion-select>
						</ion-buttons>
					</ion-toolbar>
				</ion-header>
				<ion-content>
					<ion-router useHash={false}>
						<ion-route url="/" component="app-home" />
						<ion-route url="/profile/:name" component="app-profile" />
					</ion-router>
					<ion-nav />
				</ion-content>
			</ion-app>
		);
	}
}
