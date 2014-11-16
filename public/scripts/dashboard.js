/*
 *
 * This file allows you to access the public methods of the nvd3 helper
 * Basic usage of graph.renderSeries:
 * @param {array} groups: ['Week'], ['Month'], ['Year'], ['Weekday'], and ['Year', 'Month']
 * @param {array} dims: graph.SPKeys, graph.TKeys, graph.problemCodeKeys, graph.HAOHKeys, graph.ISIDKeys, graph.RHTKeys
 * @param {function} nvFn: graph.addMultiBarChart, graph.addStackedAreaChart, graph.addLineChart, graph.addLineChartWithFocus, graph.addScatterChart (use with caution)
 * @param {string} title: whatever you want
 * @param {string} xType: 'index', 'index-1' (uses a 1-based index vs 0-based), 'date', 'otherDim'
 * @param {number} questionNumber: integer from 1 to 10
 * @param {string} dataType: 'Sum' or 'Mean'
 *
 */

var graph = require('./lib/nvd3helper.js');


// add in different visualizations here
graph.renderSeries({
  groups: ['Year'], 
  dims: graph.SPKeys, 
  nvFn: graph.addMultiBarChart, 
  title: 'Services Provided Summed by Year (2007-2014)', 
  xType: 'date',
  size: 'half'
});

graph.renderSeries({
  groups: ['AnxietyStart'], 
  dims: graph.problemCodeKeys.slice(0, 10), 
  nvFn: graph.addMultiBarChart, 
  title: '#4) Common problem codes for different starting anxiety levels (2012-2014)', 
  xType: 'index-1',
  size: 'full',
  questionNumber: 4,
  dataType: 'Mean'
});

graph.renderSeries({
  groups: ['Weekday'], 
  dims: graph.TKeys, 
  nvFn: graph.addStackedAreaChart, 
  title: '#1) Time of Day Summed by Weekday (2007-2014)', 
  xType: 'index',
  questionNumber: 1
});

graph.renderSeries({
  groups: ['Month'], 
  dims: graph.TKeys, 
  nvFn: graph.addStackedAreaChart, 
  title: '#2) Time of Day Summed by Month (2007-2014)', 
  xType: 'index',
  questionNumber: 2,
  size: 'half'
});

graph.renderSeries({
  groups: ['Year', 'Month'], 
  dims: graph.TKeys, 
  nvFn: graph.addStackedAreaChart, 
  title: '#2) Time of Day Summed by Year and Month (2007-2014)', 
  xType: 'date',
  questionNumber: 2,
  size: 'half'
});

graph.renderSeries({
  groups: ['Year'], 
  dims: graph.problemCodeKeys.slice(0, 10), 
  nvFn: graph.addMultiBarChart, 
  title: '#4) Selected caller problems by year (2007-2014)', 
  xType: 'date',
  questionNumber: 4
});



graph.renderSeries({
  groups: ['Year', 'Month'], 
  dims: graph.HAOHKeys, 
  nvFn: graph.addMultiBarChart, 
  title: '#10) How caller heard about Ozone House (2007-2014)', 
  xType: 'date',
  questionNumber: 10,
  size: 'full'
});

graph.renderSeries({
  groups: ['Year', 'Month'], 
  dims: ['yes', 'no'], 
  nvFn: graph.addMultiBarChart, 
  title: '#9) Percentage of calls with immediate safety concerns resulting in a safety plan being formed (2012-2014)', 
  xType: 'date',
  questionNumber: 9,
  path: '/data/safe/groupBySP.csv',
  size: 'full'
});
