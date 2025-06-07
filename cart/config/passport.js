var passport=require('passport');
var User=require('../models/user');
var LocalStrategy=require('passport-local');
var {body,validationResult}=require('express-validator');

passport.serializeUser(function(user,done){
    done(null,user.id)
});

passport.deserializeUser(async function(id,done){
    try{
        const user=await User.findById(id);
        done(null,user);
    }catch(err){
        done(err,null)
    }
})



//signup strategy
passport.use('local.signup',new LocalStrategy(
    {
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true,

    },

    async function(req,email,password,done){
        //validation rules

        await body('email','Invalid email').notEmpty().isEmail().run(req);
        await body('password','password must be at least 5 characters ').notEmpty().isLength({min:5}).run(req);

        const errors=validationResult(req);
        if(!errors.isEmpty()){
            const messages=errors.array().map((err)=>err.msg);
            return done(null,false,req.flash('error',messages))
    }
        try{
            const exisitngUser=await User.findOne({email:email});
            if(exisitngUser){
                return done(null,false,{message:'Email is already in use'})
            }
            const newUser=new User();
            newUser.email=email;
            newUser.password=newUser.encryptPassword(password);
            await newUser.save();
            return done(null,newUser);
        }catch(err){
            return done(err);
        }
}));




//sigin strategy

passport.use('local.signin',new LocalStrategy(
    {
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true,

    },

    async function(req,email,password,done){
        //validation rules

        await body('email','Invalid email').notEmpty().isEmail().run(req);
        await body('password','password must be at least 5 characters ').notEmpty().isLength({min:5}).run(req);

        const errors=validationResult(req);
        if(!errors.isEmpty()){
            const messages=errors.array().map((err)=>err.msg);
            return done(null,false,req.flash('error',messages))
    }
        try{
            const user=await User.findOne({email:email});
            if(!user){
                return done(null,false,{message:'No user found'})
            }
            if(!user.validatePassword(password)){
                return done(null,false,{message:'wrong password'})
            }
            return done(null,user);
        }catch(err){
            return done(err);
        }
}));







