import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react'
 var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// create graphs
export default class Graphs extends Component {
    constructor(props){
        super(props)
        this.state = {
            vacsArr:[]
        }
    }
    async componentDidMount() {
        let vacations = this.props.vacs;
        
        let vacsArr = vacations.map(v => {
            return {"label":v.title,"y":v.followed}
        })
        await this.setState({vacsArr:vacsArr});
      };
    render() {
        
        const options = {
          title: {
            text: "Vacation Chart"
          },
          data: [{				
                    type: "column",
                    indexLabel: "{y}",
                    indexLabelFontColor: "white",
                    dataPoints: this.state.vacsArr
           }]
       }
            
       return (
          <div>
            <CanvasJSChart options = {options}
                /* onRef = {ref => this.chart = ref} */
            />
          </div>
        );
      }
    }

