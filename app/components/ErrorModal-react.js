import Portal from "react-portal";
import React, {Component} from "react";
import {baobab} from "baobab-react/prop-types";
import {branch} from "baobab-react/higher-order";

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
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	margin: "auto",
	width: "550px",
	maxHeight: "150px",
	position: "absolute",
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
		const closeModal = () => this.context.tree.set("errorModalDisplayed", false);
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
	tree: baobab
};

export default branch(ErrorModal, {
	cursors: {
		errorMessage: ["errorMessage"],
		errorModalDisplayed: ["errorModalDisplayed"]
	}
});
