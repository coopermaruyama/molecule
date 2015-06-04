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
    isFullWidth: data.isFullWidth || false,
    name: data.name,
    title: data.title,
    message: data.message,
    size: function() {
      if (Molecule.utils.typeof(data.size) === 'String') {
        return data.size;
      } else {
        return null;
      }
    },
    buttonLayout: function() {
      if (!this.isFullWidth()) {
        return 'default';
      } else {
        return {
          class: 'btn btn-lg btn-outlined btn-white'
        }
      }
    },
    buttons: function() {
      var theType = Molecule.utils.typeof(data.buttons);
      //     namedButtons = _.map(data.buttons, function(button, i) {
      //       debugger;
      //   button.id = data.id + '_btn_' + button.index;
      // });
      return theType === 'Array' && data.buttons || data.button;
    },
    addButton: function(button) {
      this.buttons() && this.buttons().push(button);
    },
    pullButton: function() {
      return this.buttons().splice(0, 1)[0];
    },
    shouldGroupButtons: function() {
      if (Molecule.utils.typeof(this.buttons()) === 'Array') {
        return this.buttons().length > 1;
      } else {
        return false;
      }
    },
    onRendered: function(tpl) {
      var container = $(tpl.firstNode).parent();
      var checkFullWidth = function(computation) {
        var ready = $('body').length > 0;
        if (ready) {
          var compareTo = (bw = $('body').width()) - (bw * .1);
          var isFullWidth = container.width() > compareTo;
          if (isFullWidth) {
            tpl.viewmodel.isFullWidth("bar");
          }
          computation.stop();
        }
      }
      tpl.autorun( checkFullWidth );
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
