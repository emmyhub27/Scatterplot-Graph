d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then(data => {
    const dataset = data;
    
    console.log(dataset)

    // Declare the chart dimensions and padding.
    const width = 900;
    const height = 500;
    const padding = 60;


    // Declare the x (horizontal position) scale.
    const xScale = d3.scaleLinear()
    .domain([d3.min(dataset, (d) => d["Year"]) - 1, d3.max(dataset, (d) => d["Year"]) + 1])
        .range([padding, width - padding]);
        
  
    // Declare the y (vertical position) scale.
    const yScale = d3.scaleTime()
        .domain([d3.min(dataset, (d) => new Date(d["Seconds"] * 1000)), d3.max(dataset, (d) => new Date(d["Seconds"] * 1000))])
        .range([height - padding, padding]);

        // Create the SVG container.
    const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

        // Add the x-axis.
        const xAxis = d3.axisBottom(xScale)
                        .tickFormat(d3.format("d"))
    svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(0, "+ (height - padding) +")")
        .call(xAxis);

    // Add the y-axis.
    const yAxis = d3.axisLeft(yScale)
                    .tickFormat(d3.timeFormat("%M:%S"))
    svg.append("g")
       .attr("id", "y-axis")
       .attr("transform", 'translate(' + padding + ', 0)')
       .call(yAxis)
       .call(g => g.append("text")
       .style("font-size", "20px")
       .attr("x", - padding)
       .attr("y", 40)
       .attr("fill", "currentColor")
       .attr("text-anchor", "start")
       .text("Time in Minutes"));

       //   Add tooltip
       const tooltip = d3.select("#tooltip");

    //    Add svg circle
    svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .attr("class", "dot")
       .attr("data-xvalue", (d) => d["Year"]) 
       .attr("data-yvalue", (d) => new Date(d["Seconds"] * 1000))
       .attr("r", "5")
       .attr("cx", (d) => xScale(d["Year"]))
       .attr("cy", (d) => yScale(new Date(d["Seconds"] * 1000)))
       .attr("fill", (d) => {
        if(d["Doping"] === ""){
            return "navy"
        }else{
            return "orange"
        }
       })
       .on("mouseover", showTooltip)
       .on("mouseout", hideTooltip);


       function showTooltip (event, d) {
        tooltip.style("display", "block")
              .data(dataset)
              .style('left', `${event.pageX}px`)
              .style('top', `${event.pageY}px`)
              .attr("data-year", (d) => d["Year"])
              .html(`${d["Name"]} : ${d["Nationality"]} <br> Year:${d["Year"]}, Time: ${d["Time"]} <br> ${d["Doping"]}`)
              console.log(d["Year"])
       };

       function hideTooltip () {
        tooltip.style("display", "none")
       }



});

