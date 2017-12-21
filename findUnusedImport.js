let filewalker = require('filewalker');
let { readFileSync, outputJSONSync } = require('fs-extra');
let resolve = require('path').resolve.bind(undefined, __dirname);

let result = [
  // { path: '', unsedModules: [] }
];
let src = resolve('./package/');

let getModuleName = function(str) {
  let testAs = str.match(/as (.*)/);
  if (testAs) {
    return testAs[1].trim();
  } else {
    return str.trim();
  }
};

let onFile = function(p, s) {
  let filePath = resolve(src, p);
  let fileContent = readFileSync(filePath).toString();
  let testImports = fileContent.match(/import .* from/g);

  if (!testImports || !testImports.length) {
    return;
  }

  let imports = testImports.map(function(item) {
    return item.match(/import (.*) from/)[1];
  });

  let modules = [];
  imports.forEach(function(item) {
    let testCurlyBraces = item.match(/{(.*)}/);
    if (!testCurlyBraces) {
      modules.push( getModuleName(item) );

    } else {
      testCurlyBraces[1].split(',').forEach(function(item) {
        modules.push( getModuleName(item) );
      });
    }
  });

  let unusedModules = modules.filter(function(item) {
    if (item === 'React') {
      return false;
    }

    return fileContent.indexOf(item) === fileContent.lastIndexOf(item);
  });

  if (unusedModules.length) {
    result.push({ filePath, unusedModules });
  }
};

let onDone = function() {
  outputJSONSync('unsedModules.JSON', result);
};


filewalker(src)
  .on('file', onFile)
  .on('done', onDone)
  .walk();