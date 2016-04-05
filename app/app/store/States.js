/**
 * Created by manojkumar on 4/5/16.
 */
Ext.define('Associations.store.States', {
    extend: 'Ext.data.Store',

    alias: 'store.states',

    requires: [
        'Associations.model.State',
        'Ext.data.proxy.Rest'
    ],

    model: 'Associations.model.State',

    proxy: {
        type: 'rest',
        url: '/states',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});