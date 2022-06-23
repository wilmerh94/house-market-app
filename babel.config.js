const alias = require('./importAliases');

plugins: [
  // .. other plugins

  // start here
  [
    'module-resolver',
    {
      root: ['./src'],
      alias,
      extensions: ['.jsx', 'js']
    }
  ]
  // end here
];
