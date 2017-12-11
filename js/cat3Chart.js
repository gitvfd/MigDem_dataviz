function catThreeChart(data){
	cat3Chart.selectAll("*")
		.remove();

	var dataCat3=data
	var dataCat3F=data.filter(function(d){return (d.sex=="F" )});
	var dataCat3M=data.filter(function(d){return (d.sex=="M" )});


	dataLineCat3F= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c0_3); }); })
	  .entries(dataCat3F);

	dataLineCat3M= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c0_3); }); })
	  .entries(dataCat3M);

	//SCALES LINE CHART 
	var xLineCat3 = d3.scaleTime()
	    .rangeRound([0, widthCatChart-1.5*marginCatChart]);

	var yLineCat3 = d3.scaleLinear()
	    .rangeRound([height/2-2*margin.bottom, 0]);

	var lineCat3 = d3.line()
	    .x(function(d) { return xLineCat3(parseTime(d.key)); })
	    .y(function(d) { return yLineCat3(d.value); });

	var minCat3=d3.min([d3.min(dataLineCat3F, function(d) { return d.value; }),d3.min(dataLineCat3M, function(d) { return d.value; })])
	var maxCat3=d3.max([d3.max(dataLineCat3F, function(d) { return d.value; }),d3.max(dataLineCat3M, function(d) { return d.value; })])

	xLineCat3.domain(d3.extent(dataLineCat3F, function(d) { return parseTime(d.key); }));
	yLineCat3.domain([minCat3,maxCat3]);

	  cat3Chart.append("g")
	      .attr("transform", "translate(0," + (height/2-2*margin.bottom) + ")")
	      .call(d3.axisBottom(xLineCat3).ticks(4));

	  cat3Chart.append("g")
	  		.attr("class",'y axis comp')
	      .call(d3.axisLeft(yLineCat3).ticks(5))
	    /**.append("text")
	      .attr("fill", "#000")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", "0.71em")
	      .attr("text-anchor", "end")
	      .text("Active pop.")**/;

	  cat3Chart.append("path")
	      .datum(dataLineCat3F)
	      .attr("fill", "none")
	      .attr("stroke", "#DF521E")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat3);

	  cat3Chart.append("path")
	      .datum(dataLineCat3M)
	      .attr("fill", "none")
	      .attr("stroke", "#0B68AF")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat3);

	  cat3Chart
	    .append("text")
	      .attr("fill", "#DF521E")
	      .attr("x", xLineCat3(parseTime(2030)))
	      .attr("y", yLineCat3(dataLineCat3F[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat3F[3].value))
        	.attr("class", "shadow")  ;

	  cat3Chart
	    .append("text")
	      .attr("fill", "#0B68AF")
	      .attr("x", xLineCat3(parseTime(2030)))
	      .attr("y", yLineCat3(dataLineCat3M[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat3M[3].value))
        	.attr("class", "shadow")  ;
}	