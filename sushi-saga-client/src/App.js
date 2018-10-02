import React, { Component } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint!
const API = "http://localhost:3000/sushis";

class App extends Component {
  constructor() {
    super();
    this.state = {
      sushis: [],
      eatenSushi: [],
      moneyRemaining: 100
    };
  }

  componentDidMount() {
    fetch(API)
      .then(res => res.json())
      .then(data => this.setState({ sushis: data }));
  }

  displaySushi() {
    return this.state.sushis.slice(0, 4);
  }

  moreSushi = () => {
    this.setState({ sushis: this.state.sushis.slice(4) });
    //slice - returns section of array
  };

  eatSushi = sushi => {
    if (
      !this.state.eatenSushi.includes(sushi) &&
      this.state.moneyRemaining >= sushi.price
    ) {
      this.setState({
        eatenSushi: [...this.state.eatenSushi, sushi],
        moneyRemaining: this.state.moneyRemaining - sushi.price
      });
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="app">
        <SushiContainer
          sushis={this.displaySushi()}
          moreSushi={this.moreSushi}
          eatSushi={this.eatSushi}
          eatenSushi={this.state.eatenSushi}
        />
        <Table
          eatenSushi={this.state.eatenSushi}
          moneyRemaining={this.state.moneyRemaining}
        />
      </div>
    );
  }
}

export default App;
