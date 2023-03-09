# To-do List using Firebase Storage

In the project directory, you can run:

#### npm run dev

The script will run the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits to the codebase.
You will also see any lint errors in the console.

# Package.json

The app has dependencies on cors, express, firebase-admin, react, react-dom, and sass.

It also has devDependencies on several packages including webpack, babel, and sass-loader, which are used to build and bundle the app for deployment.

There are several scripts defined including start, and dev.

Start is used to start the server in production mode, and dev is used to start the server in development mode with hot reloading.

# Webpack.config.js

This JavaScript file exports a configuration object for Webpack. It tells Webpack how to process and bundle different files in the project.

The entry key specifies the entry point for the application, which is ./public/index.js in this case. This is the starting point for Webpack to traverse the dependency graph and build the final bundle.

# Server.js

This is a simple Node.js server application that provides endpoints for a todo list. It uses Express as a web framework, and Firebase Admin SDK to interact with Firestore database. The server allows GET, POST, PUT and DELETE requests to perform CRUD operations on todo items stored in the Firestore database.

The GET endpoint returns a JSON data of the todo objects sorted by the timestamp in chronological order.

The server also serves static files from the public folder, and listens on port 3000.

# Public Folder

Index.js : We render React application using the createRoot() method from the ReactDOM library.

# App.js

Main React component that manages the todo list application. I use React hooks to maintain the state of the todo items and to handle interactions with the server via HTTP requests. The useEffect hook is used to fetch the initial data from the server when the component is first mounted. The useState hook is used to maintain the state of the todo items and to update them when new items are added, deleted, or updated. The component renders a Form component for adding new todo items, a Header component for toggling the display of dates for each item, and a list of TodoItem components for displaying and managing the todo items. When the component is first loaded, it displays a "Loading..." message until the data has been fetched from the server.

# Form Component

This is the React component that represents a form for adding a new to-do item. The component has a state variable for tracking the input value of the form. When the form is submitted, the input value is used to create a new to-do item object with a default value for completion status, and the object is passed to a parent component's onAdd function. The input field is reset to an empty string.

# Header Component

This is the component that renders the "Todo List" header and also the button that allows the user to view the date of each list item. The property to set the toggle is passed down to this child component.

# TodoItem Component

This is a React component for a Todo item that displays information about a task such as its description and completion status. It allows users to edit, delete, and mark tasks as completed. The component uses state to keep track of whether a user is currently editing the task or not. When the user clicks the Edit button, the component switches to editing mode and displays an input field for modifying the task's description. The component also has a Save button that allows users to save the changes they made, and a Cancel button to discard any changes. Finally, there are Delete and Hide buttons for deleting or hiding completed tasks, respectively.
