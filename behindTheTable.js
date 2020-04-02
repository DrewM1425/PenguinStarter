
var calcMean = function(penguin) //Calculates the mean given a penguin
{
    
}










var createTable = function(penguins)
{
    //Creates a row for each penguin
    var rows = d3.select("table")
      .selectAll("tr")
        .data(penguins)
        .enter()
      .append("tr");
    
    rows.append("img")
        .attr("src", function(penguin){return "imgs/"+penguin.picture});
}



var penguinPromise = d3.json("classData.json"); //Promise to get the data

var successFcn = function(penguins) //If the data is successfully collected
{
    console.log("Data Collected:",penguins);
    createTable(penguins);
}

var failureFcn = function(errorMsg) //If there was an error
{
    console.log("Something went wrong",errorMsg);
}

penguinPromise.then(successFcn,failureFcn);