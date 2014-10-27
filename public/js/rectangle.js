define(["mathHelper", "vector2"], function(MathHelper, Vector2) {
	function Rectangle(min, max) {
		var self = this;

		self.min = Vector2.min(min, max);
		self.max = Vector2.max(min, max);

		self.width = function() {
			return max.x - min.x;
		}

		self.height = function() {
			return max.y - min.y;
		}
	}

	Rectangle.area = function(rect) {
		return rect.width() * rect.height();
	}

	Rectangle.intersects = function(rect1, rect2) {
		return (rect1.x <= rect2.x + rect2.width())
			&& (rect2.x <= rect1.x + rect1.width())
			&& (rect1.y <= rect2.y + rect2.height())
			&& (rect2.y <= rect1.y + rect1.height());
	}

	Rectangle.areaOfIntersection = function(rect1, rect2) {
		return Rectangle.area(Rectangle.intersection(rect1, rect2));
	}

	Rectangle.intersection = function(rect1, rect2) {
		if (Rectangle.intersects(rect1, rect2)) {
			return new Rectangle(
				new Vector2(Math.max(rect1.min.x, rect2.min.x), Math.max(rect1.min.y, rect2.min.y)),
				new Vector2(Math.min(rect1.min.x + rect1.width(), rect2.min.x + rect2.width()), Math.min(rect1.min.y + rect1.height(), rect2.min.y + rect2.height()))
			);
		} else {
			return new Rectangle(new Vector2(0,0), new Vector2(0,0));
		}
	}

	Rectangle.rectContainsPoint = function(rect, point) {
		return (point.x >= rect.min.x)
			&& (point.x <= rect.max.x)
			&& (point.y >= rect.min.y)
			&& (point.y <= rect.max.y);
	}

	return Rectangle;
});
