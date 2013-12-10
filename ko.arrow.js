(function ($, ko, _) {

	'use strict';

	ko.bindingHandlers.arrow = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
			var value = ko.utils.unwrapObservable(valueAccessor()),
				$element = $(element),
				items = value.list;

			$element.on('focus', function () {
				$element.on('keydown', keyCodeEvents);
			});

			$element.on('blur', function () {
				$element.unbind('keydown');
				resetItemFocus();
			});

			function keyCodeEvents(e) {
				var keyCode = e.which,
					o;
				if (keyCode === 40) {
					// down
					o = getFocusedItemObject();
					if (o.focusedItem) {
						o.focusedItem.hasFocus(false);
						if (o.focusedItemPosition < (items().length - 1)) {
							o.focusedItemPosition += 1;
						}
						items()[o.focusedItemPosition].hasFocus(true);
					} else {
						items()[0].hasFocus(true);
					}
				} else if (keyCode === 38) {
					// up
					o = getFocusedItemObject();
					if (o.focusedItem) {
						o.focusedItem.hasFocus(false);
						if (o.focusedItemPosition > 0) {
							o.focusedItemPosition -= 1;
						}
						items()[o.focusedItemPosition].hasFocus(true);
					}
				} else if (keyCode === 13) {
					// enter
					o = getFocusedItemObject();
					if (o.focusedItem) {
						o.focusedItem.isSelected(!o.focusedItem.isSelected());
					}
				}
			}
			
			function getFocusedItemObject() {
				var focusedItemPosition,
					focusedItem = _.find(items(), function (item, i) {
						if (item.hasFocus()) {
							focusedItemPosition = i;
						}
						return item.hasFocus();
					});
				return {
					focusedItem: focusedItem,
					focusedItemPosition: focusedItemPosition
				};
			}

			function resetItemFocus() {
				var focusedItem = _.find(items(), function (i) {
					return i.hasFocus();
				});
				if (focusedItem) {
					focusedItem.hasFocus(false);
				}
			}

		}
	};

}(jQuery, ko, _));