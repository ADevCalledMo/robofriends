import React, { Component } from "react";
import Cardlist from "./Cardlist";
import Searchbox from "./Searchbox";
import Scroll from "./Scroll";
import ErrorBoundry from "./ErrorBoundry";
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
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        return response.json();
      })
      .then(users => {
        this.setState({ robots: users });
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
      return <h1>LOADING...</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f1 lh-title pa4-l pa3-m pa2"> RoboFriends </h1>
          <Searchbox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <Cardlist robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
          <footer class="pv4 ph3 ph5-m ph6-l mid-gray">
            <small class="f4 db tc">
            <b class="ttu">Mozes Walker</b> 2020 
            </small>
          </footer>
        </div>
      );
    }
  }
}

export default App;
