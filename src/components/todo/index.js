import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from "material-ui/Toolbar";
export class TodoInput extends Component {
	componentWillMount() {
		this.setState({ value: "" });
	}
	onAdd() {
		this.props.onAdd(this.state.value);
		this.clear();
	}
	onKeyDown(event) {
		if (event.key.toLowerCase() == "enter") {
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
import DropDownMenu from "material-ui/DropDownMenu";
export class TodoList extends Component {
	componentWillMount() {
		this.setState({ filter: 3, selectedRows: [] });
	}
	onRowSelection(selectedRows) {
		var selected = this.props.items.filter((_, i) => selectedRows.indexOf(i) >= 0);
		this.setState({...this.state, selectedRows });
	}
	getSelected() {
		var selected = this.props.items.filter((_, i) => this.state.selectedRows.indexOf(i) >= 0);
		return selected;
	}
	onClear() {
		this.props.onClear(this.getSelected());
		this.setState({...this.state, selectedRows: [] });
	}
	onSetFilter(event, index, value) {
		this.setState({...this.state, filter: value });
	}
	render() {
		var { items } = this.props;
		var itemsView = [];
		var selectedCount = 0;
		if (items.length > 0) {
			itemsView = items.map((todo, i) => {
				var isSelected = this.state.selectedRows.indexOf(i) >= 0;
				selectedCount += isSelected ? 1 : 0;
				var render = false;
				if (this.state.filter & 2 && isSelected) {
					render = true;
				}
				if (this.state.filter & 1 && !isSelected) {
					render = true;
				}
				if (render) {
					return <TableRow selected={isSelected} key={i}>
						<TableRowColumn><TodoItem todo={todo}/></TableRowColumn>
					</TableRow>;
				}
			});
		}
		return <Paper zDepth={1}>
			<Toolbar>
					<ToolbarGroup firstChild={false}>
					<ToolbarTitle text={items.length == 0 ?
							"No items" 
							: `${items.length - selectedCount} ${items.length - selectedCount == 1 ? "item" : "items"} left`} />
						
					</ToolbarGroup>
					<ToolbarGroup lastChild={true}>
						<DropDownMenu value={this.state.filter} onChange={this.onSetFilter.bind(this)}>
							<MenuItem value={1} primaryText="Show Active" />
							<MenuItem value={2} primaryText="Show Completed" />
							<MenuItem value={3} primaryText="Show All" />
						</DropDownMenu>
						<ToolbarSeparator />

						<RaisedButton disabled={selectedCount == 0} label="Clear completed" primary={true} onClick={this.onClear.bind(this)} />
					</ToolbarGroup>
			</Toolbar>		
			<Table
				height='500px'
				multiSelectable={true}
				onRowSelection={this.onRowSelection.bind(this)}
			>
				<TableBody
					showRowHover={true}
					deselectOnClickaway={false}
				>
				{itemsView}
				</TableBody>
			</Table>
		</Paper>;
	}
}
export class TodoItem extends Component {
	render() {
		var { todo } = this.props;
		return <div>{todo.name}</div>;
	}
}
import AppBar from "material-ui/AppBar";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
export class TodoNav extends Component {
	render() {
		return <AppBar
		title = "mui-todo"
		iconElementLeft = { <span></span> }
		iconElementRight = {
			<IconButton onClick={this.props.onAdd}>
				<ContentAdd />
			</IconButton>
		}
		/>;
	}
}