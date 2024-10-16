const mongoose= require("mongoose")

const mongoDb= ()=>{
    mongoose.connect('mongodb+srv://ameerku83:ameerku@cluster0.x6akll7.mongodb.net/mern-todoo')
    .then(()=>{
        console.log('db connected');
        
    })
    .catch((err)=>{
        console.log('error db  '+err);
        
    })
}
module.exports=mongoDb