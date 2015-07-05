import Modal from "boron/DropModal";
import React, {Component} from "react";
import PropTypes from "baobab-react/prop-types";
import {branch} from "baobab-react/higher-order";

import {ERROR_MODAL_CLOSED} from "../constants/searchListConstants";

class ErrorModal extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.errorModalDisplayed) {
			this.refs.modal.show();
		} else {
			this.refs.modal.hide();
		}
	}

	render() {
		const closeModal = () => this.context.cursors.errorModalDisplayed.emit(ERROR_MODAL_CLOSED);

		return <Modal ref="modal">
			<h2>{this.props.errorMessage}</h2>
			<button onClick={closeModal}>Close</button>
		</Modal>;
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
