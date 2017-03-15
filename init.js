const ComponentUtil = require('./utils/componentUtil.js');
const TEMPLATE = require('./template/component.js');
const CLI = require('./utils/cli.js');
const fs = require('fs');
const path = require('path');

const VueInit = {
    init() {
        this.readPackageJSON();
        this.install();
        this.createApp();
        ComponentUtil.cleanUp('../src/App.vue');
        ComponentUtil.cleanUp('../src/components/Hello.vue');
        this.updateFiles();
    },
    install() {
        CLI.execute('npm install --save vue-style-loader && npm install --save css-loader && npm install readline --save', process.cwd());
    },
    readPackageJSON() {
        let packagePath = path.resolve(process.cwd() + '/package.json');

            fs.readFile(packagePath, 'utf8',
            function(err, data) {
                if (err) throw err;
                let json = JSON.parse(data);
                json = this.updatePackage(json);
                fs.writeFile(packagePath, JSON.stringify(json,null,2), 'utf8', function(err) {
                    if (err) return console.log(err);
                });
            }.bind(this));
    },
    updatePackage(json) {
        json['scripts']['create-component'] = "node vue-component-creator/create-component.js";
        return json;
    },
    createApp() {
        ComponentUtil.createComponent('app', TEMPLATE.appHTML);
    },
    updateFiles() {
        ComponentUtil.updateFile('../src/main.js', ['./App'], './components/app/app');
        ComponentUtil.updateFile('../src/router/index.js', [
            'import Hello from \'@/components/Hello\'',
            'component: Hello',
            'name: \'Hello\',',
            ','
        ], '');
    }
}.init();
