function catFiveChart(data){
	cat5Chart.selectAll("*")
		.remove();

	var dataCat5=data
	var dataCat5F=data.filter(function(d){return (d.sex=="F" )});
	var dataCat5M=data.filter(function(d){return (d.sex=="M" )});


	dataLineCat5F= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c1_2); }); })
	  .entries(dataCat5F);

	dataLineCat5M= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c1_2); }); })
	  .entries(dataCat5M);

	//SCALES LINE CHART 
	var xLineCat5 = d3.scaleTime()
	    .rangeRound([0, widthCatChart-1.5*marginCatChart]);

	var yLineCat5 = d3.scaleLinear()
	    .rangeRound([height/2-2*margin.bottom, 0]);

	var lineCat5 = d3.line()
	    .x(function(d) { return xLineCat5(parseTime(d.key)); })
	    .y(function(d) { return yLineCat5(d.value); });

	var minCat5=d3.min([d3.min(dataLineCat5F, function(d) { return d.value; }),d3.min(dataLineCat5M, function(d) { return d.value; })])
	var maxCat5=d3.max([d3.max(dataLineCat5F, function(d) { return d.value; }),d3.max(dataLineCat5M, function(d) { return d.value; })])

	xLineCat5.domain(d3.extent(dataLineCat5F, function(d) { return parseTime(d.key); }));
	yLineCat5.domain([minCat5,maxCat5]);

	  cat5Chart.append("g")
	      .attr("transform", "translate(0," + (height/2-2*margin.bottom) + ")")
	      .call(d3.axisBottom(xLineCat5).ticks(4));

	  cat5Chart.append("g")
	      .call(d3.axisLeft(yLineCat5).ticks(5))
	    /**.append("text")
	      .attr("fill", "#000")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", "0.71em")
	      .attr("text-anchor", "end")
	      .text("Active pop.")**/;

	  cat5Chart.append("path")
	      .datum(dataLineCat5F)
	      .attr("fill", "none")
	      .attr("stroke", "#DF521E")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat5);

	  cat5Chart.append("path")
	      .datum(dataLineCat5M)
	      .attr("fill", "none")
	      .attr("stroke", "#0B68AF")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat5);

	  cat5Chart
	    .append("text")
	      .attr("fill", "#DF521E")
	      .attr("x", xLineCat5(parseTime(2030)))
	      .attr("y", yLineCat5(dataLineCat5F[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat5F[3].value))
        	.attr("class", "shadow")  ;

	  cat5Chart
	    .append("text")
	      .attr("fill", "#0B68AF")
	      .attr("x", xLineCat5(parseTime(2030)))
	      .attr("y", yLineCat5(dataLineCat5M[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat5M[3].value))
        	.attr("class", "shadow")  ;
}	