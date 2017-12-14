function dataPicker(){

	var countrySel = document.getElementById("countryFilter").options[document.getElementById("countryFilter").selectedIndex].value;
	
	if (pickedCountry!=countrySel){
	/**var test=eval(countrySel);
	test.forEach(function(d){
	  	data2use.push(d);
	  });
	  test.forEach(function(d){
	  	data2useEU.push(d);
	  });
	  test.forEach(function(d){
	  	data2useForeign.push(d);
	  });**/
	  	//data2use = eval(countrySel);
	  	countrySel_NAT = countrySel + "_NAT"
	  	countrySel_EU = countrySel + "_EU"
	  	countrySel_FOR = countrySel + "_FOR"

		data2use_Nat = eval(countrySel_NAT);
		data2use_EU = eval(countrySel_EU);
		data2use_For = eval(countrySel_FOR);

console.log(data2use_Nat)
	/**var test=[];
	  data2use.forEach(function(v){
		  data2use.forEach(function(d){
			if(v.edu_variant==d.edu_variant && v.lfpr_variant==d.lfpr_variant&& v.age_gr==d.age_gr && v.sex==d.sex && v.year==d.year){
				v.
			}

		  })
		  test.push(v)
	  })**/
	  pickedCountry=countrySel;

	  age1 = d3.max(data2use_Nat, function(d) { return d.age_gr ; }),
	  		year0 = d3.min(data2use_Nat, function(d) { return d.year; }),
	      	year1 = d3.max(data2use_Nat, function(d) { return d.year; }),
	      	year = year0;

	  lineChart();

	}
	else
		lineChart();


}
