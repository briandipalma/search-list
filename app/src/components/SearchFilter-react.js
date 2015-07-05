import React, {Component} from "react";
import PropTypes from "baobab-react/prop-types";
import {branch} from "baobab-react/higher-order";

import {FILTER_TERM_CHANGED} from "../constants/searchListConstants";

class SearchFilter extends Component {
	render() {
		const onFilterChanged = ({target: {value}}) =>
			this.context.cursors.searchFilterTerm.emit(FILTER_TERM_CHANGED, value);

		return <input
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