/*
 * This file allows you to access the public methods of the nvd3 helper
 * Basic usage of graph.render:
 * ['Week', 'Month', 'Year', 'Weekday']
 * 
 *
 *
 *
 *
 */

var graph = require('./lib/nvd3helper.js');

graph.render(['Year'], graph.SPKeys, graph.addMultiBarChart, 'Services Provided Summed by Year (2007-2014)');

graph.render(['Weekday'], graph.TKeys, graph.addStackedAreaChart, 'Time of Day Summed by Weekday (2007-2014)');
// graph.render(['Year', 'Month'], graph.SPKeys, graph.addLineWithFocusChart, 'Service Provided Summed by Month and Year (2007-2014)');
graph.render(['Month'], graph.HAOHKeys, graph.addMultiBarChart, 'How Caller Heard About Ozone House Summed by Month (2007-2014)');
graph.render(['Week'], graph.problemCodeKeys.slice(0, 10), graph.addMultiBarChart, 'Selected Caller Problems Summed by Week of Year (2007-2014)');
graph.render(['Week'], graph.ISIDKeys, graph.addMultiBarChart, 'Immediate Safety Issues Present Summed by Week of Year (2007-2014)');

graph.render(['Year', 'Month'], graph.otherKeys.slice(1, 3), graph.addLineChart, 'Anxiety Start v Anxiety End (2007-2014)');
graph.render(['Year', 'Month'], graph.otherKeys.slice(0, 1), graph.addLineChart, 'Anxiety Plan Created (2007-2014)');

graph.render(['Year', 'Month'], ['Age'], graph.addLineChart, 'Mean Caller Age (2007-2014)');
