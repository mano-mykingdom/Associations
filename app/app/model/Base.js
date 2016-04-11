Ext.util.Format.pluralize = function (value) {
    return Ext.util.Inflector.pluralize(value);
};
/**
 * Created by manojkumar on 4/5/16.
 */
Ext.define('Associations.model.Base', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    /**
     * `idProperty` should be specified if a different name is
     * used for id entity (unique identifier to identify a model)
     */

    fields: [{
        name: 'id',
        type: 'int'
    }],

    /**
     * When a model specifies a “schema” config, that schema will be inherited by all derived models.
     */
    schema: {
        /**
         * By specifying this namespace all models gain a shortened name call an `entityName`.
         * This short name is primarily useful when defining associations between models.
         */
        namespace: 'Associations.model',
        /**
         * This is an object template which is similar to textual templates based on Ext.XTemplate.
         * The difference is that the object template produces objects when given its data.
         * In this case, that data is used to automate the definition of the `proxy` config for all models
         * that do not explicitly define a proxy.
         */
        proxy: {
            type: 'rest',
            url: '/{entityName:pluralize}',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }

});