/*
 * Library for building visualizations for the Ozone House at the 2014 A2 DataDive
 * Maintainer: Aaron Kosel
 * E-mail: kosel@umich.edu
 * 
 */

// global config variables. useful for broader changes
var config = {
  chartTitleTopOffset: 60,
  chartTitleFontSize: '24px',
  chartTitleAnchor: 'middle',
  axisDateFormat: '%B %Y'
};

// enums for easier conversion from index to common name
var enums = {
  Month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  Weekday: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
};

// for now this is acting like a main function
d3.csv('/data/groupByYearMonth.csv', function(data) {

  // the this is there to make it possible to put this in a custom object.
  // for now, this references the window, just to be clear
  this.keys = Object.keys(data[0]);
  this.charts = [];

  this.timeOfDayDims = this.keys.slice(5, 9);
  // this.rando = this.keys.slice(26, 63);
  this.rando = this.keys.slice(63, 70);

  render(['Year'], this.timeOfDayDims, addLineChart);
  // render('groupByWeekday.csv', this.timeOfDayDims);
  render(['Year', 'Month'], this.timeOfDayDims, addLineWithFocusChart, 'Changes in call volume by time of day');
  // render('groupByYearMonth.csv', this.timeOfDayDims, addLineChart, 'Changes in call volume by time of day');
  render(['Month'], this.rando, addMultiBarChart);
  // render('groupByYearMonth.csv', this.timeOfDayDims, addStackedAreaChart, 'Changes in call volume by time of day');
});

// handles appending a new chart to the dom. returns the selector
function _drawChartDiv() {

  var html = '<div class="chart" id="id-' + this.charts.length + '"></div>';
  var $chart = $(html).appendTo('body');

  this.charts.push($chart[0]);
  return $chart[0];

}

// contains all of the code that each nv chart has in common
// pass in the calling chart and return that same chart after call
function _nvCommon(context, chart) {

  var chartTitle = context.title || 'Chart without a name is a sad chart';

  var svg = d3.select(context.selector)
              .append('svg'); 
    
 svg.datum(context.summaryData)
    .call(chart);

 svg.append('text')
    .attr('x', $(context.selector).width() / 2)
    .attr('y', config.chartTitleTopOffset)
    .attr('text-anchor', config.chartTitleAnchor)
    .style('font-size', config.chartTitleFontSize)
    .text(chartTitle);

  nv.utils.windowResize(chart.update);

  return chart;

}

/*
 *  wrapper functions to add charts to our dashboard
 *  currently supports stacked area, line chart, line
 *  chart with focus, and multibar chart
 */
function addStackedAreaChart() {

  var context = this;

  var chart = nv.models.stackedAreaChart()
                .useInteractiveGuideline(true);

  _xAxisCommon(context, chart.xAxis);

  chart.yAxis
       .tickFormat(d3.format(',r'));

  return _nvCommon(context, chart);

}

function addLineChart() {

  var context = this;

  var chart = nv.models.lineChart()
                .useInteractiveGuideline(true);

  _xAxisCommon(context, chart.xAxis);

  chart.yAxis
       .tickFormat(d3.format(',r'));

  return _nvCommon(context, chart);
    
}

function addLineWithFocusChart() {

  var context = this;

  var chart = nv.models.lineWithFocusChart();

  _xAxisCommon(context, chart.xAxis);
  _xAxisCommon(context, chart.x2Axis);

  chart.yAxis
       .tickFormat(d3.format(',r'));

  chart.y2Axis
       .tickFormat(d3.format(',r'));

  return _nvCommon(context, chart);

}

function _xAxisCommon(context, axis) {
  axis.tickFormat(function(d) {
   if (context.groups.length > 1) {
     return d3.time.format(config.axisDateFormat)(new Date(d));
   } else if (context.groups[0] === 'Year') {
     return d3.time.format('%Y')(new Date(d));
   } else if (enums[context.groups[0]]) {
     return enums[context.groups[0]][d]; 
   } else {
     return d3.format('d')(d);
   }
 });
}

function addMultiBarChart() {

  var context = this;

  var chart = nv.models.multiBarChart()
                .stacked(true)
                .showControls(false);
  
  _xAxisCommon(context, chart.xAxis);

  chart.yAxis
       .tickFormat(d3.format(',r'));

  return _nvCommon(context, chart);

}

function _buildPath(groups) {
  return ['/data/groupBy', groups.join(''), '.csv'].join(''); 
}

function render(groups, dims, nvFn, title) {
  var path = _buildPath(groups);
  if (dims.length === 1) {
    var xType = 'index'; 
  }
  d3.csv(path, function(data) {
    var selector = this._drawChartDiv();

    var summaryData = rollup({
      data: data, 
      dims: dims,
      groups: groups
    });

    var fn = nvFn.bind({ 
      selector: selector, 
      summaryData: summaryData,
      title: title,
      groups: groups
    });
    nv.addGraph(fn);
  });

}


function rollup(args) {
  if (!args.groups.length) {
    throw 'You need to pass the groups';
  }
  if (!args.dims.length) {
    throw 'You need to pass the dimensions';
  }

  var result = [],
      temp,
      xVar,
      xType;

  if (args.groups.length === 1 && args.groups[0] !== 'Year') {
    xType = 'index';
  } else {
    xType = 'date';
  }

  args.dims.forEach(function(dim) {
    temp = args.data.map(function(row, idx) {

      if (xType === 'date') {
        var year = row.year || '2014';
        var month = row.month || '0';
        var day = row.day || '15';
        xVar = new Date(year, month, day);
      } else if (xType === 'index') {
        xVar = idx;
      }

      return {
        x: xVar,
        y: +row[dim]
      };
    });

    result.push({
      key: dim,
      values: temp
    });
  });

  console.log(result);
  return result;
}

