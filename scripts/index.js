const imagemin = require('imagemin');
const imageminJpeg = require('imagemin-jpegtran');
const imageminPng = require('imagemin-pngquant');

const minifier = require('node-minify');

async function compressImages() {
  console.log('compressing images...');
  await imagemin(['img/*.{jpg,png}'], {
    destination: 'build/img',
    plugins: [
      imageminJpeg(),
      imageminPng({
        quality: [0.6, 0.8]
      })
    ]
  });

  console.log('done compressing images');
}

async function minifyJs() {
  console.log('minifying javascript files...');
  await deleteFiles('build/js');
  await minifier.minify({
    compressor: 'yui-js',
    input: 'js/*.js',
    output: 'build/js/scripts.js'
  });
  console.log('done minifying');
}

async function minifyCss() {
  console.log('minifying css files...');
  await deleteFiles('build/css');

  await minifier.minify({
    compressor: 'yui-css',
    input: 'css/*.css',
    output: 'build/css/styles.css'
  });
  console.log('done minifying');
}

async function deleteFiles(directory='') {
  try {
    console.log(`cleaning ${directory}...`, );
    const path = require('path');
    const fs = require('fs');
    const util = require('util')  ;
  
    const readdir = util.promisify(fs.readdir);
    const unlink = util.promisify(fs.unlink);
  
    const files = await readdir(directory);
    for(let file of files) {
      await unlink(path.join(directory, file));
    }
  
    console.log('done directory cleaning');
  } catch(e) {
    console.log(`Directory ${directory} does not exist`, e);
  }
 
}

// compressImages();

minifyJs();
minifyCss();