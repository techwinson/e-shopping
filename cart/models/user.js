var mongoose=require('mongoose');
var schema=mongoose.Schema;
var bcrypt=require('bcryptjs')
var userSchema=new schema({
    email:{type:String,required:true, unique: true},
    password:{type:String,required:true},
});

userSchema.methods.encryptPassword=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null)
}

userSchema.methods.validatePassword=function(password){
    return bcrypt.compareSync(password,this.password);
}
module.exports=mongoose.model('users',userSchema);