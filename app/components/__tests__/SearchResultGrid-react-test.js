import {equal} from "assert";

import {
	it,
	describe
} from "mocha";
import {Children} from "react";

import {SearchResultGrid} from "../SearchResultGrid-react";

import {createComponent} from "./test-utils";

describe("SearchResultGrid", () => {
	const currentSearchResults = [{
		name: "name",
		superpower: "power",
		/*eslint-disable camelcase*/
		end_of_an_era: "end_of_an_era"
		/*eslint-enable camelcase*/
	}];
	const columnLabels = ["Name", "Superpower", "End of Era"];

	it("renders a grid for search results.", () => {
		// Given.
		const searchResultGridOutput = createComponent(SearchResultGrid, {
			currentSearchResults
		});

		// Then.
		equal("FixedDataTable", searchResultGridOutput.type.displayName);
	});

	it("renders three grid columns with correct column labels.", () => {
		// Given.
		const searchResultGridOutput = createComponent(SearchResultGrid, {
			currentSearchResults
		});

		// Then - verify that the render output is a table with 3 children.
		Children.forEach(searchResultGridOutput.props.children, (fixedDataTableColumn, index) => {
			// Verify the column labels are correct.
			equal(columnLabels[index], fixedDataTableColumn.props.label);
			// Verify the table children are table columns.
			equal("FixedDataTableColumn", fixedDataTableColumn.type.displayName);
		});
	});

	it("has grid column renderers that capitalize their data.", () => {
		// Given.
		const searchResultGridOutput = createComponent(SearchResultGrid, {
			currentSearchResults
		});

		// Then.
		Children.forEach(searchResultGridOutput.props.children, (fixedDataTableColumn) => {
			// Verify the data is displayed in capitals.
			equal("ZEUS", fixedDataTableColumn.props.cellRenderer("zeus"));
		});
	});
});
