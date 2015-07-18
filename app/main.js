import React from "react";
import Baobab from "baobab";
import {root} from "baobab-react/higher-order";
import "fixed-data-table/dist/fixed-data-table.css";

import App from "./components/App-react";
import {retrieveGoodEndpointData} from "./utils/communicationUtilities";

const stateTree = new Baobab({
	currentSearchResults: [], // Current search results. Array<Results>
	searchFilterTerm: "", // What the user has typed into the search filter. string
	searchHistory: {}, // Search results cached here. term: string -> Array<Results> | Promise<Array<Results>>
	errorMessage: "ERROR_MESSAGE", // Error message to display. string
	errorModalDisplayed: false // Is the error modal displayed. boolean.
});
const BaobabComposedApp = root(App, stateTree);

// Fire off the initial good end point retrieval.
retrieveGoodEndpointData(stateTree);

React.render(<BaobabComposedApp />, document.body);
