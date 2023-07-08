import gulp from 'gulp';
const { dest, src } = gulp;

import gulpZip from 'gulp-zip';

const RELEASE_FILES = [
	'fonts/**/*',
	'images/**/*',
	'lang/**/*',
	'module/**/*',
	'packs/**/*',
	'templates/**/*',
	'CHANGELOG.md',
	'Dreams-and-Machines.css',
	'LICENSE',
	'README.md',
	'system.json',
	'template.json'
];

export default function zip() {
	return src(RELEASE_FILES, { base: '.' })
		.pipe(gulpZip(`dreams-and-machines.zip`))
		.pipe(dest('.'));
}
