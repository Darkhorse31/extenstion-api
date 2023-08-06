const knex = global.db

async function getBatch(batchType) {
  try {
    const result = await knex.select("*").from('batches');
    console.log('Batch inserted successfully:', result);
  } catch (error) {
    console.error('Error inserting batch:', error);
  } finally {
    knex.destroy();
  }
}
async function getBatch(batchType) {
  try {
    const result = await knex.select("*").from('your_table_name').wh;
    console.log('Batch inserted successfully:', result);
  } catch (error) {
    console.error('Error inserting batch:', error);
  } finally {
    knex.destroy();
  }
}


async function getStudent() {
    try {
      const result = await knex.select("*").from('your_table_name');
      return await result
    } catch (error) {
      console.error('Error inserting data:', error);
    } finally {
      knex.destroy();
    }
  }
module.exports={getBatch,getStudent}