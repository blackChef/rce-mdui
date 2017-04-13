let { copySync } = require('fs-extra');
let { readdirSync } = require('fs');
let resolve = require('path').resolve.bind(undefined, __dirname);
let compileES6 = require('./compileES6');

let src = '../package';
let dist = '../readyToPublish';

let resolveRoot = resolve.bind(undefined, '../');
let resolveSrc = resolve.bind(undefined, src);
let resolveDist = resolve.bind(undefined, dist);
let resolveComponents = resolveSrc.bind(undefined, 'components');

let copyFiles = function() {
  readdirSync( resolveComponents() ).forEach(function(item) {
    copySync(
      resolveComponents(item),
      resolveDist(item)
    );
  });

  copySync(
    resolveSrc('utils'),
    resolveDist('utils')
  );

  copySync(
    resolveRoot('package.json'),
    resolveDist('package.json')
  );

  // copySync(
  //   resolveRoot('README.md'),
  //   resolveDist('README.md')
  // );
};

copyFiles();
compileES6(dist);


