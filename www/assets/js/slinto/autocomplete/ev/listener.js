goog.provide('slinto.autocomplete.ev.listener');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.style');
goog.require('slinto.autocomplete.ev.key');
goog.require('slinto.autocomplete.ev.mouse');
goog.require('slinto.autocomplete.helpers');

/**
 * Set basic listeners to input element.
 * @param  {object} setting
 * @param  {Array} dataArray
 */
slinto.autocomplete.listener = function(setting, dataArray) {
  var dataFilesLen = dataArray.length,
      input = setting.input,
      resultWrapper = setting.resultWrapper,
      headings = setting['headings'];

  // Input keyup handler
  goog.events.listen(input, goog.events.EventType.KEYUP, function(e) {
    var key = e.keyCode;

    if (slinto.autocomplete.helpers.isEnter(key)) {
      slinto.autocomplete.helpers.redirect(e);
    } else if (slinto.autocomplete.helpers.isArrow(key)) {
      slinto.autocomplete.ev.key.standardKeyEvent({
        input: input,
        resultWrapper: resultWrapper,
        dataFilesLen: dataFilesLen,
        dataArray: dataArray,
        headings: headings,
        setting: setting
      });
    } else {
      slinto.autocomplete.ev.key.arrowUpOrDown(input, resultWrapper, key);
    }
  });

  // Mouse click on result
  goog.events.listen(resultWrapper, goog.events.EventType.CLICK, function(e) {
      var targetValue = e.target.textContent;

      if (e.target.className === 'item') {
        slinto.autocomplete.ev.mouse.click(targetValue, input, resultWrapper);
        slinto.autocomplete.helpers.redirect(e);
      }
  });

  // Enter on result
  goog.events.listen(resultWrapper, goog.events.EventType.KEYUP, function(e) {
      var key = e.keyCode;

      if (slinto.autocomplete.helpers.isEnter(key)) {
        var targetValue = e.target.textContent;
        slinto.autocomplete.ev.mouse.click(targetValue, input, resultWrapper);
        slinto.autocomplete.helpers.redirect(e);
      }
  });
};
