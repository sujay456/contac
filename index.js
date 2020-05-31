const express=require('express');
const port=8000;
const path=require('path');

const Contact=require('./models/Contact');
const db=require('./config/mongoose');
const app=express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));
app.use(express.static('asset')); //you have to tell where all the assets are !
app.use(express.urlencoded());
var contact_list=[
    {
        name:"Sujay",
        phone:"1234567890"
    },
    {
        name:"Rahul",
        phone:"0987654321"
    },
    {
        name:"Gaurav",
        phone:'1346983'
    }
];
app.get('/',function(req,res)
{

    Contact.find({},function(err,contact)
    {
        if(err)
        {
            console.log("Eror");
            return;
        }

        return res.render('home',{
            title:"Contact List",
            contact:contact      
        });
        

    })

    
});

app.get('/college',function(req,res)
{
   return res.render('collg',{title:"bhadwa and dalal",hcontent:"you Cyka blyat",size:5});
});

app.get('/delete-contact/',function(req,res)
{
    console.log(req.query.id);
    // res.send(req.param.phone);
    // var index=-1;
    // for(let c in contact_list)
    // {
    //     if(req.query.phone==contact_list[c].phone)
    //     {
    //         index=c;
    //     }
    // }
    // if(index==-1)
    // {
    //     return res.redirect('/');
    // }
    // else{
    //     contact_list.splice(index,1);
    //     return res.redirect('/');
    // }
    Contact.findByIdAndDelete(req.query.id,function(err)
    {
        if(err)
        {
            console.log("Error in deleting");
        }
    })

    return res.redirect('/');
    


});
app.post('/test',function(req,res)
{
    // console.log(req.body);
    // contact_list.push(req.body);
    // res.redirect('/');

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact)
    {
        if(err)
        {
            console.log("Data not created in db");
            return;
        }

        console.log(newContact);
        
        return res.redirect('back');

    })
    
   
});


app.listen(port,function(err)
{
    if(err)
    {
        console.log("Error");
        return;
    }

    console.log("Express is running");
});