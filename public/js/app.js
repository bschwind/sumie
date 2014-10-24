require(["knockout", "mathHelper"], function(ko, mathHelper) {
	var PageModel = function() {
		var self = this;

		self.pageName = ko.observable("墨絵");
	};

	var pageModel = new PageModel();
	ko.applyBindings(pageModel);
});
