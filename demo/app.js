(function (window, $, ko, _) {

	'use strict';

	var ViewModel = function () {
		this.query = ko.observable('');
		this.list = ko.observableArray([
			{
				name: 'Item 1',
				isSelected: ko.observable(false),
				hasFocus: ko.observable(false)
			},
			{
				name: 'Item 2',
				isSelected: ko.observable(false),
				hasFocus: ko.observable(false)
			},
			{
				name: 'Item 3',
				isSelected: ko.observable(false),
				hasFocus: ko.observable(false)
			},
			{
				name: 'Item 4',
				isSelected: ko.observable(false),
				hasFocus: ko.observable(false)
			},
			{
				name: 'Item 5',
				isSelected: ko.observable(false),
				hasFocus: ko.observable(false)
			}
		]);
		this.filteredList = ko.computed(this.getFilteredList, this);
	};

	ViewModel.prototype = {
		getResetList: function () {
			return _.map(this.list(), function (i) {
				i.hasFocus(false);
				return i;
			});
		},
		getFilteredList: function () {
			var list = [];
			if (this.query().trim().length) {
				list = this.getResetList();
			}
			return list;
		}
	};

	ko.applyBindings(new ViewModel(), document.getElementById('app'));
	
}(window, jQuery, ko, _));