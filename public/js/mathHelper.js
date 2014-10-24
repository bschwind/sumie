define([], function() {
	function MathHelper() {
		this.length = function(v) {
			return Math.sqrt(v.x * v.x + v.y * v.y);
		}

		this.lengthSquared = function(v) {
			return v.x * v.x + v.y * v.y;
		}

		this.normalize = function(v) {
			var vecLen = length(v);
			if(vecLen > 0.0)
			{
				v.x /= vecLen;
				v.y /= vecLen;
			}
			return v;
		}

		this.lerp = function(a, b, t) {
			return a + (b-a) * t;
		}

		this.lerpVector = function(u, v, t) {
			return {x:lerp(u.x, v.x, t), y:lerp(u.y, v.y, t)};
		}

		this.quadCurve = function(a, b, c, t) {
			return a * (1-t) * (1-t) + 2 * (1-t) * t * b + t * t * c;
		}

		this.quadCurveVector = function(u, v, w, t) {
			return {x:quadCurve(u.x, v.x, w.x, t), y:quadCurve(u.y, v.y, w.y, t)};
		}

		this.clamp = function(value, min, max) {
			return Math.max(min, Math.min(value, max));
		}
	}

	return MathHelper;
});
