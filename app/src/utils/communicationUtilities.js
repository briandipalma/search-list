import "whatwg-fetch";
import {ERROR_MESSAGE_RECEIVED} from "../constants/searchListConstants";

const GOOD_ENDPOINT = "https://athena-7.herokuapp.com/ancients.json";
const SEARCH_ENDPOINT = `${GOOD_ENDPOINT}?search=`;
const ERROR_ENDPOINT = `${GOOD_ENDPOINT}?error=true`;

export function searchForTerm(term, tree) {
	// We don't want to search for a previously searched for term.
	const cachedTermSearch = tree.get("searchHistory", term);

	// Check if the value is an Array.
	if (Array.isArray(cachedTermSearch)) {
		// If the value is an Array then set `currentSearchResults` to the Array.
		tree.set("currentSearchResults", cachedTermSearch);
	} else if (cachedTermSearch === undefined) {
		// If there isn't a `cachedTermSearch` fetch the data
		fetchTerm(`${SEARCH_ENDPOINT}${term}`, term, tree);
	}
	// Else the value is a Promise of the eventual value Promise<Array<Results>> so don't fetch.
}

export function retrieveGoodEndpointData(tree) {
	fetchTerm(GOOD_ENDPOINT, "", tree);
}

export function retreiveErrorEndpointMessage(tree) {
	fetch(ERROR_ENDPOINT)
		.then(response => response.json())
		.then(json => tree.emit(ERROR_MESSAGE_RECEIVED, json.error));
}

function fetchTerm(url, term, tree) {
	// Fetch the search term.
	const termSearchPromise = fetch(url)
		.then(response => response.json())
		.then(json => responseJSONExtracted(term, tree, json));

	// Store the Promise in "searchHistory".
	tree.set(["searchHistory", term], termSearchPromise);
	// And set `currentSearchResults` to [].
	tree.set("currentSearchResults", []);
}

function responseJSONExtracted(term, tree, response) {
	// The response from a search is inside an `ancients` property.
	response = response.ancients ? response.ancients : response;
	// Store the response data into `searchHistory term`
	tree.set(["searchHistory", term], response);

	// If the term is the same as `searchFilterTerm`
	if (term === tree.get("searchFilterTerm")) {
		// then set `currentSearchResults` to response data.
		tree.set("currentSearchResults", response);
	}
}
