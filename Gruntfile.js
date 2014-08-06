module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            develop: ["js/*"],
            product: ["dist/*"]
        },

        ngtemplates: {
            "template": {
                cwd: 'src/tpl',
                src: '**/*.html',
                dest: 'js/<%= pkg.name %>-<%= pkg.version %>-tpl.js',
                options: {
                    htmlmin: { collapseWhitespace: true, collapseBooleanAttributes: true },
                    bootstrap: function (module, script) {
                        return '(function(angular){angular.module("ohFreshAdmin.template",[]).run(["$templateCache",function($templateCache){' + script + '}]);})(angular);';
                    }
                }
            }
        },

        uglify: {
            dependencies: {
                files: {
                    'dist/js/vendor.min.js': [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/moment/moment.js',
                        'bower_components/moment/lang/zh-cn.js',
                        'bower_components/angular/angular.js',
                        'bower_components/angular-route/angular-route.js',
                        'bower_components/angular-touch/angular-touch.js',
                        'bower_components/angular-moment/angular-moment.js',
                        'bower_components/angular-local-storage/angular-local-storage.js'
                    ]
                }
            },
            product: {
                options: {
                    banner: '/*!\n * @overview <%= pkg.name %>\n * @author <%= pkg.author%>\n * @version <%= pkg.version %>\n * @date <%= grunt.template.today("yyyy-mm-dd") %>\n */\n'
                },

                files: {
                    'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js': [
                        'src/js/application.js',
                        'src/js/settings.js',
                        'src/js/service/**/*.js',
                        'src/js/controller/**/*.js',
                        'src/js/routes.js'
                    ]
                }
            },
            template: {
                options: {
                    banner: '/*!\n * @overview <%= pkg.name %>-template\n * @author <%= pkg.author%>\n * @version <%= pkg.version %>\n * @date <%= grunt.template.today("yyyy-mm-dd") %>\n */\n'
                },
                files: {
                    'dist/js/<%= pkg.name %>-<%= pkg.version %>-tpl.min.js': [
                        'js/<%= pkg.name %>-<%= pkg.version %>-tpl.js'
                    ]
                }
            }
        },

        cssmin: {
            product: {
                options: {
                    banner: '/*!\n * @overview <%= pkg.name %>\n * @author yangfang@tjpower.com.cn\n * @version <%= pkg.version %>\n * @date <%= grunt.template.today("yyyy-mm-dd") %>\n */\n'
                },
                files: {
                    'dist/css/<%= pkg.name %>-<%= pkg.version %>-all.min.css': ['src/css/**/*.css', 'bower_components/animate-css/animate.css']
                }
            }
        },

        concat: {
            product: {
                src: [
                    'dist/js/vendor.min.js',
                    'dist/js/<%= pkg.name %>-<%= pkg.version %>-tpl.min.js',
                    'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js'
                ],
                dest: 'dist/js/<%= pkg.name %>-<%= pkg.version %>-all.min.js'
            }
        },

        copy: {
            develop: {
                files: [
                    {expand: true, cwd: 'src/image', src: ['*'], dest: 'image/'}
                ]
            },
            product: {
                files: [
                    {expand: true, cwd: 'src/image', src: ['*'], dest: 'dist/image'}
                ]
            }
        },

        imagemin: {
            dynamic: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/image',
                        src: ['*.{png,jpg,gif}'],
                        dest: 'image'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist_index.html'
                }
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            img: {
                files: ['src/image/**'],
                tasks: ['imagemin']
            },
            tpl: {
                files: ['src/tpl/**'],
                tasks: ['ngtemplates']
            }
        },

        connect: {
            server: {
                options: {
                    port: 3100,
                    base: ''
                }
            }
        },
        open: {
            kitchen: {
                path: 'http://localhost:3100/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('server', ['connect', 'open', 'watch']);
    grunt.registerTask('cleanAll', ['clean']);
    grunt.registerTask('build', ['clean:develop', 'ngtemplates', 'copy:develop']);
    grunt.registerTask('publish', ['clean:product', 'ngtemplates', 'uglify', 'htmlmin', 'cssmin', 'copy:product', 'concat']);
    grunt.registerTask('devlop', ['clean:develop', 'ngtemplates', 'copy:develop', 'watch']);
}