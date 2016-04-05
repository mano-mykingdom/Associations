/**
 * Created by manojkumar on 4/5/16.
 */
Ext.define('Associations.store.Cities', {
    extend: 'Ext.data.Store',

    alias: 'store.cities',

    requires: [
        'Associations.model.City'
    ],

    model: 'Associations.model.City'

});