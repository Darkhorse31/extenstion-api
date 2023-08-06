var express = require("express");
var router = express.Router();
const { insertBatch, insertStudent } = require("../insertData/insertData.js");
const knex = global.db;
router.get("/",(req,res)=>{
  res.send("")
})
router.post("/studentInfo",  async (req, res, next) =>{
  try {
  const data = await knex.select("*").from("studentInfo").where({adhaar:req.body?.searchText});
    res.send({data:data})
  } catch (error) {
    res.send({message:'error',err:error})
  }
  
});
router.post("/insertbatch",async (req, res) => {
  const body = req.body;
  try {
    const result = await knex('batches').insert({ batch_type: body.batch_type,username:body.username }).returning("*");
    res.send({data:result})
  } catch (error) {
    console.error('Error inserting batch:', error);
  } 
});
router.get("/getbatches", async (req, res) => {
  try {
    const result = await knex.select("*").from("batches");
    return res.send({ data: result });
  } catch (error) {
    console.error("Error inserting batch:", error);
  } 
});
router.get("/getstudent", async (req, res) => {
  try {
    const result = await knex.select("*").from("studentInfo");
    res.send({ data: result });
  } catch (error) {
    res.send({err:error})
  } 
});

router.post("/postInfo", async (req, res) => {
  console.log(req.body)
  let body = req.body;
  delete body.uid;
  insertStudent(body,res);
});
// router.post('/insertuser',async(req,res)=>{
//   try {
//     knex('batches')
//     .insert({
//       first_name: userInfo.first_name.toUpperCase(),
//       last_name: userInfo.last_name.toUpperCase(),
//       email: userInfo.email.toUpperCase(),
//       mobile: userInfo.mobile.toUpperCase(),
//       number_of_batches: userInfo.number_of_batches,
//       password: userInfo.password,
//       edit_option: userInfo.edit_option,
//       delete_option: userInfo.delete_option,
//     })
//     .then((result) => {
//       res.send({message:'User information inserted successfully!'});
//     })
//     .catch((err) => {
//       res.send({message:'Error inserting user information:', err:err});
//     })
//   } catch (error) {
//     console.error('Error inserting batch:', error)}
// })
router.post('/insertuser',async(req,res)=>{
  let userInfo=req.body

  try {
    await knex('userlist')
    .insert({
      first_name: userInfo.first_name.toUpperCase(),
      last_name: userInfo.last_name.toUpperCase(),
      email: userInfo.email.toUpperCase(),
      mobile: userInfo.mobile.toUpperCase(),
      number_of_batches: userInfo.number_of_batches,
      password: userInfo.password,
      edit_option: userInfo.edit_option,
      delete_option: userInfo.delete_option
    })
    .then((result) => {
      res.send({message:'User information inserted successfully!',data:result});
    })
    .catch((err) => {
      res.send({message:'Error inserting user information:', err:err});
    })
  } catch (error) {
    console.error('Error inserting batch:', error)}
})
router.post('/getuser',async(req,res)=>{
  try {
    const result = await knex.select("*").from("userlist");
    return res.send({ data: result });
  } catch (error) {
    console.error('Error inserting batch:', error)}
})
module.exports = router;