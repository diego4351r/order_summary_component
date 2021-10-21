// Gulp 4
import gulp from 'gulp'
// Pug
import pugTask from './pug.task'
// Css
import { cssTask, cssTaskDev } from './css.task'
// Javascript
import {tsTask, jsTask} from './script.task'
import {bundleTS, bundleJS} from './bundle.task'
// Images
import { imagesTask, imagesTaskDev } from './images.task'
// Browser Sync
import { init as server, reload } from 'browser-sync'

// PUG - production
gulp.task('pug-production', async () => {
  pugTask('./src/views/pages/*.pug', false, './public')
})

// PUG - dev mode
gulp.task('pug-dev', async () => {
  pugTask('./src/views/pages/*.pug', true, './public')
})

// SCSS - production
gulp.task('scss-production', async () => {
  cssTask('./src/scss/styles.scss', 'compressed', './public/css')
})

// SCSS - dev mode
gulp.task('scss-dev', async () => {
  cssTaskDev('./src/scss/*.scss', 'expanded', './public/css', '**/*.css', )
})

// JavaScript - dev mode
gulp.task('scripts-dev', async () => {
  jsTask(['./src/js/*.js'],  './public/js')
})

// tsScript - dev mode
gulp.task('tsScripts-dev', async () => {
  tsTask(['./src/ts/*.ts'], './public/js')
})

//TsBundle - production
gulp.task('bundleTS', async () => {
  bundleTS('src/ts/*.ts', 'public')
})

//jsScript - production
gulp.task('bundleJS', async () => {
  bundleJS('src/js/*.js', 'public', 'public/js')
})

// Images - dev mode
gulp.task('images-dev', async () => {
  imagesTaskDev('src/assets/**/*', 'public/assets/')
})

// Images - production
gulp.task('images-production', async () => {
  imagesTask('src/assets/**/*', 'public/assets/')
})



// Watchers
// Production
gulp.task('production',
gulp.series(
  gulp.parallel(['pug-production', 'scss-production', 'bundleTS','bundleJS', 'images-production'])
))

// Development
gulp.task('dev', () => {
  server({
    server: './public',
    browser: "firefox"
    })
    gulp.watch('./src/views/**/*.pug', gulp.series('pug-dev')).on('change', reload)
    gulp.watch('./src/scss/*.scss', gulp.series('scss-dev'))
    gulp.watch(['./src/js/*.js', './src/js/**/*.js', './src/ts/**/*.ts'], gulp.series('tsScripts-dev')).on('change', reload)
    gulp.watch('./src/assets/**/*', gulp.series('images-dev'))
})