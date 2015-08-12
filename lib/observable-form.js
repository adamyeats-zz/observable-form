var EventEmitter2 = require('eventemitter2').EventEmitter2;
var inherits = require('inherits');

function ObservableForm (element) {
  var self = this;

  // get an array of inputs that are children of the
  // DOM element we pass in as an argument
  var elems = element.querySelectorAll('input');

  this.element = element;

  this.inputs = [].map.call(elems, function (el) {
    return self.watch(el);
  });

  EventEmitter2.call(this);
}

inherits(ObservableForm, EventEmitter2);

ObservableForm.prototype.watch = function (input) {
  var self = this;

  // @TODO: cut the boilerplate here
  function _listener (ev) {
    return self.emit('change', ev.target);
  };

  if (input.addEventListener) {
    // hooray!
    input.addEventListener('change', _listener);
  }
  else if (input.attachEvent) {
    // uh oh, we have to support IE8...
    input.attachEvent('onpropertychange', function (ev) {
      if (ev.propertyName === 'value') {
        _listener(ev);
      }
    });
  }

  return input;
};

ObservableForm.prototype.unwatch = function (input) {
  var self = this;

  // @TODO: cut the boilerplate here
  function _listener (ev) {
    return self.emit('change', ev.target);
  };

  if (input.removeEventListener) {
    input.removeEventListener('change', this._listener);
  }
  else if (input.detachEvent) {
    // @TODO: find out if there's a better way to avoid this boilerplate
    input.detachEvent('onpropertychange', function (ev) {
      if (ev.propertyName === 'value') {
        _listener(ev);
      }
    });
  }

  return input;
};

ObservableForm.prototype.reset = function () {
  // reset all input values to 0
  this.inputs.forEach(function (el, i) {
    return el.value = 0;
  });
};

window.ObservableForm = ObservableForm;

