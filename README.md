# HilcoeLearn

HilcoeLearn is a web application I'm building to make it easier for students to share and find academic materials in one place. The idea is to help students access useful resources, organize their study tasks, and keep track of their study sessions without having to search through different platforms.

## What it does

- Allows users to register and log in to their accounts.
- Helps students organize their study tasks.
- Allows users to record their study sessions.
- Aims to make sharing and finding academic materials easier.

Some features are still being developed, and I'll continue improving the project as I learn more.

## Built with

- **Frontend:** React and Vite
- **Backend:** Node.js and Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT and bcryptjs

## Project structure

```text
HilcoeLearn/
├── client/    # Frontend
└── server/    # Backend and API
```

## Running the project locally

You'll need Node.js, npm, and a MongoDB database to run the project.

### Backend setup

Open a terminal and run:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder and add your own configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Then start the backend using the appropriate script in `server/package.json`.

### Frontend setup

Open another terminal and run:

```bash
cd client
npm install
npm run dev
```

Open the local URL shown in the terminal to use the frontend.

## What's next?

I plan to keep improving HilcoeLearn by adding academic resource uploads, better search functionality, and more features to make studying and sharing materials easier.

This project is also helping me gain more practical experience with the MERN stack and understand how frontend and backend applications work together.
