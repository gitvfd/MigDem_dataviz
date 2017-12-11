function setFilters(){
    var select = d3.select("#countryFilter")
      .selectAll("option")
        .data(countryList)
        .enter().append("option")
        .attr("value", function(d) { 
          return d.ISO; })
        .text(function(d) { return d.country; });
 
     var select = d3.select("#var_migNativeFilter")
      .selectAll("option")
        .data(var_migList)
        .enter().append("option")
        .attr("value", function(d) { 
          return d.code; })
        .text(function(d) { return d.label; });


     var select = d3.select("#var_migEUFilter")
      .selectAll("option")
        .data(var_migList)
        .enter().append("option")
        .attr("value", function(d) { 
          return d.code; })
        .text(function(d) { return d.label; });

     var select = d3.select("#var_migForeignFilter")
      .selectAll("option")
        .data(var_migList)
        .enter().append("option")
        .attr("value", function(d) { 
          return d.code; })
        .text(function(d) { return d.label; });

     var select = d3.select("#var_eduFilter")
      .selectAll("option")
        .data(var_eduList)
        .enter().append("option")
        .attr("value", function(d) { 
          return d.code; })
        .text(function(d) { return d.label; });


     var select = d3.select("#var_lfrpFilter")
      .selectAll("option")
        .data(var_lfrpList)
        .enter().append("option")
        .attr("value", function(d) { 
          return d.code; })
        .text(function(d) { return d.label; });

    document.getElementById("countryFilter").value="AT";
    //document.getElementById("yearFilter").value="2015";
    document.getElementById("var_migNativeFilter").value="0";
    document.getElementById("var_migEUFilter").value="0";
    document.getElementById("var_migForeignFilter").value="0";
    document.getElementById("var_eduFilter").value="0";
    document.getElementById("var_lfrpFilter").value="0";
       
	
    dataPicker();

}