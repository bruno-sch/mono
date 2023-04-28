/**
 * Generate Color Utilities (Classes and SCSS Placeholders) for color dependencies
 * according to definitions made by DB UI v3
 */

const prefix = 'db';
const fileHeader = `
@use "sass:color";
@use "variables" as *;
// Do not edit directly
// Generated on
// ${new Date().toString()}
`;

const getRBGA = (primaryColor, type) => `
	--db-current-background-color-red: #{color.red($${prefix}-${primaryColor[type]?.name})};
	--db-current-background-color-green: #{color.green($${prefix}-${primaryColor[type]?.name})};
	--db-current-background-color-blue: #{color.blue($${prefix}-${primaryColor[type]?.name})};`;

const generateInteractiveVariants = (
	currentColorObject,
	cssProp,
	primaryColor,
	noActive,
	noHover
) => {
	const hoverColor = `${prefix}-${currentColorObject.hover.name}`;
	const pressedColor = `${prefix}-${currentColorObject.pressed.name}`;
	const activeState = `
			&:active {
    			--db-current-${cssProp}: var(--${pressedColor}, #{$${pressedColor}});
				${cssProp}: var(--db-current-${cssProp}, #{$${pressedColor}});
    			${primaryColor ? getRBGA(primaryColor, 'pressed') : ''}
			}`;
	const hoverState = `
			&:hover {
    			--db-current-${cssProp}: var(--${hoverColor}, #{$${hoverColor}});
				${cssProp}: var(--db-current-${cssProp}, #{$${hoverColor}});
    			${primaryColor ? getRBGA(primaryColor, 'hover') : ''}
			}`;
	return `
		&:not(:disabled) {
			${noHover ? '' : hoverState}
			${noActive ? '' : activeState}
        }
        `;
};

/**
 * Backgrounds have more than one variant with the same color for text (on-color)
 * e.g. neutral with variants 1-6 or transparent-full or transparent-semi
 */

const generateBGVariants = (
	value,
	variant,
	currentColorObject,
	baseColorObject,
	primaryColor
) => {
	const placeholderName = `${prefix}-bg-${value}${
		variant ? `-${variant}` : ''
	}`;
	try {
		const bgColor = `${prefix}-${currentColorObject.enabled.name}`;
		const fgColor = `${prefix}-${baseColorObject.enabled.name}`;
		let weakFgColor;
		if (baseColorObject.weak) {
			weakFgColor = `${prefix}-${baseColorObject.weak.enabled.name}`;
		}

		let elementColor;
		if (primaryColor.element) {
			elementColor = `${prefix}-${primaryColor.element.enabled.name}`;
		}

		let borderColor;
		if (primaryColor.border) {
			borderColor = `${prefix}-${primaryColor.border.enabled.name}`;
		}

		let result = `
%${placeholderName}-hover-state {
	${generateInteractiveVariants(
		currentColorObject,
		'background-color',
		primaryColor,
		true
	)}
}
%${placeholderName}-active-state {
	${generateInteractiveVariants(
		currentColorObject,
		'background-color',
		primaryColor,
		false,
		true
	)}
}

%${placeholderName} {
    --db-current-background-color: var(--${bgColor}, #{$${bgColor}});
    --db-current-color: var(--${fgColor}, #{$${fgColor}});
    ${
		elementColor
			? `--db-current-element-color: var(--${elementColor}, #{$${elementColor}});`
			: ''
	}
    ${
		borderColor
			? `--db-current-border-color: var(--${borderColor}, #{$${borderColor}});`
			: ''
	}
    background-color: var(--db-current-background-color, #{$${bgColor}});
    color: var(--db-current-color, #{$${fgColor}});
    ${baseColorObject ? getRBGA(primaryColor, 'enabled') : ''}
    ${
		currentColorObject === primaryColor
			? `--db-current-background-color-alpha: 1;`
			: ''
	}

    &-ia, &[data-variant="ia"] {
		@extend %${placeholderName};
		@extend %${placeholderName}-hover-state;
		@extend %${placeholderName}-active-state;
    }

    button {
		@extend %${placeholderName}-hover-state;
		@extend %${placeholderName}-active-state;
    }

    a {
       ${generateInteractiveVariants(baseColorObject, 'color')}
    }
`;
		if (weakFgColor) {
			result += `
    %weak {
        color: var(--${weakFgColor}, #{$${weakFgColor}});

		a {
		   ${generateInteractiveVariants(baseColorObject.weak, 'color')}
		}
    }
`;
		}

		result += `}
	`;
		return result;
	} catch (error) {
		console.error(`Error for ${placeholderName}`);
		console.error(error);
		return '';
	}
};

/**
 * Generates color utility classes and scss placeholders for non-interactive and interactive variants
 * of color combination (background-color and color) based on definitions made by DB UI v3
 *
 * @param {*} colorToken scss transform obj generated by styleDictionary
 * @returns scss string
 */
exports.generateColorUtilitityPlaceholder = (colorToken) => {
	let output = fileHeader;

	for (const [, value] of Object.keys(colorToken).entries()) {
		// Text colors with interactive variant, e.g. primary
		if (colorToken[value].enabled) {
			// Text & elements & border
			output += `
%${prefix}-${value}-text-ia {
	color: $${prefix}-${colorToken[value].enabled.name};
${generateInteractiveVariants(colorToken[value], 'color')}
}

%${prefix}-${value}-element-ia {
	color: $${prefix}-${colorToken[value].element.enabled.name};
${generateInteractiveVariants(colorToken[value].element, 'color')}
}

%${prefix}-${value}-border-ia {
	color: $${prefix}-${colorToken[value].border.enabled.name};
${generateInteractiveVariants(colorToken[value].border, 'color')}
}

%${prefix}-${value}-component-ia {
	background-color: $${prefix}-${colorToken[value].enabled.name};
	color: $${prefix}-${colorToken[value].on.enabled.name};
${generateInteractiveVariants(colorToken[value], 'background-color')}
}

%${prefix}-${value}-component {
	background-color: $${prefix}-${colorToken[value].enabled.name};
	color: $${prefix}-${colorToken[value].on.enabled.name};
}
`;
		}

		if (value === 'neutral') {
			// Neutral has multiple default tones
			const neutralTones = ['0', '1', '2', '3', '4'];
			for (const neutralTone of neutralTones) {
				output += generateBGVariants(
					value,
					neutralTone,
					colorToken[value].bg[neutralTone],
					colorToken[value].on.bg,
					colorToken[value]
				);
			}
		} else {
			// Default text and background colors (former 'light' tone)
			output += generateBGVariants(
				value,
				undefined,
				colorToken[value].bg,
				colorToken[value].on.bg,
				colorToken[value]
			);
		}

		// Transparent tones
		const transparentTones = ['full', 'semi'];
		for (const transparentTone of transparentTones) {
			output += generateBGVariants(
				value,
				`transparent-${transparentTone}`,
				colorToken[value].bg.transparent[transparentTone],
				colorToken[value].on.bg,
				colorToken[value]
			);
		}
	}

	return output;
};
