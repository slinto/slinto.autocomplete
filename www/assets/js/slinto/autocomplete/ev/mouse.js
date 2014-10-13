goog.provide('slinto.autocomplete.ev.mouse');

goog.require('slinto.autocomplete.helpers');

/**
 * Set new active item, when is mouse button down.
 * @param  {string} value
 * @param  {Object} input
 * @param  {Object} resultWrapper
 */
slinto.autocomplete.ev.mouse.click = function(value, input, resultWrapper) {
  var child = goog.dom.getChildren(resultWrapper),
      childLen = child.length,
      index;

  slinto.autocomplete.helpers.removeActiveClass(child, childLen);
  index = slinto.autocomplete.helpers.getActiveIndex(child, childLen, value);
  slinto.autocomplete.helpers.setActive(child, childLen, index, input);
};
