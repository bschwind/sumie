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

	Vector2.quadCurveVector = function(u, v, w, t) {
		return new Vector2(
			MathHelper.quadCurve(u.x, v.x, w.x, t),
			MathHelper.quadCurve(u.y, v.y, w.y, t)
		);
	}

	Vector2.min = function(u, v) {
		return new Vector2(Math.min(u.x, v.x), Math.min(u.y, v.y));
	}

	Vector2.max = function(u, v) {
		return new Vector2(Math.max(u.x, v.x), Math.max(u.y, v.y));
	}

	return Vector2;
});
