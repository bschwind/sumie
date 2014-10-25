require.config({
	baseUrl: "js",
	paths: {
		app: "app",
		knockout: "knockout-3.2.0-min",
		pageModel: "pageModel",
		mathHelper: "mathHelper",
		vector2: "vector2",
		mouseHistory: "mouseHistory"
	}
});

// Start up the app
require(["app"]);
