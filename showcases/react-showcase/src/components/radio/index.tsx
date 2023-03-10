import { DBRadio } from '../../../../../output/react/src';
import DefaultComponent from '../index';
import type { DefaultComponentVariants } from '../data';

const variants: DefaultComponentVariants[] = [
	{
		name: 'Variants',
		examples: [
			{
				name: 'Default',
				example: <DBRadio name="Variants">Label</DBRadio>
			},
			{
				name: 'Disabled',
				example: <DBRadio label="Label" disabled name="Variants" />
			},
			{
				name: 'Required',
				example: <DBRadio label="Label" required name="Variants" />
			}
		]
	},
	{
		name: 'States',
		examples: [
			{
				name: 'Default',
				example: <DBRadio label="Label" name="States" />
			},
			{
				name: 'Checked',
				example: <DBRadio label="Label" checked name="States" />
			},
			{
				name: 'Invalid',
				example: <DBRadio label="Label" invalid name="States" />
			}
		]
	},
	{
		name: 'Size',
		examples: [
			{ name: 'Default', example: <DBRadio label="Label" name="Size" /> },
			{
				name: 'Small',
				example: <DBRadio label="Label" size="small" name="Size" />
			}
		]
	}
];

const RadioComponent = () => {
	return (
		<DefaultComponent
			title={'DBRadio'}
			variants={variants}></DefaultComponent>
	);
};

export default RadioComponent;
