/**
 * @module iblokz-snabbdom-helpers
 * @description Snabbdom virtual DOM helpers with hyperscript syntax sugar
 * @version 2.0.0
 */

import {
	init,
	h,
	classModule,
	propsModule,
	attributesModule,
	styleModule,
	eventListenersModule
} from 'snabbdom';
import {scan} from 'rxjs/operators';
import htmlTags from 'html-tags';

import * as attrs from './util/attrs.js';

/**
 * Patch function initialized with standard modules
 * @type {Function}
 */
export const patch = init([
	classModule, // makes it easy to toggle classes
	propsModule, // for setting properties on DOM elements
	attributesModule, // for setting attributes on DOM elements
	styleModule, // handles styling on elements with support for animations
	eventListenersModule // attaches event listeners
]);

/**
 * Patch an observable stream of vnodes to a DOM element
 * @param {Observable} stream - Observable stream of vnodes
 * @param {string|Element} dom - DOM element or selector
 * @return {Subscription} Stream subscription
 * @example
 * const vnode$ = interval(1000).pipe(map(() => h('div', 'Hello')));
 * patchStream(vnode$, '#app');
 */
export const patchStream = (stream, dom) => {
	dom = (typeof dom === 'string') ? document.querySelector(dom) : dom;
	return stream.pipe(
		scan((vnode, newVnode) => patch(vnode, newVnode), dom)
	).subscribe();
};

/**
 * Generate hyperscript helper functions for all HTML tags
 */
const hyperHelpers = htmlTags.reduce(
	(o, tag) => {
		o[tag] = function() {
			return [Array.from(arguments)]
				.map(attrs.process)
				.map((args) => (
					// is the first argument a selector
					args[0] && typeof args[0] === 'string' && args[0].match(/^(\.|#)[a-zA-Z\-_0-9]+/ig))
					? [].concat(tag + args[0], args.slice(1))
					: [tag].concat(args))
				.map((args) => h.apply(this, args))
				.pop();
		};
		return o;
	}, {}
);

// Export h function and patch utilities
export {h};

// Export all HTML tag helpers
export const {
	a, abbr, address, area, article, aside, audio, b, base, bdi, bdo, blockquote,
	body, br, button, canvas, caption, cite, code, col, colgroup, data, datalist,
	dd, del, details, dfn, dialog, div, dl, dt, em, embed, fieldset, figcaption,
	figure, footer, form, h1, h2, h3, h4, h5, h6, head, header, hgroup, hr, html,
	i, iframe, img, input, ins, kbd, label, legend, li, link, main, map, mark,
	menu, meta, meter, nav, noscript, object, ol, optgroup, option, output, p,
	picture, pre, progress, q, rp, rt, ruby, s, samp, script, search, section,
	select, slot, small, source, span, strong, style, sub, summary, sup, table,
	tbody, td, template, textarea, tfoot, th, thead, time, title, tr, track, u,
	ul, video, wbr
} = hyperHelpers;
