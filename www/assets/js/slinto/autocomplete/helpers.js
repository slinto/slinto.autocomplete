goog.provide('slinto.autocomplete.helpers');

goog.require('goog.dom');
goog.require('goog.dom.classes');

/**
 * Return true if is up/down arrow.
 * @param  {number}  key
 * @return {boolean}
 */
slinto.autocomplete.helpers.isArrow = function(key) {
  return key !== 38 && key !== 40;
};

/**
 * Return true if is enter key.
 * @param  {number}  key
 * @return {boolean}
 */
slinto.autocomplete.helpers.isEnter = function(key) {
  return key === 13;
};

/**
 * Return index of active item.
 * @param  {Object} child
 * @param  {number} childLen
 * @param  {string} activeText
 * @return {number}
 */
slinto.autocomplete.helpers.getActiveIndex = function(child, childLen, activeText) {
  for (var i = 0; i < childLen; i++) {
    if (goog.dom.getTextContent(child[i]) === activeText) {
      return i;
    }
  }
};

/**
 * Remove class from items.
 * @param  {Object} child
 * @param  {number} childLen
 */
slinto.autocomplete.helpers.removeActiveClass = function(child, childLen) {
  for (var i = 0; i < childLen; i++) {
    if (child[i].localName === 'li') {
      goog.dom.classes.remove(child[i], 'active');
    }
  }
};

/**
 * Set active class to target element.
 * @param {Object} child
 * @param {number} childLen
 * @param {number} index
 * @param {Object} input
 */
slinto.autocomplete.helpers.setActive = function(child, childLen, index, input) {
  for (var i = index; i < childLen; i++) {
    if (child[i].localName === 'li') {
      goog.dom.classes.add(child[i], 'active');
      goog.dom.setProperties(input, {
        'data-url': child[i].getAttribute('data-url')
      });
      input.value = goog.dom.getTextContent(child[i]);
      break;
    }
  }
};

/**
 * Return object with element name, id and className.
 * @param  {string} elementStr
 * @return {Object}
 */
slinto.autocomplete.helpers.getIdAndClass = function(elementStr) {
  var obj = {};
  indexOfId = elementStr.indexOf('#');
  indexOfClass = elementStr.indexOf('.');

  if (indexOfId > 0 && indexOfClass > 0) {
    obj.element = elementStr.substring(0, indexOfId);
    obj.id = elementStr.substring(indexOfId + 1, indexOfClass);
    obj.className = elementStr.substring(indexOfClass + 1);
  } else if (indexOfId > 0) {
    obj.element = elementStr.substring(0, indexOfId);
    obj.id = elementStr.substring(indexOfId + 1);
  } else if (indexOfClass > 0) {
    obj.element = elementStr.substring(0, indexOfClass);
    obj.className = elementStr.substring(indexOfClass + 1);
  } else {
    obj.element = elementStr;
  }

  return obj;
};

/**
 * Return search input element.
 * @param  {string|Object} wrapper
 * @return {Object}
 */
slinto.autocomplete.helpers.getInput = function(wrapper) {

  if (goog.isObject(wrapper)) {
    return goog.dom.getElementsByTagNameAndClass('input', undefined, wrapper)[0];
  } else {
    var wrapperObj = slinto.autocomplete.helpers.getIdAndClass(wrapper);
    if (wrapperObj.id) {
      return goog.dom.getElement(wrapperObj.id);
    } else if (wrapperObj.className && wrapperObj.element) {
      return goog.dom.getElementsByTagNameAndClass(wrapperObj.element, wrapperObj.className)[0];
    } else if (wrapperObj.className) {
      return goog.dom.getElementByClass(wrapperObj.className);
    } else {
      return goog.dom.getElementsByTagNameAndClass(wrapperObj.element)[0];
    }
  }
};

/**
 * Create and return result wrapper fragment.
 * @param  {string} resultWrapperType Eg. "div#myId.myClass".
 * @param  {Object} mainWrapper
 * @return {Object}
 */
slinto.autocomplete.helpers.createResultWrapper = function(resultWrapperType, mainWrapper) {
  var wrapper = slinto.autocomplete.helpers.getIdAndClass(resultWrapperType),
      wrapperFrag = goog.dom.createDom(wrapper.element);

  if (wrapper.id) {
    wrapperFrag.id = wrapper.id;
  }
  if (wrapper.className) {
    goog.dom.classes.add(wrapperFrag, wrapper.className);
  }

  goog.dom.append(mainWrapper, wrapperFrag);
  return wrapperFrag;
};

/**
 * 'Normalizing' setting object for Closure Compiler.
 * @param  {Object} setting
 * @return {Object}
 */
slinto.autocomplete.helpers.normalize = function(setting) {
  setting.wrapper = goog.dom.getElement(setting['wrapper']);
  setting.input = setting['input'] ?
                  slinto.autocomplete.helpers.getInput(setting['input']) :
                  slinto.autocomplete.helpers.getInput(setting.wrapper);
  setting.input.autocomplete = 'off';
  setting.resultWrapper = setting['resultWrapper'] ?
                          slinto.autocomplete.helpers.createResultWrapper(setting['resultWrapper'], setting.wrapper) :
                          slinto.autocomplete.helpers.createResultWrapper('ul', setting.wrapper);
  setting.noResultMessage = setting['noResultMessage'] || 'Sorry, not found.';
  setting.scan = setting['scan'];

  if (goog.isDef(setting['events'])) {
    setting.events = {
      open: setting['events']['open'],
      close: setting['events']['close'],
      select: setting['events']['select']
    };
  } else {
    setting.events = {
      open: undefined,
      close: undefined,
      select: undefined
    };
  }

  return setting;
};

/**
 * Has target data.
 * @param  {string}  targetValue
 * @param  {string}  targetUrl
 * @return {boolean}
 */
slinto.autocomplete.helpers.hasTargetData = function(targetValue, targetUrl) {
  return targetValue !== '' && targetUrl !== null;
};

/**
 * Show result wrapper.
 */
slinto.autocomplete.helpers.showResultWrapper = function() {
  goog.dom.classes.addRemove(slinto.autocomplete.setting.resultWrapper,
                             'slinto-autocomplete-hide',
                             'slinto-autocomplete-show');

  if (goog.isDef(slinto.autocomplete.setting.events.open)) {
    slinto.autocomplete.setting.events.open();
  }
};

/**
 * Hide result wrapper.
 */
slinto.autocomplete.helpers.hideResultWrapper = function() {
  goog.dom.classes.addRemove(slinto.autocomplete.setting.resultWrapper,
                           'slinto-autocomplete-show',
                           'slinto-autocomplete-hide');

  if (goog.isDef(slinto.autocomplete.setting.events.close)) {
    slinto.autocomplete.setting.events.close();
  }
};

/**
 * @param  {Object} e
 */
slinto.autocomplete.helpers.redirect = function(e) {
  var targetValue = e.target.textContent || e.target.innerText,
        targetUrl = e.target.getAttribute('data-url');

  if (slinto.autocomplete.helpers.hasTargetData(targetValue, targetUrl) &&
      slinto.autocomplete.setting.events.select) {
    slinto.autocomplete.setting.events.select(targetUrl, targetValue);
  }

  slinto.autocomplete.helpers.hideResultWrapper();
};
