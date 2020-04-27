
// plots the data points. 

import Plot from 'react-plotly.js';
import React from 'react';


function transpose(array) {
  // transpose
  let transposed = Object.assign(...Object.keys(array[0]).map( key =>
    ({ [key]: array.map( o => o[key] ) })
  ));
  return transposed;
}

const MwaysPlot = props => (

  <Plot
    style={{ fontFamily: "'Quicksand' !important'", ...props.style}}
    data={props.traces}
    layout={{
      autosize: true,
      margin: {l:60,r:60,b:40,t:40},
      showlegend: true,
      legend: {x:0, y: 1.08, "orientation": "h"},
      paper_bgcolor: '#fcfcfc',
      plot_bgcolor: '#fcfcfc'
    }}
    config={{
      modeBarButtonsToRemove: [
          //"toImage", //activate image download
          // "zoom2d",
          // "pan2d",
          "autoScale2d",
          "resetScale2d",
          "resetScale",
          "resetViews",
          "hoverClosestCartesian", "hoverCompareCartesian",
          "zoom3d", "pan3d", "resetCameraDefault3d", "resetCameraLastSave3d", "hoverClosest3d",
          "orbitRotation", "tableRotation",
          "zoomInGeo", "zoomOutGeo", "resetGeo", "hoverClosestGeo",
          "sendDataToCloud",
          "hoverClosestGl2d",
          "hoverClosestPie",
          "toggleHover",
          "toggleSpikelines"
        ],
      displaylogo: false
    }}
  />

)

export default class PlotData extends React.Component {
  render() {
    const transposed = transpose(this.props.data);
    const keys = Object.keys(transposed);
    const time = keys[0];
    const otherKeys = keys.splice(1,keys.length);
    const traces = otherKeys.map(key => {
      return {
        x: transposed[time],
        y: transposed[key],
        name: key,
        type: 'scatter'
      }
    });

    return (
      <div>
        {traces.map(t =>
          <div>
            <h2>{t.name}</h2>
            <MwaysPlot traces={[t]} />
          </div>
        )}
      </div>
    )
  }
}