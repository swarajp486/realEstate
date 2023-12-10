const {model,Schema}=require('mongoose')


const propertySchema=new Schema({
    title:{type:String,required:true},
    price:{type:Number,reuired:true},
    location:{type:String,required:true},
    image: {
        data: Buffer,
        contentType: String,
      },
    propertyType:{type:String,required:true},
    createdAt: { type: Date, default: Date.now },
    owner: { type:Schema.Types.ObjectId, ref: 'User' },

})

const Property=model("Property",propertySchema)

const userDetailsScehma=new Schema({

    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String, unique:true},
    password:{type:String,required:true},
    userType:{type:String,required:true},
    properties: [{ type:Schema.Types.ObjectId, ref: 'Property' }],
    
})

const User=model('User',userDetailsScehma)

module.exports={
    Property,
    User,
}