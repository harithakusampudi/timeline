import React, { Component } from 'react'
import Timeline from 'react-visjs-timeline'
import moment from 'moment'
import './App.css'
import data from './data'
import ThermalMap from './thermalMap'

const groupsExample = {
  groups: [],
  items: [{
    id: 'A', content: 'Group A', start: '2014-01-16', end: '2014-01-22', type: 'background', group: 11},
    {id: 'B', content: 'Group B', start: '2014-01-23', end: '2014-01-26', type: 'background', group: 12},
    {id: 'C', content: 'Group C', start: '2014-01-27', end: '2014-02-03', type: 'background'}, // no group
    {id: 'D', content: 'Group D', start: '2014-01-14', end: '2014-01-20', type: 'background', },
    {id: 1, content: 'item 1', start: '2014-01-30', group: 10,subgroup:1},
    {id: 2, content: 'item 2', start: '2014-01-18', group: 11,subgroup:2},
    {id: 3, content: 'item 3', start: '2014-01-21', group: 12},
    {id: 4, content: 'item 4', start: '2014-01-17', end: '2014-01-21', group:13},
    {id: 5, content: 'item 5', start: '2014-01-28', type:'point', group: 14},
    {id: 6, content: 'item 6', start: '2014-01-25', group: 12}
  ],
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
for(let i=0;i<groupCount;i++){
  var nestedGroups=[]
  nestedGroups.push(i)
  console.log("nestedgroups",nestedGroups)
  groupsExample.groups.push({
    id:10+i,
    content:'Bullard'+i,
    nestedGroups:nestedGroups,
    showNested:false

  })
}
console.log("groups");

// create a dataset with items
// for (let i = 0; i < itemCount; i++) {
//   groupsExample.items.push({
//     id: i,
//     group: (i) % 5,
//     content:
//       '<span style="color:#000;font-size:12px">Order ' +
//       i + '</span>',
//     start: new Date(2010, 7 + i, 15),
//     end:new Date(2011,7+i,15),
//     type: 'background'
//   })
// }

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
