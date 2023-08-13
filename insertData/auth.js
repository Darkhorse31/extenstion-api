const knex = global.db
async function auth(header){
    const {authorization}=header
    if(authorization?.includes('Bearer') && authorization.length>8){
        try {
          const token=authorization.split(" ")[1]
          const isToken= await knex('token').select("*").where({token:token}).returning("*")
          if(isToken?.length>0){
            return true
          }else{
        return false
          }
    
        } catch (error) {
          return false
        }
    }else{
        return false
    }
}
module.exports=auth