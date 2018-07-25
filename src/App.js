import React, { Component } from 'react'
import Timeline from 'react-visjs-timeline'
import moment from 'moment'
import './App.css'
import data from './data'
import ThermalMap from './thermalMap'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIds: [],
      selectedTruck: 'none',
      show:true,
      groupsExample : {
        groups: [{
          content: "bollard 1",
          id: 1
        },
        {
          content: "bollard 2",
          id: 2
        },
        {
          content: "bollard 3",
          id: 3
        },
         {
          id: 10,
          nestedGroups: [1,2],
          content: "Berth 1",
          showNested:true
        },{
          id: 11,
          nestedGroups: [3],
          content: "Berth 2",
          showNested:true
        }],
        items: [{  id: 'A', content: 'Group A', start: '2014-01-16', end: '2014-01-22', type: 'range', group: 11},
        {id: 'B', content: 'Group B', start: '2014-01-23', end: '2014-01-26', type: 'range',group:10},
        {id: 'C', content: 'order 1', start: '2014-01-23', end: '2014-01-26', type: 'box',group:10,subgroup:2},
        {id: 'D', content: 'order 2', start: '2014-01-23', end: '2014-01-26', type: 'box',group:11,subgroup:3},
        {id: 'E', content: 'order 3', start: '2014-01-23', end: '2014-01-26', type: 'box',group:10,subgroup:1}],
        options: {
          groupOrder: 'content' // groupOrder can be a property name or a sorting function,
        }
      }
    }
    this.clickHandler = this.clickHandler.bind(this)
  }

  render () {

    console.log("dhfgdsjfg",this.state.groupsExample);
    var options = {
      width: '100%',
      margin: {
        item: 4
      },
      orientation: {
        axis: 'both'
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
        <p>Vessel 1</p>
        <button onClick={this.handleToggle.bind(this)} style={{display:'flex',float:'left'}}>{this.state.show?'-':'+'}</button>
        <Timeline
          {...this.state.groupsExample}
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
  handleToggle(){
    console.log("show",this.state.show );
    this.setState({show:!this.state.show})
    this.state.groupsExample.groups.find((group)=>{
      if(group.id>=10)
      console.log("group.showNested",group.showNested);
      if(this.state.show)
       group.showNested=false
       else
       group.showNested=true
    })
  }

  clickHandler (props) {
    const { group } = props
    var no = group + 1
    const groups =this.state.groupsExample.groups
    var index = groups.map(function(e) { return e.id; }).indexOf(props.group);
      var show=groups[index].showNested
      groups[index].showNested=!show
      this.setState({groups})
      if (this.state.selectedTruck !== 'Truck' + no) { this.setState({selectedTruck: 'Truck' + no}) }
  }
}

export default App  
