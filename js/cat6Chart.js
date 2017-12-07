function catSixChart(data){
	cat6Chart.selectAll("*")
		.remove();

	var dataCat6=data
	var dataCat6F=data.filter(function(d){return (d.sex=="F" )});
	var dataCat6M=data.filter(function(d){return (d.sex=="M" )});


	dataLineCat6F= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c1_3); }); })
	  .entries(dataCat6F);

	dataLineCat6M= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c1_3); }); })
	  .entries(dataCat6M);

	//SCALES LINE CHART 
	var xLineCat6 = d3.scaleTime()
	    .rangeRound([0, widthCatChart-1.5*marginCatChart]);

	var yLineCat6 = d3.scaleLinear()
	    .rangeRound([height/2-2*margin.bottom, 0]);

	var lineCat6 = d3.line()
	    .x(function(d) { return xLineCat6(parseTime(d.key)); })
	    .y(function(d) { return yLineCat6(d.value); });

	var minCat6=d3.min([d3.min(dataLineCat6F, function(d) { return d.value; }),d3.min(dataLineCat6M, function(d) { return d.value; })])
	var maxCat6=d3.max([d3.max(dataLineCat6F, function(d) { return d.value; }),d3.max(dataLineCat6M, function(d) { return d.value; })])

	xLineCat6.domain(d3.extent(dataLineCat6F, function(d) { return parseTime(d.key); }));
	yLineCat6.domain([minCat6,maxCat6]);

	  cat6Chart.append("g")
	      .attr("transform", "translate(0," + (height/2-2*margin.bottom) + ")")
	      .call(d3.axisBottom(xLineCat6).ticks(4));

	  cat6Chart.append("g")
	      .call(d3.axisLeft(yLineCat6).ticks(5))
	    /**.append("text")
	      .attr("fill", "#000")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", "0.71em")
	      .attr("text-anchor", "end")
	      .text("Active pop.")**/;

	  cat6Chart.append("path")
	      .datum(dataLineCat6F)
	      .attr("fill", "none")
	      .attr("stroke", "#DF521E")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat6);

	  cat6Chart.append("path")
	      .datum(dataLineCat6M)
	      .attr("fill", "none")
	      .attr("stroke", "#0B68AF")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat6);

	  cat6Chart
	    .append("text")
	      .attr("fill", "#DF521E")
	      .attr("x", xLineCat6(parseTime(2030)))
	      .attr("y", yLineCat6(dataLineCat6F[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat6F[3].value))
        	.attr("class", "shadow")  ;

	  cat6Chart
	    .append("text")
	      .attr("fill", "#0B68AF")
	      .attr("x", xLineCat6(parseTime(2030)))
	      .attr("y", yLineCat6(dataLineCat6M[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat6M[3].value))
        	.attr("class", "shadow")  ;
}	