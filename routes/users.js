var express = require("express");
const jwt = require("jsonwebtoken");
const returnmsg = require("../exception/returnmsg.js");
const error = require("../exception/error.js");
const { getPermissions } = require("../businness/permissons.js");
const query = require("../businness/query.js");
const auth = require("../insertData/auth.js");

var router = express.Router();
const knex = global.db;
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      message: "username or password is not found.",
    });
  } else {
    const user = await knex("userlist")
      .select("*")
      .where({ email: username, password: password })
      .returning("*");
    if (user?.length > 0) {
      try {
        const token = jwt.sign({ userId: user.id }, process.env.jwt_key);
        try {
          await knex("token")
            .insert({ token: token, user: username })
            .returning("*");
        } catch (error) {
          res.send(error);
        }
        let returnState = returnmsg.ex1;
        returnState.data = Array.isArray(user) && user.length > 0 && user[0];
        returnState.token = token;
        return res.json(returnState);
      } catch (error) {
        return res.send(error);
      }
    } else {
      return res.json(error.Err2);
    }
    return res.send("");
  }

  // res.json({ token });
});
router.get("/logout", async (req, res) => {
  const { authorization } = req.headers;
  if (authorization.includes("Bearer") && authorization.length > 8) {
    try {
      const token = authorization.split(" ")[1];
      const deleteToken = await knex("token")
        .where({ token: token })
        .del()
        .returning("*");
      res.send({
        tokenDel: deleteToken,
        message: "Logout successfully.",
        success: true,
      });
    } catch (error) {
      res.send(error);
    }
  } else {
    res.send({
      message: "token not found",
    });
  }
});
router.get("/dashboard", async (req, res) => {
  if (await auth(req.headers)) {
    const perName = await getPermissions(req.headers, res);
  
    if(perName?.permission=='super_admin'){
    try {
      const result = await knex.raw(query.dashboard.query_super);
       res.send({ data: result[0] });

    } catch (error) {
      res.json(error);
    }
  } else if(perName?.permission=='admin'){
    try {
      const userresult = await knex.raw(query.dashboard.qwery_admin1,{admin:perName.user});
      const imageResult = await knex.raw(query.dashboard.qwery_admin2,{admin:perName.user});
      let result=[...userresult[0],...imageResult[0]]
      res.json({
        data:result,
        success:true
      })
    } catch (error) {
      return false
    }
   
  } else{
    const userresult = await knex.raw(query.dashboard.query_user1,{user:perName.user});
    const imageResult = await knex.raw(query.dashboard.query_user2,{user:perName.user});
    let result=[...userresult[0],...imageResult[0]]
    res.json({
      data:result,
      success:true
    })
  }
  } else {
    res.json(error?.Err1);
  }
});
router.post('/changepass',async(req,res)=>{
  const {username,oldpass,newpass}=req.body
  if (await auth(req.headers)) {
  knex('userlist') 
  .where({email:username,password:oldpass}) 
  .update({ password: newpass }) 
  .then((data) => {
    if(data){
      res.json({
        message:"Change password successfully."
      })
    }else{
      res.json({
        message:"Old password is not match"
      })
    }
  })
}else{
  res.json(error?.Err1);
}
})
router.post('/edituser',async (req,res)=>{
  if (await auth(req.headers)) {
    const perName = await getPermissions(req.headers, res);
    if (typeof perName == "object" && perName?.permission == "super_admin") {
      knex('userlist') 
      .where({email:req.body.email}) 
      .update(req.body) 
      .then((data) => {
        if(data){
          res.json({
            message:"Edit user successfully"
          })
        }else{
          res.json({
            message:"No record found"
          })
        }
      })
    }
    else{
      res.json({
        message:'Permission denied'
      })
    }
  } else {
    res.json(error?.Err1);
  }

})
module.exports = router;
