#!/bin/sh

### ----- FUNCTIONS -----

log ()
{
    local ECHO_PREFIX="@@@@@@@@@@@@@@@@@@@@"
    local COLOR_CYAN="\033[0;36m"
    local COLOR_GREEN="\033[0;32m"
    local COLOR_WHITE="\033[0;37m"
    local COLOR_WHITE_BOLD="\033[1;37m"
    local COLOR_RED='\033[0;31m'
    local COLOR_YELLOW="\033[0;33m"
    local COLOR_CLEAR="\033[00m"
    local logStr="$1"
    local error="$2"

    local color=$COLOR_WHITE_BOLD
    if [ "$error" = "1" ]; then
        color=$COLOR_RED
    fi
    if [ "$error" = "2" ]; then
        color=$COLOR_YELLOW
    fi
    if [ "$error" = "3" ]; then
        color=$COLOR_GREEN
    fi

    echo "$color$ECHO_PREFIX $logStr$COLOR_CLEAR" 1>&2

}
log_error ()
{
    log "$1" 1
}
log_warn ()
{
    log "$1" 2
}
log_success ()
{
    log "$1" 3
}
quit_error ()
{
    local logStr="$1"

    if [ "$logStr" != "" ]; then
        log_error "$logStr" 1
    fi

    #do we need cleanup?
    #rm -rf "$tmpDir"
    
    kill -s TERM $TOP_PID
}

# trap ctrl-c and call ctrl_c()
trap ctrl_c INT
ctrl_c ()
{
    quit_error "Caught CTRL-C, cleaning..."
}

# see http://stackoverflow.com/questions/9893667/using-exit-in-bash-functions
trap "exit 1" TERM
export TOP_PID=$$

### ----- MAIN -----

log "This script will bootstrap a demo Stralo installation to the current directory."
log "Hit ENTER to continue..."
read answer

log "Contacting GitHub to get the latest version number... "
VERSION=$(git ls-remote https://github.com/republic-of-reinvention/com.stralo.site | grep -o '[0-9]*\.[0-9]*\.[0-9]*$' | sort -r | head -n1)
if [ "$VERSION" = "" ]; then
    quit_error "Error while fetching version information."
fi

ROR_NAME="republic-of-reinvention"
STRALO_NAME="com.stralo.site"
GITHUB_REPO="https://github.com/$ROR_NAME/$STRALO_NAME"
GITHUB_REPO_RAW="https://raw.githubusercontent.com/$ROR_NAME/$STRALO_NAME"
STORAGE="$(pwd)/storage"
CONFIG="$GITHUB_REPO_RAW/stralo-site-$VERSION/example-config.xml"
LOCAL_CONFIG="./$(basename $CONFIG)"

log "Fetching a default config file from $CONFIG... "
rm -f "$LOCAL_CONFIG"
wget --quiet --output-document "$LOCAL_CONFIG" "$CONFIG" || quit_error "Error while fetching default config file"

# Big note: this will only work starting from version 1.0.1 because of the pom.xml groupId change in that release (and on)
log "Generating pom.xml... "
echo "<project xmlns=\"http://maven.apache.org/POM/4.0.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd\">

    <modelVersion>4.0.0</modelVersion>

    <groupId>com.stralo.site</groupId>
    <artifactId>stralo-site-exec</artifactId>
    <version>1.0.0</version>

    <dependencies>
        <dependency>
            <groupId>com.stralo</groupId>
            <artifactId>stralo-site</artifactId>
            <version>$VERSION</version>
        </dependency>
    </dependencies>

    <repositories>
        <repository>
            <id>beligum-releases</id>
            <url>http://maven.beligum.com/content/repositories/open-releases</url>
        </repository>
        <repository>
            <id>beligum-snapshots</id>
            <url>http://maven.beligum.com/content/repositories/open-snapshots</url>
        </repository>
    </repositories>

    <build>
        <plugins>
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>exec-maven-plugin</artifactId>
                <version>1.2.1</version>
                <configuration>
                    <mainClass>com.beligum.base.Main</mainClass>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>" > pom.xml

# These extracts are highly experimental, but work, for now.
# Note: they're not really necessary, but handy to test availability of the port and log the link to open the browser.
HOSTNAME=$(grep -oPm1 "(?<=<hostname>)[^<]+" "$LOCAL_CONFIG") || quit_error "Failed to extract hostname from config"
PORT=$(grep -oPm1 "(?<=<port>)[^<]+" "$LOCAL_CONFIG") || quit_error "Failed to extract port from config"
#Test if the port is available (not: zero means busy!)
nc -z "$HOSTNAME" "$PORT"
if [ $? -eq 0 ]; then
   quit_error "$HOSTNAME:$PORT seems to be busy, can't launch Stralo"
fi

echo ""
log_success "Allright, I've got everything I need to launch Stralo"
echo ""

log "What to do next?"
log "- On first boot, this installation will download a lot of (small) extra packages, so please be patient."
log "- Wait for the output below to display the log-string 'INFO  [o.e.j.s.Server] Started @...ms'"
log "- Open your browser and go to http://$HOSTNAME:$PORT/ "
log "- Create your first page!"
log "- Head over to www.stralo.com for more information"
log "- To bring the server down, hit ctrl-c"

echo ""
log_warn "Read the above? Then hit ENTER to boot the server"
read answer

mvn exec:java -Dexec.args="$LOCAL_CONFIG --base.core.context.local.root=$STORAGE"

