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
  return {
    buttonText: data.buttonText,
    buttonClass: function() {
      // valid styles
      var validStyles = ['primary', 'secondary', 'success', 'danger', undefined];
      if (_.contains(validStyles, data.style)) {
        return data.style && 'uk-button-' + data.style;
      } else {
        throw new Error('The button style you defined (' + data.style + ') is' +
        ' not a valid style! Either leave data.style undefined, or choose one' +
        '  of the following valid styles:', validStyles);
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
    function(data) {return data.index && 'button_' + data.index || 'UIButton';}, // name
    UIButton // Viewmodel
  );
}

/**
 * Export to namespace
 */
Molecule.UIButton = UIButton;
