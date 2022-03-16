# Contact Book Webapp
## Building and Launching the App
First step to getting the application ready is to build it.
1. Clone the repo to your machine
2. Change directory into the root of the project folder
3. Run the following command: `docker build -t contact-book .`

The application image has now been created. To create a container from it,
run the following command:
`docker run -p 3000:3000 contact-book`