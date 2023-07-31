# Task Manager API

This is a RESTful API for a simple task manager application built using Node.js and Express.js.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository or download the source code.

```bash
git clone https://github.com/Neetansh1457/task-manager-api.git
```

2. Navigate to the project directory.
```bash
cd task-manager-api
```


### Building the Docker Image

3. Build the Docker image using the provided Dockerfile:
```bash
docker build -t task-manager-api .
```

4. Running the Docker Container
```bash
docker run -d -p 3000:3000 task-manager-api
```
### Access the API:
The server will start running on `http://localhost:3000`

### Stopping the Docker Container
To stop the Docker container, first, find the container ID:
```bash
docker ps
```
### Then, stop the container:
```bash
docker stop CONTAINER_ID
```

## API Reference


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET /tasks` | `JSON` |Retrieve all tasks. |
| `GET /tasks/:id` | `JSON` |Retrieve a single task by its ID. |
| `POST /tasks` | `JSON` | Create a new task. |
| `PUT /tasks/:id` | `JSON` |Update an existing task by its ID. |
| `DELETE /tasks/:id` | `JSON` |Delete a task by its ID. |


### Error Handling
The API includes proper error handling for invalid requests. If an endpoint is requested with incorrect or missing data, appropriate error responses will be sent.

### Input Validation
Input validation is implemented for task creation and updates. The title and description fields are required, and the completion status must be a boolean value.

### Data Persistence
Tasks data is stored in a JSON file (tasks.json). The API will read and write to this file for data storage.

### Contributing
Contributions are welcome! If you find any bugs or want to add new features, feel free to open an issue or submit a pull request.

