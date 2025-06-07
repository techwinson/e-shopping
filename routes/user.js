var express=require('express');
var router=express.Router();
var passport=require('passport');
var csrf=require('csurf');
var csrfProtection=csrf();
router.use(csrfProtection);



//profile
router.get('/profile',isLoggedIn,function(req,res,next){
    res.render('user/profile');
});

router.get('/logout',isLoggedIn,function(req,res,next){
    req.logout(function(err){
        if(err){
            return next(err);

        }
        res.redirect('/');
    })
})

router.use('/',notLoggedIn,function(req,res,next){
    next();
})
//render sign up
router.get('/signup',function(req,res,next){
    var messages=req.flash('error');
    res.render('user/signup',{
        csrfToken:req.csrfToken(),
        messages:messages,
        hasErrors:messages.length>0
    });
})


//post signup

router.post('/signup',passport.authenticate('local.signup',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true,
}));



//render sign in
router.get('/signin',function(req,res,next){
    var messages=req.flash('error');
    res.render('user/signin',{
        csrfToken:req.csrfToken(),
        messages:messages,
        hasErrors:messages.length>0
    });
})




//post signin

router.post('/signin',passport.authenticate('local.signin',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true,
}));

module.exports=router;


//check if user logged in
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
function  notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}