import React, {Component} from "react";
import {
	Table,
	Column
} from "fixed-data-table";
import PropTypes from "baobab-react/prop-types";
import {branch} from "baobab-react/higher-order";

class SearchResultGrid extends Component {
	render() {
		const rowGetter = (rowIndex) => this.props.currentSearchResults[rowIndex];

		return <Table
			rowHeight={50}
			rowGetter={rowGetter}
			rowsCount={this.props.currentSearchResults.length}
			width={450}
			height={300}
			headerHeight={50}>
				<Column
					dataKey="name"
					label="Name"
					width={100}
					/>
				<Column
					dataKey="superpower"
					label="Superpower"
					width={100}
					/>
				<Column
					dataKey="end_of_an_era"
					label="End of Era"
					width={250}
					/>
			</Table>;
	}
}

SearchResultGrid.contextTypes = {
	cursors: PropTypes.cursors
};

export default branch(SearchResultGrid, {
	cursors: {
		currentSearchResults: ["currentSearchResults"]
	}
});