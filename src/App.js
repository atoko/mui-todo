import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { TodoNav, TodoInput, TodoList } from "./components/todo/";
import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
class App extends Component {
	componentWillMount() {
		this.setState({ todos: [] });
	}
	onAddTodo(input) {
		if (input == "") {
			return;
		}
		var todos = this.state.todos;
		var model = {
			name: input
		};
		todos.push(model);
		this.setState({...this.state, todos });
	}
	onClearTodo(selected) {
		var todos = this.state.todos;
		todos = todos.filter((seek) => {
			return selected.indexOf(seek) < 0;
		});
		this.setState({...this.state, todos });
	}
	render() {
		return <MuiThemeProvider>
    <div className="App">
      <Paper>
        <TodoNav onAdd={() => {this.refs["input"].onAdd();}}/>    
        <TodoInput onAdd={this.onAddTodo.bind(this)} ref="input"/>
        <br/>
        <TodoList onClear={this.onClearTodo.bind(this)} items={this.state.todos}/>
      </Paper>
      <footer>
        <small>created with <a href="http://www.material-ui.com/">material-ui</a></small>
        <div>
          <IconButton iconClassName="fa fa-github-alt"/>
         </div>
      </footer>
    </div>
    </MuiThemeProvider>;
	}
}
export default App;