import {
	ClickEventProps,
	ClickEventState,
	DefaultVariantProps,
	GlobalProps,
	GlobalState,
	IconProps,
	IconState,
	LinkProps
} from '../../shared/model';

export interface DBAlertDefaultProps {
	closeButtonText?: string;
	headline?: string;
	text?: string;
	link?: LinkProps;
	type?: 'alert' | 'inline';
	slotLink?: any;
	variant?: DefaultVariantProps;
}

export type DBAlertProps = DBAlertDefaultProps &
	GlobalProps &
	ClickEventProps &
	IconProps;

export interface DBAlertDefaultState {
	getIcon: (icon?: string, variant?: DefaultVariantProps) => string;
}

export type DBAlertState = DBAlertDefaultState &
	GlobalState &
	ClickEventState &
	IconState;
