import React from "react";
import Baobab from "baobab";
import {root} from 'baobab-react/higher-order';
import "fixed-data-table/dist/fixed-data-table.css";

import "../style/style.css";
import App from "./components/App-react";
import {
	searchForTerm,
	retrieveGoodEndpointData
} from "./utils/communicationUtilities";
import {FILTER_TERM_CHANGED} from "./constants/searchListConstants";

const stateTree = new Baobab({
	currentSearchResults: [], // Current search results. Array<Results>
	searchFilterTerm: "", // What the user has typed into the search filter. string
	searchHistory: {} // Search results cached here. term: string -> Array<Results> | Promise<Array<Results>>
});
const BaobabComposedApp = root(App, stateTree);
const searchFilterTermCursor = stateTree.select("searchFilterTerm");

// Fire off the initial good end point retrieval.
retrieveGoodEndpointData(stateTree);

searchFilterTermCursor.on(FILTER_TERM_CHANGED, ({data, target}) => {
	target.set(data);
	// When the user changes the search filter search with the new term.
	searchForTerm(data, stateTree)
});

React.render(<BaobabComposedApp />, document.body);
