/**
 * Created by manojkumar on 4/5/16.
 */
Ext.define('Associations.model.Base', {
    extend: 'Ext.data.Model',

    /**
     * `idProperty` should be specified if a different name is
     * used for id entity (unique identifier to identify a model)
     */

    fields: [{
        name: 'id',
        type: 'int'
    }],

    schema: {
        namespace: 'Associations.model'
    }

});