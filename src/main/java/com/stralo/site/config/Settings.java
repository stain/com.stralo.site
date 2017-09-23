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

package com.stralo.site.config;

import com.beligum.base.server.R;

/**
 * Created by bram on 6/14/16.
 */
public class Settings
{
    //-----CONSTANTS-----
    private static Settings instance;
    private static final String COMMON_PREFIX = "stralo.site";

    //-----VARIABLES-----

    //-----CONSTRUCTORS-----
    private Settings()
    {
    }
    public static Settings instance()
    {
        if (Settings.instance == null) {
            Settings.instance = new Settings();
        }

        return Settings.instance;
    }

    //-----PUBLIC METHODS-----
    public String getGoogleAnalyticsKey()
    {
        return R.configuration().getString(COMMON_PREFIX + ".google-analytics-key");
    }

    //-----PROTECTED METHODS-----

    //-----PRIVATE METHODS-----

}
