Ext.define('Associations.view.main.Main', {
    extend: 'Ext.form.Panel',
    xtype: 'app-main',

    requires: [
        'Associations.store.Cities',
        'Associations.store.States',
        'Associations.view.main.MainController',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.layout.container.Form'
    ],

    controller: 'main',

    title: 'Associations',

    layout: {
        type: 'form'
    },

    items: [{
        xtype: 'combobox',
        itemId: 'stateCmb',
        fieldLabel: 'State',
        displayField: 'name',
        valueField: 'id',
        store: {
            type: 'states'
        },
        listeners: {
            select: 'onSelectState'
        }
    }, {
        xtype: 'combobox',
        itemId: 'cityCmb',
        fieldLabel: 'City',
        displayField: 'name',
        valueField: 'id',
        forceSelection: true,
        queryMode: 'local'
    }]

});
