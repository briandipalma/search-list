import React, {Component} from "react";

import SearchFilter from "./SearchFilter-react";
import SearchResultGrid from "./SearchResultGrid-react";

export default class App extends Component {
	render() {
		return <div>
			<SearchFilter onChange={this._searchFilterChanged.bind(this)} />
			<br />
			<SearchResultGrid tree={this.props.tree} />
		</div>;
	}

	_searchFilterChanged(filterTerm) {
		this.props.tree.set('searchFilterTerm', filterTerm);
	}
}
