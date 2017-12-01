function dataPicker(){

	var countrySel = document.getElementById("countryFilter").options[document.getElementById("countryFilter").selectedIndex].value;
	

	if (pickedCountry!=countrySel){
	  data2use= eval(countrySel);
	  pickedCountry=countrySel;

	  age1 = d3.max(data2use, function(d) { return d.age_gr ; }),
	  		year0 = d3.min(data2use, function(d) { return d.year; }),
	      	year1 = d3.max(data2use, function(d) { return d.year; }),
	      	year = year0;

	  lineChart();

	}
	else
		lineChart();


}
