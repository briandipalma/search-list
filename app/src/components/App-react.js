import React, {Component} from "react";

import ErrorModal from "./ErrorModal-react";
import ErrorButton from "./ErrorButton-react";
import SearchFilter from "./SearchFilter-react";
import SearchResultGrid from "./SearchResultGrid-react";

export default class App extends Component {
	render() {
		return <div>
			<ErrorModal />
			<SearchFilter />
			<ErrorButton />
			<br />
			<SearchResultGrid />
		</div>;
	}
}
