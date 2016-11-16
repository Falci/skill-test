# Node JS

A simple _pure NodeJS_ api. This app creates some endpoints to handle (CRUD) notes.

The content is stored in files.

This project has no 3rd-party dependencies.

## Notes
* There is no pattern related to URLs. The _read_ method uses **query string**, while _delete_ uses **path params**. Reason: to have more examples.
* Notes are encrypted and stored in `node/notes` as files.

## Start the app

### Standalone
Runs a single thread/process of app.

| Option | Description | Default |
|---|---|---|
| PORT | The port number that will be listen by app | 3000  |

#### Example
`PORT=3001 node standalone.js`

### Cluster
We can run multiple instances of the app. The number of instances is based on the number of CPUs available.


| Option | Description | Default |
|---|---|---|
| PORT | The port number that will be listen by app | 3000 |
| NUM | Number of instances | CPUs available or 2 |

#### Example
`NUM=3 PORT=3001 node cluster.js`

## Endpoints

| Method | URL | Description | Params |
|---|---|---|---|
| GET | /api/allnotes | Returns all notes | N/A |
| GET | /api/notepad?name={name}  | Returns a single note | name: file name |
| POST | /api/notepad  | Saves a note | `name` and `content` as request body |
| DELETE | /api/notepad/{name}  | Delete a note | name: file name |

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/742ae492d5ebb152018c)
