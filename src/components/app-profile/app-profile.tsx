import { Component, Prop, State, h } from '@stencil/core';

@Component({
	tag: 'app-profile',
	styleUrl: 'app-profile.less',
})
export class AppProfile {
	@State() state = false;
	@Prop() name: string;

	formattedName(): string {
		if (this.name) {
			return this.name.substr(0, 1).toUpperCase() + this.name.substr(1).toLowerCase();
		}
		return '';
	}

	render() {
		return [
			<ion-header>
				<ion-toolbar color="primary">
					<ion-buttons slot="start">
						<ion-back-button defaultHref="/" />
					</ion-buttons>
					<ion-title>Profile: {this.name}</ion-title>
				</ion-toolbar>
			</ion-header>,

			<ion-content class="ion-padding">
				<p></p>

				<ion-item>
					<ion-label>Setting ({this.state.toString()})</ion-label>
					<ion-toggle checked={this.state} onIonChange={(ev) => (this.state = ev.detail.checked)} />
				</ion-item>
			</ion-content>,
		];
	}
}
