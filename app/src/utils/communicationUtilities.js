const GOOD_ENDPOINT = "https://athena-7.herokuapp.com/ancients.json";
const SEARCH_ENDPOINT = GOOD_ENDPOINT + "?search=";

export function searchForTerm(term, tree) {
	// You don't want to search for a previously searched for term.
	const cachedTermSearch = tree.get("searchHistory", term);

	// If there is a value in the `searchHistory` for the term
	if (cachedTermSearch) {
		// Check if the value is an Array.
		if (Array.isArray(cachedTermSearch)) {
			// If the value is an Array then set `currentSearchResults` to the Array.
			tree.set("currentSearchResults", cachedTermSearch);
		}
		// Else the value is a Promise of the eventual value Promise<Array<Results>> so don't fetch.
	} else {
	// If there isn't
		fetchTerm(`${SEARCH_ENDPOINT}${term}`, term, tree);
	}
}

export function retrieveGoodEndpointData(tree) {
	fetchTerm(GOOD_ENDPOINT, "", tree);
}

function fetchTerm(url, term, tree) {
	// Fetch the search term.
	const termSearchPromise = fetch(url)
		.then((response) => endpointResponded(term, tree, response));

	// Store the Promise in "searchHistory".
	tree.set(["searchHistory", term], termSearchPromise);
	// And set `currentSearchResults` to [].
	tree.set("currentSearchResults", []);
}

function endpointResponded(term, tree, response) {
	response
		.json()
		.then((json) => responseJSONExtracted(term, tree, json));
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
