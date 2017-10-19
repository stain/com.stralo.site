FROM maven:3-jdk-8
# on-build will do 
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ADD . /usr/src/app 
# Find latest version
RUN VERSION=$(git ls-remote https://github.com/republic-of-reinvention/com.stralo.site | grep -o '[0-9]*\.[0-9]*\.[0-9]*$' | sort -r | head -n1) && \
    sed -i s/.{VERSION}/$VERSION/ exec.xml
RUN mvn -f exec.xml install
# Dummy-run to get all dependencies
RUN mvn -f exec.xml exec:java && true

# Expose on global interface so we are reachable outside docker container
RUN sed -i 's,<hostname>localhost</hostname>,<hostname>0.0.0.0</hostname>,' example-config.xml
# .. but still claim http://localhost:8080/ as base

RUN mkdir -p /stralo/storage
RUN cp example-config.xml /stralo/config.xml
VOLUME /stralo

EXPOSE 8080
CMD ["mvn", "-f", "/usr/src/app/exec.xml", "exec:java", "-Dexec.args=/stralo/config.xml --base.core.context.local.root=/stralo/storage"]
