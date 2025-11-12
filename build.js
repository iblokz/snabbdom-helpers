import * as esbuild from 'esbuild';
import {readFileSync, mkdirSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create dist directory
mkdirSync(join(__dirname, 'dist'), {recursive: true});

// Read package.json to get version
const pkg = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'));

console.log('Building CommonJS bundle...');

try {
	// Build CommonJS bundle
	await esbuild.build({
		entryPoints: ['index.js'],
		bundle: true,
		platform: 'node',
		format: 'cjs',
		outfile: 'dist/index.cjs',
		external: ['snabbdom', 'iblokz-data', 'html-tags', 'rxjs'],
		banner: {
			js: `/**
 * iblokz-snabbdom-helpers v${pkg.version}
 * ${pkg.description}
 * @license ${pkg.license}
 */
`
		}
	});

	console.log('✓ Built dist/index.cjs');
	console.log('\nBuild completed successfully!');
} catch (error) {
	console.error('Build failed:', error);
	process.exit(1);
}

