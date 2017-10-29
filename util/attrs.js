'use strict';

const {obj} = require('iblokz-data');

const strParse = s =>
	s.match(/^[0-9]+$/) ? parseInt(s, 10)
	: s.match(/^[0-9.]+$/) ? parseFloat(s)
	: s === 'true' ? true
	: s === 'false' ? false
	: s;

const process = args => {
	let newArgs = args.slice();

	let selector = newArgs[0] && typeof newArgs[0] === 'string' && newArgs[0] || '';
	if (selector !== '') newArgs = newArgs.slice(1);

	const attrRegExp = /\[[a-z\-0-9]+=("[^"]+"|'[^']+'|[0-9.]+|true|false|[^\]^=^"^']+)\]/ig;

	let attrs = selector && selector.match(attrRegExp);
	selector = selector.replace(attrRegExp, '');

	attrs = attrs && attrs.map && attrs
		.map(c => c.replace(/[[\]("|')]/g, '').split('='))
		.reduce((o, attr) => obj.patch(o, attr[0], strParse(attr[1])), {}) || {};

	if (attrs && Object.keys(attrs).length > 0) {
		if (!newArgs[0] || newArgs[0]
			&& typeof newArgs[0] === 'object' && !(newArgs[0] instanceof Array)) {
			attrs = Object.assign({}, newArgs[0] && newArgs[0].attrs || {}, attrs);
			newArgs[0] = Object.assign({}, newArgs[0] || {}, {attrs});
		} else {
			newArgs = [{attrs}].concat(newArgs);
		}
	}

	if (selector !== '') newArgs = [selector].concat(newArgs);

	// console.log(args, newArgs);
	return newArgs;
};

module.exports = {
	strParse,
	process
};
