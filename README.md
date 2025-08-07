# Bit-Paste

Bit-Paste is a minimal, modern web application for creating and sharing text or code snippets—similar to a pastebin—built using the MERN stack (MongoDB, Express.js, React, Node.js). It supports syntax highlighting, expiration, and simple sharing via unique URLs.

## Features

- **Create Pastes:** Add a title (optional), select a language for syntax highlighting, set an expiration (never, 1 hour, 1 day, 1 week, 1 month), and paste your text or code.
- **View Pastes:** Each paste is accessible via a unique short link. View paste content with syntax highlighting and copy to clipboard.
- **Expiration:** Pastes can optionally expire after a set duration; expired pastes are deleted automatically.
- **Languages Supported:** Plain text, JavaScript, Python, Java, HTML, CSS, JSON, Markdown.
- **Minimal UI:** Fast, clean, and responsive interface.

## Live Demo

[bit-paste.vercel.app](https://bit-paste.vercel.app)

## Stack

- **Frontend:** React (with Vite, Tailwind CSS, react-syntax-highlighter)
- **Backend:** Node.js, Express.js, Mongoose (MongoDB)
- **Database:** MongoDB
- **Other:** nanoid for unique paste IDs

## Quick Start

### Prerequisites

- Node.js (v20+ recommended)
- npm
- MongoDB (local or Atlas)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/Abhishek001konni/bit-paste.git
cd bit-paste
```

#### 2. Backend Setup

```bash
cd server
npm install
```

- Create a `.env` file in the `server` directory with your MongoDB connection string:
  ```
  MONGO_URI=your_mongodb_connection_string
  PORT=5000
  ```
- Start the backend server:
  ```bash
  npm start
  ```

#### 3. Frontend Setup
- Create a `.env` file in the `client` directory with your API connection string:
  ```
  VITE_API_URL=API_URL
  ```
  
```bash
cd ../client
npm install
npm run dev
```
- The frontend will run on [http://localhost:5173](http://localhost:5173) (default for Vite).

## Usage

- Create a new paste using the form—enter content, pick a language, set expiration, and submit.
- Share the generated URL.
- Viewers can see syntax-highlighted content and copy it with one click.

## Project Structure

```
bit-paste/
  ├── client/      # React frontend (Vite)
  └── server/      # Express backend (API, MongoDB models)
```

## Example API Endpoints

- `POST /pastes` - Create a new paste
- `GET /pastes/:id` - Get a paste by ID
