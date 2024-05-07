import React, { Component } from "react";
import "./App.css";
import Child1 from "./Child1";
import Child2 from "./Child2";
import * as d3 from "d3";
import SampleDataset from "./SampleDataset.csv";



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      columns: [], // Initialize columns array
      selectedTarget: "A",
      selectedVariables: null, // Initialize selectedVariables
    };
  }
  componentDidMount(){
    var self=this
    d3.csv(SampleDataset,function(d){
      return {
        x:parseFloat(d.x),
        y:parseFloat(d.y),
        category:d.category
      }
    }).then(function(csv_data){
      self.setState({data:csv_data})
      //console.log(csv_data)
    })
    .catch(function(err){
      console.log(err)
    })

  }

  handleTargetChange = (event) => {
    const selectedTarget = event.target.value;
    this.setState({ selectedTarget });
  };

  handleCellClick = (selectedVariables) => {
    this.setState({ selectedVariables });
  };
  
  render(){
    return <div className="parent">
      <div className="child1"><Child1 data={this.state.data}></Child1></div>

      <div className="child2"><Child2 
      data={this.state.data}
      selectedTarget={this.state.selectedTarget}
      onCellClick={this.handleCellClick}
      ></Child2></div>
      
      </div>;
  }
}

export default App;
