import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.data1);
  }

  componentDidUpdate() {
    console.log("ComponentDidUpdate", this.props.data2);
    var data = this.props.data2;

    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3
      .select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_2")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X axis
    var x_data = data.map((item) => item.total_bill);

    const x_scale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([margin.left, w]);

    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    // Add Y axis
    var y_data = data.map((item) => item.tip);
    const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);
    container.selectAll(".y_axis_g").data([0]).join("g").attr("class", "x_axis_g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y_scale));

    // Calculate line of best fit
    var lr = this.leastSquares(x_data, y_data);
    var lrLine = d3.line()
      .x(function (d) { return x_scale(d); })
      .y(function (d) { return y_scale(lr.slope * d + lr.intercept); });

    container.append("path")
      .datum(x_data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", lrLine);

    // Add data points
    container.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) { return x_scale(d.total_bill); })
      .attr("cy", function (d) { return y_scale(d.tip); })
      .attr("r", 3)
      .style("fill", "#69b3a2");
  }

  leastSquares(xArray, yArray) {
    var reduceSumFunc = function (prev, cur) { return prev + cur; };

    var xBar = xArray.reduce(reduceSumFunc) * 1.0 / xArray.length;
    var yBar = yArray.reduce(reduceSumFunc) * 1.0 / yArray.length;

    var numerator = xArray.map(function (d, i) { return (d - xBar) * (yArray[i] - yBar); })
      .reduce(reduceSumFunc);

    var denominator = xArray.map(function (d) { return Math.pow(d - xBar, 2); })
      .reduce(reduceSumFunc);

    var slope = numerator / denominator;
    var intercept = yBar - (slope * xBar);

    return {
      slope: slope,
      intercept: intercept
    };
  }

  render() {
    return (
      <svg className="child2_svg">
        <g className="g_2"></g>
      </svg>
    );
  }
}

export default Child2;
