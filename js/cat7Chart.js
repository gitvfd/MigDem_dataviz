function catSevenChart(data){
	cat7Chart.selectAll("*")
		.remove();

	var dataCat7=data
	var dataCat7F=data.filter(function(d){return (d.sex=="F" )});
	var dataCat7M=data.filter(function(d){return (d.sex=="M" )});


	dataLineCat7F= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c2_1); }); })
	  .entries(dataCat7F);

	dataLineCat7M= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c2_1); }); })
	  .entries(dataCat7M);

	//SCALES LINE CHART 
	var xLineCat7 = d3.scaleTime()
	    .rangeRound([0, widthCatChart-1.5*marginCatChart]);

	var yLineCat7 = d3.scaleLinear()
	    .rangeRound([height/2-2*margin.bottom, 0]);

	var lineCat7 = d3.line()
	    .x(function(d) { return xLineCat7(parseTime(d.key)); })
	    .y(function(d) { return yLineCat7(d.value); });

	var minCat7=d3.min([d3.min(dataLineCat7F, function(d) { return d.value; }),d3.min(dataLineCat7M, function(d) { return d.value; })])
	var maxCat7=d3.max([d3.max(dataLineCat7F, function(d) { return d.value; }),d3.max(dataLineCat7M, function(d) { return d.value; })])

	xLineCat7.domain(d3.extent(dataLineCat7F, function(d) { return parseTime(d.key); }));
	yLineCat7.domain([minCat7,maxCat7]);

	  cat7Chart.append("g")
	      .attr("transform", "translate(0," + (height/2-2*margin.bottom) + ")")
	      .call(d3.axisBottom(xLineCat7).ticks(4));

	  cat7Chart.append("g")
	      .call(d3.axisLeft(yLineCat7).ticks(5))
	    .append("text")
	      .attr("fill", "#000")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", "0.71em")
	      .attr("text-anchor", "end")
	      .text("Active pop.");

	  cat7Chart.append("path")
	      .datum(dataLineCat7F)
	      .attr("fill", "none")
	      .attr("stroke", "#DF521E")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat7);

	  cat7Chart.append("path")
	      .datum(dataLineCat7M)
	      .attr("fill", "none")
	      .attr("stroke", "#0B68AF")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat7);

	  cat7Chart
	    .append("text")
	      .attr("fill", "#DF521E")
	      .attr("x", xLineCat7(parseTime(2030)))
	      .attr("y", yLineCat7(dataLineCat7F[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat7F[3].value))
        	.attr("class", "shadow")  ;

	  cat7Chart
	    .append("text")
	      .attr("fill", "#0B68AF")
	      .attr("x", xLineCat7(parseTime(2030)))
	      .attr("y", yLineCat7(dataLineCat7M[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat7M[3].value))
        	.attr("class", "shadow")  ;
}	