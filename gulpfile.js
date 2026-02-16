import { watch } from "gulp";
import vfs from "vinyl-fs";
import map from 'map-stream';
import Vinyl from 'vinyl';

var log = function (file, cb) {
  console.log(file.path);
  cb(null, file);
};

vfs
  .src(['./**/*.md'])
  .pipe(map(log));
  // .pipe(vfs.dest('./output'));

// const watcher = watch(["**/*.md"])

// watcher.on('change', function(path, stats) {
//   console.log(`File ${path} was changed`);
// });

// watcher.on('add', function(path, stats) {
//   console.log(`File ${path} was added`);
// });

// watcher.on('unlink', function(path, stats) {
//   console.log(`File ${path} was removed`);
// });

// export function generate(cb) {
//     cb();
// }
