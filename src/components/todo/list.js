import React, { Component } from "react";
import Paper from "material-ui/Paper";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from "material-ui/Toolbar";
import FontIcon from "material-ui/FontIcon";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

export default class TodoList extends Component {
	componentWillMount() {
		this.setState({ filter: 3, selectedRows: [] });
	}
	onRowSelection(selectedRows) {
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

				return null;
			});
		}
		return <Paper zDepth={1}>
			<Toolbar>
					<ToolbarGroup firstChild={false}>
					<ToolbarTitle text={items.length === 0 ?
							"No items" 
							: `${items.length - selectedCount} ${items.length - selectedCount === 1 ? "item" : "items"} left`} />
					</ToolbarGroup>
					<ToolbarGroup lastChild={true}>
					    <FontIcon className="fa fa-filter"/>
						<DropDownMenu value={this.state.filter} onChange={this.onSetFilter.bind(this)}>
							<MenuItem value={1} primaryText="Show Active" />
							<MenuItem value={2} primaryText="Show Completed" />
							<MenuItem value={3} primaryText="Show All" />
						</DropDownMenu>
						<ToolbarSeparator />

						<RaisedButton disabled={selectedCount === 0} label="Clear completed" primary={true} onClick={this.onClear.bind(this)} />
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