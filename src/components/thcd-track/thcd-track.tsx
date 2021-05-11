import { actionSheetController } from '@ionic/core';
import { Component, Host, h, Prop, State } from '@stencil/core';
import { DataValuePrinter } from '@apis/smw/data-types';
import { FieldElement, Item, ItemField, ItemPropTypeid } from '@utils/options';
import { Bind, copyText } from '@utils/utils';

@Component({
	tag: 'thcd-track',
	styleUrl: 'thcd-track.less',
})
export class ThcdTrack {
	@Prop() item: Item;

	@State() displayFields: Array<[ItemField, DataValuePrinter<typeof ItemPropTypeid[ItemField]>]> = [];

	connectedCallback() {
		this.displayFields = [];
		Object.keys(this.item).forEach((name: ItemField) => {
			if (
				!['id', 'self', 'name', 'alname', 'time', /*'date', 'circle',*/ 'cover', 'discno', 'trackno'].includes(name) &&
				this.isset(name)
			) {
				const dataType = ItemPropTypeid[name];
				const printer = DataValuePrinter[dataType];
				this.displayFields.push([name, printer]);
			}
		});
	}

	@Bind
	async handleButtonClick(prop: ItemField, value: string) {
		const inputElement = FieldElement.get(prop);
		const hasValue = await inputElement.hasValue(value);
		const actionSheet = await actionSheetController.create({
			header: `${prop}: ${value}`,
			buttons: [
				{
					text: 'Copy',
					icon: 'copy',
					handler: () => {
						copyText(value);
					},
				},
				hasValue
					? {
							text: 'Remove from criteria',
							icon: 'remove-outline',
							role: 'destructive',
							handler: () => {
								if (typeof inputElement?.removeValue === 'function') {
									inputElement.removeValue(value);
								}
							},
					  }
					: {
							text: 'Add to criteria',
							icon: 'add-outline',
							handler: () => {
								if (typeof inputElement?.addValue === 'function') {
									inputElement.addValue(value);
								}
							},
					  },
				{ text: 'Set to criteria', icon: 'reorder-two-outline' },
				{ text: 'Cancel', icon: 'chevron-down-outline', role: 'cancel' },
			],
		});

		await actionSheet.present();
	}

	render() {
		return (
			<Host>
				<ion-item class="track-base">
					<ion-thumbnail class="track-thumbnail" slot="start">
						{this.isset('cover') ? <img loading="lazy" src={this.item.cover[0].fullurl} /> : ''}
					</ion-thumbnail>
					<ion-label class="track-info">
						<h2>
							<a class="track-link" href={this.item.self.fullurl} target="_blank">
								{this.item.name[0]}
							</a>{' '}
							<span>[{DataValuePrinter['_dur'](this.item.time[0])}]</span>
						</h2>
						<div>
							{this.displayFields.map((field) => {
								return (
									<ion-item class="track-field">
										<ion-label class="track-cell" position="fixed">
											<thcd-i18n>field|{field[0]}|label</thcd-i18n>:{' '}
										</ion-label>
										<ion-label class="track-cell">
											{(this.item[field[0]] as any[]).map((value, i) => {
												const printValue = field[1](value);
												return (
													<ion-chip
														color="tertiary"
														outline={true}
														onClick={() => this.handleButtonClick(field[0], printValue)}
													>
														<ion-label>
															<thcd-i18n>
																field|{field[0]}|option|{printValue}
															</thcd-i18n>
														</ion-label>
													</ion-chip>
												);
											})}
										</ion-label>
									</ion-item>
								);
							})}
						</div>
					</ion-label>
				</ion-item>
			</Host>
		);
	}

	private isset(name: ItemField) {
		return this.item[name] != null && this.item[name].length > 0;
	}
}
