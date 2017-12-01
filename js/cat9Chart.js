function catNineChart(data){
	cat9Chart.selectAll("*")
		.remove();

	var dataCat9=data
	var dataCat9F=data.filter(function(d){return (d.sex=="F" )});
	var dataCat9M=data.filter(function(d){return (d.sex=="M" )});


	dataLineCat9F= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c2_3); }); })
	  .entries(dataCat9F);

	dataLineCat9M= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c2_3); }); })
	  .entries(dataCat9M);

	//SCALES LINE CHART 
	var xLineCat9 = d3.scaleTime()
	    .rangeRound([0, widthCatChart-1.5*marginCatChart]);

	var yLineCat9 = d3.scaleLinear()
	    .rangeRound([height/2-2*margin.bottom, 0]);

	var lineCat9 = d3.line()
	    .x(function(d) { return xLineCat9(parseTime(d.key)); })
	    .y(function(d) { return yLineCat9(d.value); });

	var minCat9=d3.min([d3.min(dataLineCat9F, function(d) { return d.value; }),d3.min(dataLineCat9M, function(d) { return d.value; })])
	var maxCat9=d3.max([d3.max(dataLineCat9F, function(d) { return d.value; }),d3.max(dataLineCat9M, function(d) { return d.value; })])

	xLineCat9.domain(d3.extent(dataLineCat9F, function(d) { return parseTime(d.key); }));
	yLineCat9.domain([minCat9,maxCat9]);

	  cat9Chart.append("g")
	      .attr("transform", "translate(0," + (height/2-2*margin.bottom) + ")")
	      .call(d3.axisBottom(xLineCat9).ticks(4));

	  cat9Chart.append("g")
	      .call(d3.axisLeft(yLineCat9).ticks(5))
	    .append("text")
	      .attr("fill", "#000")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", "0.71em")
	      .attr("text-anchor", "end")
	      .text("Active pop.");

	  cat9Chart.append("path")
	      .datum(dataLineCat9F)
	      .attr("fill", "none")
	      .attr("stroke", "#DF521E")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat9);

	  cat9Chart.append("path")
	      .datum(dataLineCat9M)
	      .attr("fill", "none")
	      .attr("stroke", "#0B68AF")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat9);

	  cat9Chart
	    .append("text")
	      .attr("fill", "#DF521E")
	      .attr("x", xLineCat9(parseTime(2030)))
	      .attr("y", yLineCat9(dataLineCat9F[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat9F[3].value))
        	.attr("class", "shadow")  ;

	  cat9Chart
	    .append("text")
	      .attr("fill", "#0B68AF")
	      .attr("x", xLineCat9(parseTime(2030)))
	      .attr("y", yLineCat9(dataLineCat9M[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat9M[3].value))
        	.attr("class", "shadow")  ;
}	