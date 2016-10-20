import del from 'del'
import fs from 'fs'
import path from 'path'

import gulp from 'gulp'
import connect from 'gulp-connect'
import util from 'gulp-util'
import babel from 'gulp-babel'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cleancss from 'gulp-clean-css'
import uglify from 'gulp-uglifyjs'
import htmlmin from 'gulp-htmlmin'
import imagemin from 'gulp-imagemin'

import nunjucks from 'nunjucks'
import through from 'through2'
import marked from 'marked'

const DEFAULT_TASKS = [
  'clean',
  'styles',
  'scripts',
  'images',
  'generator',
]

const SERVER_PORT = 4000

const ROOT = './'
const APP_ROOT = './app'
const ASSETS_DIST_ROOT = './assets'
const ASSETS_ROOT = `${APP_ROOT}/assets`
const VIEWS_ROOT = `${APP_ROOT}/views`
const LAYOUT_ROOT = `${APP_ROOT}/layout`
const LAYOUT_DEFAULT_PATH = `${LAYOUT_ROOT}/default.html`

// utils

function getDirectories(target) {
  return fs.readdirSync(target).filter((file) => {
    return fs.statSync(path.join(target, file)).isDirectory()
  })
}

// custom page generator task

function generator(opts) {
  return through.obj((file, encoding, callback) => {
    if (file.isNull() || file.isDirectory() || file.isStream()) {
      return callback(null, file)
    }

    const options = Object.assign({}, {
      dataFile: 'data.json',
      layoutDefaultFile: './app/layout/default.html',
      layoutFolder:  './app/layout',
      viewsFolder: './app/views',
      appFolder: './app',
      markdown: {
        breaks: true,
      },
    }, opts)

    const globalVars = JSON.parse(fs.readFileSync(`${options.appFolder}/${options.dataFile}`, 'utf8'));

    nunjucks.configure(options.layoutFolder, {
      noCache: true,
    })

    marked(file.contents.toString(), options.markdown, (err, markdown) => {
      if (err) {
        callback(new util.PluginError('generator', err, { fileName: file.path }))
        return
      }

      fs.readFile(options.layoutDefaultFile, (err, data) => {
        const pageFilePath = file.path.split('/')
        const pageName = pageFilePath[pageFilePath.length - 2]

        fs.readFile(`${options.viewsFolder}/${pageName}/${options.dataFile}`, (err, vars) => {
          const pageVars = err ? {} : JSON.parse(vars)
          const view = nunjucks.renderString(
            data.toString(),
            Object.assign(
              {}, globalVars, pageVars, {
                content: new Buffer(markdown),
              }
            )
          )

          file.path = util.replaceExtension(file.path, '.html')
          file.contents = new Buffer(view)

          callback(null, file)
        })
      })
    })
  })
}

// tasks

gulp.task('clean', () => {
  const pagesDirs = getDirectories(VIEWS_ROOT)
  return del.sync([
    `${ROOT}/index.html`,
    `${ASSETS_DIST_ROOT}/**`,
  ].concat(pagesDirs))
})

gulp.task('styles', () => {
  gulp.src(`${ASSETS_ROOT}/styles/app.scss`)
    .pipe(sass({
      errLogToConsole: true,
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(util.env._.includes('watch') ? util.noop() : cleancss())
    .pipe(gulp.dest(`${ASSETS_DIST_ROOT}/styles/`))
})

gulp.task('scripts', () => {
  gulp.src(`${ASSETS_ROOT}/scripts/app.js`)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(util.env._.includes('watch') ? util.noop() : uglify({
      enclose: true,
    }))
    .pipe(gulp.dest(`${ASSETS_DIST_ROOT}/scripts/`))
})

gulp.task('images', () =>
  gulp.src(`${ASSETS_ROOT}/images/**/*.{png,jpg,gif,ico}`)
    .pipe(imagemin())
    .pipe(gulp.dest(`${ASSETS_DIST_ROOT}/images/`))
)

gulp.task('generator', () => {
  gulp.src([`${VIEWS_ROOT}/**/*.md`, `${APP_ROOT}/index.md`])
    .pipe(generator({
      layoutDefaultFile: LAYOUT_DEFAULT_PATH,
      layoutFolder: LAYOUT_ROOT,
      viewsFolder: VIEWS_ROOT,
      appFolder: APP_ROOT,
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
    }))
    .pipe(gulp.dest(ROOT))
})

// main

gulp.task('serve', DEFAULT_TASKS, () => {
  connect.server({
    port: SERVER_PORT,
  })

  gulp.watch([`${VIEWS_ROOT}/**/*.{md,json}`, `${LAYOUT_ROOT}/**/*.html`, `${APP_ROOT}/*.md`], ['generator'])
  gulp.watch(`${ASSETS_ROOT}/styles/**/*.scss`, ['styles'])
  gulp.watch(`${ASSETS_ROOT}/scripts/**/*.js`, ['scripts'])
  gulp.watch(`${ASSETS_ROOT}/images/**/*.{png,jpg,gif,ico}`, ['images'])
})

gulp.task('default', DEFAULT_TASKS)
