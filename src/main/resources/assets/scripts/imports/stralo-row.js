/**
 * Created by bram on 11/30/16.
 */
base.plugin("stralo.imports.Row", ["base.core.Class", "constants.stralo.site", "messages.stralo.site", "blocks.core.Sidebar", function (Class, StraloConstants, StraloMessages, Sidebar)
{
    var StraloRow = this;

    /*
     * We subclass
     */
    var BlocksRow = base.getPlugin("blocks.imports.Row");
    if (BlocksRow) {
        (this.Class = Class.create(BlocksRow.Class, {

            //-----VARIABLES-----

            //-----CONSTRUCTORS-----
            constructor: function ()
            {
                StraloRow.Class.Super.call(this);
            },

            //-----IMPLEMENTED METHODS-----
            getConfigs: function (block, element)
            {
                var retVal = StraloRow.Class.Super.prototype.getConfigs.call(this, block, element);

                retVal.push(this.addUniqueClass(Sidebar, block.element, StraloMessages.rowStyleCaption, [
                    {name: StraloMessages.rowStyleDefault, value: ""},
                    {name: StraloMessages.rowStyle1, value: StraloConstants.STYLE_1_CLASS},
                    {name: StraloMessages.rowStyle2, value: StraloConstants.STYLE_2_CLASS},
                    {name: StraloMessages.rowStyle3, value: StraloConstants.STYLE_3_CLASS},
                    {name: StraloMessages.rowStyle4, value: StraloConstants.STYLE_4_CLASS},
                ]));

                return retVal;
            }

            //-----PRIVATE METHODS-----

        })).register(BlocksRow.TAGS);
    }
}]);