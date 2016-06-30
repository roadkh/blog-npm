/* gulp 모듈을 import 합니다. 가장 기본이고 필수입니다 */
var gulp = require('gulp');

/* 작업을 진행할 source 디렉터리와 결과물을 보관할 build 디렉터리를 지정합니다. */
var src = './src/';
var dest = './build/';

/* 
    npm 에 추가한 모듈들을 일일이 require하지 않고 사용하기 위한 처리입니다.
    예를 들어 bower-main의 경우는 plugins.bowerMain() 식으로 사용이 가능합니다.
    gulp-로 시작하는 모듈들의 경우는 gulp-를 뺀 나머지로 사용가능합니다.
*/
var plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'bower-main', 'del'],
    replaceString: /\bgulp[\-.]/
});

// Minify & copy JS
/* 
    자바스크립트에 대한 처리를 진행합니다.
    {base: ''} 옵션을 넣은 이유는 이렇게 해야 디렉터리 구조를 유지한 상태로 복사합니다.
    그렇지 않을 경우에는 build 디렉터리에 그대로 파일을 복사합니다.
    혹시 concat모듈을 이용해서 하나의 거대 파일로 합칠 경우에는 위 옵션은 필요없습니다.
    처리의 내용은 src/js/ 하위의 모든 js 파일을 읽어서 이름을 .min.js 로 변경하고
    minify를 진행한 후에 build/assets/js 로 복사하라는 내용입니다.
*/
function processJS() {
    return gulp.src(src + 'js/**/*.js', {base: src + 'js/'})
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dest + 'assets/js'));
}
// gulp에 scripts라는 task로 지정합니다.
gulp.task('scripts', processJS);



// Minify & copy CSS
/*
    CSS 파일에 대한 처리를 진행합니다. 자바스크립트와 거의 동일한데 autoprefixer 부분만 특징적입니다.
    아래 설정은 모든 브라우저의 최근 2개버전을 처리하기 위한 css 처리를 하라는 내용입니다.
*/
function processCss() {
    return gulp.src(src + 'css/**/*.css', {base: src + 'css/'})
        .pipe(plugins.autoprefixer({
            // browsers: ['last 2 Chrome versions', 'last 2 Firefox versions', 'last 2 Android versions', 'last 2 ChromeAndroid versions'],
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.uglifycss())
        .pipe(gulp.dest(dest + 'assets/css'));
}
// gulp에 css라는 task로 지정합니다.
gulp.task('css', processCss);



// Copy HTML
/*
    HTML 파일들을 복사합니다.
*/
function processHtml() {
    return gulp.src(src + 'html/**/*.html', {base: src + 'html/'})
        .pipe(gulp.dest(dest));
}
gulp.task('html', processHtml);



// Copy Vendor JSS & CSS from bower_components
/*
    bower_components 디렉터리에 있는 js와 css 들을 복사합니다.
    bower_main 모듈의 처리 결과는 minified, minifiedNotFound, normal 있는데 내용은
    minified : minify 처리된 파일
    normal : 일반 파일
    minifiedNotFound :　minify 처리된 파일이 없는 파일들의 일반 파일
    입니다.
    각 파일들의 파일명 리스트를 모두 합쳐서 디렉터리 구조를 유지시키면서 assets/ext 로 복사합니다.
*/
function processExternal() {
    var scriptBowerMain = plugins.bowerMain('js', 'min.js');
    var cssBowerMain = plugins.bowerMain('css', 'min.css');
    var mapBowerMain = plugins.bowerMain('js', 'min.js.map');
    return gulp.src(scriptBowerMain.minified.concat(scriptBowerMain.minifiedNotFound).concat(cssBowerMain.minified).concat(cssBowerMain.minifiedNotFound).concat(mapBowerMain.minified), {base: './bower_components'})
        .pipe(gulp.dest(dest + 'assets/ext'));
}
// gulp 에 external 이라는 task　로 지정합니다.
gulp.task('external', processExternal);

// Watch for changes in files
/*
    실시간 감시를 위한 task 등록입니다.
    지정한 디렉터리를 감시하고 있다가 추가/삭제/변경 등이 발생할 경우에는 지정한 함수를 호출합니다.
    원래 gulp.watch 가 있는데 이 경우는 변경사항은 감지가 되지만 추가/삭제는 감지가 되지 않습니다.
    그래서 gulp-watch 모듈을 이용했습니다.
*/
gulp.task('watch', function () {
// 개별로 처리할 경우
    plugins.watch(src + 'js/**/*.js', processJS);
    plugins.watch(src + 'css/**/*.css', processCss);
    plugins.watch(src + 'html/**/*', processHtml);
    plugins.watch('./bower_components/**/*', processExternal);
});

// Default Task 입니다.
gulp.task('default', ['scripts', 'css', 'html', 'external', 'watch']);

/**
 * clean build.
 * 원래는 default task에 넣어서 gulp가 시작될 때 깨끗하게 build 디렉터리를 비우게 만들고 싶었는데,
 * 오류가 발생해서 잘 안됩니다. 뭔가 방법이 있을텐데 쉽게 찾아지지는 않네요.
 */
gulp.task('clean', function(cb) {
    plugins.del(['build/**'], cb);
});

