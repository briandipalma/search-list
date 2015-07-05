import React, {Component} from "react";
import PropTypes from "baobab-react/prop-types";
import {branch} from "baobab-react/higher-order";

import {FILTER_TERM_CHANGED} from "../constants/searchListConstants";

const filterStyles = {
	marginRight: "10px",
	marginBottom: "10px"
};

class SearchFilter extends Component {
	render() {
		// https://github.com/eslint/eslint/issues/1897
		/*eslint-disable func-style */
		const onFilterChanged = ({target: {value}}) =>
			this.context.cursors.searchFilterTerm.emit(FILTER_TERM_CHANGED, value);
		/*eslint-enable func-style */

		return <input
			style={filterStyles}
			value={this.props.searchFilterTerm}
			onChange={onFilterChanged}
			placeholder='Enter filter term...'
			/>;
	}
}

SearchFilter.contextTypes = {
	cursors: PropTypes.cursors
};

export default branch(SearchFilter, {
	cursors: {
		searchFilterTerm: ["searchFilterTerm"]
	}
});
