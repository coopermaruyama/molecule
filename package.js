Package.describe({
  name: 'cooperm:molecule',
  version: '0.0.2',
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
    'mquandalle:jade@0.4.3',
    'manuel:viewmodel@1.7.4',
    'stylus'
  ]);
  api.use(['templating'], 'client');
  api.addFiles('molecule.js');
  //
  // Available molecules
  //
  // Assuming a molecule is called "molecule", the following must exist:
  //  lib/
  //    my_molecule/
  //      molecule.jade
  //      molecule.js
  //      molecules.styl
  //
  var molecules = [
    'button',
    'call_to_action'
  ];
  for (var i = 0; i < molecules.length; i++) {
    api.addFiles('lib/' + molecules[i] +'/'+ molecules[i] + '.jade', 'client');
    api.addFiles('lib/' + molecules[i] +'/'+ molecules[i] + '.js');
    api.addFiles('lib/' + molecules[i] +'/'+ molecules[i] + '.import.styl', 'web');
  }
  api.addFiles('lib/molecule.styl', 'web');
  api.export('Molecule');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('cooperm:molecule');
  api.addFiles('molecule-tests.js');
});
