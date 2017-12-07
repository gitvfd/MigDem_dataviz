function catTwoChart(data){
	cat2Chart.selectAll("*")
		.remove();

	var dataCat2=data
	var dataCat2F=data.filter(function(d){return (d.sex=="F" )});
	var dataCat2M=data.filter(function(d){return (d.sex=="M" )});


	dataLineCat2F= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c0_2); }); })
	  .entries(dataCat2F);

	dataLineCat2M= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c0_2); }); })
	  .entries(dataCat2M);

	//SCALES LINE CHART 
	var xLineCat2 = d3.scaleTime()
	    .rangeRound([0, widthCatChart-1.5*marginCatChart]);

	var yLineCat2 = d3.scaleLinear()
	    .rangeRound([height/2-2*margin.bottom, 0]);

	var lineCat2 = d3.line()
	    .x(function(d) { return xLineCat2(parseTime(d.key)); })
	    .y(function(d) { return yLineCat2(d.value); });

	var minCat2=d3.min([d3.min(dataLineCat2F, function(d) { return d.value; }),d3.min(dataLineCat2M, function(d) { return d.value; })])
	var maxCat2=d3.max([d3.max(dataLineCat2F, function(d) { return d.value; }),d3.max(dataLineCat2M, function(d) { return d.value; })])

	xLineCat2.domain(d3.extent(dataLineCat2F, function(d) { return parseTime(d.key); }));
	yLineCat2.domain([minCat2,maxCat2]);

	  cat2Chart.append("g")
	      .attr("transform", "translate(0," + (height/2-2*margin.bottom) + ")")
	      .call(d3.axisBottom(xLineCat2).ticks(4));

	  cat2Chart.append("g")
	      .call(d3.axisLeft(yLineCat2).ticks(5))
	    /**.append("text")
	      .attr("fill", "#000")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", "0.71em")
	      .attr("text-anchor", "end")
	      .text("Active pop.")**/;

	  cat2Chart.append("path")
	      .datum(dataLineCat2F)
	      .attr("fill", "none")
	      .attr("stroke", "#DF521E")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat2);

	  cat2Chart.append("path")
	      .datum(dataLineCat2M)
	      .attr("fill", "none")
	      .attr("stroke", "#0B68AF")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat2);

	  cat2Chart
	    .append("text")
	      .attr("fill", "#DF521E")
	      .attr("x", xLineCat2(parseTime(2030)))
	      .attr("y", yLineCat2(dataLineCat2F[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat2F[3].value))
        	.attr("class", "shadow")  ;

	  cat2Chart
	    .append("text")
	      .attr("fill", "#0B68AF")
	      .attr("x", xLineCat2(parseTime(2030)))
	      .attr("y", yLineCat2(dataLineCat2M[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat2M[3].value))
        	.attr("class", "shadow")  ;
}	