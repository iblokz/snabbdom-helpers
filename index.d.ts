/**
 * iblokz-snabbdom-helpers
 * Snabbdom virtual DOM helpers with hyperscript syntax sugar
 */

import {VNode, VNodeData} from 'snabbdom';
import {Observable, Subscription} from 'rxjs';

/**
 * Patch function initialized with standard modules
 */
export function patch(oldVnode: VNode | Element, vnode: VNode): VNode;

/**
 * Hyperscript function from snabbdom
 */
export {h} from 'snabbdom';

/**
 * Patch an observable stream of vnodes to a DOM element
 */
export function patchStream(stream: Observable<VNode>, dom: string | Element): Subscription;

/**
 * HTML tag helper functions
 */
type HyperHelper = {
	(...args: any[]): VNode;
};

export const a: HyperHelper;
export const abbr: HyperHelper;
export const address: HyperHelper;
export const area: HyperHelper;
export const article: HyperHelper;
export const aside: HyperHelper;
export const audio: HyperHelper;
export const b: HyperHelper;
export const base: HyperHelper;
export const bdi: HyperHelper;
export const bdo: HyperHelper;
export const blockquote: HyperHelper;
export const body: HyperHelper;
export const br: HyperHelper;
export const button: HyperHelper;
export const canvas: HyperHelper;
export const caption: HyperHelper;
export const cite: HyperHelper;
export const code: HyperHelper;
export const col: HyperHelper;
export const colgroup: HyperHelper;
export const data: HyperHelper;
export const datalist: HyperHelper;
export const dd: HyperHelper;
export const del: HyperHelper;
export const details: HyperHelper;
export const dfn: HyperHelper;
export const dialog: HyperHelper;
export const div: HyperHelper;
export const dl: HyperHelper;
export const dt: HyperHelper;
export const em: HyperHelper;
export const embed: HyperHelper;
export const fieldset: HyperHelper;
export const figcaption: HyperHelper;
export const figure: HyperHelper;
export const footer: HyperHelper;
export const form: HyperHelper;
export const h1: HyperHelper;
export const h2: HyperHelper;
export const h3: HyperHelper;
export const h4: HyperHelper;
export const h5: HyperHelper;
export const h6: HyperHelper;
export const head: HyperHelper;
export const header: HyperHelper;
export const hgroup: HyperHelper;
export const hr: HyperHelper;
export const html: HyperHelper;
export const i: HyperHelper;
export const iframe: HyperHelper;
export const img: HyperHelper;
export const input: HyperHelper;
export const ins: HyperHelper;
export const kbd: HyperHelper;
export const label: HyperHelper;
export const legend: HyperHelper;
export const li: HyperHelper;
export const link: HyperHelper;
export const main: HyperHelper;
export const map: HyperHelper;
export const mark: HyperHelper;
export const menu: HyperHelper;
export const meta: HyperHelper;
export const meter: HyperHelper;
export const nav: HyperHelper;
export const noscript: HyperHelper;
export const object: HyperHelper;
export const ol: HyperHelper;
export const optgroup: HyperHelper;
export const option: HyperHelper;
export const output: HyperHelper;
export const p: HyperHelper;
export const picture: HyperHelper;
export const pre: HyperHelper;
export const progress: HyperHelper;
export const q: HyperHelper;
export const rp: HyperHelper;
export const rt: HyperHelper;
export const ruby: HyperHelper;
export const s: HyperHelper;
export const samp: HyperHelper;
export const script: HyperHelper;
export const search: HyperHelper;
export const section: HyperHelper;
export const select: HyperHelper;
export const slot: HyperHelper;
export const small: HyperHelper;
export const source: HyperHelper;
export const span: HyperHelper;
export const strong: HyperHelper;
export const style: HyperHelper;
export const sub: HyperHelper;
export const summary: HyperHelper;
export const sup: HyperHelper;
export const table: HyperHelper;
export const tbody: HyperHelper;
export const td: HyperHelper;
export const template: HyperHelper;
export const textarea: HyperHelper;
export const tfoot: HyperHelper;
export const th: HyperHelper;
export const thead: HyperHelper;
export const time: HyperHelper;
export const title: HyperHelper;
export const tr: HyperHelper;
export const track: HyperHelper;
export const u: HyperHelper;
export const ul: HyperHelper;
export const video: HyperHelper;
export const wbr: HyperHelper;

