charts = [];
timeOfDayDims = ['T1-5', 'T5-8', 'T8-9', 'T9-1' ];

d3.csv('/data/groupByYearMonth.csv', function(data) {
  this.keys = Object.keys(data[0]);

  timeOfDaysDims = this.keys.slice(5, 9);
  rando = this.keys.slice(26, 63);

  // render('groupByYear.csv', timeOfDayDims);
  render('groupByWeekday.csv', timeOfDayDims);
  render('groupByYearMonth.csv', timeOfDayDims, 'lineWithFocusChart');
  // render('groupByYearMonth.csv', timeOfDayDims, 'lineChart');
  render('groupByYearMonth.csv', rando, 'multiBarChart');
});

function _drawChartDiv() {

  var html = '<div class="chart" id="id-' + this.charts.length + '"><svg></svg></div>';
  var $chart = $(html).appendTo('body');

  this.charts.push($chart[0]);
  return $chart[0].children[0];
}
function render(path, dims, chartType) {
  var chartType = chartType || 'multiBarChart';
  var selector = this._drawChartDiv();
  d3.csv('/data/' + path, function(data) {
    var summaryData = rollup(data, dims);
    console.log(summaryData);
    nv.addGraph(function() {

      var chart = nv.models[chartType]();
                   // .useInteractiveGuideline(true);

      chart.xAxis
           .tickFormat(function(d) {
             if ((new Date(d))) {
               return d3.time.format('%m/%Y')(new Date(d));
             } else {
               return d3.format('d')(d);
             }
           });

      if (chart.x2Axis) {
        chart.x2Axis
             .tickFormat(function(d) {
               return d3.time.format('%m/%Y')(new Date(d));
             });
      }

      chart.yAxis
           .tickFormat(d3.format(',.2f'));

      d3.select(selector)
        .datum(summaryData)
        .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
      
    });
  });

}


function rollup(data, dims, groups) {
  var result = [],
      temp,
      x;

  dims.forEach(function(dim) {
    temp = data.map(function(row, idx) {
      if (row.weekday) {
        x = row.weekday;
      } else {
        x = new Date(row.year, row.month);
      }
      return {
        x: x,
        y: +row[dim]
      };
    });

    result.push({
      key: dim,
      values: temp
    });
  });

  return result;
}
