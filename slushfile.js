/*
 * slush-webstarterkit
 * https://github.com/arvindr21/slush-webstarterkit
 *
 * Copyright (c) 2014, Arvind Ravulavaru
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer');

gulp.task('default', function (done) {
    var prompts = [];
    inquirer.prompt(prompts,
        function (answers) {
            gulp.src(__dirname + '/templates/**')
                .pipe(template(answers))
                .pipe(rename(function (file) {
                    if (file.basename.indexOf('__') == 0) {
                        file.basename = file.basename.replace('__','.');
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('end', function () {
                    done();
                });
        });
});
