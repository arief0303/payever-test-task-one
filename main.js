document.addEventListener("DOMContentLoaded", (event) => {
  // Get the elements
  const circle7 = document.querySelector("#circle7");
  const circle8 = document.querySelector("#circle8");
  const card = document.querySelector("#card");

  // Create an SVG element and append it to the body
  const svg = createSvgElement();

  // Create a line element for circle7
  const line = createLineElement(svg);

  // Create a path element for circle8
  const path = createPathElement(svg);

  // Create circle elements for the lights
  const light7 = createLightElement(svg);
  const light8 = createLightElement(svg);

  // Update the positions initially and whenever the window is resized
  updatePositions();
  window.addEventListener("resize", updatePositions);

  function createSvgElement() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.zIndex = "-1";
    document.body.appendChild(svg);
    return svg;
  }

  function createLineElement(svg) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("stroke", "#352B22");
    line.setAttribute("stroke-width", "2");
    svg.appendChild(line);
    return line;
  }

  function createPathElement(svg) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "#352B22");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    svg.appendChild(path);
    return path;
  }

  function createLightElement(svg) {
    const light = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    light.setAttribute("r", "5");
    light.setAttribute("fill", "#ff0");
    svg.appendChild(light);
    return light;
  }

  function updatePositions() {
    const circle7Center = getCenter(circle7);
    const circle8Center = getCenter(circle8);
    const cardCenter = getCenter(card);

    updateLine(line, circle7Center, cardCenter);
    updatePath(path, circle8Center, cardCenter);
    updateLight(light7, circle7Center);
    updateLight(light8, circle8Center);

    animateLight(light7, circle7Center, cardCenter);
    animateLightAlongPath(light8, path);
  }

  function getCenter(element) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  function updateLine(line, start, end) {
    line.setAttribute("x1", start.x);
    line.setAttribute("y1", start.y);
    line.setAttribute("x2", end.x);
    line.setAttribute("y2", end.y);
  }

  function updatePath(path, start, end) {
    const d = `M ${start.x} ${start.y} Q ${start.x} ${end.y}, ${end.x} ${end.y}`;
    path.setAttribute("d", d);
  }

  function updateLight(light, center) {
    light.setAttribute("cx", center.x);
    light.setAttribute("cy", center.y);
  }

  function animateLight(light, start, end) {
    const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    light.animate([
      { offset: 0, cx: start.x, cy: start.y },
      { offset: 1, cx: end.x, cy: end.y }
    ], {
      duration: length * 10,
      iterations: Infinity,
      direction: 'alternate'
    });
  }

  function animateLightAlongPath(light, path) {
    var pathLength = path.getTotalLength();
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = (timestamp - startTime) / (pathLength * 10);
      var point = path.getPointAtLength(progress * pathLength);
      light.setAttribute('cx', point.x);
      light.setAttribute('cy', point.y);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        startTime = null;
        animateLightAlongPath(light, path); // Loop the animation
      }
    }

    requestAnimationFrame(step);
  }
});