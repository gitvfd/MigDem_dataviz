function catEightChart(data){
	cat8Chart.selectAll("*")
		.remove();

	var dataCat8=data
	var dataCat8F=data.filter(function(d){return (d.sex=="F" )});
	var dataCat8M=data.filter(function(d){return (d.sex=="M" )});


	dataLineCat8F= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c2_2); }); })
	  .entries(dataCat8F);

	dataLineCat8M= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c2_2); }); })
	  .entries(dataCat8M);

	//SCALES LINE CHART 
	var xLineCat8 = d3.scaleTime()
	    .rangeRound([0, widthCatChart-1.5*marginCatChart]);

	var yLineCat8 = d3.scaleLinear()
	    .rangeRound([height/2-2*margin.bottom, 0]);

	var lineCat8 = d3.line()
	    .x(function(d) { return xLineCat8(parseTime(d.key)); })
	    .y(function(d) { return yLineCat8(d.value); });

	var minCat8=d3.min([d3.min(dataLineCat8F, function(d) { return d.value; }),d3.min(dataLineCat8M, function(d) { return d.value; })])
	var maxCat8=d3.max([d3.max(dataLineCat8F, function(d) { return d.value; }),d3.max(dataLineCat8M, function(d) { return d.value; })])

	xLineCat8.domain(d3.extent(dataLineCat8F, function(d) { return parseTime(d.key); }));
	yLineCat8.domain([minCat8,maxCat8]);

	  cat8Chart.append("g")
	      .attr("transform", "translate(0," + (height/2-2*margin.bottom) + ")")
	      .call(d3.axisBottom(xLineCat8).ticks(4));

	  cat8Chart.append("g")
	      .call(d3.axisLeft(yLineCat8).ticks(5))
	    /**.append("text")
	      .attr("fill", "#000")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", "0.71em")
	      .attr("text-anchor", "end")
	      .text("Active pop.")**/;

	  cat8Chart.append("path")
	      .datum(dataLineCat8F)
	      .attr("fill", "none")
	      .attr("stroke", "#DF521E")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat8);

	  cat8Chart.append("path")
	      .datum(dataLineCat8M)
	      .attr("fill", "none")
	      .attr("stroke", "#0B68AF")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat8);

	  cat8Chart
	    .append("text")
	      .attr("fill", "#DF521E")
	      .attr("x", xLineCat8(parseTime(2030)))
	      .attr("y", yLineCat8(dataLineCat8F[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat8F[3].value))
        	.attr("class", "shadow")  ;

	  cat8Chart
	    .append("text")
	      .attr("fill", "#0B68AF")
	      .attr("x", xLineCat8(parseTime(2030)))
	      .attr("y", yLineCat8(dataLineCat8M[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat8M[3].value))
        	.attr("class", "shadow")  ;
}	