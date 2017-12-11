function catOneChart(data){
	
	cat1Chart.selectAll("*")
		.remove();

	var dataCat1=data
	var dataCat1F=data.filter(function(d){return (d.sex=="F" )});
	var dataCat1M=data.filter(function(d){return (d.sex=="M" )});


	dataLineCat1F= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c0_1); }); })
	  .entries(dataCat1F);

	dataLineCat1M= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return parseFloat(d.c0_1); }); })
	  .entries(dataCat1M);

	//SCALES LINE CHART 
	var xLineCat1 = d3.scaleTime()
	    .rangeRound([0, widthCatChart-1.5*marginCatChart]);

	var yLineCat1 = d3.scaleLinear()
	    .rangeRound([height/2-2*margin.bottom, 0]);

	var lineCat1 = d3.line()
	    .x(function(d) { return xLineCat1(parseTime(d.key)); })
	    .y(function(d) { return yLineCat1(d.value); });

	var minCat1=d3.min([d3.min(dataLineCat1F, function(d) { return d.value; }),d3.min(dataLineCat1M, function(d) { return d.value; })])
	var maxCat1=d3.max([d3.max(dataLineCat1F, function(d) { return d.value; }),d3.max(dataLineCat1M, function(d) { return d.value; })])

	xLineCat1.domain(d3.extent(dataLineCat1F, function(d) { return parseTime(d.key); }));
	yLineCat1.domain([minCat1,maxCat1]);

	  cat1Chart.append("g")
	      .attr("transform", "translate(0," + (height/2-2*margin.bottom) + ")")
	      .call(d3.axisBottom(xLineCat1).ticks(4));

	  cat1Chart.append("g")
	  		.attr("class",'y axis comp')
	      .call(d3.axisLeft(yLineCat1).ticks(5))
	    /**.append("text")
	      .attr("fill", "#000")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", "0.71em")
	      .attr("text-anchor", "end")
	      .text("Active pop.")**/;

	  cat1Chart.append("path")
	      .datum(dataLineCat1F)
	      .attr("fill", "none")
	      .attr("stroke", "#DF521E")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat1);

	  cat1Chart.append("path")
	      .datum(dataLineCat1M)
	      .attr("fill", "none")
	      .attr("stroke", "#0B68AF")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", lineCat1);

	  cat1Chart
	    .append("text")
	      .attr("fill", "#DF521E")
	      .attr("x", xLineCat1(parseTime(2030)))
	      .attr("y", yLineCat1(dataLineCat1F[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat1F[3].value))  
        	.attr("class", "shadow")  ;

	  cat1Chart
	    .append("text")
	      .attr("fill", "#0B68AF")
	      .attr("x", xLineCat1(parseTime(2030)))
	      .attr("y", yLineCat1(dataLineCat1M[3].value))
	      .attr("dy", "-0.4em")
	      .attr("text-anchor", "end")
	      .text(f2(dataLineCat1M[3].value))  
        	.attr("class", "shadow")  ;
}	