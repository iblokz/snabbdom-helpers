import {expect} from 'chai';

import * as attrs from '../../util/attrs.js';

describe('util/attrs', () => (
	describe('process', () => (
		it('converts a css attributes selector with string value with double quotes', () =>
			expect(attrs.process(['[name="john"]'])).to.deep.equal([{attrs: {name: 'john'}}])),
		it('converts a css attributes selector with string value with single quotes', () =>
			expect(attrs.process([`[name='john']`])).to.deep.equal([{attrs: {name: 'john'}}])),
		it('converts a css attributes selector with string value without quotes', () =>
			expect(attrs.process([`[name=john]`])).to.deep.equal([{attrs: {name: 'john'}}])),
		it('converts a css attributes selector with number value', () =>
			expect(attrs.process([`[age=23]`])).to.deep.equal([{attrs: {age: 23}}])),
		it('converts a css attributes selector with boolean value', () =>
			expect(attrs.process([`[applied=true]`])).to.deep.equal([{attrs: {applied: true}}]))
	))
));
