import express from "express";
import multer from "multer";
import sizeOf from "image-size";
import sharp from "sharp";
import fs from "fs";
import axios from "axios";
import crypto from "crypto";

const app = express();


app
  .use(express.urlencoded({ extended: true }))
  .set("view engine", "ejs")
  .set("views", "views")
 
  .get("/wordpress/", async (req, res, next) => {
    const content = req.query.content;
    const response = await axios.post(
      "https://wordpress.kodaktor.ru/wp-json/jwt-auth/v1/token",
      { username: "gossjsstudent2017", password: "|||123|||456" }
    );
    const token = response.data.token;
    const WPresponse = await axios.post(
      `https://wordpress.kodaktor.ru/wp-json/wp/v2/posts/`,

      { content, title: "bao-vn", status: "publish" },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    res.send(WPresponse.data.id + "");
  })
  .all("/log", (r) => {
    console.log(r.params.data);
    console.log(r.headers);
  })
  
  .all("/login", (r) => r.res.send("bao-vn"))
  .listen(process.env.PORT || 3000, () => {
    console.log("Server is working");
  });
