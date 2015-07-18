import React, {Component} from "react";
import {
	Table,
	Column
} from "fixed-data-table";
import {cursors} from "baobab-react/prop-types";
import {branch} from "baobab-react/higher-order";

class SearchResultGrid extends Component {
	render() {
		// https://github.com/eslint/eslint/issues/1897
		/*eslint-disable func-style */
		const cellRenderer = cellData => cellData.toUpperCase();
		const rowGetter = rowIndex => this.props.currentSearchResults[rowIndex];
		/*eslint-enable func-style */

		return <Table
			rowHeight={50}
			rowGetter={rowGetter}
			rowsCount={this.props.currentSearchResults.length}
			width={550}
			height={300}
			headerHeight={50}>
				<Column
					dataKey="name"
					label="Name"
					width={100}
					cellRenderer={cellRenderer}
					/>
				<Column
					dataKey="superpower"
					label="Superpower"
					width={150}
					cellRenderer={cellRenderer}
					/>
				<Column
					dataKey="end_of_an_era"
					label="End of Era"
					width={250}
					cellRenderer={cellRenderer}
					/>
			</Table>;
	}
}

SearchResultGrid.contextTypes = {
	cursors
};

export default branch(SearchResultGrid, {
	cursors: {
		currentSearchResults: ["currentSearchResults"]
	}
});

export {SearchResultGrid};
