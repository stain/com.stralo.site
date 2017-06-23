/**
 * Created by bram on 11/30/16.
 */
base.plugin("stralo.imports.Column", ["base.core.Class", "constants.stralo.site", "messages.stralo.site", "blocks.core.Sidebar", function (Class, StraloConstants, StraloMessages, Sidebar)
{
    var StraloColumn = this;

    /*
     * We subclass
     */
    var BlocksColumn = base.getPlugin("blocks.imports.Column");
    if (BlocksColumn) {
        (this.Class = Class.create(BlocksColumn.Class, {

            //-----VARIABLES-----

            //-----CONSTRUCTORS-----
            constructor: function ()
            {
                StraloColumn.Class.Super.call(this);
            },

            //-----IMPLEMENTED METHODS-----
            getConfigs: function (block, element)
            {
                var retVal = StraloColumn.Class.Super.prototype.getConfigs.call(this, block, element);

                retVal.push(this.addUniqueClass(Sidebar, block.element, StraloMessages.columnStyleCaption, [
                    {name: StraloMessages.columnStyleDefault, value: ""},
                    {name: StraloMessages.columnStyle1, value: StraloConstants.STYLE_1_CLASS},
                    {name: StraloMessages.columnStyle2, value: StraloConstants.STYLE_2_CLASS},
                    {name: StraloMessages.columnStyle3, value: StraloConstants.STYLE_3_CLASS},
                    {name: StraloMessages.columnStyle4, value: StraloConstants.STYLE_4_CLASS},
                ]));

                return retVal;
            }

            //-----PRIVATE METHODS-----

        })).register(BlocksColumn.TAGS);
    }
}]);