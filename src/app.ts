import { Request, Response } from "express";

require("dotenv/config");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req: Request, res: Response) => {
  res.render("index", {
    title: "Weather",
    name: "Jujix",
  });
});

app.get("/about", (req: Request, res: Response) => {
  res.render("about", {
    title: "About Me",
    name: "Jujix",
  });
});

app.get("/help", (req: Request, res: Response) => {
  res.render("help", {
    helpText: "This is some helpfull text",
    title: "Help",
    name: "Jujix",
  });
});

app.get("/weather", (req: Request, res: Response) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address!",
    });
  }

  geocode(
    req.query.address,
    (error: Error, { latitude, longitude, location }: {latitude: number, longitude: number, location: string}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error: Error, forecastData: JSON) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req: Request, res: Response) => {
  res.render("404", {
    title: "404",
    name: "Jujix",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req: Request, res: Response) => {
  res.render("404", {
    title: "404",
    name: "Jujix",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
