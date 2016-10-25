import del from 'del'
import fs from 'fs'
import path from 'path'

import gulp from 'gulp'
import connect from 'gulp-connect'
import util from 'gulp-util'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cleancss from 'gulp-clean-css'
import uglify from 'gulp-uglifyjs'
import htmlmin from 'gulp-htmlmin'
import imagemin from 'gulp-imagemin'
import resize from 'gulp-image-resize'
import eslint from 'gulp-eslint'
import scsslint from 'gulp-sass-lint'

import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'

import nunjucks from 'nunjucks'
import through from 'through2'
import marked from 'marked'
import slugify from 'slugify'

const DEFAULT_TASKS = [
  'clean',
  'styles',
  'scripts',
  'images',
  'generator',
]

const SERVER_PORT = 4000

const ROOT = './'
const APP_ROOT = './_src'
const ASSETS_DIST_ROOT = './assets'
const ASSETS_ROOT = `${APP_ROOT}/assets`
const VIEWS_ROOT = `${APP_ROOT}/views`
const LAYOUT_ROOT = `${APP_ROOT}/layout`
const LAYOUT_DEFAULT_PATH = `${LAYOUT_ROOT}/default.html`

const IMAGE_MAX_WIDTH = 900
const IMAGE_QUALITY = 0.8

// utils

function getDirectories(target) {
  return fs.readdirSync(target).filter((file) => {
    return fs.statSync(path.join(target, file)).isDirectory()
  })
}

// custom markdown image renderer

const renderer = new marked.Renderer()

renderer.image = (href, title, text) => {
  return `<div class="image" data-title="${title || text}" data-src="${href}" data-create-img="true"></div>`
}

// create new view task

function createNew(opts) {
  if (!util.env.t) {
    console.log('Error: Please set a title with the -t option.')
    return
  }

  const options = Object.assign({}, {
    dataFile: 'data.json',
    indexFile: 'index.md',
  }, opts)

  const title = util.env.t
  const slug = slugify(title, '_').toLowerCase()
  const folder = `${VIEWS_ROOT}/${slug}`

  if (fs.existsSync(folder)) {
    console.log('Error: View with that name already exists.')
    return
  }

  fs.mkdirSync(folder)

  const json = {
    title,
    slug,
    heading: title,
    subtitle: '',
    gallery: [],
  }

  const markdown = `# ${title}\n\nYour Content`

  fs.writeFileSync(`${folder}/${options.dataFile}`, JSON.stringify(json))
  fs.writeFileSync(`${folder}/${options.indexFile}`, markdown)

  console.log(`View "${slug}" with all files successfully created!`)
}

// dist page generator task

function generator(opts) {
  return through.obj((file, encoding, callback) => {
    if (file.isNull() || file.isDirectory() || file.isStream()) {
      return callback(null, file)
    }

    const options = Object.assign({}, {
      dataFile: 'data.json',
      layoutDefaultFile: './app/layout/default.html',
      layoutFolder: './app/layout',
      viewsFolder: './app/views',
      appFolder: './app',
      markdown: {
        renderer,
        breaks: true,
      },
    }, opts)

    const globalVars = JSON.parse(fs.readFileSync(`${options.appFolder}/${options.dataFile}`, 'utf8'))

    nunjucks.configure(options.layoutFolder, {
      noCache: true,
    })

    marked(file.contents.toString(), options.markdown, (err, markdown) => {
      if (err) {
        callback(new util.PluginError('generator', err, { fileName: file.path }))
        return
      }

      fs.readFile(options.layoutDefaultFile, (err, data) => {
        if (err) {
          callback(new util.PluginError('generator', err, { fileName: file.path }))
          return
        }

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
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
    }))
    .pipe(util.env._.includes('watch') ? util.noop() : cleancss())
    .pipe(gulp.dest(`${ASSETS_DIST_ROOT}/styles/`))
})

gulp.task('scripts', () => {
  browserify({
    entries: [`${ASSETS_ROOT}/scripts/app.js`]
  })
    .transform(babelify.configure({
      presets: ['es2015']
    }))
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(util.env._.includes('watch') ? util.noop() : uglify({
      enclose: true,
    }))
    .pipe(gulp.dest(`${ASSETS_DIST_ROOT}/scripts/`))
})

gulp.task('images', () => {
  gulp.src(`${ASSETS_ROOT}/images/**/*.{png,jpg,gif,ico}`)
    .pipe(imagemin())
    .pipe(gulp.dest(`${ASSETS_DIST_ROOT}/images/`))

  gulp.src(`${VIEWS_ROOT}/**/*.{png,jpg,gif}`)
    .pipe(resize({
      imageMagick: true,
      width: IMAGE_MAX_WIDTH,
      crop: false,
      upscale: false,
      quality: IMAGE_QUALITY,
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(ROOT))
})

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

gulp.task('js-linter', () => {
  gulp.src(['./gulpfile.babel.js', `${ASSETS_ROOT}/scripts/**/*.js`])
    .pipe(eslint())
    .pipe(eslint.format())
})

gulp.task('scss-linter', () => {
  gulp.src(`${ASSETS_ROOT}/styles/**/*.scss`)
    .pipe(scsslint({
      configFile: `${ROOT}.sass-lint.yml`,
    }))
    .pipe(scsslint.format())
})

// main

gulp.task('new', () => {
  createNew()
})

gulp.task('serve', DEFAULT_TASKS, () => {
  connect.server({
    port: SERVER_PORT,
  })

  gulp.watch([
    `${VIEWS_ROOT}/**/*.{md,json}`,
    `${LAYOUT_ROOT}/**/*.html`,
    `${APP_ROOT}/*.md`,
  ], ['generator'])

  gulp.watch(`${ASSETS_ROOT}/styles/**/*.scss`, ['styles', 'scss-linter'])
  gulp.watch(`${ASSETS_ROOT}/scripts/**/*.js`, ['scripts', 'js-linter'])
  gulp.watch(`${ASSETS_ROOT}/images/**/*.{png,jpg,gif,ico}`, ['images'])
})

gulp.task('default', DEFAULT_TASKS)
