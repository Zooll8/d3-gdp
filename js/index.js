'use strict';

var gdpdata = [];
function month(x) {
   switch (x) {
      case '10':
         return 'September';
         break;
      case '01':
         return 'January';
         break;
      case '04':
         return 'April';
         break;
      case '07':
         return 'June';
         break;
   }
}
function kek() {
   var w = 800;
   var h = 500;
   var padding = 20;

   var xScale = d3.scaleLinear().domain([d3.min(gdpdata, function (d) {
      return Number(d[0].split('-')[0]);
   }), d3.max(gdpdata, function (d) {
      return Number(d[0].split('-')[0]);
   })]).range([0, w - 70]);

   var yScale = d3.scaleLinear().domain([0, d3.max(gdpdata, function (d) {
      return d[1];
   })]).range([0, h - padding * 2 - 50]);

   var leftScale = d3.scaleLinear().domain([0, d3.max(gdpdata, function (d) {
      return d[1];
   })]).range([h - padding, padding + 50]);
   var svg = d3.select(".render").append("svg").attr("width", w).attr("height", h);

   svg.selectAll("rect").data(gdpdata).enter().append("rect").attr("x", function (d, i) {
      return i * ((w - 70) / gdpdata.length) + 50;
   }).attr("y", function (d) {
      return h - yScale(d[1]) - padding - 50;
   }).attr("width", w / (gdpdata.length - 70)).attr("height", function (d) {
      return yScale(d[1]);
   }).attr('class', 'bar').on("mouseover", function (d) {
      d3.select(this).style('fill', 'lightgrey');
      div.transition().duration(200).style("opacity", .9);
      div.html('$' + d[1] + ' Billion<br/>' + d[0].split('-')[0] + ' ' + month(d[0].split('-')[1])).style("left", d3.event.pageX + "px").style("top", d3.event.pageY - 28 + "px");
   }).on("mouseout", function (d) {
      d3.select(this).style('fill', '#40e0d0');
      div.transition().duration(500).style("opacity", 0);
   });
   var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
   var yAxis = d3.axisLeft().scale(leftScale).ticks(15).tickFormat(d3.format(''));
   var xAxis = d3.axisBottom().scale(xScale).ticks(15).tickFormat(d3.format(''));
   svg.append('g').call(yAxis).attr('class', 'axis').attr('transform', 'translate(' + 50 + ',' + -50 + ')');
   svg.append('g').call(xAxis).attr('class', 'axis').attr('transform', 'translate(' + 50 + ',' + (h - 70) + ')');

   svg.append('text').text('Gross Domestic Product').attr('x', w / 2 - 165).attr('y', 45).style('font-size', '40px').style('font-weight', 'bold').style('font-family', 'Fira Sans Extra Condensed, sans-serif');

   svg.append('text').text('Gross Domestic Product, USA').attr('transform', "translate(69,200)rotate(270)").style('font-size', '17px').style('font-family', 'Fira Sans Extra Condensed, sans-serif');
}
d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function (error, objectdata) {
   for (var i = 0; i < objectdata.data.length; i++) {
      gdpdata.push(objectdata.data[i]);
   }
   kek();
});