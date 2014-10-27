define(["knockout"], function(ko) {
	var PageModel = function() {
		var self = this;

		self.pageName = ko.observable("墨絵");
		self.brushRadius = ko.observable(60);
	};

	var pageModel = new PageModel();
	ko.applyBindings(pageModel);

	return pageModel;
});
