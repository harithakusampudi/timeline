import React, { Component } from 'react'
import Timeline from 'react-visjs-timeline'
import moment from 'moment'
import './App.css'
import data from './data'
import items from './items'
import ThermalMap from './thermalMap'
import _ from 'lodash'

const groups=[{
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
  content: "bollard 4",
  id: 4
},
{
  content: "bollard 5",
  id: 5
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
},
{
  id: 12,
  nestedGroups: [4,5],
  content: "Berth 3",
  showNested:true
}]


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIds: [],
      selectedTruck: 'none',
      show:true,
      groupsExample : {
        groups: groups,
        items: items,
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
        <p>Timeline</p>
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
    this.setState({show:!this.state.show})
    this.state.groupsExample.groups.find((group)=>{
      if(group.id>=10 &&this.state.show)
       group.showNested=false
       else
       group.showNested=true
    })
  }

  clickHandler (props) {
    const { group,what } = props
    const { items } =this.state.groupsExample
    var propsTime=moment(props.time).format('l') // format time 
    
    items.map((item)=>{
      if(item.type&&item.type===what&&item.group===group){
        var startTime=moment(item.start).format('l')
        var endTime=moment(item.end).format('l')
        var rangeCheck=''
        rangeCheck=this.selectedDateRangeCheck(startTime,endTime,propsTime)
        if(rangeCheck){
          var vesselNo=item.title
          if (this.state.selectedTruck !== 'Vessel' + vesselNo) {
            this.setState({selectedTruck: 'Vessel' + vesselNo}) 
          }
        }
      }
    })
  }

  selectedDateRangeCheck(startDate,endDate,date){
    date = new Date(date)
      var d1   = date.getTime()
      var d2   = new Date(startDate).getTime()
      var d3   = new Date(endDate).getTime()

   if (d1 >= d2 && d1 <= d3) {
    console.log("check",d2,d3,d1);
       return true;
    }else
    console.log("checkfalse",d2,d3,d1);
 return false;
  }
}
export default App  
