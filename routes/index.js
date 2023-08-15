var express = require("express");
var router = express.Router();
const { insertBatch, insertStudent } = require("../insertData/insertData.js");
const auth = require("../insertData/auth.js");
const error = require("../exception/error.js");
const returnmsg = require("../exception/returnmsg.js");
const { getPermissions } = require("../businness/permissons.js");

const knex = global.db;
router.get("/", (req, res) => {
  res.send("");
});
router.post("/studentInfo", async (req, res, next) => {
  if (await auth(req.headers)) {
    try {
      const data = await knex
        .select("*")
        .from("studentInfo")
        .where({ adhaar: req.body?.searchText });
      res.send({ data: data });
    } catch (error) {
      res.send({ message: "error", err: error });
    }
  } else {
    res.json({
      message: "Token is not found;",
    });
  }
});
router.post("/insertbatch", async (req, res) => {
  if (await auth(req.headers)) {
    const body = req.body;
    try {
      const result = await knex("batches")
        .insert({ batch_type: body.batch_type, username: body.username })
        .returning("*");
      res.send({ data: result });
    } catch (error) {
      console.error("Error inserting batch:", error);
    }
  } else {
    res.json(error?.Err1);
  }
});
router.get("/getbatches", async (req, res) => {
  if (await auth(req.headers)) {
    const perName = await getPermissions(req.headers, res);
    if (perName?.permission == "super_admin") {
      try {
        const result = await knex.select("*").from("batches");
         res.send({ data: result });
      } catch (error) {
        res.json(error);
      }
    } else {
      const result = await knex.select("*").from("batches").where({
        username: perName?.user,
      });
       res.send({ data: result });
    }
  } else {
    res.json(error?.Err1);
  }
});
router.get("/getstudent", async (req, res) => {
  if (await auth(req.headers)) {
    try {
      const result = await knex.select("*").from("studentInfo");
      res.send({ data: result });
    } catch (error) {
      res.send({ err: error });
    }
  } else {
    res.json(error?.Err1);
  }
});

router.post("/postInfo", async (req, res) => {
  if (await auth(req.headers)) {
    let body = req.body;
    delete body.uid;
    insertStudent(body, res);
  } else {
    res.json(error?.Err1);
  }
});
router.post("/insertuser", async (req, res) => {
  if (await auth(req.headers)) {
    let userInfo = req.body;
    const perName = await getPermissions(req.headers, res);
    if (perName) {
      try {
        await knex("userlist")
          .insert({
            first_name: userInfo.first_name.toUpperCase(),
            last_name: userInfo.last_name.toUpperCase(),
            email: userInfo.email.toUpperCase(),
            mobile: userInfo.mobile.toUpperCase(),
            number_of_batches: userInfo.number_of_batches,
            password: userInfo.password,
            edit_option: userInfo.edit_option,
            delete_option: userInfo.delete_option,
            admin_name: perName?.user,
          })
          .then((result) => {
            res.send({
              message: "User information inserted successfully!",
              data: result,
            });
          })
          .catch((err) => {
            res.send({
              message: "Error inserting user information:",
              err: err,
            });
          });
      } catch (error) {
        console.error("Error inserting batch:", error);
      }
    }
  } else {
    res.json(error?.Err1);
  }
});
router.post("/getuser", async (req, res) => {
  if (await auth(req.headers)) {
    const perName = await getPermissions(req.headers, res);
    if (typeof perName == "object" && perName?.permission == "super_admin") {
      try {
        const result = await knex.select("*").from("userlist");
        return res.send({ data: result });
      } catch (error) {
        console.error("Error inserting batch:", error);
      }
    } else if(typeof perName=='object'){
      try {
        const result = await knex.select("*").from("userlist").where({
          admin_name:perName?.user
        });
        return res.send({ data: result });
      } catch (error) {
        console.error("Error inserting batch:", error);
      }
    }
  } else {
    res.json(error?.Err1);
  }
});
module.exports = router;
