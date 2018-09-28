import React, { Component } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint!
const API = "http://localhost:3000/sushis";

class App extends Component {
  state = {
    allSushis: [],
    eatenSushis: [],
    sushiIndex: 0,
    money: 1000
  };

  fetchSushis = () => {
    fetch(API)
      .then(response => response.json())
      .then(data =>
        this.setState({
          allSushis: data
        })
      );
  };

  canAffordSushi = sushi => this.state.money - sushi.price > 0;

  componentDidMount() {
    this.fetchSushis();
  }

  getSushiSet = () =>
    this.state.allSushis.slice(
      this.state.sushiIndex,
      this.state.sushiIndex + 4
    );

  getNewSushiSet = () => {
    this.setState(state => ({
      sushiIndex: (state.sushiIndex + 4) % 100
    }));
  };

  sushiEaten = sushi => this.state.eatenSushis.includes(sushi);

  sushiTransaction = sushi => {
    if (!this.state.eatenSushis.includes(sushi) && this.canAffordSushi(sushi)) {
      this.setState(state => ({
        eatenSushis: [...state.eatenSushis, sushi],
        money: state.money - sushi.price
        // this.state.eatenSushis.push(sushi),
        // this.state.money: state.money - sushi.price
      }));
    }
  };

  render() {
    // debugger;
    // console.log(this.eatenSushi({}));
    return (
      <div>
        {this.state.allSushis.length === 0 ? (
          <div>"Loading..."</div>
        ) : (
          <div className="app">
            <SushiContainer
              allSushis={this.getSushiSet()}
              sushiEaten={this.sushiEaten}
              getNewSushiSet={this.getNewSushiSet}
              sushiTransaction={this.sushiTransaction}
            />
            <Table
              money={this.state.money}
              eatenSushis={this.state.eatenSushis}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
