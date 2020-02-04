import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"


class App extends Component {
  constructor() {
    super() 
    this.state = {
      sushi: [],
      counter: 0,
      emptyPlates: [],
      budget: 100
    }
  }


// this is a life cycle method that fires when the page renders
componentDidMount() {
  fetch(API)
  .then(res=>res.json())
  .then(json => this.allSushi(json)
  )
}

allSushi = (sushis) => {
  this.setState({
    sushi: sushis.map((sushi) => ({
      ...sushi, isEaten: false}
      )
    )
  })
}

eatSushi= (clickedSushi) => {
  console.log("i wanna add a plate")
  let newSushiArray = [...this.state.sushi]
  let oldBudget= this.state.budget
  let remaining = oldBudget - clickedSushi.price
    if (remaining >= 0) {

      newSushiArray.map(sushi => {
        if (clickedSushi.id === sushi.id) {
        return clickedSushi.isEaten = true;
        }
    
      })
      let plates= this.state.emptyPlates
      plates.push(clickedSushi.id)
      this.setState({
        sushi: newSushiArray,
        emptyPlates: plates
      })
    this.setState({
      budget: remaining})
    } else {
      alert("YOU ARE BROKE STOP EATING!")
    }
  }

moreSushi= () => {
  console.log("More Sushi Click Fired")
  this.setState(previousState => {
    return {
      counter: previousState.counter +4
    }
  })
}

  render() {
    return (
      <div className="app">
        {console.log(this.state)}
        <SushiContainer eatSushi={this.eatSushi} allSushis={this.state.sushi} moreSushi={this.moreSushi} sushiCounter={this.state.counter} blankPlate={this.blankPlate}/>
        <Table emptyPlates={this.state.emptyPlates} budget={this.state.budget} eatSushi={this.eatSushi}/>
      </div>
    );
  }
}

export default App;
