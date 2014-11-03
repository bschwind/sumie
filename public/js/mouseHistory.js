define([], function() {
	function MouseHistory(numElements) {
		var self = this;

		self.maxPoints = numElements;
		self.mousePoints = [];

		self.addPoint = function(v) {
			self.mousePoints.unshift(v);
			if (self.mousePoints.length > self.maxPoints) {
				self.mousePoints.splice(self.maxPoints, 1);
			}
		}

		self.get = function(i) {
			return self.mousePoints[i];
		}

		self.clear = function() {
			self.mousePoints = [];
		}
	}

	return MouseHistory;
});
