/**
 * Created by manojkumar on 4/5/16.
 */
Ext.define('Associations.model.Base', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'int'
    }],

    schema: {
        namespace: 'Associations.model'
    }

});