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
    
    data.photo1={photo1:data.photo1}
    data.photo2={photo2:data.photo2}
    data.photo3={photo3:data.photo3}
    data.photo4={photo4:data.photo4}
    data.photo5={photo5:data.photo5}
    try {
      const result = await knex('studentInfo').insert(data);
      res.send()
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }
module.exports={insertBatch,insertStudent}