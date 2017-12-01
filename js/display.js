function display(){
 pyramidChart.selectAll("*")
 .remove();
legendChart.selectAll("*")
 .remove();




	var countrySel = document.getElementById("countryFilter").options[document.getElementById("countryFilter").selectedIndex].value;
	var var_migSel = document.getElementById("var_migFilter").options[document.getElementById("var_migFilter").selectedIndex].value;
  var var_eduSel = document.getElementById("var_eduFilter").options[document.getElementById("var_eduFilter").selectedIndex].value;
  var var_lfrpSel = document.getElementById("var_lfrpFilter").options[document.getElementById("var_lfrpFilter").selectedIndex].value;
  var yearSel= document.getElementById("myRange").value;




  // A label for the current year.
  /**var titleYear = pyramidChart.append("text")
      .attr("class", "title")
      .attr("dy", ".45em")
      .text(yearSel);**/

  var country_data=data2use.filter(function(d){return (d.country==countrySel  && d.mig_variant==var_migSel && d.edu_variant==var_eduSel && d.lfpr_variant==var_lfrpSel)});
 

  var maxPop=d3.max(country_data, function(d) { return (parseFloat(d.c0_1)+parseFloat(d.c0_2)+parseFloat(d.c0_3)+parseFloat(d.c1_1)+parseFloat(d.c1_2)+parseFloat(d.c1_3)+parseFloat(d.c2_1)+parseFloat(d.c2_2)+parseFloat(d.c2_3)); });

  var filtered_data=data2use.filter(function(d){return (d.country==countrySel  && d.mig_variant==var_migSel && d.edu_variant==var_eduSel && d.lfpr_variant==var_lfrpSel && d.year==yearSel)});
    

  function unique(x) {
      return x.reverse().filter(function (e, i, x) {return x.indexOf(e, i+1) === -1;}).reverse();
  }

 // var keys = data.columns.slice(1);
  var keys=["c0_1","c0_2","c0_3","c1_1","c1_2","c1_3","c2_1","c2_2","c2_3"];


  //data.sort(function(a, b) { return b.total - a.total; });

  x1.domain([0,maxPop]).nice();
  x2.domain([0, maxPop]).nice();
  y.domain(unique(filtered_data.map(function(d) { return d.age_gr; })));
  z.domain(keys);

  pyramidChart.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(filtered_data.filter(function(d){return d.sex=="M";})))
    .enter().append("g")
    .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) {  return d; })
    .enter().append("rect")
      .attr("class","male")
      .attr("x", function(d) { return x1(d[1]); })
      .attr("y", function(d) {  return y(d.data.age_gr); })
      .attr("width", function(d) { return x1(d[0]) - x1(d[1]); })
      .attr("height", y.bandwidth())
      .on("mouseover",function(d){
        d3.select(this)
        .style("opacity",0.5);

        var xPosition = d3.event.pageX;
        var yPosition = d3.event.pageY;

        if (yPosition>window.innerHeight-200)
        yPosition=yPosition-100;
        var value2Display=f(d[1]-d[0]);
        var cat2Display;
        if (f(d.data.c0_1)==f(value2Display)) cat2Display= "c0_1";
        else if (f(d.data.c0_2)==f(value2Display)) cat2Display= "c0_2";
        else if (f(d.data.c0_3)==f(value2Display)) cat2Display= "c0_3";
        else if (f(d.data.c1_1)==f(value2Display)) cat2Display= "c1_1";
        else if (f(d.data.c1_2)==f(value2Display)) cat2Display= "c1_2";
        else if (f(d.data.c1_3)==f(value2Display)) cat2Display= "c1_3";
        else if (f(d.data.c2_1)==f(value2Display)) cat2Display= "c2_1";
        else if (f(d.data.c2_2)==f(value2Display)) cat2Display= "c2_2";
        else if (f(d.data.c2_3)==f(value2Display)) cat2Display= "c2_3";
        

        var catLabel;
        catList.forEach(function(k){
              if (k.cat==cat2Display)
                catLabel= k.label;
          });
        d3.select("#categoryName")
          .text(catLabel)

        var sexLabel;
        if(d.data.sex=="M")
          sexLabel= "males";
        else
          sexLabel= "females";

        d3.select("#valueCategory")
          .text(f(value2Display) +" "+sexLabel + " out of:");

        d3.select("#totalPopTool")
          .text(f(d.data.tot) +" "+ sexLabel);

        d3.select("#pyramidTooltip")
          .style("left", xPosition + "px")
          .style("top", yPosition + "px") ;

        d3.select("#pyramidTooltip").classed("hidden", false);
      })
      .on("mouseout",function(d){
        d3.select(this).style("opacity", 1)
            
        //Hide the tooltip
        d3.select("#pyramidTooltip").classed("hidden", true);              

      });


  pyramidChart.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(filtered_data.filter(function(d){return d.sex=="F";})))
    .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) {  return d; })
    .enter().append("rect")
      .attr("class","female")
      .attr("x", function(d) { return x2(d[0]); })
      .attr("y", function(d) {  return y(d.data.age_gr); })
      .attr("width", function(d) { return x2(d[1]) - x2(d[0]); })
      .attr("height", y.bandwidth())
      .on("mouseover",function(d){
        d3.select(this)
        .style("opacity",0.5);

        var xPosition = d3.event.pageX;
        var yPosition = d3.event.pageY;

        if (yPosition>window.innerHeight-200)
        yPosition=yPosition-100;
        var value2Display=f(d[1]-d[0]);
        var cat2Display;
        if (f(d.data.c0_1)==f(value2Display)) cat2Display= "c0_1";
        else if (f(d.data.c0_2)==f(value2Display)) cat2Display= "c0_2";
        else if (f(d.data.c0_3)==f(value2Display)) cat2Display= "c0_3";
        else if (f(d.data.c1_1)==f(value2Display)) cat2Display= "c1_1";
        else if (f(d.data.c1_2)==f(value2Display)) cat2Display= "c1_2";
        else if (f(d.data.c1_3)==f(value2Display)) cat2Display= "c1_3";
        else if (f(d.data.c2_1)==f(value2Display)) cat2Display= "c2_1";
        else if (f(d.data.c2_2)==f(value2Display)) cat2Display= "c2_2";
        else if (f(d.data.c2_3)==f(value2Display)) cat2Display= "c2_3";

        var catLabel;
        catList.forEach(function(k){
              if (k.cat==cat2Display)
                catLabel= k.label;
          });
        d3.select("#categoryName")
          .text(catLabel)

        var sexLabel;
        if(d.data.sex=="M")
          sexLabel= "males";
        else
          sexLabel= "females";

        d3.select("#valueCategory")
          .text(f(value2Display) +" "+sexLabel + " out of:");

        d3.select("#totalPopTool")
          .text(f(d.data.tot) +" "+ sexLabel);

        d3.select("#pyramidTooltip")
          .style("left", xPosition + "px")
          .style("top", yPosition + "px") ;

        d3.select("#pyramidTooltip").classed("hidden", false);
      })
      .on("mouseout",function(d){
        d3.select(this).style("opacity", 1)
            
        //Hide the tooltip
        d3.select("#pyramidTooltip").classed("hidden", true);              

      });

  pyramidChart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate( 0," + (height-2*margin.bottom)+ ")")
      .call(d3.axisBottom(x1).ticks(5));


  pyramidChart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate("+0+ "," +  (height-2*margin.bottom) + ")")
      .call(d3.axisBottom(x2).ticks(5));


  pyramidChart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate( "+ (gap/2 + width/2) +"," + 0 + ")")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("x", -gap/2)
      .attr("y", -margin.top/2)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", 600)
      .attr("text-anchor", "middle")
      .text("Age range");

 /** window.focus();
  d3.select(window).on("keydown", function() {
    if (year==year0){
      switch (d3.event.keyCode) {
        case 39: year = parseFloat(year )+ 5; break;
      }
    }
    else if (year==year1){
      switch (d3.event.keyCode) {
        case 37: year = parseFloat(year )- 5; break;
      }
    }
    else{
      switch (d3.event.keyCode) {
        case 37: year = Math.max(parseFloat(year0), parseFloat(year - 5)); break;
        case 39: year = Math.min(parseFloat(year1), parseFloat(year + 5)); break;
      }
    }
    update();
  });**/


  function update() {
    //if (!(year in totData)) return;
    titleYear.text(year);
    document.getElementById("myRange").value=year;
    
    pyramidChart
        .selectAll(".female")
        .data(d3.stack().keys(keys)(data2use.filter(function(d){return (d.country==countrySel  && d.var_mig==var_migSel && d.year==year&& d.sex=="F")|| 0;})))
        .transition()
        .duration(750)
          .attr("x", function(d) { return x2(d[0][0]); })
          .attr("width", function(d) { return x2(d[1][1]) - x2(d[0][0]); });
      
      pyramidChart
        .selectAll(".male")
        .data(d3.stack().keys(keys)(data2use.filter(function(d){return (d.country==countrySel  && d.var_mig==var_migSel && d.year==year&& d.sex=="M")|| 0;})))
        .transition()
        .duration(750)
          .attr("x", function(d) { return x1(d[1][1]); })
          .attr("width", function(d) { return x1(d[0][0]) - x1(d[1][1]); });

  }


  /**
  *********************************************************************************************************
  *********************************************************************************************************
                                          DISPLAY LEGEND
  *********************************************************************************************************
  *********************************************************************************************************
  **/

  var legend = legendChart.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) {  return "translate("+ ( 1+ (Math.trunc(i/3))%3)*(width/3) + "," +  (i%3)* 20 + ")"; });

  legend.append("rect")
      .attr("x",  - 15)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", z);

  legend.append("text")
      .attr("x",  - 24)
      .attr("y", 7.5)
      .attr("dy", "0.32em")
      .text(function(d) { 
        var category;
        catList.forEach(function(k){
          if(d==k.cat) {
            category=k.label;
          } 

        })
        return category;
      });

  /**
  *********************************************************************************************************
  *********************************************************************************************************
                                        UPDATE LINE CHART
  *********************************************************************************************************
  *********************************************************************************************************
  **/

      compChart.selectAll(".area")
        .datum(dataLine.filter(function(d){return year0<=d.key && d.key<=yearSel}))
        .transition()
        .duration(375)
        .attr("d", area);

}
  /**
  *********************************************************************************************************
  *********************************************************************************************************
                                        UPDATE LINE CHART
  *********************************************************************************************************
  *********************************************************************************************************
  **/

d3.select("#PlayBtn").on("click",function(){
  var yearSel= document.getElementById("myRange").value;
  
  //
  // CHANGE DIVISION ACCORDING TO DATA PERIODICITY
  //
  var count=(year1-yearSel)/5;

  var advance = function() {
      var tempYear= document.getElementById("myRange").value;
      document.getElementById("myRange").value=parseFloat(tempYear)+5;
      document.getElementById("yearOutputId").innerHTML=parseFloat(tempYear)+5;
      count=count-1;
      display();
      run();
  }

  var run= function(){
    if(count>0)
      setTimeout(function(){advance()}, 1000);
  }
 
  if(count>0)
    setTimeout(function(){advance()}, 500);
  else
    alert("you already reached the latest year")
  

})