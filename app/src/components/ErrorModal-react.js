import React, {Component} from "react";
import PropTypes from "baobab-react/prop-types";
import {branch} from "baobab-react/higher-order";
import Portal from "react-portal";

import {ERROR_MODAL_CLOSED} from "../constants/searchListConstants";

const modalShieldStyles = {
	top: 0,
	zIndex: 1,
	width: "100%",
	height: "100%",
	position: "absolute",
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "rgba(55,58,71,0.9)"
};

const modalStyles = {
	width: "50%",
	margin: "0 auto",
	backgroundColor: "#ffffff"
};

const modalMessageStyles = {
	textAlign: "center"
};

const modalButtonStyles = {
	float: "right",
	margin: "10px"
};

class ErrorModal extends Component {
	render() {
		// https://github.com/eslint/eslint/issues/1897
		/*eslint-disable func-style */
		const closeModal = () => this.context.cursors.errorModalDisplayed.emit(ERROR_MODAL_CLOSED);
		/*eslint-enable func-style */

		return <Portal style={modalShieldStyles} isOpened={this.props.errorModalDisplayed}>
			<div style={modalStyles}>
				<h2 style={modalMessageStyles}>{this.props.errorMessage}</h2>
				<button style={modalButtonStyles} onClick={closeModal}>Close</button>
			</div>
		</Portal>;
	}
}

ErrorModal.contextTypes = {
	cursors: PropTypes.cursors
};

export default branch(ErrorModal, {
	cursors: {
		errorMessage: ["errorMessage"],
		errorModalDisplayed: ["errorModalDisplayed"]
	}
});
