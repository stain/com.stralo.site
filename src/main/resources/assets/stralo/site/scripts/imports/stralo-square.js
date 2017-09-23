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
 * Created by wouter on 17/07/15.
 */
base.plugin("stralo.imports.Square", ["base.core.Class", "blocks.imports.Block", "constants.stralo.site", "messages.stralo.site", "blocks.core.Sidebar", "blocks.imports.Text", function (Class, Block, StraloConstants, StraloMessages, Sidebar, TextModule)
{
    var StraloSquare = this;
    var TAGS = ["stralo-square"];

    // Edit functionality for text inside mot-square
    var TAGS_TEXT = ["stralo-square [property='title']", "stralo-square [data-property='title']"];

    // Attention: The block must also load the text script
    TextModule.Class.register(TAGS_TEXT);

    (this.Class = Class.create(Block.Class, {

        //-----VARIABLES-----

        //-----CONSTRUCTORS-----
        constructor: function ()
        {
            StraloSquare.Class.Super.call(this);
        },

        //-----IMPLEMENTED METHODS-----
        getConfigs: function (block, element)
        {
            var retVal = StraloSquare.Class.Super.prototype.getConfigs.call(this, block, element);

            var link = element.find("a");
            retVal.push(this.addValueAttribute(Sidebar, link, StraloMessages.widgetSquareLinkLabel, StraloMessages.widgetSquareLinkPlaceholder, "href", false, true, true));

            var img = element.find("img");
            retVal.push(this.addValueAttribute(Sidebar, img, StraloMessages.widgetSquareImageLabel, StraloMessages.widgetSquareImagePlaceholder, "src", false, true, false));

            retVal.push(this.addOptionalClass(Sidebar, block.element, StraloMessages.widgetSquareHideImageLabel, StraloConstants.SQUARE_NOIMAGE_CLASS));

            return retVal;
        },
        getWindowName: function ()
        {
            return StraloMessages.widgetSquareTitle;
        },

        //-----PRIVATE METHODS-----

    })).register(TAGS);

}]);