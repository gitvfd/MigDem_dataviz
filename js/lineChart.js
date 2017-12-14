function lineChart(){
	

	compChart.selectAll("*")
		.remove();


    var countrySel = document.getElementById("countryFilter").options[document.getElementById("countryFilter").selectedIndex].value;

    var eduSel = document.getElementById("var_eduFilter").options[document.getElementById("var_eduFilter").selectedIndex].value;
    var lfrpSel = document.getElementById("var_lfrpFilter").options[document.getElementById("var_lfrpFilter").selectedIndex].value;
    var NativemigSel = document.getElementById("var_migNativeFilter").options[document.getElementById("var_migNativeFilter").selectedIndex].value;
    var EUmigSel = document.getElementById("var_migEUFilter").options[document.getElementById("var_migEUFilter").selectedIndex].value;
    var ForeignmigSel = document.getElementById("var_migForeignFilter").options[document.getElementById("var_migForeignFilter").selectedIndex].value;
    var yearSel= document.getElementById("myRange").value;

    var data=[];   

var tempNat=data2use_Nat.filter(function(d){return (d.edu_variant==eduSel && d.lfpr_variant==lfrpSel && d.mig_variant==NativemigSel)})
var tempEU=data2use_EU.filter(function(d){return (d.edu_variant==eduSel && d.lfpr_variant==lfrpSel && d.mig_variant==EUmigSel)})
var tempForeign=data2use_For.filter(function(d){return (d.edu_variant==eduSel && d.lfpr_variant==lfrpSel && d.mig_variant==ForeignmigSel)})
  

      tempNat.forEach(function(v){
        tempEU.forEach(function(d){
          if(v.edu_variant==d.edu_variant && v.lfpr_variant==d.lfpr_variant&& v.age_gr==d.age_gr && v.sex==d.sex && v.year==d.year){
              v.c1_1=d.c1_1;
              v.c1_2=d.c1_2;
              v.c1_3=d.c1_3;     
              v.var_mig_EU=EUmigSel;
          }
        })
        tempForeign.forEach(function(d){
          if(v.edu_variant==d.edu_variant && v.lfpr_variant==d.lfpr_variant&& v.age_gr==d.age_gr && v.sex==d.sex && v.year==d.year){
              v.c2_1=d.c2_1;
              v.c2_2=d.c2_2;
              v.c2_3=d.c2_3;     
              v.var_mig_Foreign=ForeignmigSel;
          }
        })
        data.push(v)
      })
    
    
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