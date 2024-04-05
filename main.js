document.addEventListener("DOMContentLoaded", (event) => {
  // Get the .circle7 and .card elements
  var circle = document.querySelector("#circle7");
  var card = document.querySelector("#card");

  // Create an SVG element and append it to the body
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.zIndex = "-1";
  document.body.appendChild(svg);

  // Create a line element
  var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  // Set the line color and width
  line.setAttribute("stroke", "#352B22");
  line.setAttribute("stroke-width", "2");

  // Append the line to the SVG
  svg.appendChild(line);

  // Function to update the line's position
  function updateLinePosition() {
    // Get the positions of the elements
    var circleRect = circle.getBoundingClientRect();
    var cardRect = card.getBoundingClientRect();

    // Calculate the centers of the elements
    var circleCenterX = circleRect.left + circleRect.width / 2;
    var circleCenterY = circleRect.top + circleRect.height / 2;
    var cardCenterX = cardRect.left + cardRect.width / 2;
    var cardCenterY = cardRect.top + cardRect.height / 2;

    // Set the start and end points of the line
    line.setAttribute("x1", circleCenterX);
    line.setAttribute("y1", circleCenterY);
    line.setAttribute("x2", cardCenterX);
    line.setAttribute("y2", cardCenterY);
  }

  // Update the line's position initially and whenever the window is resized
  updateLinePosition();
  window.addEventListener("resize", updateLinePosition);
});