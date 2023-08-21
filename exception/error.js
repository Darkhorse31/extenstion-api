const error={
    'Err1':{
        code:401,
        message:"Token Not Found"
    },
    "Err2":{
        code:201,
        message:"username or password is invalid",
        success:false

    },
    'Err3':{
        code:201,
        message:"Please Supply user id"
    },
    'Err4':{
        code:201,
        message:"Id not Found.",
        success:false
    },
    'Err5':{
        code:201,
        message:'Permission not found.',
        success:false
    }
}
module.exports=error