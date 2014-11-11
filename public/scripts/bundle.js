(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
  xType: 'date'
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

// graph.renderTimeSeries({
//   groups: ['Year', 'Month'], 
//   dims: graph.ISIDKeys, 
//   nvFn: graph.addMultiBarChart, 
//   title: 'Immediate Safety Issues Present Summed by Week of Year (2007-2014)', 
//   xType: 'date'
// });
//  
// graph.renderTimeSeries({
//   // path: '/data/all.csv',
//   groups: ['Year', 'Month'], 
//   dims: [[graph.otherKeys[2], graph.otherKeys[1]]], //[graph.otherKeys[3], graph.otherKeys[4]]], 
//   nvFn: graph.addScatterChart, 
//   title: '#4) Anxiety Start v Anxiety End (2007-2014)', 
//   xType: 'otherDim',
//   yAxisLabel: 'Anxiety Start',
//   xAxisLabel: 'Anxiety End'
// });
// 
// graph.renderTimeSeries({
//   // path: '/data/all.csv',
//   groups: ['Year', 'Month'], 
//   dims: [[graph.otherKeys[4], graph.otherKeys[5]], [graph.otherKeys[0], graph.otherKeys[4]], [graph.otherKeys[0], graph.otherKeys[5]]], //[graph.otherKeys[3], graph.otherKeys[4]]], 
//   nvFn: graph.addScatterChart, 
//   title: '#5) Decrease in Anxiety v Safety Plan Created (2007-2014)', 
//   xType: 'otherDim',
// });
// 
// graph.renderTimeSeries({
//   // path: '/data/all.csv',
//   groups: ['Year', 'Month'], 
//   dims: graph.otherKeys, 
//   nvFn: graph.addMultiBarChart, 
//   title: '#5) Decrease in Anxiety v Safety Plan Created (2007-2014)', 
//   xType: 'date',
// });
// 
// graph.renderTimeSeries({
//   groups: ['Year', 'Month'], 
//   dims: graph.otherKeys.slice(0, 1), 
//   nvFn: graph.addLineChart, 
//   title: 'Anxiety Plans Created By Month and Year (2007-2014)', 
//   xType: 'date'
// });
 
graph.renderTimeSeries({
  groups: ['Year'], 
  dims: ['Age'], 
  nvFn: graph.addLineChart, 
  title: 'Mean Caller Age (2007-2014)', 
  xType: 'date',
  dataType: 'Mean'
});

graph.renderTimeSeries({
  groups: ['Year', 'Month'], 
  dims: ['Age'], 
  nvFn: graph.addLineChart, 
  title: 'Mean Caller Age (2007-2014)', 
  xType: 'date',
  dataType: 'Mean'
});

graph.renderTimeSeries({
  groups: ['Month'], 
  dims: graph.RHTAgeKeys, 
  nvFn: graph.addLineWithFocusChart, 
  title: 'A Chart (2007-2014)', 
  xType: 'date'
});

},{"./lib/nvd3helper.js":2}],2:[function(require,module,exports){
/*
 * Library for building visualizations for the Ozone House at the 2014 A2 DataDive
 * Maintainer: Aaron Kosel
 * E-mail: kosel@umich.edu
 * WARNING: You probably don't want to modify this file 
 */

module.exports = (function() {

  var Graph = {};

  Graph.charts = [];

  Graph.allKeys = ["R","H","T","T9-1","T1-5","T5-8","T8-9","Age","HAOHFamily","HAOHFriend","HAOHSchool","HAOHAdvertisement/Poster/Helpcard","HAOHOzone Staff","HAOHPolice/Court/Probation Officer","HAOHOther Org.","HAOHIs a Previous Client","HAOHO.H. Street/Outreach","HAOHPOWs","HAOHMental Health Professional","HAOHInternet/Online Search","HAOHDrop-InCenter","HAOHHousing Access","HAOHOther","HAOHUnknown","PA","PB","PC ","PD","PE","PF","PG","PH","PI","PJ","PK","PL","PM","PN","PO","PP","PQ","PR","PS","PT","PU","PV","PW","PX ","PY ","PZ","Paa","Pbb","Pcc","Pdd","Pee","Pff","Pgg","Phh","Pii","Pjj","Pkk","SPEmpathy","SPInfoGathering","SPProblemSolving","SPRealityTesting","SPSafetyPlanning","ISIDFamily Conflict","ISIDCurrent Abuse","ISIDSuicide","ISIDOn the street","ISIDDomestic Violence","ISIDOther","SafetyPlan","AnxietyStart","AnxietyEnd","Increase","Decrease","No Change","PositiveChange","CallsInCrisisw/SP","Intake Scheduled","# of Referrals Given"];

  Graph.RHTAgeKeys = ["R","H","T","Age"];

  Graph.TKeys = ["T9-1","T1-5","T5-8","T8-9"];

  Graph.problemCodeKeys = ["PA","PB","PC ","PD","PE","PF","PG","PH","PI","PJ","PK","PL","PM","PN","PO","PP","PQ","PR","PS","PT","PU","PV","PW","PX ","PY ","PZ","Paa","Pbb","Pcc","Pdd","Pee","Pff","Pgg","Phh","Pii","Pjj","Pkk"];

  Graph.HAOHKeys = ["HAOHFamily","HAOHFriend","HAOHSchool","HAOHAdvertisement/Poster/Helpcard","HAOHOzone Staff","HAOHPolice/Court/Probation Officer","HAOHOther Org.","HAOHIs a Previous Client","HAOHO.H. Street/Outreach","HAOHPOWs","HAOHMental Health Professional","HAOHInternet/Online Search","HAOHDrop-InCenter","HAOHHousing Access","HAOHOther","HAOHUnknown"];

  Graph.ISIDKeys = ["ISIDFamily Conflict","ISIDCurrent Abuse","ISIDSuicide","ISIDOn the street","ISIDDomestic Violence","ISIDOther"];

  Graph.SPKeys = ["SPEmpathy","SPInfoGathering","SPProblemSolving","SPRealityTesting","SPSafetyPlanning"];

  Graph.otherKeys = ["SafetyPlan","AnxietyStart","AnxietyEnd","Increase","Decrease","No Change","PositiveChange","CallsInCrisisw/SP","Intake Scheduled","# of Referrals Given"];

  // enums for easier conversion from index to common name
  _enums = {
    Month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    Weekday: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  };

  _codeToDescriptionMap = { 
    'PA': 'Runaway Potential<18',
    'PB': 'Throwaway<18',
    'PC': 'Homeless Potemtial17+',
    'PD': 'Pregnancy/Teen Parent',
    'PE': 'Economic Hardship',
    'PF': 'Family Conflict',
    'PG': 'Health/Medical',
    'PH': 'Mental Health',
    'PI': 'Rape/Assault',
    'PJ': 'Suicide',
    'PK': 'Emotional Abuse',
    'PL': 'Sexual Abuse',
    'PM': 'Physical Abuse',
    'PN': 'Neglect',
    'PO': 'Criminal Offense',
    'PP': 'Conflict w/ peers',
    'PQ': 'Domestic Violence',
    'PR': 'Drugs/Alcohol - Youth',
    'PS': 'Drugs/Alcohol - Family',
    'PT': 'Sexual Activity/Risk',
    'PU': 'Sexual Orientation',
    'PV': 'Employment',
    'PW': 'Legal',
    'PX': 'Grief/Loss',
    'PY': 'Gang-Related',
    'PZ': 'School',
    'Paa': 'Discrimination',
    'Pbb': 'Other',
    'Pcc': 'Housing',
    'Pdd': 'Clothing',
    'Pee': 'Food',
    'Pff': 'ChildCare',
    'Pgg': 'PastAbuseHistory',
    'Phh': 'DatingViolance',
    'Pii': 'Utilities',
    'Pjj': 'TransportationBarrier'
  };

  // handles appending a new chart to the dom. returns the selector
  function _drawChartDiv(title) {

    var html = '<div class="chart" id="id-' + Graph.charts.length + '"><h3 class="title">' + title + '</h3></div>';

    var $chart = $(html).appendTo('body');

    Graph.charts.push($chart[0]);
    return $chart[0];

  }

  // contains all of the code that each nv chart has in common
  // pass in the calling chart and return that same chart after call
  function _nvCommon(context, chart) {

    var svg = d3.select(context.selector)
                .append('svg'); 
      
   svg.datum(context.summaryData)
      .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;

  }

  function _xAxisCommon(context, axis, overrideDefault) {
    axis.tickFormat(function(d) {
     if (context.groups.length > 1 && !overrideDefault) {
       return d3.time.format('%B %Y')(new Date(d));
     } else if (context.groups[0] === 'Year' && !overrideDefault) {
       return d3.time.format('%Y')(new Date(d));
     } else if (_enums[context.groups[0]] && !overrideDefault) {
       return _enums[context.groups[0]][d]; 
     } else {
       return d;
     }
   })
   .axisLabel(context.xAxisLabel);
  }

  function _buildPath(groups, dataType) {
    var dataType = dataType || 'Sum';
    return ['/data/groupBy', groups.join(''), dataType, '.csv'].join(''); 
  }


  /*
   *  wrapper functions to add charts to our dashboard
   *  currently supports stacked area, line chart, line
   *  chart with focus, and multibar chart
   */
  Graph.addStackedAreaChart = function() {

    var context = this;

    var chart = nv.models.stackedAreaChart()
                  .useInteractiveGuideline(true);

    _xAxisCommon(context, chart.xAxis);


    chart.yAxis
         .tickFormat(d3.format(',r'))
         .axisLabel(context.yAxisLabel);

    return _nvCommon(context, chart);

  };

  Graph.addLineChart = function() {

    var context = this;

    var chart = nv.models.lineChart()
                  .useInteractiveGuideline(true);

    _xAxisCommon(context, chart.xAxis);

    chart.yAxis
         .tickFormat(d3.format(',r'))
         .axisLabel(context.yAxisLabel);

    return _nvCommon(context, chart);
      
  };

  Graph.addScatterChart = function() {

    var context = this;

    var chart = nv.models.scatterChart();

    _xAxisCommon(context, chart.xAxis, true);

    chart.yAxis
         .tickFormat(d3.format(',r'))
         .axisLabel(context.yAxisLabel);

    return _nvCommon(context, chart);
      
  }

  Graph.addLineWithFocusChart = function() {

    var context = this;

    var chart = nv.models.lineWithFocusChart();

    _xAxisCommon(context, chart.xAxis);
    _xAxisCommon(context, chart.x2Axis);

    chart.yAxis
         .tickFormat(d3.format(',r'))
         .axisLabel(context.yAxisLabel);

    chart.y2Axis
         .tickFormat(d3.format(',r'))
         .axisLabel(context.yAxisLabel);

    return _nvCommon(context, chart);

  };

  Graph.addMultiBarChart = function() {

    var context = this;

    var chart = nv.models.multiBarChart()
                  .stacked(true)
                  .showControls(false);
    
    _xAxisCommon(context, chart.xAxis);

    chart.yAxis
         .tickFormat(d3.format(',r'))
         .axisLabel(context.yAxisLabel);

    return _nvCommon(context, chart);

  };

  function _timeSeriesMapFn() {

  }


  Graph.renderXYSeries = function() {

  };

  Graph.renderTimeSeries = function(args) {
    var path = args.path || _buildPath(args.groups, args.dataType);

    d3.csv(path, function(data) {
      var selector = _drawChartDiv(args.title);

      var summaryData = _mapToKeyValuesArray({
        data: data, 
        dims: args.dims,
        groups: args.groups,
        xType: args.xType || 'date' 
      });

      var fn = args.nvFn.bind({ 
        selector: selector, 
        summaryData: summaryData,
        groups: args.groups,
        xAxisLabel: args.xAxisLabel,
        yAxisLabel: args.yAxisLabel
      });
      nv.addGraph(fn);
    });

  };

  function _mapToKeyValuesArray(args) {
    if (!args.groups.length) {
      throw 'You need to pass the groups';
    }
    if (!args.dims.length) {
      throw 'You need to pass the dimensions';
    }

    var result = [],
        temp,
        xVar,
        yVar;

    args.dims.forEach(function(dim) {
      temp = args.data.map(function(row, idx) {

        if (args.xType === 'date') {
          var year = row.year || '2014';
          var month = row.month || '0';
          var day = row.day || '15';
          xVar = new Date(year, month, day);
          yVar = +row[dim];
        } else if (args.xType === 'index') {
          xVar = idx;
          yVar = +row[dim];
        } else if (args.xType === 'otherDim') {
          xVar = +row[dim[0]];
          yVar = +row[dim[1]];
        }

        return {
          x: xVar,
          y: yVar 
        };
      });

      if (_codeToDescriptionMap[dim]) {
        dim = _codeToDescriptionMap[dim];
      }

      result.push({
        key: dim,
        values: temp
      });
    });

    return result;
  }

  return Graph;

})();

},{}]},{},[1]);
