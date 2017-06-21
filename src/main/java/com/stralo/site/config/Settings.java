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
