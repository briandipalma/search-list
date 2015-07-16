import {
	searchForTerm,
	retreiveErrorEndpointMessage
} from "../utils/communicationUtilities";

export function filterTermChanged(stateTree) {
	return ({data, target}) => {
		target.set(data);
		// When the user changes the search filter search with the new term.
		searchForTerm(data, stateTree);
	};
}

export function errorMessageRequested(stateTree) {
	return () => {
		// If the error message hasn't already been requested then request it.
		if (stateTree.get("errorMessage") === "ERROR_MESSAGE") {
			stateTree.set("errorMessage", "ERROR_MESSAGE_PENDING");
			retreiveErrorEndpointMessage(stateTree);
		} else if (stateTree.get("errorMessage") !== "ERROR_MESSAGE_PENDING") {
			// Else if it has been requested and we have received the error message set "errorModalDisplayed" to true.
			stateTree.set("errorModalDisplayed", true);
		}
	};
}

export function errorMessageReceived(stateTree) {
	return ({data}) => {
		stateTree.set("errorMessage", data);
		// We need to commit the message value for it to display correctly the first time.
		// The value does appear to be correct in the passed in props though, possible bug in Baobab HOCs?
		stateTree.commit();
		stateTree.set("errorModalDisplayed", true);
	};
}

export function errorModalClosed(stateTree) {
	return () => stateTree.set("errorModalDisplayed", false);
}
