import React, {Component} from "react";
import {
	Table,
	Column
} from "fixed-data-table";

export default class SearchResultGrid extends Component {
	componentWillMount() {
		const currentSearchResultsCursor = this.props.tree.select('currentSearchResults');

		this.setState({currentSearchResults: currentSearchResultsCursor.get()});

		currentSearchResultsCursor
			.on("update", () => this.setState({currentSearchResults: currentSearchResultsCursor.get()}));
	}

	render() {
		const rowGetter = (rowIndex) => this.state.currentSearchResults[rowIndex];

		return <Table
			rowHeight={50}
			rowGetter={rowGetter}
			rowsCount={this.state.currentSearchResults.length}
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
