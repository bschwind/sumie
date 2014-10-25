require(["pageModel", "vector2", "mathHelper", "mouseHistory"], function(pageModel, Vector2, MathHelper, MouseHistory) {
	var canvas = document.getElementById("ink-canvas");
	canvas.width = canvas.parentElement.clientWidth;
	canvas.height = canvas.parentElement.clientHeight;

	var context = canvas.getContext("2d");
	var mouseDown = false;
	var mousePos = new Vector2();
	var mouseHistory = new MouseHistory(3); // Keep track of the last 3 mouse positions

	window.document.body.addEventListener("mouseup", function() {
		console.log("Mouse up!");
		mouseDown = false;
		mouseHistory.clear();
	});

	document.getElementById("ink-canvas").addEventListener("mouseover", function(e) {
		if (mouseDown) {
			console.log("Resuming mouse after leaving!");
		}
	});

	document.getElementById("ink-canvas").addEventListener("mousemove", function(e) {
		if (mouseDown) {
			var rect = canvas.getBoundingClientRect();
			mouseHistory.addPoint(new Vector2(e.clientX - rect.left, e.clientY - rect.top));
		}
	});

	document.getElementById("ink-canvas").addEventListener("mousedown", function(e) {
		var rect = canvas.getBoundingClientRect();
		mouseHistory.addPoint(new Vector2(e.clientX - rect.left, e.clientY - rect.top));
		console.log("mouse down!");
		mouseDown = true;
	});

	document.getElementById("ink-canvas").addEventListener("mouseout", function() {
		if (mouseDown) {
			console.log("leaving drawing area but still drawing!");
		}
	});

	requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		setTimeout;

	function main() {
		if (mouseDown && mouseHistory.get(0) && mouseHistory.get(1)) {
			context.lineWidth = 1;

			context.beginPath();
			context.moveTo(mouseHistory.get(1).x, mouseHistory.get(1).y);
			context.lineTo(mouseHistory.get(0).x, mouseHistory.get(0).y);
			context.stroke();
		}

		requestAnimationFrame(main);
	}

	main();
});
