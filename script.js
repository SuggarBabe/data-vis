document.addEventListener("DOMContentLoaded", function() {
    // ----------------------------------------
    // 1. Fade-In for Hero Overlay (Slide 1)
    // ----------------------------------------
    setTimeout(() => {
      const overlay = document.querySelector(".video-overlay.fade-me");
      if (overlay) {
        overlay.classList.add("active");
      }
    }, 400);
  
    // ----------------------------------------
    // 2. Intersection Observer for .slide-in Elements (Slide 3, etc.)
    // ----------------------------------------
    const slideItems = document.querySelectorAll('.slide-in');
    const observerOptions = { threshold: 0.2 };
    const slideObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);
    slideItems.forEach(el => slideObserver.observe(el));
  
    // ----------------------------------------
    // 3. Custom Typewriter Effect for Slide 2 (Card Text)
    // ----------------------------------------
    let typedH1Started = false;
    let typedPStarted = false;
  
    function typeWriter(elementId, text, speed) {
      let i = 0;
      function type() {
        if (i < text.length) {
          document.getElementById(elementId).innerHTML += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      type();
    }
  
    const slide2 = document.getElementById("slide2");
    const typeObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!typedH1Started) {
            document.getElementById("typed-h1").innerHTML = "";
            typeWriter("typed-h1", "Introduction", 100);
            typedH1Started = true;
          }
          if (!typedPStarted) {
            document.getElementById("typed-p").innerHTML = "";
            typeWriter("typed-p", "Humanitarian aid workers provide critical support in some of the world’s most volatile regions. Their efforts are constantly challenged by unpredictable security threats. Analyzing incident data reveals patterns in these attacks, offering valuable insights for improving safety strategies.", 5);
            typedPStarted = true;
          }
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    typeObserver.observe(slide2);
  
    // ----------------------------------------
    // 4. Dynamic Word Cloud Generation Using d3 and d3-cloud
    // ----------------------------------------
    function updateWordCloud() {
      d3.csv("cleaned.csv").then(function(data) {
        let allText = data.map(d => d.Country || "").join(" ");
        let words = allText.split(/\s+/).filter(Boolean).map(word => word.toLowerCase());
        let frequency = {};
        words.forEach(function(word) {
          frequency[word] = (frequency[word] || 0) + 1;
        });
        let wordData = Object.keys(frequency).map(function(key) {
          return { text: key, size: frequency[key] * 10 };
        });
        let container = document.getElementById("wordcloud");
        let width = container.clientWidth;
        let height = container.clientHeight;
        d3.layout.cloud()
          .size([width, height])
          .words(wordData)
          .padding(3)
          .font("Impact")
          .fontSize(d => d.size)
          .on("end", drawWordCloud)
          .start();
  
        function drawWordCloud(words) {
          d3.select("#wordcloud").select("svg").remove();
          let svg = d3.select("#wordcloud").append("svg")
                      .attr("width", width)
                      .attr("height", height)
                      .append("g")
                      .attr("transform", "translate(" + width/2 + "," + height/2 + ")");
          svg.selectAll("text")
            .data(words, d => d.text)
            .enter().append("text")
            .style("font-size", d => d.size + "px")
            .style("font-family", "Impact")
            .style("fill", (d, i) => d3.schemeCategory10[i % 10])
            .attr("text-anchor", "middle")
            .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
            .text(d => d.text);
        }
      }).catch(function(error) {
        console.error("Error loading CSV data:", error);
      });
    }
    updateWordCloud();
    setInterval(updateWordCloud, 2000);
  
    // ----------------------------------------
    // 5. Slide 4 Slide-Over Animation
    // ----------------------------------------
    
  });


window.addEventListener('load', () => {
  const holders = document.querySelectorAll('#slide4 .holder');
  
  // For demo: stagger their activation
  holders.forEach((holder, idx) => {
    setTimeout(() => {
      holder.classList.add('active');
    }, idx * 1000); // add the active class 1s apart
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Example static data: replace these arrays with data from your CSV if desired.
  var years = [1997, 1998, 1999, 2000, 2001, 2002];
  var incidents = [5, 8, 6, 10, 12, 7];

  var trace = {
    x: years,
    y: incidents,
    mode: 'markers+lines',
    marker: {
      size: 12,
      color: 'lightblue'
    },
    line: {
      color: 'lightpink',
      width: 2
    },
    type: 'scatter'
  };

  var data = [trace];

  var layout = {
    title: 'Incidents Over Time',
    paper_bgcolor: '#2b2b2b',
    plot_bgcolor: '#2b2b2b',
    font: {
      color: 'white'
    },
    xaxis: {
      title: 'Year',
      gridcolor: 'gray'
    },
    yaxis: {
      title: 'Number of Incidents',
      gridcolor: 'gray'
    }
  };

  Plotly.newPlot('interactive-chart', data, layout);
});

