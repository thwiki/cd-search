export type RouteQuery = Record<string, string>;

const injectQueryList: { query: RouteQuery }[] = [];

export function injectQuery(component: { query: RouteQuery }) {
	injectQueryList.push(component);
	component.query = getRouteQuery();
}

export function disinjectQuery(component: any) {
	const index = injectQueryList.indexOf(component);
	if (index >= 0) injectQueryList.splice(index, 1);
}

export function getRouteQuery(url?: string) {
	const parsed = url == null ? new URL(location.href) : new URL(url, location.origin);
	return Object.fromEntries((parsed.searchParams as any).entries());
}

function handleStateChange(url?: string) {
	const query = getRouteQuery(url);
	injectQueryList.forEach((component) => {
		component.query = query;
	});
}

const pushState = window.history.pushState;
window.history.pushState = function (...args) {
	handleStateChange(args[2] instanceof URL ? args[2].href : args[2]);
	return pushState.apply(history, args);
};

window.addEventListener('popstate', function () {
	handleStateChange();
});
