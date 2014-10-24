require.config({
	baseUrl: "js",
	paths: {
		app: "app",
		knockout: "knockout-3.2.0-min",
		mathHelper: "mathHelper"
	}
});

// Start up the app
require(["app"]);
