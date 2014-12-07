require(["pageModel", "vector2", "mathHelper", "mouseHistory"], function(pageModel, Vector2, MathHelper, MouseHistory) {
	var canvas = document.getElementById("ink-canvas");
	canvas.width = canvas.parentElement.clientWidth;
	canvas.height = canvas.parentElement.clientHeight;

	var context = canvas.getContext("2d");
	context.lineWidth = 0.2;
	context.lineJoin = "round";
	context.lineCap = "round";

	var mouseDown = false;
	var mousePos = new Vector2();
	var mouseHistory = new MouseHistory(3); // Keep track of the last 3 mouse positions
	var mouseBuffer = []; // Buffer for mouse positions because the mouse events can fire more often than main

	function mouseUp() {
		console.log("Mouse up!");
		mouseDown = false;
		mouseHistory.clear();
		mouseBuffer = [];
	}

	window.document.addEventListener("mouseup", mouseUp);
	window.document.addEventListener("touchend", function(e) {
		if (e.touches.length === 0) {
			mouseUp();
		}
	});

	canvas.addEventListener("mouseover", function(e) {
		if (mouseDown) {
			console.log("Resuming mouse after leaving!");
		}
	});

	function mouseMove(e, point) {
		// Prevent the text selection cursor from showing
		e.preventDefault();

		if (mouseDown) {
			var rect = canvas.getBoundingClientRect();
			mouseBuffer.push(new Vector2(point.x - rect.left, point.y - rect.top));
		}
	}

	canvas.addEventListener("mousemove", function(e) {
		mouseMove(e, new Vector2(e.clientX, e.clientY));
	});

	canvas.addEventListener("touchmove", function(e) {
		var touch = e.touches[0];
		mouseMove(e, new Vector2(touch.clientX, touch.clientY));
	});

	function onMouseDown(e, point) {
		// Prevent the text selection cursor from showing
		e.preventDefault();

		var rect = canvas.getBoundingClientRect();
		var newPoint = new Vector2(point.x - rect.left, point.y - rect.top);
		mouseBuffer.push(newPoint);
		console.log("mouse down!");
		mouseDown = true;
	}

	canvas.addEventListener("mousedown", function(e) {
		onMouseDown(e, new Vector2(e.clientX, e.clientY));
	});

	canvas.addEventListener("touchstart", function(e) {
		var touch = e.touches[0];
		onMouseDown(e, new Vector2(touch.clientX, touch.clientY));
	});

	function mouseOut() {
		if (mouseDown) {
			console.log("leaving drawing area but still drawing!");
			mouseHistory.clear();
			mouseBuffer = [];
		}
	}

	canvas.addEventListener("mouseout", mouseOut);
	canvas.addEventListener("touchcancel", mouseOut);
	canvas.addEventListener("touchleave", mouseOut);

	document.getElementById("clear-button").addEventListener("click", function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	});

	document.getElementById("paint-controls").addEventListener("mousedown", function(e) {
		e.preventDefault();
	});

	document.getElementById("paint-controls").addEventListener("mousemove", function(e) {
		e.preventDefault();
	});

	requestAnimationFrame = window.requestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| setTimeout;

	function main() {

		if (mouseDown) {

			while (mouseBuffer.length > 0) {
				// Remove the oldest point from the buffer
				var newPoint = mouseBuffer.shift();
				mouseHistory.addPoint(newPoint);

				if (mouseHistory.get(0) && mouseHistory.get(1)) {
					context.beginPath();
					// context.lineTo(mouseHistory.get(0).x, mouseHistory.get(0).y);
					var midX = (mouseHistory.get(0).x + mouseHistory.get(1).x) / 2.0;
					var midY = (mouseHistory.get(0).y + mouseHistory.get(1).y) / 2.0;

					// If we have at least 3 points
					if (mouseHistory.get(2)) {
						var lastMidX = (mouseHistory.get(1).x + mouseHistory.get(2).x) / 2.0;
						var lastMidY = (mouseHistory.get(1).y + mouseHistory.get(2).y) / 2.0;
						context.moveTo(lastMidX, lastMidY);
						context.quadraticCurveTo(mouseHistory.get(1).x, mouseHistory.get(1).y, midX, midY);
					} else {
						context.moveTo(mouseHistory.get(1).x, mouseHistory.get(1).y);
						context.lineTo(midX, midY);
					}

					context.stroke();
				}
			}
		}

		requestAnimationFrame(main);
	}

	main();
});
