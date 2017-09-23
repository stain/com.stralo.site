/*
 * Copyright 2017 Republic of Reinvention bvba. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *     
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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