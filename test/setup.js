import {JSDOM} from 'jsdom';

// Set up a fake DOM environment before any modules are loaded
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
	url: 'http://localhost',
	pretendToBeVisual: true
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;

