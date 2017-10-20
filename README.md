Stralo
-----------------
This is the source code of the [stralo.com](http://www.stralo.com) website.

It was created by the developers at [Republic of Reinvention](http://www.reinvention.be)
and serves as an example on how to create a website using the Stralo framework.

Please head over to the [Stralo website](http://www.stralo.com) for all information on how to install, use, contribute, support, etc.

## Quick start

If you're on a UNIX system, try to run `quickstart.sh` to bootstrap a local installation or just execute the one-liner below (which basically does the same):

`sh <(curl -sL https://git.io/stralostart)` 

Alternatively, if you've got [Docker](https://www.docker.com/) installed, then try:

    docker run -p 8080:8080 stain/stralo

Wait for the output to display the log-string that look like:

    INFO  [o.e.j.s.Server] Started @...ms'

Then initialize the administrator user by surfing to http://localhost:8080/users/init
afterwhich you can log in at  http://localhost:8080/users/init with
username `admin` and password `admin123` to go ahead and create your first page!


## For more information

* [Stralo website](http://www.stralo.com)
* [Republic of Reinvention website](http://www.reinvention.be)
* [Republic of Reinvention GitHub page](https://github.com/republic-of-reinvention)

## License

[Apache License 2.0](LICENSE)
