const knex = global.db

async function insertBatch(batchType) {
  try {
    const result = await knex('batches').insert({ batch_type: batchType });
    console.log('Batch inserted successfully:', result);
  } catch (error) {
    console.error('Error inserting batch:', error);
  } finally {
    knex.destroy();
  }
}

async function insertStudent(data,res) {
    const batchuser= await knex('batches').select('username').where({batch_type:data?.adhaar}).returning('*')
    data.batch_admin=batchuser?.length>0&& batchuser[0]?.username  
    data.date=new Date().toISOString()
    data.photo1={photo1:data.photo1}
    data.photo2={photo2:data.photo2}
    data.photo3={photo3:data.photo3}
    data.photo4={photo4:data.photo4}
    data.photo5={photo5:data.photo5}
    const numberOfImages=await knex('studentInfo').count('* as student').where({adhaar:data?.adhaar}).returning("*")
    if(numberOfImages?.length>0 && numberOfImages[0]?.student<36){
    try {
      const result = await knex('studentInfo').insert(data);
      res.json({
        message:"Data inserted successfully."
      })
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }else{
    res.json({message:"You can Add only 35 student. "})
  }
  }
module.exports={insertBatch,insertStudent}