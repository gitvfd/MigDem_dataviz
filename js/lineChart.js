function lineChart(){
	

	compChart.selectAll("*")
		.remove();



	var countrySel = document.getElementById("countryFilter").options[document.getElementById("countryFilter").selectedIndex].value;
	var var_eduSel = document.getElementById("var_eduFilter").options[document.getElementById("var_eduFilter").selectedIndex].value;
  	var var_lfrpSel = document.getElementById("var_lfrpFilter").options[document.getElementById("var_lfrpFilter").selectedIndex].value;

  	var var_migSelNative = document.getElementById("var_migNativeFilter").options[document.getElementById("var_migNativeFilter").selectedIndex].value;
  	var var_migSelEU = document.getElementById("var_migEUFilter").options[document.getElementById("var_migEUFilter").selectedIndex].value;
  	var var_migSelForeign = document.getElementById("var_migForeignFilter").options[document.getElementById("var_migForeignFilter").selectedIndex].value;
  	var yearSel= document.getElementById("myRange").value;

  var data=data2use.filter(function(d){return (d.country==countrySel  && d.edu_variant==var_eduSel && d.lfpr_variant==var_lfrpSel && d.mig_variant==var_migSelNative)})
  
  var data2=data2use.filter(function(d){return ((d.country==countrySel  && d.edu_variant==var_eduSel && d.lfpr_variant==var_lfrpSel && d.mig_variant==var_migSelNative)||(d.country==countrySel  && d.edu_variant==var_eduSel && d.lfpr_variant==var_lfrpSel && d.mig_variant==var_migSelEU)||(d.country==countrySel  && d.edu_variant==var_eduSel && d.lfpr_variant==var_lfrpSel && d.mig_variant==var_migSelForeign)) });
  
  data2.forEach(function(d){
    data.forEach(function(v){
      if(d.edu_variant==v.edu_variant && d.lfpr_variant==v.lfpr_variant&& d.age_gr==v.age_gr && d.sex==v.sex && d.year==v.year){
        if(d.mig_variant==var_migSelNative){
          v.c0_1=d.c0_1;
          v.c0_2=d.c0_2;
          v.c0_3=d.c0_3;
        }else if(d.mig_variant==var_migSelEU){
          v.c1_1=d.c1_1;
          v.c1_2=d.c1_2;
          v.c1_3=d.c1_3;
        }else if(d.mig_variant==var_migSelEU){
          v.c2_1=d.c2_1;
          v.c2_2=d.c2_2;
          v.c2_3=d.c2_3;
        }
      }
    })
  })

	//var data=data2use.filter(function(d){return (d.country==countrySel  && d.mig_variant==var_migSel && d.edu_variant==var_eduSel && d.lfpr_variant==var_lfrpSel )});

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
	    .y0(height/3-2*margin.bottom)
	    .y1(function(d) { return yLine(d.value); });


	xLine.domain(d3.extent(dataLine, function(d) { return parseTime(d.key); }));
	yLine.domain(d3.extent(dataLine, function(d) { return d.value; }));

	  compChart.append("g")
	  .attr("class","x axis")
	      .attr("transform", "translate(0," + (height/3-2*margin.bottom) + ")")
	      .call(d3.axisBottom(xLine).ticks(4));

	  compChart.append("g")
	  .attr("class","y axis lineTot")
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