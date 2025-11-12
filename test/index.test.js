import {expect} from 'chai';
import {BehaviorSubject} from 'rxjs';

import * as vdom from '../index.js';

describe('snabbdom-helpers', () => {
	let container;

	beforeEach(() => {
		// Create a container for each test
		document.body.innerHTML = '<div id="container"></div>';
		container = document.getElementById('container');
	});

	afterEach(() => {
		// Clean up
		document.body.innerHTML = '';
	});

	describe('h', () => {
		it('creates a vnode with the h function', () => {
			const vnode = vdom.h('div', 'Hello');
			expect(vnode.sel).to.equal('div');
			expect(vnode.text).to.equal('Hello');
		});

		it('creates a vnode with data attributes', () => {
			const vnode = vdom.h('div', {attrs: {id: 'test'}}, 'Hello');
			expect(vnode.sel).to.equal('div');
			expect(vnode.data.attrs).to.deep.equal({id: 'test'});
		});
	});

	describe('hyperscript helpers', () => {
		it('creates a div vnode', () => {
			const vnode = vdom.div('Hello World');
			expect(vnode.sel).to.equal('div');
			expect(vnode.text).to.equal('Hello World');
		});

		it('creates a span vnode with class selector', () => {
			const vnode = vdom.span('.my-class', 'Text');
			expect(vnode.sel).to.equal('span.my-class');
			expect(vnode.text).to.equal('Text');
		});

		it('creates a div with id selector', () => {
			const vnode = vdom.div('#my-id', 'Content');
			expect(vnode.sel).to.equal('div#my-id');
		});

		it('creates nested vnodes', () => {
			const vnode = vdom.div([
				vdom.h1('Title'),
				vdom.p('Paragraph')
			]);
			expect(vnode.sel).to.equal('div');
			expect(vnode.children.length).to.equal(2);
			expect(vnode.children[0].sel).to.equal('h1');
			expect(vnode.children[1].sel).to.equal('p');
		});

		it('creates vnode with attribute selector', () => {
			const vnode = vdom.input('[type=text][name=username]');
			expect(vnode.sel).to.equal('input');
			expect(vnode.data.attrs).to.deep.equal({type: 'text', name: 'username'});
		});

		it('creates vnode with mixed selectors and attributes', () => {
			const vnode = vdom.input('#user-input.form-control[type=email][required=true]');
			expect(vnode.sel).to.equal('input#user-input.form-control');
			expect(vnode.data.attrs.type).to.equal('email');
			expect(vnode.data.attrs.required).to.equal(true);
		});
	});

	describe('patch', () => {
		it('applies a patch to vdom (inherited from snabbdom)', () => {
			const vnode = vdom.h('span', 'Hello World');
			const patched = vdom.patch(container, vnode);
			expect(patched.elm.textContent).to.equal('Hello World');
			expect(patched.elm.tagName.toLowerCase()).to.equal('span');
		});

		it('patches from one vnode to another', () => {
			const vnode1 = vdom.h('span', 'Hello');
			const patched1 = vdom.patch(container, vnode1);
			expect(patched1.elm.textContent).to.equal('Hello');

			const vnode2 = vdom.h('span', 'World');
			const patched2 = vdom.patch(patched1, vnode2);
			expect(patched2.elm.textContent).to.equal('World');
		});
	});

	describe('patchStream', () => {
		it('applies a stream of patches to vdom', (done) => {
			const stream$ = new BehaviorSubject(vdom.h('span#container', 'Initial'));

			const subscription = vdom.patchStream(stream$, container);

			// Give the stream time to initialize
			setTimeout(() => {
				// The container is replaced by the vnode
				const newElement = document.getElementById('container');
				expect(newElement.textContent).to.equal('Initial');
				expect(newElement.tagName.toLowerCase()).to.equal('span');

				stream$.next(vdom.h('span#container', 'Updated'));
				setTimeout(() => {
					const updatedElement = document.getElementById('container');
					expect(updatedElement.textContent).to.equal('Updated');
					subscription.unsubscribe();
					done();
				}, 10);
			}, 10);
		});

		it('works with CSS selector string for DOM element', (done) => {
			const stream$ = new BehaviorSubject(vdom.h('span#container', 'Test'));

			const subscription = vdom.patchStream(stream$, '#container');
			setTimeout(() => {
				const newElement = document.getElementById('container');
				expect(newElement.textContent).to.equal('Test');
				expect(newElement.tagName.toLowerCase()).to.equal('span');
				subscription.unsubscribe();
				done();
			}, 10);
		});
	});
});
