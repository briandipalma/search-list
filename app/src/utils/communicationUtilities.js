const GOOD_ENDPOINT = "https://athena-7.herokuapp.com/ancients.json";
const SEARCH_ENDPOINT = GOOD_ENDPOINT + "?search=";

export function searchForTerm(term, tree) {
	// You don't want to search for a previously searched for term.
	const cachedTermSearch = tree.get(`searchHistory ${term}`);

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
		// then fetch the search term and store the Promise in `searchHistory`
		const termSearchPromise = fetch(`${SEARCH_ENDPOINT}${term}`)
			.then((response) => endpointResponded(term, tree, response));

		tree.set(`searchHistory ${term}`, termSearchPromise);
		// and set `currentSearchResults` to [].
		tree.set("currentSearchResults", []);
	}
}

export function retrieveGoodEndpointData(tree) {
	const goodEndpointPromise = fetch(`${GOOD_ENDPOINT}`)
		.then((response) => endpointResponded("", tree, response));

	tree.set(`searchHistory  `, goodEndpointPromise);
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
	tree.set(`searchHistory ${term}`, response);

	// If the term is the same as `searchFilterTerm`
	if (term === tree.get("searchFilterTerm")) {
		// then set `currentSearchResults` to response data.
		tree.set("currentSearchResults", response);
	}
}
