import {deepEqual} from "assert";

import {
	describe,
	it
} from "mocha";
import React from "react";

import App from "../App-react";
import ErrorModal from "../ErrorModal-react";
import ErrorButton from "../ErrorButton-react";
import SearchFilter from "../SearchFilter-react";
import SearchResultGrid from "../SearchResultGrid-react";

import {createComponent} from "./test-utils";

describe("App", () => {
	it("should contain all app top level components.", () => {
		// Given.
		const appOutput = createComponent(App);

		// Then.
		deepEqual(appOutput, <div>
			<ErrorModal />
			<SearchFilter />
			<ErrorButton />
			<SearchResultGrid />
		</div>);
	});
});
