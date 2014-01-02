(function ($, ko) {

	'use strict';

	ko.bindingHandlers.arrow = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
			var value = ko.utils.unwrapObservable(valueAccessor()),
				$element = $(element),
				items = value.list,
				focusClass = 'has-focus';

			$element.on('focus', function () {
				$element.on('keydown', keyCodeEvents);
			});

			$element.on('blur', function () {
				$element.unbind('keydown');
				resetItemFocus();
			});

			function keyCodeEvents(e) {
				var keyCode = e.which,
					o, t;
				if (keyCode === 40) {
					// down
					o = getFocusedItemObject();
					if (o.focusedItem.length) {
						o.focusedItem.removeClass(focusClass);
						if (o.focusedItemPosition < (getListItems().length - 1)) {
							o.focusedItemPosition += 1;
						}
						$(getListItems()[o.focusedItemPosition]).addClass(focusClass);
					} else {
						if (getListItems().length) {
							getListItems().first().addClass(focusClass);
						}
					}
				} else if (keyCode === 38) {
					// up
					e.preventDefault();
					o = getFocusedItemObject();
					if (o.focusedItem.length) {
						o.focusedItem.removeClass(focusClass);
						if (o.focusedItemPosition > 0) {
							o.focusedItemPosition -= 1;
						}
						$(getListItems()[o.focusedItemPosition]).addClass(focusClass);
					}
				} else if (keyCode === 13) {
					// enter
					o = getFocusedItemObject();
					if (o.focusedItem.length) {
						var koItem = ko.dataFor(o.focusedItem[0]);
						koItem.isSelected(!koItem.isSelected());
					}
				}
			}
			
			function getListItems() {
				return $element.parent().find('ul.list').first().find('li');
			}

			function getFocusedItemObject() {
				var focusedItemPosition,
					focusedItem = getListItems().filter(function (i) {
						if ($(this).hasClass(focusClass)) {
							focusedItemPosition = i;
							return true;
						}
					});
				return {
					focusedItem: focusedItem,
					focusedItemPosition: focusedItemPosition
				};
			}

			function resetItemFocus() {
				getListItems().removeClass(focusClass);
			}

		}
	};

}(jQuery, ko));