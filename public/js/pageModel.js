define(["knockout"], function(ko) {
	var PageModel = function() {
		var self = this;

		self.pageName = ko.observable("墨絵");
		self.brushRadius = ko.observable(20);
		self.bristleWidth = ko.observable(0.2);
		self.numRandomPoints = ko.observable(400);
	};

	var pageModel = new PageModel();
	ko.applyBindings(pageModel);

	return pageModel;
});
