const error = require('../exception/error.js');
const knex=global.db;
async function getPermissions(header, res) {
const {authorization}=header
  const userId=await getuserId(authorization)
  if(userId?.length>0){
  if (userId) {
    try {
      const permission = await knex('userlist')
      .select(
        knex.raw("CASE WHEN super_admin = 1 THEN 'super_admin' ELSE NULL END AS role_super_admin"),
        knex.raw("CASE WHEN admin = 1 THEN 'admin' ELSE NULL END AS role_admin"),
        knex.raw("CASE WHEN user = 1 THEN 'user' ELSE NULL END AS role_user")
      )
      .where('email', userId[0]?.user);
      if(permission?.length>0){
        for (const key in permission[0]) {
          if (permission[0][key]) {
            return {permission:permission[0][key],user:userId[0]?.user}
            
          }
        }
      }else{
        res.json({
          code:403,
          message:'Permisson not Found'
        })
        return false
      }

    } catch (error) {
      console.error(error);
    }
  } else {
    res.json(error?.Err3);
  }
}else{
    res.json(error.Err1)
}
}
async function getuserId(authorization){
    const token=authorization?.split(" ")[1];
    try {
     const userId=knex('token').select('user').where({
        token:token
     }).returning("*")
     console.log(userId)
     return userId     
    } catch (error) {
        return false
    }
}

module.exports = { getPermissions };
