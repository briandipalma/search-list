import React, {Component} from "react";

import SearchFilter from "./SearchFilter-react";
import SearchResultGrid from "./SearchResultGrid-react";

export default class App extends Component {
	render() {
		return <div>
			<SearchFilter />
			<br />
			<SearchResultGrid />
		</div>;
	}
}
