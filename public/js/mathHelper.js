define([], function() {
	function MathHelper() {}

	MathHelper.lerp = function(a, b, t) {
		return a + (b-a) * t;
	}

	MathHelper.quadCurve = function(a, b, c, t) {
		return a * (1-t) * (1-t) + 2 * (1-t) * t * b + t * t * c;
	}

	MathHelper.clamp = function(value, min, max) {
		return Math.max(min, Math.min(value, max));
	}

	return MathHelper;
});
