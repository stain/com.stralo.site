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
 * Created by bram on 12/1/16.
 */
base.plugin("stralo.imports.MediumEditorStyles", ["messages.blocks.imports.text", "constants.stralo.site", "messages.stralo.site", function (TextMessages, StraloConstants, StraloMessages)
{
    //-----EDITOR STYLES-----
    //possible it's not loaded (eg. because the block wasn't used in the page)
    var MediumEditor = base.getPlugin("blocks.core.MediumEditor");
    if (MediumEditor) {
        // Styles is an array with objects
        // object is of type {value:"", text""}
        // value = "p:red" -> text before the colon is the tag, text after the colon are the classes that will be added
        // nothing after colon will remove allm classes, nothing before colon will not touch the tag
        // text is the text in the dropdown
        MediumEditor.setStylePickerStyles([

            {text: null, value: '<li class="dropdown-header">' + TextMessages.styles_sectionTitles + '</li>'},
            {text: StraloMessages.widgetTextStyles_h1Stralo, value: "h1:" + StraloConstants.TEXT_STYLES_H1_STRALO_CLASS},
            {text: StraloMessages.widgetTextStyles_h1Page, value: "h1:" + StraloConstants.TEXT_STYLES_H1_PAGE_CLASS},
            {text: TextMessages.styles_h1, value: "h1:"},
            {text: TextMessages.styles_h2, value: "h2:"},
            {text: TextMessages.styles_h3, value: "h3:"},
            {text: null, value: '<li role="separator" class="divider"></li>'},

            {text: null, value: '<li class="dropdown-header">' + TextMessages.styles_sectionText + '</li>'},
            {text: TextMessages.styles_p, value: "p:"},
            {text: null, value: '<li role="separator" class="divider"></li>'},

            // {text: null, value: '<li class="dropdown-header">' + RorMessages.widgetTextStyles_sectionButtons + '</li>'},
            // {text: RorMessages.widgetTextStyles_buttonBig, value: ":" + RorConstants.TEXT_STYLES_BUTTONS_BIG_CLASS},

        ]);
    }
}]);