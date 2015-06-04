/**
 * UI Element that grabs user's attention and asks them to do something.
 *
 * @param {Object} data Object defining the CTA with following structure:
 * @param {String} data.title - Headline to display in call-to-action.
 * @param {String} data.message - Message to display in CTA panel's body.
 * @param {Object[]} data.buttons[] - Up to 3 objects defining the buttons.
 * @param {String}   data.buttons[].buttonText - Text to display in button.
 * @param {String|Func} data.buttons[].buttonAction - Path to link the button to
 *                                                  or a callback function.
 */
var UICallToAction = function(data) {
  return {
    name: data.name,
    title: data.title,
    message: data.message,
    buttons: function() {
      var ctor = data.buttons.constructor.name;
      //     namedButtons = _.map(data.buttons, function(button, i) {
      //       debugger;
      //   button.id = data.id + '_btn_' + button.index;
      // });
      return ctor === 'Array' && data.buttons || data.button;
    },
    addButton: function(button) {
      this.buttons().push(button);
    },
    pullButton: function() {
      return this.buttons().splice(0, 1)[0];
    },
    shouldGroupButtons: function() {
      return this.buttons().length > 1;
    }
  }
}

if (Meteor.isClient) {
  Template.UICallToAction.viewmodel(
    function(data) {
      return data && data.name || 'UICallToAction';
    }, // name
    UICallToAction, // ViewModel
    [
      'shouldGroupButtons',
      'buttons',
      'buttonLayout',
      'isFullWidth'
    ]
  );
}

/*==========  Export  ==========*/
Molecule.UICallToAction = UICallToAction;
