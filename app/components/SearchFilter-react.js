import React, {Component} from "react";
import {
	baobab,
	cursors
} from "baobab-react/prop-types";
import {branch} from "baobab-react/higher-order";

import {filterTermChanged} from "../actionhandlers/searchListActionHandlers";

const filterStyles = {
	marginRight: "10px",
	marginBottom: "10px"
};

class SearchFilter extends Component {
	render() {
		// https://github.com/eslint/eslint/issues/1897
		/*eslint-disable func-style */
		const onFilterChanged = ({target: {value}}) =>
			filterTermChanged(value, this.context.cursors.searchFilterTerm, this.context.tree);
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
	cursors,
	tree: baobab
};

export default branch(SearchFilter, {
	cursors: {
		searchFilterTerm: ["searchFilterTerm"]
	}
});
