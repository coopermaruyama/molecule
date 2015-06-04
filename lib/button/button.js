/**
 * UIButton ViewModel Component.
 *
 * @param {Object} data - Button configuration.
 * @param {Int}    data.index - Used for defining the button position and
 *                             	to generate a unique name for the viewmodel.
 * @param {string} data.buttonText - Text to display in the button.
 * @param {string|function} data.buttonAction - URL or path string to navigate
 *                                              to, or a function to execute
 *                                              when button is clicked.
 */
var UIButton = function(data) {
  utils = Molecule.utils;
  return {
    buttonText: data.buttonText,
    buttonClass: function () {
      if (/(window|global)/.test(Molecule.utils.typeof(this.parent)) ) {
        // We're not in a viewmodel
        return  data.style ? this.buttonStyle() : 'uk-button-primary';
      }
      if (this.parent()
          && utils.typeof(this.parent().buttonLayout()) == 'Object' ) {
        return this.parent().buttonLayout().class;
      }
      return this.buttonStyle() + ' ' + this.buttonSize();
    },
    buttonStyle: function() {
      // valid styles
      var validStyles = ['primary', 'secondary', 'success', 'danger'];

      if (Molecule.utils.typeof(data.style) !== 'String') {
        return 'uk-button-primary';
      }
      if (_.contains(validStyles, data.style)) {
        return 'uk-button-' + data.style;
      } else {
        throw new Error('The button style you defined (' + data.style + ') is' +
        ' not a valid style! Either leave data.style undefined, or choose one' +
        '  of the following valid styles:', validStyles);
      }
    },
    buttonSize: function() {
      var validSizes = ['mini', 'small', 'large'];
      if (Molecule.utils.typeof(data.size) === 'String') {
        return _.contains(validSizes, data.size) ?
        'uk-button-' + data.size :
        '';
      }
    },
    doButtonAction: function() {
      var actionType = typeof data.buttonAction;
      if (actionType == 'string') {
        var target = data.navigationTarget;
        Router.go(target);
      }
      if (actionType == 'function') {
        return data.buttonAction();
      }
    }
  }
}

if (Meteor.isClient) {
  Template.UIButton.viewmodel(
    function(data) {
      if (typeof data === 'undefined' || data === null
        || /(window|global)/.test(Molecule.utils.typeof(this.parent)) ) {
        return 'uibutton_' + Math.random();
      }
      if (data && data.name) {
        return data.name;
      }
      if (typeof data.index !== 'undefined') {
        var parent = this.parent();
        var parentId = parent && parent._vm_id || 'child';
        var index = data.index || Math.random();
        return parentId + '_uibutton_' + index;
      }
    }, // name
    UIButton // Viewmodel
  );
}

/**
 * Export to namespace
 */
Molecule.UIButton = UIButton;
