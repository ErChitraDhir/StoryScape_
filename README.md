
# StoryScape
StoryScape is an interactive web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to create, share, and explore stories in a collaborative and immersive environment.

![StoryScape Logo](https://mir-s3-cdn-cf.behance.net/projects/404/79c131148566535.Y3JvcCwxMDUyLDgyMywxNzQsMjA.png)


## Features:

- **STORY MANAGEMENT**: Create, edit, and manage your stories with ease.
- **DISCOVER STORIES**: Explore a variety of stories shared by other users.
- **RESPONSIVE DESIGN**: Intuitive and mobile-friendly UI built with React.
- **REAL-TIME INTERACTION**: Seamless story management powered by a fast backend.
- **DATA HANDLING**: Efficient story storage and retrieval using MongoDB.



## TechStack:

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS, Bootstrap

## Document
### https://drive.google.com/file/d/1T-41RD_E15qo-rT_h1UZxUdDtp5of0IL/view
## API Reference

### Get all stories

```http
  GET /api/stories
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/stories/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Create a new story
  ```http
    POST /api/stories

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. The title of the story | 
| `content`    | `string` | **Required**. The content of the story | 
| `author`     | `string` | **Required**. The author of the story | 



#### Delete a story
  ```http
      DELETE /api/stories/${id}


```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. The title of the story |



