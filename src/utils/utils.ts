export function Bind(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
	return {
		get() {
			const bound = descriptor.value.bind(this);
			Object.defineProperty(this, propertyKey, {
				value: bound,
			});
			return bound;
		},
	};
}

export function beautifyUrl(url: string) {
	return url.replace(/%3A/gi, ':').replace(/%21/gi, '!');
}

export function copyText(text: string) {
	const el = document.createElement('textarea');
	el.value = text;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}
