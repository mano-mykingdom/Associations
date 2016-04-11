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
        reference: {
            /**
             * If the referenced entity has an ownership relationship reference.parent or
             * reference.child should be specified instead.
             * Note: Here City is child of State
             */
            parent: 'State',
            /**
             * By default, this is the pluralized name of this entity unless this reference is unique,
             * in which case the default name is the singularized name of this entity.
             * Note: Here the default value itself is 'cities' which is pluralized form of City
             */
            inverse: 'cities'
        }
    }]

});