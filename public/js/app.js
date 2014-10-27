require(["pageModel", "vector2", "mathHelper", "mouseHistory"], function(pageModel, Vector2, MathHelper, MouseHistory) {
	var canvas = document.getElementById("ink-canvas");
	canvas.width = canvas.parentElement.clientWidth;
	canvas.height = canvas.parentElement.clientHeight;

	var context = canvas.getContext("2d");
	context.lineWidth = 1;
	var mouseDown = false;
	var mousePos = new Vector2();
	var mouseHistory = new MouseHistory(3); // Keep track of the last 3 mouse positions
	var mouseBuffer = []; // Buffer for mouse positions because the mouse events can fire more often than main

	window.document.addEventListener("mouseup", function() {
		console.log("Mouse up!");
		mouseDown = false;
		mouseHistory.clear();
		mouseBuffer = [];
	});

	document.getElementById("ink-canvas").addEventListener("mouseover", function(e) {
		if (mouseDown) {
			console.log("Resuming mouse after leaving!");
		}
	});

	document.getElementById("ink-canvas").addEventListener("mousemove", function(e) {
		if (mouseDown) {
			var rect = canvas.getBoundingClientRect();
			mouseBuffer.push(new Vector2(e.clientX - rect.left, e.clientY - rect.top));
		}
	});

	document.getElementById("ink-canvas").addEventListener("mousedown", function(e) {
		var rect = canvas.getBoundingClientRect();
		mouseBuffer.push(new Vector2(e.clientX - rect.left, e.clientY - rect.top));
		console.log("mouse down!");
		mouseDown = true;
	});

	document.getElementById("ink-canvas").addEventListener("mouseout", function() {
		if (mouseDown) {
			console.log("leaving drawing area but still drawing!");
			mouseHistory.clear();
			mouseBuffer = [];
		}
	});

	requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		setTimeout;

	function main() {
		if (mouseDown) {
			while (mouseBuffer.length > 0) {
				// Remove the oldest point from the buffer
				var newPoint = mouseBuffer.shift();
				mouseHistory.addPoint(newPoint);

				if (mouseHistory.get(0) && mouseHistory.get(1)) {
					context.beginPath();
					context.moveTo(mouseHistory.get(1).x, mouseHistory.get(1).y);
					context.lineTo(mouseHistory.get(0).x, mouseHistory.get(0).y);
					context.stroke();
					context.closePath();
				}
			}
		}

		requestAnimationFrame(main);
	}

	main();
});
