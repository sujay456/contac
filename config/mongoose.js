//required the library
const mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');


//aquire the connection (to check if it is succefully)
const db=mongoose.connection;

//error is the event here i.e wheneever there is an eror
db.on('error',console.error.bind(console,'error connecting to db'));

//once open print succesfull
db.once('open',function()
{
    console.log('succesfully connected to the databse');
})