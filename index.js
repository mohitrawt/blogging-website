
// import express from "express";

// import bodyParser from "body-parser";
// const app = express();

// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// let posts = [];

// app.get('/', (req, res) => {
//   res.render("home.ejs", { posts });
// });


// app.get("/login", (req, res) => {
//   res.render("login.ejs");
// });

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   // Basic check or mock login logic here
//   if (username === "Mohit" && password === "Mohit123") {
//     res.redirect("/");
//   } else {
//     res.send("Invalid credentials. <a href='/login'>Try again</a>");
//   }
// });



// app.get("/compose", (req, res) => {
//   res.render("compose.ejs");
// });

// app.post("/compose", (req, res) => {
//   const post = {
//     id: Date.now().toString(),
//     title: req.body.title,
//     content: req.body.content
//   };
//   posts.push(post);
//   res.redirect('/');
// });

// app.get('/edit/:id', (req, res) => {
//   const post = posts.find(p => p.id === req.params.id);
//   res.render('edit.ejs', { post });
// });



// app.post('/edit/:id', (req, res) => {
//   const index = posts.findIndex(p => p.id === req.params.id);
//   posts[index].title = req.body.title;
//   posts[index].content = req.body.content;
//   res.redirect('/');
// });

// app.post('/delete/:id', (req, res) => {
//   posts = posts.filter(p => p.id !== req.params.id);
//   res.redirect('/');
// });

// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });



// Import the required modules
import express from "express"; // Import Express framework
import bodyParser from "body-parser"; // Middleware to parse form data from POST requests

const app = express(); // Create an instance of the Express application

// Set EJS as the templating/view engine
app.set('view engine', 'ejs');

// Middleware to parse incoming URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like CSS, images, JS) from the "public" folder
app.use(express.static("public"));

// In-memory array to store blog posts (this will reset if the server restarts)
let posts = [];

// === ROUTES ===

// GET: Home route — shows all blog posts
app.get('/', (req, res) => {
  // Render "home.ejs" and pass the array of posts to it
  res.render("home.ejs", { posts });
});

// GET: Login route — show login form
app.get("/login", (req, res) => {
  // Render "login.ejs"
  res.render("login.ejs");
});

// POST: Login form submission
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simple login check (you can later add sessions or authentication)
  if (username === "Mohit" && password === "Mohit123") {
    res.redirect("/"); // If valid, redirect to homepage
  } else {
    // If login fails, show an error message
    res.send("Invalid credentials. <a href='/login'>Try again</a>");
  }
});

// GET: Compose route — show form to create a new blog post
app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

// POST: Handle new post creation
app.post("/compose", (req, res) => {
  const post = {
    id: Date.now().toString(), // Unique ID using current timestamp
    title: req.body.title,     // Title from the form
    content: req.body.content  // Content from the form
  };
  posts.push(post); // Add post to the in-memory list
  res.redirect('/'); // Redirect back to homepage to see the new post
});

// GET: Edit a specific post by ID
app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id); // Find the post by ID
  res.render('edit.ejs', { post }); // Render the edit form with the existing post
});

// POST: Save the edited post
app.post('/edit/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === req.params.id); // Find index of the post
  posts[index].title = req.body.title; // Update title
  posts[index].content = req.body.content; // Update content
  res.redirect('/'); // Go back to homepage
});

// POST: Delete a post by ID
app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id); // Remove post from array
  res.redirect('/'); // Go back to homepage
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
