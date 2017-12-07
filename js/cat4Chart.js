function catFourChart(data){
	cat4Chart.selectAll("*")
		.remove();

	var dataCat4=data
	var dataCat4F=data.filter(function(d){return (d.sex=="F" )});
	var dataCat4M=data.filter(function(d){return (d.sex=="M" )});


	dataLineCat4F= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c1_1); }); })
	  .entries(dataCat4F);

	dataLineCat4M= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c1_1); }); })
	  .entries(dataCat4M);

	//SCALES LINE CHART 
	var xLineCat4 = d3.scaleTime()
	    .rangeRound([0, widthCatChart-1.5*marginCatChart]);

	var yLineCat4 = d3.scaleLinear()
	    .rangeRound([height/2-2*margin.bottom, 0]);

	var lineCat4 = d3.line()
	    .x(function(d) { return xLineCat4(parseTime(d.key)); })
	    .y(function(d) { return yLineCat4(d.value); });

	var minCat4=d3.min([d3.min(dataLineCat4F, function(d) { return d.value; }),d3.min(dataLineCat4M, function(d) { return d.value; })])
	var maxCat4=d3.max([d3.max(dataLineCat4F, function(d) { return d.value; }),d3.max(dataLineCat4M, function(d) { return d.value; })])

	xLineCat4.domain(d3.extent(dataLineCat4F, function(d) { return parseTime(d.key); }));
	yLineCat4.domain([minCat4,maxCat4]);

	  cat4Chart.append("g")
	      .attr("transform", "translate(0," + (height/2-2*margin.bottom) + ")")
	      .call(d3.axisBottom(xLineCat4).ticks(4));

	  cat4Chart.append("g")
	      .call(d3.axisLeft(yLineCat4).ticks(5))
	    /**.append("text")
	      .attr("fill", "#000")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", "0.71em")
	      .attr("text-anchor", "end")
	      .text("Active pop.")**/;

	  cat4Chart.append("path")
	      .datum(dataLineCat4F)
	      .attr("fill", "none")
	      .attr("stroke", "#DF521E")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat4);

	  cat4Chart.append("path")
	      .datum(dataLineCat4M)
	      .attr("fill", "none")
	      .attr("stroke", "#0B68AF")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat4);

	  cat4Chart
	    .append("text")
	      .attr("fill", "#DF521E")
	      .attr("x", xLineCat4(parseTime(2030)))
	      .attr("y", yLineCat4(dataLineCat4F[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat4F[3].value))
        	.attr("class", "shadow")  ;

	  cat4Chart
	    .append("text")
	      .attr("fill", "#0B68AF")
	      .attr("x", xLineCat4(parseTime(2030)))
	      .attr("y", yLineCat4(dataLineCat4M[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat4M[3].value))
        	.attr("class", "shadow")  ;
}	