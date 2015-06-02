Package.describe({
  name: 'cooperm:molecule',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'A framework of reactive UI components.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/coopermaruyama/molecule',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('molecule.js');
  api.use([
    'underscore',
    'mquandalle:jade',
    'manuel:viewmodel',
    'stylus'
  ]);
  api.use(['templating'], 'client');
  api.addFiles('molecule.js');
  //
  // Available molecules
  //
  // Assuming a molecule is called "molecule", the following must exist:
  //  lib/
  //    molecule.jade
  //    molecule.js
  //    molecules.styl
  var molecules = [
    'button',
    'call_to_action'
  ];
  for (var i = 0; i < molecules.length; i++) {
    api.addFiles('lib/' + molecules[i] +'/'+ molecules[i] + '.jade', 'client');
    api.addFiles('lib/' + molecules[i] +'/'+ molecules[i] + '.js');
    api.addFiles('lib/' + molecules[i] +'/'+ molecules[i] + '.styl', 'client');
  }
  api.export('Molecule');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('cooperm:molecule');
  api.addFiles('molecule-tests.js');
});
