Ext.define('Associations.view.main.Main', {
    extend: 'Ext.form.Panel',
    xtype: 'app-main',

    requires: [
        'Associations.view.main.MainController',
        'Ext.layout.container.Form'
    ],

    controller: 'main',

    title: 'Associations',

    layout: {
        type: 'form'
    },

    items: []

});
