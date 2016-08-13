import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";

export default class TodoInput extends Component {
	componentWillMount() {
		this.setState({ value: "" });
	}
	onAdd() {
		this.props.onAdd(this.state.value);
		this.clear();
	}
	onKeyDown(event) {
		if (event.key.toLowerCase() === "enter") {
			this.onAdd();
		}
	}
	onTextInput(_, value) {
		this.setState({ value });
	}
	clear() {
		this.setState({ value: "" });
	}
	render() {
		return <Paper zDepth={2}>
		<div className="input">
			<TextField 
			ref="input"
			onChange={this.onTextInput.bind(this)}
			onKeyDown={this.onKeyDown.bind(this)}
			floatingLabelText="What needs to be done?"
			value={this.state.value}
			fullWidth={true}		  
			/>
		</div>
      </Paper>;
	}
}