// Gulp 4
import gulp from 'gulp'

// JavaScript
import babel from 'gulp-babel';
// Plumber
import plumber from 'gulp-plumber'

// Typescript 
import ts from 'gulp-typescript';
const tsProject = ts.createProject('../tsconfig.json')
import sourcemaps from 'gulp-sourcemaps'


/**
 *
 * @param {string} src - archivos a vigilar
 * @param {string} nameFile - nombre del archivo compilado
 * @param {string} dest - destino del archivo final
 * @example jsTask(['./src/js/scripts.js'], "scripts.min.js", "./public/js")
 */

const jsTask = (src, dest) => {
  gulp
    .src(src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({
            presets: ['@babel/env']
        }))
    .pipe(sourcemaps.write('../assets/maps'))
    .pipe(gulp.dest(dest));
}


const tsTask = (src, dest) => {
  gulp
    .src(src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(babel({
            presets: ['@babel/env']
        }))
    .pipe(sourcemaps.write('../assets/maps'))
    .pipe(gulp.dest(dest));
}

export  { jsTask, tsTask }