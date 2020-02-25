//MONGODB PW: 4BLZt1EMjZTb4VXF
// MONGODB CONNECTION: mongodb+srv://Marcus:<password>@cluster0-kwhjg.mongodb.net/test?retryWrites=true&w=majority

//Adding express to project
const express = require('express');
//Adding the router to retrieve elements 
const Thing = require('./models/thing')

//Including body-parser for handling POST request 
const bodyParser = require('body-parser');

//Elegant mongodb object modeling for node.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Marcus:4BLZt1EMjZTb4VXF@cluster0-kwhjg.mongodb.net/test?retryWrites=true&w=majority')
    .then(()=> {
        console.log('Successfully connected to MongoDB Atlas')
    })
    .catch((error)=>{
        console.log('Unable to connect to MongoDB Atlas')
        console.error(error)
    })


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.post('/api/stuff', (req, res, next) => {
    const thing = new Thing({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    });
    //Promise with status (201)
    thing.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
  // ':' stands for dynamic parameter in the access path 
app.get('/api/stuff/:id', (req,res,next)=> {
    Thing.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }

    ).catch(
        (error)=>{
            res.status(400).json(thing);({
                error: error
            })
        }
    )
}),
//Update the element 
app.put('/api/stuff/:id',(req,res,next)=> {
    const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
});
    Thing.update({ _id: req.params.id}, thing).then(
        ()=>{
        res.status(201).json({
            message: 'Thing updated succesfully!'
        });
    }
    ).catch(
        (error)=> {
            res.status(400).json({
                error: error
            })
        }
    );
})
//Delete the element 
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

app.use('/api/stuff',(req,res,next) => {
    Thing.find().then(
        (things)=> {
            res.status(200).json(things);
        }

    ).catch(
        (error) => {
            res.status(400).json({
                error:error
            })
        }
    )
    
});


module.exports = app;



// app.use((req,res,next)=>{
//     console.log('New message');
//     next();
// })
// app.use((req,res,next)=>{
//     console.log('Second message');
//     next();
// })

// app.use((req,res,next)=>{
//     console.log('This is a third message');
//     next();
// })

// //Passing the final message 
// app.use((req,res)=>{
//     res.json({message: 'Your request was successfull'});
//     next();
// })

// app.use((req,res,next)=>{
//     console.log('Response sent successfully');
// })

