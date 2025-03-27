// script.js

// 1) Load your CSV data. For example, a simplified file with columns: Year, Incidents
d3.csv("cleaned.csv").then(function(data) {
    // Convert numeric columns from strings to numbers
    data.forEach(d => {
      d.Year = +d.Year;
      d.Incidents = +d.Incidents;
    });
  
    // 2) Set up chart dimensions
    const width = 800;
    const height = 400;
    const margin = { top: 40, right: 20, bottom: 60, left: 60 };
  
    // 3) Create an SVG inside the #bar-chart div
    const svg = d3.select("#bar-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    // 4) Define scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.Year))
      .range([margin.left, width - margin.right])
      .padding(0.2);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Incidents)])
      .range([height - margin.bottom, margin.top]);
  
    // 5) Draw bars
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.Year))
        .attr("y", d => yScale(d.Incidents))
        .attr("width", xScale.bandwidth())
        .attr("height", d => (height - margin.bottom) - yScale(d.Incidents))
        .attr("fill", "#336699");
  
    // 6) Add X-axis
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d"))); // format as integer
  
    // 7) Add Y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));
  
    // 8) (Optional) Add Axis Labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .text("Year");
  
    svg.append("text")
      .attr("x", - height / 2)
      .attr("y", 20)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Number of Incidents");
  });
  