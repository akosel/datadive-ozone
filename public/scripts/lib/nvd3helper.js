/*
 * Library for building visualizations for the Ozone House at the 2014 A2 DataDive
 * Maintainer: Aaron Kosel
 * E-mail: kosel@umich.edu
 * WARNING: You probably don't want to modify this file 
 */

module.exports = (function() {

  var Graph = {};

  Graph.charts = [];

  Graph.allKeys = ["R","H","T","T9-1","T1-5","T5-8","T8-9","Age","HAOHFamily","HAOHFriend","HAOHSchool","HAOHAdvertisement/Poster/Helpcard","HAOHOzone Staff","HAOHPolice/Court/Probation Officer","HAOHOther Org.","HAOHIs a Previous Client","HAOHO.H. Street/Outreach","HAOHPOWs","HAOHMental Health Professional","HAOHInternet/Online Search","HAOHDrop-InCenter","HAOHHousing Access","HAOHOther","HAOHUnknown","PA","PB","PC","PD","PE","PF","PG","PH","PI","PJ","PK","PL","PM","PN","PO","PP","PQ","PR","PS","PT","PU","PV","PW","PX ","PY ","PZ","Paa","Pbb","Pcc","Pdd","Pee","Pff","Pgg","Phh","Pii","Pjj","Pkk","SPEmpathy","SPInfoGathering","SPProblemSolving","SPRealityTesting","SPSafetyPlanning","ISIDFamily Conflict","ISIDCurrent Abuse","ISIDSuicide","ISIDOn the street","ISIDDomestic Violence","ISIDOther","SafetyPlan","AnxietyStart","AnxietyEnd","Increase","Decrease","No Change","PositiveChange","CallsInCrisisw/SP","Intake Scheduled","# of Referrals Given"];

  Graph.RHTAgeKeys = ["R","H","T","Age"];

  Graph.TKeys = ["T9-1","T1-5","T5-8","T8-9"];

  Graph.problemCodeKeys = ["PA","PB","PC","PD","PE","PF","PG","PH","PI","PJ","PK","PL","PM","PN","PO","PP","PQ","PR","PS","PT","PU","PV","PW","PX ","PY ","PZ","Paa","Pbb","Pcc","Pdd","Pee","Pff","Pgg","Phh","Pii","Pjj","Pkk"];

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
    'PC': 'Homeless Potential17+',
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
  function _drawChartDiv(title, questionNumber, size) {

    var html = '<div class="chart ' + size + '" id="id-' + Graph.charts.length + '"><h3 class="title">' + title + '</h3></div>';

    var $chart = questionNumber ? $(html).appendTo('section#question' + questionNumber) : $(html).appendTo('main');

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


  Graph.renderSeries = function(args) {
    var path = args.path || _buildPath(args.groups, args.dataType);
    var size = args.size || 'full';

    d3.csv(path, function(data) {
      var selector = _drawChartDiv(args.title, args.questionNumber, size);

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
        } else if (args.xType === 'index-1') {
          xVar = idx + 1;
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
