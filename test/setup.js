import {JSDOM} from 'jsdom';

// Set up a fake DOM environment before any modules are loaded
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
	url: 'http://localhost',
	pretendToBeVisual: true
});

global.window = dom.window;
global.document = dom.window.document;

// Use Object.defineProperty for properties that might be read-only
Object.defineProperty(global, 'navigator', {
	value: dom.window.navigator,
	writable: true,
	configurable: true
});

Object.defineProperty(global, 'HTMLElement', {
	value: dom.window.HTMLElement,
	writable: true,
	configurable: true
});

