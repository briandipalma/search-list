import React from "react";
import Baobab from "baobab";
import "fixed-data-table/dist/fixed-data-table.css";

import "../style/style.css";
import App from "./components/App-react";
import {
	searchForTerm,
	retrieveGoodEndpointData
} from "./utils/communicationUtilities";

var stateTree = new Baobab({
	currentSearchResults: [], // Current visible search results. Array<Results>
	searchFilterTerm: "", // What the user has typed into the search filter. string
	searchHistory: {} // Search results cached here. term: string -> Array<Results> | Promise<Array<Results>>
});

// Fire off the initial good end point retrieval.
retrieveGoodEndpointData(stateTree);

const searchFilterTermCursor = stateTree.select("searchFilterTerm");
// When the user changes the search filter search with the new term.
searchFilterTermCursor.on("update", () => searchForTerm(searchFilterTermCursor.get(), stateTree));

React.render(<App tree={stateTree} />, document.body);
