import FS from 'node:fs';

const sharedPath = '../shared';

const generateExampleJSX = () => {
	const docs = JSON.parse(
		FS.readFileSync('./../../output/docs.json', 'utf8').toString()
	);
	const imports = [];
	const examples = [];
	for (const key of Object.keys(docs)) {
		let componentName = key.split('/').at(-1);
		componentName = componentName.replace('.tsx', '');
		const componentValue = docs[key].at(0);
		if (componentValue) {
			imports.push(componentValue.displayName);
			const path = `${sharedPath}/${componentName}.json`;
			if (FS.existsSync(path)) {
				const variants = JSON.parse(FS.readFileSync(path, 'utf8'));

				for (const variant of variants) {
					for (const example of variant.examples.filter(
						(example) => example.code
					)) {
						examples.push(
							`"${componentName}${variant.name}${
								example.name
							}":renderToString(${example.code.default.slice(
								0,
								example.code.default.length
							)})`
						);
					}
				}
			}
		}
	}

	if (!FS.existsSync('./scripts/generated')) {
		FS.mkdirSync('./scripts/generated');
	}

	FS.writeFileSync(
		`./scripts/generated/index.jsx`,
		"import { renderToString } from 'react-dom/server';\n" +
			"import React from 'react';\n" +
			`import {${imports.join(
				','
			)}} from '../../components/src/dist';\n\n` +
			`export const allExamples = {${examples.join(',\n')}}`
	);
};

generateExampleJSX();
