goog.provide('slinto.autocomplete');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('slinto.autocomplete.ev.listener');
goog.require('slinto.autocomplete.helpers');
goog.require('slinto.autocomplete.parser');

/** @type {number} */
slinto.autocomplete.NUMBER_OF_RECORDS = 5;

/** @type {string} */
slinto.autocomplete.ENV = 'PRODUCTION';

/**
 * Autocomplete init function
 * @param  {Object} setting
 *         .wrapper - required         | {string}
 *         .files - required           | {Array.<string>} | eg. ["vegetables.json", "fruits.json"]
 *         .headings - optional        | {Array.<string>} | eg. ["Vegetables", "Fruits"]
 *         .input - optional           | {Object}
 *         .resultWrapper - optional   | {string} | eg. "div#myId.myClass"
 *         .numberOfRecords - optional | {number}
 *         .scan - optional            | {Array.<string>} | eg. ["token", "value"], default is ["token"]
 *         .callback - optional        | {Function}
 */
slinto.autocomplete.init = function(setting) {
  var dataArray;
  slinto.autocomplete.NUMBER_OF_RECORDS = setting.numberOfRecords ? setting.numberOfRecords : slinto.autocomplete.NUMBER_OF_RECORDS;

  slinto.autocomplete.setting = slinto.autocomplete.helpers.normalize(setting);
  dataArray = slinto.autocomplete.parser.getData(setting.files);
  slinto.autocomplete.listener(slinto.autocomplete.setting, dataArray);

  goog.dom.classes.add(slinto.autocomplete.setting.resultWrapper, 'slinto-autocomplete-hide');
};

goog.exportSymbol('slinto.autocomplete.init', slinto.autocomplete.init);
