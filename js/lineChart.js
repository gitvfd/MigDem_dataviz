function lineChart(){
	

	compChart.selectAll("*")
		.remove();


	var countrySel = document.getElementById("countryFilter").options[document.getElementById("countryFilter").selectedIndex].value;
	var var_migSel = document.getElementById("var_migFilter").options[document.getElementById("var_migFilter").selectedIndex].value;
	var var_eduSel = document.getElementById("var_eduFilter").options[document.getElementById("var_eduFilter").selectedIndex].value;
	var var_lfrpSel = document.getElementById("var_lfrpFilter").options[document.getElementById("var_lfrpFilter").selectedIndex].value;



	var data=data2use.filter(function(d){return (d.country==countrySel  && d.mig_variant==var_migSel && d.edu_variant==var_eduSel && d.lfpr_variant==var_lfrpSel )});

	data.forEach(function(v){
		v.tot=parseFloat(v.c0_1)+parseFloat(v.c0_2)+parseFloat(v.c0_3)+parseFloat(v.c1_1)+parseFloat(v.c1_2)+parseFloat(v.c1_3)+parseFloat(v.c2_1)+parseFloat(v.c2_2)+parseFloat(v.c2_3)
	})

	dataLine= d3.nest()
	  .key(function(d) { return d.year; })
	  .rollup(function(v) {return d3.sum(v, function(d) { return d.tot; }); })
	  .entries(data);


	var line = d3.line()
	    .x(function(d) { return xLine(parseTime(d.key)); })
	    .y(function(d) { return yLine(d.value); });



	 area.x(function(d) { return xLine(parseTime(d.key)); })
	    .y0(height/2-2*margin.bottom)
	    .y1(function(d) { return yLine(d.value); });


	xLine.domain(d3.extent(dataLine, function(d) { return parseTime(d.key); }));
	yLine.domain(d3.extent(dataLine, function(d) { return d.value; }));

	  compChart.append("g")
	      .attr("transform", "translate(0," + (height/2-2*margin.bottom) + ")")
	      .call(d3.axisBottom(xLine).ticks(4));

	  compChart.append("g")
	      .call(d3.axisLeft(yLine).ticks(5))
	    /**.append("text")
	      .attr("fill", "#000")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", "0.71em")
	      .attr("text-anchor", "end")
	      .text("Active pop.")**/;

	  compChart.append("path")
	      .datum(dataLine)
	      .attr("fill", "none")
	      .attr("stroke", "#8EA4B1")
	      .attr("stroke-linejoin", "round")
	      .attr("stroke-linecap", "round")
	      .attr("stroke-width", 3)
	      .attr("d", line);

	  // add the area
	    compChart.append("path")
	       .datum(dataLine)
	       .attr("class", "area")
	       .attr("d", area);
	    
	    compChart.append("path")
	       .datum(dataLine)
	       .attr("class", "area")
	       .attr("d", area);

	catChart(data);
	display();
}