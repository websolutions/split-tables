/**
 * wsol.splitTables.js 2.0.0
 * http://github.com/websolutions/split-tables
 */

;(function ($, window, document, undefined) {
  if (!$.wsol) {
    $.wsol = {};
  }

  $.wsol.splitTables = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data("wsol.splitTables", base);

    base.init = function() {
      base.options = $.extend({}, $.wsol.splitTables.defaultOptions, options);

      // Wrap original table in div wrapper
      base.$wrapper = base.$el.wrap('<div class="' + base.options.wrapperClass + '" />').parent();

      // Create copy of original table
      base.$copy = base.$el.clone();
      base.$copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
      base.$wrapper.append(base.$copy);
      base.$pinned = base.$copy.wrap('<div class="' + base.options.pinnedClass + '" />').parent();

      base.$scrollable = base.$el.wrap('<div class="' + base.options.scrollableClass + '" />').parent();

      base.$el.addClass(base.options.splitClass);

      base.equalizeCells();
    };

    base.equalizeCells = function() {
      var tr = base.$el.find('tr'),
          trCopy = base.$copy.find('tr'),
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

      trCopy.each(function (index) {
        $(this).height(heights[index]);
      });
    };

    base.destroy = function() {
      if (base.$el.hasClass(base.options.splitClass)) {
        base.$pinned.remove();
        base.$el.unwrap();
        base.$el.unwrap();

        base.$el.removeClass(base.options.splitClass);
      }
    };

    base.init();
  };

  $.wsol.splitTables.defaultOptions = {
    wrapperClass: "table-wrapper",
    pinnedClass: "pinned",
    scrollableClass: "scrollable",
    splitClass: "split"
  };

  $.fn.wsol_splitTables = function(options) {
    return this.filter("table").each(function() {
      new $.wsol.splitTables(this, options);
    });
  };

})(jQuery, window, document);
