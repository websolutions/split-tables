/**
 * wsol.splitTables.js 1.0.0
 * http://github.com/websolutions/split-tables
 */


;(function ($, window, document, undefined) {

  var defaults = {
    wrapperClass: "table-wrapper",
    pinnedClass: "pinned",
    scrollableClass: "scrollable",
    splitClass: "split"
  };

  function SplitTables(element, options) {
    this.$original = $(element);
    this.settings = $.extend({}, defaults, options);

    this.init();
  }

  SplitTables.prototype.init = function() {
    // Wrap original table in div wrapper
    this.$original.wrap('<div class="' + this.settings.wrapperClass + '" />');

    // Create copy of original table
    this.$copy = this.$original.clone();
    this.$copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
    this.$original.closest('.' + this.settings.wrapperClass).append(this.$copy);
    this.$copy.wrap('<div class="' + this.settings.pinnedClass + '" />');

    this.$original.wrap('<div class="' + this.settings.scrollableClass + '" />');

    this.$original.addClass(this.settings.splitClass);

    this.setCellHeights();
  };

  SplitTables.prototype.setCellHeights = function() {
    var tr = this.$original.find('tr'),
        tr_copy = this.$copy.find('tr'),
        heights = [];

    tr.each(function (index) {
      var self = $(this),
          tx = self.find('th, td');

      tx.each(function () {
        var height = $(this).outerHeight(true);
        heights[index] = heights[index] || 0;
        if (height > heights[index]) heights[index] = height;
      });

    });

    tr_copy.each(function (index) {
      $(this).height(heights[index]);
    });
  };

  SplitTables.prototype.destroy = function() {
    if (this.$original.hasClass(this.settings.splitClass)) {
      this.$original.closest('.' + this.settings.wrapperClass).find('.' + this.settings.pinnedClass).remove();
      this.$original.unwrap();
      this.$original.unwrap();

      this.$original.removeClass(this.settings.splitClass);
    }
  };

  $.fn.splitTables = function(options) {
    this.filter("table").each(function(index, element) {
      element.splitTables = new SplitTables(element, options);
    });

    return this;
  };

  $.fn.unsplitTables = function() {
    return this.each(function(index, element) {
      if (element.splitTables) {
        element.splitTables.destroy();
      }
    });
  };

})(jQuery, window, document);