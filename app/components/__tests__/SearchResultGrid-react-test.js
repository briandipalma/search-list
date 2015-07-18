import {equal} from "assert";

import {
	it,
	describe
} from "mocha";

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

	it("renders three grid columns with correct column labels.", () => {
		// Given.
		const searchResultGridOutput = createComponent(SearchResultGrid, {
			currentSearchResults
		});

		// Then - verify that the render output is a table with 3 children.
		equal(3, searchResultGridOutput.props.children.length);
		equal("FixedDataTable", searchResultGridOutput.type.displayName);

		const firstChild = searchResultGridOutput.props.children[0];
		const secondChild = searchResultGridOutput.props.children[1];
		const thirdChild = searchResultGridOutput.props.children[2];

		// Verify the column labels are correct.
		equal("Name", firstChild.props.label);
		equal("Superpower", secondChild.props.label);
		equal("End of Era", thirdChild.props.label);

		// Verify the table children are table columns.
		equal("FixedDataTableColumn", firstChild.type.displayName);
		equal("FixedDataTableColumn", secondChild.type.displayName);
		equal("FixedDataTableColumn", thirdChild.type.displayName);
	});

	it("has grid column renderers that capitalize their data.", () => {
		// Given.
		const searchResultGridOutput = createComponent(SearchResultGrid, {
			currentSearchResults
		});

		const firstChild = searchResultGridOutput.props.children[0];
		const secondChild = searchResultGridOutput.props.children[1];
		const thirdChild = searchResultGridOutput.props.children[2];

		// Verify the data is displayed in capitals.
		equal("ZEUS", firstChild.props.cellRenderer("zeus"));
		equal("ZEUS", secondChild.props.cellRenderer("zeus"));
		equal("ZEUS", thirdChild.props.cellRenderer("zeus"));
	});
});
