
var quizMean = function(penguin)
{
    return d3.mean(penguin.quizes.map(function(quiz) { return quiz.grade;}));
}

var hwMean = function(penguin)
{
    return d3.mean(penguin.homework.map(function(hw) { return hw.grade;}));
}

var testMean = function(penguin)
{
    return d3.mean(penguin.test.map(function(test) { return test.grade;}));
}

var getFinal = function(penguin)
{
    return penguin.final[0].grade;
}

var clearTable = function()
{
    d3.selectAll("#tb tbody tr")
      .remove();
    
}

var getTotalGrade = function(penguin) 
{
    grade = .35*getFinal(penguin) + .3*testMean(penguin) + 10*(.2*quizMean(penguin)) + 2*(.15*hwMean(penguin));
    return grade;
}




var initHeaders = function(penguins) //Adds interactivity 
{
    d3.select("#quizzes")
    .on("click",function()
    { console.log("clicked");
        penguins.sort(function(a,b)
        {
            aMean = quizMean(a);
            bMean = quizMean(b);
            if(aMean > bMean) {return 1}
            else if(aMean < bMean) {return -1}
            else { return 0;}
            
        });
        console.log(penguins);
        clearTable();
        createTable(penguins);
    });
    
    d3.select("#homework")
    .on("click",function()
    { console.log("clicked");
        penguins.sort(function(a,b)
        {
            aMean = hwMean(a);
            bMean = hwMean(b);
            if(aMean > bMean) {return 1}
            else if(aMean < bMean) {return -1}
            else { return 0;}
        });
        clearTable();
        createTable(penguins);
    });
    
    d3.select("#tests")
    .on("click",function()
    { console.log("clicked");
        penguins.sort(function(a,b)
        {
            aMean = testMean(a);
            bMean = testMean(b);
            if(aMean > bMean) {return 1}
            else if(aMean < bMean) {return -1}
            else { return 0;}
        });
        clearTable();
        createTable(penguins);
    });
    
    d3.select("#finals")
    .on("click",function()
    { console.log("clicked");
        penguins.sort(function(a,b)
        {
            aFinal = getFinal(a);
            bFinal = getFinal(b);
            if(aFinal > bFinal) {return 1}
            else if(aFinal < bFinal) {return -1}
            else { return 0;}
        });
        clearTable();
        createTable(penguins);
    });
    
    d3.select("#grade")
    .on("click",function()
    { console.log("clicked");
        penguins.sort(function(a,b)
        {
            aGrade = getTotalGrade(a);
            bGrade = getTotalGrade(b);
            if(aGrade > bGrade) {return 1}
            else if(aGrade < bGrade) {return -1}
            else { return 0;}
        });
        clearTable();
        createTable(penguins);
    });
}

var createTable = function(penguins)
{
    //Creates a row for each penguin
    var rows = d3.select("tbody")
      .selectAll("tr")
        .data(penguins)
        .enter()
      .append("tr")
        .attr("class",function(penguin)
            {
                var grade = getTotalGrade(penguin);
                if(grade < 70)
                    {return "bad";}
                else 
                    {return "good";}
            });
    
    
    //append images
    rows.append("td")
        .append("img")
        .attr("src", function(penguin){return "imgs/"+penguin.picture});
    
    //append mean quiz scores
    rows.append("td")
        .text(function(penguin){return d3.mean(penguin.quizes.map(function(quiz) 
                                                        { return quiz.grade;}));});
    
    //append mean homework scores
    rows.append("td")
        .text(function(penguin){return d3.mean(penguin.homework.map(function(hw) 
                                                        { return hw.grade;}));});
    
    //append mean test scores
    rows.append("td")
        .text(function(penguin){return d3.mean(penguin.test.map(function(test) 
                                                        { return test.grade;}));});
    
    //append mean test scores
    rows.append("td")
        .text(function(penguin){return penguin.final.map(function(final)
                                                        { return final.grade;});});
    
    //append grade scores
    rows.append("td")
        .text(function(penguin){return getTotalGrade(penguin)});
}



var penguinPromise = d3.json("classData.json"); //Promise to get the data

var successFcn = function(penguins) //If the data is successfully collected
{
    console.log("Data Collected:",penguins);
    createTable(penguins);
    initHeaders(penguins);
}

var failureFcn = function(errorMsg) //If there was an error
{
    console.log("Something went wrong",errorMsg);
}

penguinPromise.then(successFcn,failureFcn);