import gulp from 'gulp'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import tsify from 'tsify'
// import sourcemaps from 'gulp-sourcemaps'
import buffer from 'vinyl-buffer'
import glob from 'glob'
import rename from 'gulp-rename'
import plumber from 'gulp-plumber'


const bundleTS = function (src, dest) {
  glob(src, function(err, files){
    files.forEach( function (entry){
    return browserify({
      // basedir: ".",
      debug: true,
      entries: entry,
      cache: {},
      packageCache: {},
    })
    .plugin(tsify)
    .transform("babelify", {
      presets: ["@babel/preset-env"],
      extensions: [".ts", ".js"],
    })
    .bundle()
    .pipe(source(entry))
    .pipe(rename(acortarNombre(entry) + '.bundle.js'))
    .pipe(buffer())
    // .pipe(sourcemaps.init({ loadMaps: true }))
    // .pipe(sourcemaps.write("/assets/maps"))
    .pipe(gulp.dest(dest));
  })
})
}


const bundleJS = (src, nameFile, dest) => {
  glob(src, (err, files) =>{
    files.forEach((entry) =>{
      return browserify({
        entries: entry,
        debug: true,
        cache: {},
        packageCache: {}
        })
        .transform("babelify", {
        presets: ["@babel/preset-env"],
        extensions: [".ts", ".js"],
        })
        .plugin('tinyify')
        .bundle()
        .pipe(plumber())
        .pipe(source(entry))
        .pipe(rename(acortarNombre(entry) + '.bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest(dest))
    })
  })
}

export  {bundleTS, bundleJS}

function acortarNombre(cadena){
return cadena
.substr(cadena.indexOf('/')+1)
.substr(cadena.indexOf('/'))
}