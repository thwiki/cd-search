import { Component, Host, h, Prop } from '@stencil/core';
import { TaglistItem } from '../thcd-filters/filter-options';

@Component({
	tag: 'input-taglist-popover',
	styleUrl: 'input-taglist-popover.less',
	shadow: true,
})
export class InputTaglistPopover {
	@Prop() suggestions: TaglistItem[] = [];

	render() {
		return (
			<Host>
				<ion-list>
					{this.suggestions.map((suggestion) => {
						return <ion-label>{suggestion.value}</ion-label>;
					})}
				</ion-list>
			</Host>
		);
	}
}
