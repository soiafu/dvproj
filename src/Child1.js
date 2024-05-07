import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
    componentDidMount() {
        var data = {
          "name": "Root",
          "children": [
            {
              "name": "Branch 1",
              "children": [
                {
                  "name": "Leaf 1",
                  "size": 10,
                  "color": "red"
                },
                {
                  "name": "Leaf 2",
                  "size": 20,
                  "color": "blue"
                }
              ]
            },
            {
              "name": "Branch 2",
              "children": [
                {
                  "name": "Leaf 3",
                  "size": 15,
                  "color": "green"
                },
                {
                  "name": "Leaf 4",
                  "size": 25,
                  "color": "purple",
                  "children": [
                    {
                      "name": "Subleaf",
                      "size": 5,
                      "color": "orange"
                    }
                  ]
                }
              ]
            }
          ]
        }
    
        var width = 220, height = 600
        var root = d3.hierarchy(data);
        //console.log(root) // Adds tree related information
        var treeLayout = d3.tree().size([height, width]);
        treeLayout(root); // Adds layout positions
    
        console.log(root.descendants())
    
        d3.select(".child2").selectAll(".link").data(root.links()).join("line").attr('class','link').attr('x1',d=>d.source.x).attr('y1',d=>d.source.y)
        .attr('x2',d=>d.target.x).attr('y2',d=>d.target.y)
    
        d3.select(".child2").selectAll(".label").data(root.descendants()).join("text").attr('class','label')
        .attr('x', d => d.x - 15)
        .attr('y', d => d.y - 15)
        .text(d=>{
          return d.data.name
        })
    
        var tooltip = d3.select("body")
        .selectAll(".tooltip_div")
        .data([0])  // binds a single element to the tooltip
        .join("div")  // joins the data to a div element
        .attr("class", "tooltip_div")  // adds a CSS class for styling
        .style("position", "absolute")  // uses absolute positioning
        .style("visibility", "hidden");  // starts as hidden
    
    
        d3.select(".child2").selectAll(".node").data(root.descendants()).join("circle").attr('class','node').attr('cx', d => d.x).attr('cy', d => d.y).attr('r', 4)
        .on("mouseover",(event,d)=>{
          tooltip.html(d.data.name).style("visibility", "visible")
        })
        .on("mousemove", (event) =>{
          tooltip.style("top", event.pageY - 10 + "px")  // positions the tooltip slightly above the cursor
          .style("left", event.pageX + 10 + "px")  // positions the tooltip to the right of the cursor
        })
        .on("mouseout", (event) =>{
          tooltip.style("visibility", "hidden")
        })
        
      }

  render() {
    return (
      <svg width="700" height="350">
        <g className="child2" transform="translate(0,50)"></g>
      </svg>
    );
  }
}

export default Child1;
