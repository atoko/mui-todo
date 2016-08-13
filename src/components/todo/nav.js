import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import AppBar from "material-ui/AppBar";

export default class TodoNav extends Component {
	render() {
		return <AppBar
		title="mui-todo"
		iconElementLeft={ <span></span> }
		iconElementRight={
			<IconButton onClick={this.props.onAdd}>
				<ContentAdd/>
			</IconButton>
		}
		/>;
	}
}