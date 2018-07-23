import React, { Component } from 'react'
import Timeline from 'react-visjs-timeline'
import moment from 'moment'
import './App.css'
import data from './data'
import ThermalMap from './thermalMap'

const groupsExample = {
  groups: [],
  items: [],
  options: {
    groupOrder: 'content' // groupOrder can be a property name or a sorting function,
  }
}

const now = moment()
  .minutes(0)
  .seconds(0)
  .milliseconds(0)
const groupCount = 5
const itemCount = 20

// create a data set with groups
const names = ['Truck 1', 'Truck 2', 'Truck 3', 'Truck 4', 'Truck 5']
for (let g = 0; g < groupCount; g++) {
  groupsExample.groups.push({ id: g, content: names[g] })
}

// create a dataset with items
for (let i = 0; i < itemCount; i++) {
  groupsExample.items.push({
    id: i,
    group: (1 + i) % 5,
    content:
      '<span style="color:#ffffff;font-size:12px">Order ' +
      i + '</span>',
    start: new Date(2010, 7 + i, 15),
    type: 'box'
  })
}

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedIds: [],
      selectedTruck: 'none'
    }
    this.clickHandler = this.clickHandler.bind(this)
  }

  render () {
    var options = {
      width: '100%',
      margin: {
        item: 4
      },
      orientation: {
        axis: 'top'
      },
      editable: {
        add: true,
        updateTime: true,
        updateGroup: true,
        remove: true,
        overrideItems: false
      },
      stack: false,
      itemsAlwaysDraggable: {
        item: true,
        range: true
      }
    }
    return (
      <div className='App'>
        <p>Crane 1</p>
        <Timeline
          {...groupsExample}
          options={options}
          clickHandler={this.clickHandler.bind(this)}
          selection={this.state.selectedIds}
          onMove={this.onMove}
        />
        <ThermalMap data={data} selectedTruck={this.state.selectedTruck} />
      </div>
    )
  }
  onMove (props) {
    console.log('ghjfjdkghfdgk', props)
  }
  clickHandler (props) {
    const { group } = props
    console.log('group', group)
    var no = group + 1
    if (this.state.selectedTruck !== 'Truck' + no) { this.setState({selectedTruck: 'Truck' + no}) }
  }
}

export default App
