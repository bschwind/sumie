define([], function() {
	function MathHelper() {}

	MathHelper.length = function(v) {
		return Math.sqrt(v.x * v.x + v.y * v.y);
	}

	MathHelper.lengthSquared = function(v) {
		return v.x * v.x + v.y * v.y;
	}

	MathHelper.normalize = function(v) {
		var vecLen = length(v);
		if(vecLen > 0.0)
		{
			v.x /= vecLen;
			v.y /= vecLen;
		}
		return v;
	}

	MathHelper.lerp = function(a, b, t) {
		return a + (b-a) * t;
	}

	MathHelper.lerpVector = function(u, v, t) {
		return {x:lerp(u.x, v.x, t), y:lerp(u.y, v.y, t)};
	}

	MathHelper.quadCurve = function(a, b, c, t) {
		return a * (1-t) * (1-t) + 2 * (1-t) * t * b + t * t * c;
	}

	MathHelper.quadCurveVector = function(u, v, w, t) {
		return {x:quadCurve(u.x, v.x, w.x, t), y:quadCurve(u.y, v.y, w.y, t)};
	}

	MathHelper.clamp = function(value, min, max) {
		return Math.max(min, Math.min(value, max));
	}

	return MathHelper;
});
