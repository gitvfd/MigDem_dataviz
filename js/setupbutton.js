function setupButtons() {
    d3.select('#toolbar')
      .selectAll('.button')
      .on('click', function () {
        // Remove active class from all buttons
        d3.selectAll('.button').classed('active', false);
        // Find the button just clicked
        var button = d3.select(this);

        // Set it as the active button
        button.classed('active', true);

        // Get the id of the button
        var buttonId = button.attr('id');
		if (buttonId== "global"){ 
            document.getElementById("globalChart").style.display = 'block';  
            document.getElementById("categoryChart").style.display = 'none';           
		}else if (buttonId== "category"){ 
            document.getElementById("globalChart").style.display = 'none';  
            document.getElementById("categoryChart").style.display = 'block';  
        }
    });
}