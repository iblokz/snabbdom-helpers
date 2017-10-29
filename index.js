'use strict';

const snabbdom = require('snabbdom');
const h = require('snabbdom/h').default;
const {obj} = require('iblokz-data');
const htmlTags = require('html-tags');

const attrs = require('./util/attrs');

const patch = snabbdom.init([ // Init patch function with choosen modules
	require('snabbdom/modules/class').default, // makes it easy to toggle classes
	require('snabbdom/modules/props').default, // for setting properties on DOM elements
	require('snabbdom/modules/attributes').default, // for setting properties on DOM elements
	require('snabbdom/modules/style').default, // handles styling on elements with support for animations
	require('snabbdom/modules/eventlisteners').default // attaches event listeners
]);

const patchStream = (stream, dom) => {
	dom = (typeof dom === 'string') ? document.querySelector(dom) : dom;
	stream.scan(
		(vnode, newVnode) => patch(vnode, newVnode),
		dom
	).subscribe();
};

const hyperHelpers = htmlTags.reduce(
	(o, tag) => {
		o[tag] = function() {
			return [Array.from(arguments)]
				.map(attrs.process)
				.map(args => (
					// is the first argument a selector
					args[0] && typeof args[0] === 'string' && args[0].match(/^(\.|#)[a-zA-Z\-_0-9]+/ig))
						? [].concat(tag + args[0], args.slice(1))
						: [tag].concat(args))
				.map(args => h.apply(this, args))
				.pop();
		};
		return o;
	}, {}
);

module.exports = Object.assign(
	{
		h,
		patch,
		patchStream
	},
	hyperHelpers
);
