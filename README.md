## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Crear imagen

    docker build -t ngformtemplate .

## Correr contenedor

    docker run -p 4200:80 ngformtemplate

[//]: # (--network ngformtemplate .)

[//]: # (When the download is complete, the docker run command will create a running database within a Docker container. For PostgreSQL, the POSTGRES_PASSWORD environment variable must be specified with the -e option:)

[//]: # (    $docker run -e POSTGRES_PASSWORD=password postgres)

[//]: # ()
[//]: # (Next, we'll test our database container connection.)
