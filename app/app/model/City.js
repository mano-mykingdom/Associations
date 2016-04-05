/**
 * Created by manojkumar on 4/5/16.
 */
Ext.define('Associations.model.City', {
    extend: 'Associations.model.Base',

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'state_id',
        type: 'int',
        reference: 'State'
    }]

});