import React, { Component } from "react";
import Cardlist from "./Cardlist";
import Searchbox from "./Searchbox";
import Scroll from "./Scroll"
import ErrorBoundry from "./ErrorBoundry"
import { robots } from "./robots.js";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ""
    };
  }

  componentDidMount() {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then(response => {
        return response.json();
      })
      .then(users => {
        this.setState({ robots: robots });
      });
  }

  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const filteredRobots = this.state.robots.filter(robots => {
      return robots.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });
    if (this.state.robots.length === 0) {
      return <h1>LOADING...</h1>
    } else {
      return (
        <div className="tc">
          <h1 className="f-headline lh-solid"> RoboFriends </h1>
          <Searchbox searchChange={this.onSearchChange} />
          <Scroll>
          <ErrorBoundry>
          <Cardlist robots={filteredRobots} />
          </ErrorBoundry>
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
