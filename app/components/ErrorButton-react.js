import React, {Component} from "react";
import {baobab} from "baobab-react/prop-types";
import {branch} from "baobab-react/higher-order";

import {errorMessageRequested} from "../actionhandlers/searchListActionHandlers";

class ErrorButton extends Component {
	render() {
		// https://github.com/eslint/eslint/issues/1897
		/*eslint-disable func-style */
		const displayErrorMessage = () => errorMessageRequested(this.context.tree);
		/*eslint-enable func-style */

		return <button onClick={displayErrorMessage}>Click to show error.</button>;
	}
}

ErrorButton.contextTypes = {
	tree: baobab
};

export default branch(ErrorButton);
