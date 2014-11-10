/*
 * This file allows you to access the public methods of the nvd3 helper
 * Basic usage of graph.renderTimeSeries:
 * ['Week', 'Month', 'Year', 'Weekday']
 * 
 *
 *
 *
 *
 */

var graph = require('./lib/nvd3helper.js');

graph.renderTimeSeries({
  groups: ['Year'], 
  dims: graph.SPKeys, 
  nvFn: graph.addMultiBarChart, 
  title: 'Services Provided Summed by Year (2007-2014)', 
  xType: 'date'
});

graph.renderTimeSeries({
  groups: ['Weekday'], 
  dims: graph.TKeys, 
  nvFn: graph.addStackedAreaChart, 
  title: '#1) Time of Day Summed by Weekday (2007-2014)', 
  xType: 'index'
});

graph.renderTimeSeries({
  groups: ['Month'], 
  dims: graph.TKeys, 
  nvFn: graph.addStackedAreaChart, 
  title: '#2) Time of Day Summed by Month (2007-2014)', 
  xType: 'index'
});

graph.renderTimeSeries({
  groups: ['Year', 'Month'], 
  dims: graph.TKeys, 
  nvFn: graph.addStackedAreaChart, 
  title: '#2) Time of Day Summed by Year and Month (2007-2014)', 
  xType: 'date'
});

graph.renderTimeSeries({
  groups: ['Year', 'Month'], 
  dims: graph.HAOHKeys, 
  nvFn: graph.addMultiBarChart, 
  title: '#9) How Caller Heard About Ozone House Summed by Month (2007-2014)', 
  xType: 'index'
});

graph.renderTimeSeries({
  groups: ['Week'], 
  dims: graph.problemCodeKeys.slice(0, 10), 
  nvFn: graph.addMultiBarChart, 
  title: '#3) Selected Caller Problems Summed by Week of Year (2007-2014)', 
  xType: 'index'
});

graph.renderTimeSeries({
  groups: ['Month'], 
  dims: graph.problemCodeKeys.slice(0, 10), 
  nvFn: graph.addMultiBarChart, 
  title: '#5) Selected Caller Problems Summed by Month (2007-2014)', 
  xType: 'index'
});

graph.renderTimeSeries({
  groups: ['Year'], 
  dims: graph.problemCodeKeys.slice(0, 10), 
  nvFn: graph.addMultiBarChart, 
  title: '#7) Selected Caller Problems Summed by Year (2007-2014)', 
  xType: 'date'
});

graph.renderTimeSeries({
  groups: ['Year', 'Month'], 
  dims: graph.ISIDKeys, 
  nvFn: graph.addMultiBarChart, 
  title: 'Immediate Safety Issues Present Summed by Week of Year (2007-2014)', 
  xType: 'date'
});
 
graph.renderTimeSeries({
  // path: '/data/all.csv',
  groups: ['Year', 'Month'], 
  dims: [[graph.otherKeys[1], graph.otherKeys[2]]], //[graph.otherKeys[3], graph.otherKeys[4]]], 
  nvFn: graph.addScatterChart, 
  title: '#4) Anxiety Start v Anxiety End (2007-2014)', 
  xType: 'otherDim'
});

graph.renderTimeSeries({
  // path: '/data/all.csv',
  groups: ['Year', 'Month'], 
  dims: [[graph.otherKeys[4], graph.otherKeys[5]], [graph.otherKeys[0], graph.otherKeys[4]], [graph.otherKeys[0], graph.otherKeys[5]]], //[graph.otherKeys[3], graph.otherKeys[4]]], 
  nvFn: graph.addScatterChart, 
  title: '#5) Decrease in Anxiety v Safety Plan Created (2007-2014)', 
  xType: 'otherDim'
});

graph.renderTimeSeries({
  groups: ['Year', 'Month'], 
  dims: graph.otherKeys.slice(0, 1), 
  nvFn: graph.addLineChart, 
  title: 'Anxiety Plans Created By Month and Year (2007-2014)', 
  xType: 'date'
});
 
graph.renderTimeSeries({
  groups: ['Year', 'Month'], 
  dims: ['Age'], 
  nvFn: graph.addLineChart, 
  title: 'Mean Caller Age (2007-2014)', 
  xType: 'date'
});
