import React, {Component} from "react";
import PropTypes from "baobab-react/prop-types";
import {branch} from "baobab-react/higher-order";

import {ERROR_MESSAGE_REQUESTED} from "../constants/searchListConstants";

class ErrorButton extends Component {
	render() {
		const displayErrorMessage = () => this.context.tree.emit(ERROR_MESSAGE_REQUESTED);

		return <button onClick={displayErrorMessage}>Click to show error.</button>;
	}
}

ErrorButton.contextTypes = {
	tree: PropTypes.baobab
};

export default branch(ErrorButton);
