import React, { Component } from 'react'
import { Chart, Geom, Axis, Tooltip, Coord } from 'bizcharts'

class ThermalMap extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: this.props.data,
      selectedTruck: this.props.selectedTruck,
      selected: ''
    }
    this.renderChart = this.renderChart.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({selectedTruck: nextProps.selectedTruck})
    this.setState({data: nextProps.data})
  }
  setSelected (data) {
    this.setState({selected: data.data._origin})
  }

  renderChart (data, cols, padding) {
    return <Chart height={400} data={data} scale={cols} forceFit padding={padding} onPlotClick={(data) => { this.setSelected(data) }}>
      <Tooltip title='date' />
      <Axis name='week'position='top' tickLine={null} line={null} label={
        {
          offset: 12,
          textStyle: {
            fontSize: 12,
            fill: '#666',
            textBaseline: 'top'
          },
          formatter: val => {
            if (val === '2') {
              return 'MAY'
            } else if (val === '6') {
              return 'JUN'
            } else if (val === '10') {
              return 'JUL'
            } else if (val === '15') {
              return 'AUG'
            } else if (val === '19') {
              return 'SEP'
            } else if (val === '24') {
              return 'OCT'
            }
            return ''
          }
        }}
      />
      <Axis name='day' grid={null} />
      <Geom type='polygon' position='week*day*date' shape='boundary-polygon' color={['orders', '#BAE7FF-#1890FF-#0050B3']}
        select={[ true, {
          mode: ' single ', animate: true }]}

      />
      <Coord reflect='y' />
    </Chart>
  }

  render () {
    console.log('fjghfdgjfdg', this.state.selected)
    const cols = {
      day: {
        type: 'cat',
        values: ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT']
      },
      week: {
        type: 'cat'
      },
      commits: {
        sync: true
      }
    }
    const padding = [window.innerHeight / 3, 20, window.innerHeight / 3, 100]
    const {data} = this.state
    return (
      <div className='App'>
        {this.state.selectedTruck !== 'none'
          ? <div>
            <h4 style={{marginTop: 20, marginBottom: 20}}>{this.state.selectedTruck}</h4>
            {this.renderChart(data, cols, padding)}
            <div>
              {this.state.selected != '' ? <div> <p>Date : {this.state.selected.date}</p>  <p>Orders : {this.state.selected.orders}</p> </div> : <div />}
            </div>
          </div> : <div />}
      </div>
    )
  }
}

export default ThermalMap
