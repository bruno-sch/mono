export type NavigationItem = {
	label: string;
	name?: string;
	path?: string;
	subNavigation?: NavigationItem[];
};

const componentChildren: NavigationItem[] = [
	{
		label: 'Router usage',
		path: '/components/router-usage'
	},
	{
		label: 'Action',
		path: '/components/action',
		subNavigation: [
			{
				label: 'DBButton',
				name: 'button'
			},
			{
				label: 'DBLink',
				name: 'link'
			}
		]
	},
	{
		label: 'Data-Display',
		path: '/components/data-display',
		subNavigation: [
			{
				label: 'DBBrand',
				name: 'brand'
			} /* TODO: Uncomment this if dev and design is aligned
			{
				label: 'DBIcon',
				name: 'icon'
			}, */,
			{
				label: 'DBTooltip',
				name: 'tooltip'
			},
			{
				label: 'DBInfotext',
				name: 'infotext'
			},
			{
				label: 'DBTag',
				name: 'tag'
			},
			{
				label: 'DBAccordion',
				name: 'accordion'
			},
			{
				label: 'DBAccordionItem',
				name: 'accordion-item'
			},
			{
				label: 'DBTabs',
				name: 'tabs'
			},

			{
				label: 'DBTab',
				name: 'tab'
			}
		]
	},
	{
		label: 'Data-Input',
		path: '/components/data-input',
		subNavigation: [
			{
				label: 'DBCheckbox',
				name: 'checkbox'
			},
			{
				label: 'DBInput',
				name: 'input'
			},
			{
				label: 'DBRadio',
				name: 'radio'
			},
			{
				label: 'DBSelect',
				name: 'select'
			},
			{
				label: 'DBTextarea',
				name: 'textarea'
			}
		]
	},
	{
		label: 'Feedback',
		path: '/components/feedback',
		subNavigation: [
			{
				label: 'DBAlert',
				name: 'alert'
			},
			{
				label: 'DBBadge',
				name: 'badge'
			}
		]
	},
	{
		label: 'Layout',
		path: '/components/layout',
		subNavigation: [
			{
				label: 'DBCard',
				name: 'card'
			},
			{
				label: 'DBDivider',
				name: 'divider'
			},
			{
				label: 'DBDrawer',
				name: 'drawer'
			},
			{
				label: 'DBHeader',
				name: 'header'
			} /* TODO: Uncomment this if dev and design is aligned
			{
				label: 'DBPage',
				name: 'page'
			}, */,
			{
				label: 'DBSection',
				name: 'section'
			}
		]
	},
	{
		label: 'Navigation',
		path: '/components/navigation',
		subNavigation: [
			{
				label: 'DBMainNavigation',
				name: 'main-navigation'
			},
			{
				label: 'DBNavigationItem',
				name: 'navigation-item'
			}
		]
	},
	{
		label: 'Utilities',
		path: '/components/utilities',
		subNavigation: [
			{
				label: 'DBPopover',
				name: 'popover'
			}
		]
	}
];
export const ROUTES: NavigationItem[] = [
	{
		label: 'Home',
		path: '/'
	},
	{
		label: 'Foundations',
		path: '/foundations',
		subNavigation: [
			{ label: 'Readme', path: '/foundations/readme' },
			{
				label: 'Colors',
				path: '/foundations/colors',
				subNavigation: [
					{ label: 'Readme', path: '/foundations/colors/readme' },
					{ label: 'Overview', path: '/foundations/colors/overview' },
					{
						label: 'Color Schemes',
						path: '/foundations/colors/color-schemes'
					}
				]
			},
			{
				label: 'Font Sizes',
				path: '/foundations/font-sizes',
				subNavigation: [
					{ label: 'Readme', path: '/foundations/font-sizes/readme' },
					{
						label: 'Overview',
						path: '/foundations/font-sizes/overview'
					}
				]
			},
			{
				label: 'Icons',
				path: '/foundations/icons',
				subNavigation: [
					{ label: 'Readme', path: '/foundations/icons/readme' },
					{
						label: 'Custom Icons',
						path: '/foundations/icons/custom-icons'
					},
					{ label: 'Overview', path: '/foundations/icons/overview' }
				]
			},
			{
				label: 'Tonalities',
				path: '/foundations/tonalities',
				subNavigation: [
					{ label: 'Readme', path: '/foundations/tonalities/readme' },
					{
						label: 'Examples',
						path: '/foundations/tonalities/examples'
					}
				]
			},
			{
				label: 'Variables',
				path: '/foundations/variables',
				subNavigation: [
					{ label: 'Readme', path: '/foundations/variables/readme' },
					{
						label: 'Examples',
						path: '/foundations/variables/examples'
					}
				]
			}
		]
	},
	{
		label: 'Components',
		path: '/components',
		subNavigation: [
			{ label: 'Readme', path: '/components/readme' },
			...componentChildren.map((category) => ({
				...category,
				subNavigation: category?.subNavigation?.map((component) => ({
					label: component.label,
					path: `/components/${component.name}`,
					subNavigation: [
						{
							label: 'Overview',
							path: `/components/${component.name}/overview`
						},
						{
							label: 'Properties',
							path: `/components/${component.name}/properties`
						},
						{
							label: 'How to use',
							path: `/components/${component.name}/how-to-use`
						},
						{
							label: 'Migration',
							path: `/components/${component.name}/migration`
						}
					]
				}))
			}))
		]
	}
];
