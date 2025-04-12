# Dropbox Clone Web App

    A simplified Dropbox-like application built with **Express.js**, **MongoDB**, and a **React frontend**. 
    Users can upload, list, and download files through a web interface.

# Project Structure
    DROPBOX APP/
    ├── dropbox-Backend/
    ├── dropbox-frontend/
    ├── docker-compose.yml
    └── README.txt

# Features
    - Upload files
    - List all uploaded files
    - Download files
    - MongoDB for file metadata
    - Dockerized deployment

# How to Run the App
    ## Prerequisites
        - [Docker](https://www.docker.com/)
        - [Docker Compose](https://docs.docker.com/compose/)


    ## Run with Docker Compose

        - **Clone the repo**: git clone https://github.com/your-username/dropbox-app.git
        - **Go to project directory**   cd "Dropbox App"

    ## to build and start, run ->  docker-compose up --build
    ## to stop and clean, run  ->  docker-compose down -v
   
    ## Access the app:

        - Frontend: http://localhost:3000

        - Backend API: http://localhost:3001

# Backend API Endpoints
  ---------------------------------------------------
  |  Method	 |   Endpoint	   |     Description    |
  |  POST	 |    /upload	   |     Upload a file  |
  |  GET	 |    /files	   |     List all files |
  |  GET	 |    /files/:id   |	 Download a file|
  |--------------------------------------------------

   
