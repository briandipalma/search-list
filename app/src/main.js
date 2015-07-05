import React from "react";
import Baobab from "baobab";
import {root} from "baobab-react/higher-order";
import "fixed-data-table/dist/fixed-data-table.css";

import "../style/style.css";
import App from "./components/App-react";
import {
	searchForTerm,
	retrieveGoodEndpointData,
	retreiveErrorEndpointMessage
} from "./utils/communicationUtilities";
import {
	FILTER_TERM_CHANGED,
	ERROR_MODAL_CLOSED,
	ERROR_MESSAGE_RECEIVED,
	ERROR_MESSAGE_REQUESTED
} from "./constants/searchListConstants";

const stateTree = new Baobab({
	currentSearchResults: [], // Current search results. Array<Results>
	searchFilterTerm: "", // What the user has typed into the search filter. string
	searchHistory: {}, // Search results cached here. term: string -> Array<Results> | Promise<Array<Results>>
	errorMessage: "ERROR_MESSAGE", // Error message to display. string
	errorModalDisplayed: false
});
const BaobabComposedApp = root(App, stateTree);
const searchFilterTermCursor = stateTree.select("searchFilterTerm");

// Fire off the initial good end point retrieval.
retrieveGoodEndpointData(stateTree);

searchFilterTermCursor.on(FILTER_TERM_CHANGED, ({data, target}) => {
	target.set(data);
	// When the user changes the search filter search with the new term.
	searchForTerm(data, stateTree);
});

stateTree.on(ERROR_MESSAGE_REQUESTED, () => {
	// If the error message hasn't already been requested then request it.
	if (stateTree.get("errorMessage") === "ERROR_MESSAGE") {
		stateTree.set("errorMessage", "ERROR_MESSAGE_PENDING");
		retreiveErrorEndpointMessage(stateTree);
	} else if (stateTree.get("errorMessage") !== "ERROR_MESSAGE_PENDING") {
		// Else if it has been requested and we have received the error message set "errorModalDisplayed" to true.
		stateTree.set("errorModalDisplayed", true);
	}
});

stateTree.on(ERROR_MESSAGE_RECEIVED, ({data}) => {
	stateTree.set("errorMessage", data);
	stateTree.set("errorModalDisplayed", true);
});

stateTree.select("errorModalDisplayed").on(ERROR_MODAL_CLOSED, () => stateTree.set("errorModalDisplayed", false));

React.render(<BaobabComposedApp />, document.body);
