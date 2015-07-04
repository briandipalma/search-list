import React, {Component} from "react";

export default class SearchFilter extends Component {
	render() {
		return <input onChange={this._onFilterChange.bind(this)} placeholder='Enter filter term...' />;
	}

	_onFilterChange(e) {
		this.props.onChange(e.target.value);
	}
}
