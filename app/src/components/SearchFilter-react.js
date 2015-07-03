import React, {Component} from "react";

export default class SearchFilter extends Component {
	render() {
		return <input onChange={this._onFilterChange} placeholder='Filter...' />;
	}

	_onFilterChange(e) {
		console.log(e.target.value);
	}
}
