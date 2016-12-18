import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Overlay extends Component {

	static propTypes = {
		className: PropTypes.string,
		margin: PropTypes.number,
		position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
		trigger: PropTypes.any
	};

	static defaultProps = {
		margin: 0
	};

	state = {
		style: {}
	};

	alignToElement = () => {
		const { margin, position, trigger } = this.props;
		const overlay = this.refs.overlay;
		const triggerCoordinates = trigger.getBoundingClientRect();
		const overlayCoordinates = overlay.getBoundingClientRect();
		var top,
			left;

		const setHorizonally = () => {
			left = Math.max(0, triggerCoordinates.left + triggerCoordinates.width / 2 - overlayCoordinates.width / 2);
			let right = window.innerWidth - overlayCoordinates.width - left;
			if (right < 0) {
				left = Math.max(left, left + right);
			}
		};

		const setForTop = () => {
			top = triggerCoordinates.top - overlayCoordinates.height - margin;
			setHorizonally();
		};

		const setForBottom = () => {
			top = triggerCoordinates.top + triggerCoordinates.height + margin;
			setHorizonally();
		};

		const setVertically = () => {
			top = Math.max(0, triggerCoordinates.top + triggerCoordinates.height / 2 - overlayCoordinates.height / 2);
			let bottom = window.innerHeight - overlayCoordinates.height - top;
			if (bottom < 0) {
				top = Math.max(bottom, top + bottom);
			}
		};

		const setForLeft = () => {
			top = Math.max(0, triggerCoordinates.left + triggerCoordinates.width / 2 - overlayCoordinates.width / 2);
			setVertically();
		};

		const setForRight = () => {
			top = Math.max(0, triggerCoordinates.top + triggerCoordinates.height / 2 - overlayCoordinates.height / 2);
			setVertically();
		};

		switch (position) {
			case 'top':
				setForTop();
				if (top < 0) {
					setForBottom();
				}
				break;
			case 'bottom':
				setForBottom();
				if (top + overlayCoordinates.height + margin > window.innerHeight) {
					setForTop();
				}
				break;
			case 'left':
				setForLeft();
				if (left < 0) {
					setForRight();
				}
				break;
			case 'right':
				setForRight();
				if (left + overlayCoordinates.width + margin > window.innerWidth) {
					setForLeft();
				}
				break;
		}

		this.setState({
			style: { top, left }
		});
	};

	componentDidMount() {
		this.alignToElement();
	}
	
	render() {

		let { children, className, position, ...other } = this.props;

		className = classNames(this.props.className, {
			'overlay': true,
			['overlay-' + position]: true
		});

		let newOther = Object.assign({}, other, { margin: undefined, trigger: undefined });

		return (
			<div {...newOther} className={className} ref="overlay">
				{children}
			</div>
		);
	}
}