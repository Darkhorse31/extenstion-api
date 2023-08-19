const knex = global.db
async function deleteStudent(id,res){
   await knex('studentInfo')
  .where({ uid: id }) 
  .del() 
  .then((data) => {
   if(data){
    res.json({
      message:'Data delete successfully',
      success:true
    })
   }else{
    res.json({
      message:'Data not found.',
      success:true
    })
   }
  })
  
}

module.exports={deleteStudent}