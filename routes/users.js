var express = require('express');
const jwt = require('jsonwebtoken');


var router = express.Router();
const knex = global.db
router.post("/login",async(req,res)=>{
  const { username, password } = req.body;
   if(!username || !password){
    return res.json({
      message:'username or password is not found.'
    })
   }else{
     const user=await knex('userlist').select("*").where({email:username,password:password}).returning("*");
     if(user?.length>0){
      try {
       const token = jwt.sign({ userId: user.id }, process.env.jwt_key);
       try {
        await knex('token').insert({token:token,user:username}).returning("*");
        
       } catch (error) {
        res.send(error)
       }
      return res.json({
        user:user,
        token:token,
        success:true
      })
      } catch (error) {
         return res.send(error)
      }
     }
     return res.send("")
   }


  // res.json({ token });
})
router.get("/logout",async(req,res)=>{
  const {authorization}=req.headers
  if(authorization.includes('Bearer') && authorization.length>8){
    try {
      const token=authorization.split(" ")[1]
      const deleteToken= await knex('token')
        .where({ token: token }) 
        .del().returning("*")
        res.send({
          tokenDel:deleteToken,
          message:"logOut"
        })

    } catch (error) {
      res.send(error)
    }
  }
  else{
    res.send({
      message:'token not found'
    })
  }
  console.log()
})
module.exports = router;
