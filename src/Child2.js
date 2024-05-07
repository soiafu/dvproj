import React,{Component} from "react";
import * as d3 from "d3";


class Child2 extends Component{
  constructor(props){
    super(props)
    this.state = {
      selectedCategory: 'A'
    };
  }
  componentDidMount(){
    console.log(this.props.data);
  }
  handleTargetChange = (event) => {
    this.setState({ selectedCategory: event.target.value });
  };
  componentDidUpdate(){
    // x v y

    console.log("ComponentDidUpdate",this.props.data);
    var data =this.props.data;
    var selectedTarget = this.props.selectedTarget;
    var selectedCategory = this.state.selectedCategory;

    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;
    
    var container = d3.select(".child2_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_2")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X axis
    var x_data = data.map(item=>item.x)
    
    const x_scale = d3
      .scaleLinear()
      .domain([0,d3.max(x_data)])
      .range([margin.left, w]);
    
    

    container
      .selectAll(".x_axis_g")
      .data([0])
      .join('g')
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    // Add Y axis
    var y_data = data.map(item=>item.y);
    const y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(y_data)])
      .range([h, 0]);
    container
    .selectAll(".y_axis_g")
    .data([0])
    .join("g")
    .attr("class", "x_axis_g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_scale));

    container
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", function (d) {
        return x_scale(d.x);
      })
      .attr("cy", function (d) {
        return y_scale(d.y);
      })
      .attr("r",3)
      .style("fill", "#69b3a2");
  }
  render() {
    //const categories = ['A', 'B', 'C'];

    return (

      <div>
        <div>
            <label categories>
                <select>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
              </select>              
            </label>
          
        </div>
        <svg className="child2_svg">
          <g className="g_2"></g>
        </svg>
      </div>
    );
  }
}

export default Child2;