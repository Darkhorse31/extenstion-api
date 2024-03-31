const knex = global.db

const fs=require('fs');
const axios = require('axios');
const path = require('path');
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
const saveImageLocally = (base64ImageData) => {
  const base64Data = base64ImageData.replace(/^data:image\/bmp;base64,/, '');
  const decodedImage = Buffer.from(base64Data, 'base64');
  const targetDirectory = 'assets/';
  if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory, { recursive: true });
  }
  const filename = 'image_' + Date.now() + '.png';
  const targetFilePath = targetDirectory + filename;
  fs.writeFileSync(targetFilePath, decodedImage);

  return { success: true, filename: filename };
};
const sendImageToAPI = async (data) => {
  const file=saveImageLocally(data)
  if(file?.success){
    const imagePath = 'assets/' + file?.filename;
    const imageData = fs.createReadStream(imagePath);

    try {
        const formData = {
            image: imageData
        };

        const response = await axios.post('http://keyboardapp.in/save_image.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending image to API:', error.response ? error.response.data : error.message);
        return { success: false, message: 'Error sending image to API' };
    }
  }
};

async function insertStudent(data,res) {
  const photoUrls = await Promise.all([
    sendImageToAPI(data.photo1),
    sendImageToAPI(data.photo2),
    sendImageToAPI(data.photo3),
    sendImageToAPI(data.photo4),
    sendImageToAPI(data.photo5),
  ]);
    const batchuser= await knex('batches').select('username').where({batch_type:data?.adhaar}).returning('*')
    const admin= await knex('userlist').select('admin_name').where({email:batchuser[0]?.username}).returning('*')
    
    data.batch_admin=batchuser?.length>0&& batchuser[0]?.username  
    data.admin_name=admin?.length>0&& admin[0]?.admin_name
    data.date=new Date().toISOString()
    data.photo1 = { photo1: photoUrls[0]?.filename?'http://keyboardapp.in/assets/'+photoUrls[0]?.filename:'' };
    data.photo2 = { photo2:  photoUrls[1]?.filename?'http://keyboardapp.in/assets/'+photoUrls[1]?.filename:'' };
    data.photo3 = { photo3:  photoUrls[2]?.filename?'http://keyboardapp.in/assets/'+photoUrls[2]?.filename:'' };
    data.photo4 = { photo4:  photoUrls[3]?.filename?'http://keyboardapp.in/assets/'+photoUrls[3]?.filename:''};
    data.photo5 = { photo5:  photoUrls[4]?.filename?'http://keyboardapp.in/assets/'+photoUrls[4]?.filename:'' };
    const numberOfImages=await knex('studentInfo').count('* as student').where({adhaar:data?.adhaar}).returning("*")
    if(numberOfImages?.length>0 && numberOfImages[0]?.student<36){
    try {
      const result = await knex('studentInfo').insert(data);
      fs.rmdir('assets', { recursive: true }, (err) => {
        if (err) {
          console.error('Error deleting directory:', err);
        } else {
          console.log('Directory deleted successfully.');
        }
      });
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