const ComponentUtil = require('./utils/componentUtil.js');
const fs = require('fs');
const path = require('path');

const VCCPInit = {
    APP_TEMPLATE: '<div id="app"><router-view></router-view></div>',
    init() {
        this.createApp();
        ComponentUtil.cleanUp('../src/App.vue');
        ComponentUtil.cleanUp('../src/components/Hello.vue');
        this.updateFiles();
    },
    createApp() {
        ComponentUtil.createComponent('app', this.APP_TEMPLATE);
    },

    updateFiles() {
      ComponentUtil.updateFile( '../src/main.js', ['./App'],  './components/app/app');
      ComponentUtil.updateFile( '../src/router/index.js', [
        'import Hello from \'@/components/Hello\'',
        'component: Hello',
        'name: \'Hello\',',
        ','
      ],  '');
    }
}.init();
