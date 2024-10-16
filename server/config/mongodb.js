const mongoose= require("mongoose")

const mongoDb= ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('db connected');
        
    })
    .catch((err)=>{
        console.log('error db  '+err);
        
    })
}
module.exports=mongoDb