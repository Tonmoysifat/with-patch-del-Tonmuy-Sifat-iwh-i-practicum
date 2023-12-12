const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = "pat-na1-70ff0916-a2af-4afe-ae5c-a4588689a099";

// * Code for Route 1 goes here
app.get("/", async (req, res) => {
  const object = req.query.object;
  const sportsman = `https://api.hubspot.com/crm/v3/objects/${object}?idProperty=object&properties=sportsman_name,job,age`;

  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };

  try {
    const resp = await axios.get(sportsman, { headers });
    const data = resp.data.results;
    res.render("homepage", {
      title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
      data,
    });
    // res.json(data);
  } catch (error) {
    console.error(error);
  }
});

// * Code for Route 2 goes here

app.get("/add-cobjr", async (req, res) => {
  const object = req.query.object;
  const sportsman = `https://api.hubspot.com/crm/v3/objects/${object}?idProperty=object&properties=sportsman_name,job,age`;

  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };

  try {
    const resp = await axios.get(sportsman, { headers });
    const data = resp.data.results;
    res.render("add", {
      title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
      data,
    });
  } catch (error) {
    console.error(error);
  }
});

// * Code for Route 3 goes here

app.post("/add-cobjr", async (req, res) => {
  const add = {
    properties: {
      sportsman_name: req.body.newName,
      job: req.body.newJob,
      age: req.body.newAge,
    },
  };

  const object = req.query.object;
  const CreateSportsman = `https://api.hubspot.com/crm/v3/objects/${object}?idProperty=object&properties=sportsman_name,job,age`;

  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };

  try {
    await axios.post(CreateSportsman, add, { headers });
    res.redirect("/?object=sportsman");
  } catch (error) {
    console.error(error);
  }
});

app.get("/edit-cobjr", async (req, res) => {
  const id = req.query.id;
  const editSportsman = `https://api.hubspot.com/crm/v3/objects/2-18201194/${id}?portalId=39964667&properties=sportsman_name,job,age`;

  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };

  try {
    const resp = await axios.get(editSportsman, { headers });
    const data = resp.data;
    res.render("edit", {
      title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
      spName: data.properties.sportsman_name,
      job: data.properties.job,
      age: data.properties.age,
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/edit-cobjr", async (req, res) => {
  const edit = {
    properties: {
      sportsman_name: req.body.newName,
      job: req.body.newJob,
      age: req.body.newAge,
    },
  };
  const id = req.query.id;
  const editSportsman = `https://api.hubspot.com/crm/v3/objects/2-18201194/${id}?portalId=39964667&properties=sportsman_name,job,age`;
  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };

  try {
    await axios.patch(editSportsman, edit, { headers });
    res.redirect("/?object=sportsman");
  } catch (error) {
    console.error(error);
  }
});

app.get("/delete-cobjr", async (req, res) => {
  const id = req.query.id;
  const deleteSportsman = `https://api.hubspot.com/crm/v3/objects/2-18201194/${id}?portalId=39964667&properties=sportsman_name,job,age`;

  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };

  try {
    const resp = await axios.get(deleteSportsman, { headers });
    const data = resp.data;
    res.render("delete", {
      title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
      spName: data.properties.sportsman_name,
      job: data.properties.job,
      age: data.properties.age,
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/delete-cobjr", async (req, res) => {
  const id = req.query.id;
  const deleteSportsman = `https://api.hubspot.com/crm/v3/objects/2-18201194/${id}?portalId=39964667&properties=sportsman_name,job,age`;
  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };

  try {
    await axios.delete(deleteSportsman, { headers });
    res.redirect("/?object=sportsman");
  } catch (error) {
    console.error(error);
  }
});

// * Localhost
app.listen(3003, () =>
  console.log("Listening on http://localhost:3003?object=sportsman")
);
