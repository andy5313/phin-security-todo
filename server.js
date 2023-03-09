const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const admin = require("firebase-admin");
const cors = require("cors");
const { initializeApp } = require("firebase-admin/app");

const serviceAccount = require("./firebase-sdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/todos", async (req, res) => {
  try {
    const snapshot = await admin
      .firestore()
      .collection("todo")
      .orderBy("created_on")
      .get();
    const todos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server get error");
  }
});

app.post("/api/todos", async (req, res) => {
  try {
    const todo = req.body;
    const docRef = await admin.firestore().collection("todo").add(todo);
    res.json({ id: docRef.id, ...todo });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server post error");
  }
});

app.put("/api/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = req.body;
    await admin.firestore().collection("todo").doc(id).update(todo);
    res.json({ id, ...todo });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server put error");
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await admin.firestore().collection("todo").doc(id).delete();
    res.json({ id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server delete error");
  }
});

app.listen(3000, () => console.log("Server listening on port 3000"));

module.exports = app;
