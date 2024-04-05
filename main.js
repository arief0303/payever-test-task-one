document.addEventListener("DOMContentLoaded", (event) => {
  // Get the elements
  const card = document.querySelector("#card");

  // Create an SVG element and append it to the body
  const svg = createSvgElement();

  // Create path and light elements for each circle
  const circles = Array.from({length: 13}, (_, i) => document.querySelector(`#circle${i+1}`));
  const paths = circles.map(() => createPathElement(svg));
  const lights = circles.map(() => createLightElement(svg));

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
    const cardCenter = getCenter(card);

    circles.forEach((circle, i) => {
      const circleCenter = getCenter(circle);
      updatePath(paths[i], circleCenter, cardCenter);
      updateLight(lights[i], circleCenter);
      animateLightAlongPath(lights[i], paths[i]);
    });
  }

  function getCenter(element) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  function updatePath(path, start, end) {
    const d = `M ${start.x} ${start.y} Q ${start.x} ${end.y}, ${end.x} ${end.y}`;
    path.setAttribute("d", d);
  }

  function updateLight(light, center) {
    light.setAttribute("cx", center.x);
    light.setAttribute("cy", center.y);
  }

  function animateLightAlongPath(light, path) {
    var pathLength = path.getTotalLength();
    var startTime = null;
    var direction = 1;
  
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = ((timestamp - startTime) / (pathLength * 10)) % 2;
      if (progress > 1) {
        direction = -1;
        progress = 2 - progress;
      } else {
        direction = 1;
      }
      var point = path.getPointAtLength(progress * pathLength);
      light.setAttribute('cx', point.x);
      light.setAttribute('cy', point.y);
      requestAnimationFrame(step);
    }
  
    requestAnimationFrame(step);
  }
});