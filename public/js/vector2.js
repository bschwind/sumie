define(["mathHelper"], function(MathHelper) {
	function Vector2(x, y) {
		var self = this;

		self.x = x;
		self.y = y;

		self.length = function() {
			return Math.sqrt(x * x + y * y);
		}

		self.lengthSquared = function() {
			return x * x + y * y;
		}

		self.normalize = function() {
			var vecLen = this.length();
			var newX = x;
			var newY = y;

			if (vecLen > 0.0) {
				newX /= vecLen;
				newY /= vecLen;
			}

			return new Vector2(newX, newY);
		}
	}

	Vector2.lerp = function(u, v, t) {
		return new Vector2(MathHelper.lerp(u.x, v.x, t), MathHelper.lerp(u.y, v.y, t));
	}

	return Vector2;
});
