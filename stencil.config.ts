import { Config } from '@stencil/core';
import { less } from '@stencil/less';

// https://stenciljs.com/docs/config

export const config: Config = {
	globalScript: 'src/global/app.ts',
	globalStyle: 'src/global/app.less',
	taskQueue: 'async',
	extras: {
		cssVarsShim: false,
		dynamicImportShim: false,
		safari10: false,
		scriptDataOpts: false,
		shadowDomShim: false,
	},
	devServer: {
		reloadStrategy: 'pageReload',
		websocket: false,
		openBrowser: false,
	},
	outputTargets: [
		{
			type: 'www',
			serviceWorker: null,
		},
	],
	plugins: [
		less({
			injectGlobalPaths: ['src/global/component.less'],
		}),
	],
};
