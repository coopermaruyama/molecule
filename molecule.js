/**
 * Primary namespace for all molecules.
 * @namespace
 * @type {object}
 */
Molecule = Molecule || {};

/*======================================================
=    Shared library
======================================================*/
Molecule.utils = {};
/**
 *  Returns the true type of passed in argument.
 *
 *  @method   function
 *  @param    {any}  elem         Element to return the type of.
 *  @param    {boolean}  shouldParse  specify whether to extract the type from
 *   the raw string, e.g. 'Number' instead of '[Object Number]'.
 *  @return   {any}  The type of whatever argument was passed in.
 *  @example  Molecule.utils.typeof( 4 ) => "[Object Number]"
 */
Molecule.utils.typeof = function(elem, dontParse) {
  dontParse = typeof dontParse !== 'undefined' ? dontParse : false;
  var re = /^\[object (.+)\]/; // Matches 'abc' in "[Object abc]"
  if (typeof elem === 'undefined') {
    return 'undefined';
  }
  if (dontParse) {
    return Object.prototype.toString.call(elem);
  } else {
    return Object.prototype.toString.call(elem).match(re)[1];
  }
}
