import gulp from 'gulp';
import fs from 'fs';
import rename from 'gulp-rename';
import ejs from 'gulp-ejs';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import imagemin, { mozjpeg, optipng } from 'gulp-imagemin';

//ejsをコンパイルするタスク
gulp.task('ejs',function(){
    return gulp.watch('./ejs/*.ejs',function(){
        let json = JSON.parse(fs.readFileSync('./ejs/includes/meta.json', 'utf-8'));
        return(
            gulp.src(
                ['./ejs/**/*.ejs','!'+'./ejs/**/_*.ejs']
            )
            .pipe(ejs({json:json}))
            .pipe(rename({
                extname:'.html'
            }))
            .pipe(gulp.dest('dist'))
        );
    });
});

//scssをコンパイルするタスク
gulp.task('scss', function () {
    return gulp.watch('scss/*.scss', function(){
        return gulp.src('scss/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('dist/css'));
    });
});

//画像を圧縮するタスク
gulp.task('images',function(){
	return gulp.src('src/**/*', {encoding: false}) //srcディレクトリ以下の画像を全て監視
		.pipe(imagemin([
			mozjpeg({quality: 75, progressive: true}), //jpeg画像の圧縮
			optipng({optimizationLevel: 5}), //png画像の圧縮
		]))
		.pipe(gulp.dest('dist/images')) //imagesディレクトリに出力
});

//引数なしで「gulp」コマンドだけを実行した場合に実行されるデフォルトのタスク
gulp.task('default',gulp.parallel('ejs', 'scss', 'images'));

