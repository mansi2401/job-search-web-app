const path = require('path')// loading path module
const express = require('express')  //loaded express module to make server
const hbs = require('hbs')
const mongoose=require('mongoose')
const app = express() //server made
const port = process.env.PORT || 3000 //port equal to environment variable..this is used to make port in huroku
const jobs= require("../models/jobs");
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') 
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath)
// Setup static directory to serve

app.use(express.static(publicDirectoryPath)) //static public folder loaded




app.get('', (req, res) => {
    res.render('index', {  //render is used for dynamic webpage and libray used is handlebars
        title: 'EasyJobs',
        name: 'Mansi Chauhan'
    })
})
app.get('/index.hbs', (req, res) => {
    res.render('index', {
        title: 'Home' ,
        name: 'Mansi Chauhan'
    })
})
app.get('/job_listing.hbs', (req, res) => {
    res.render('job_listing', {
        title: 'jobs' ,
        name: 'Mansi Chauhan'
    })
})

app.get('/about.hbs', (req, res) => {
    res.render('about', {
        title: 'About ',
        name: 'Mansi Chauhan'
    })
})
app.get('/thanks', (req, res) => {
    res.render('thankyouapply', {
        title: 'Thank you',
        name: 'Mansi Chauhan'
    })
})
app.get('/Apply.hbs', (req, res) => {
    res.render('Apply', {
        title: 'Apply ',
        name: 'Mansi Chauhan'
    })
})
app.get('/postjobs.hbs', (req, res) => {
    res.render('postjobs', {
        title: 'Recruiter ',
        name: 'Mansi Chauhan'
    })
})

app.post('/post_job', async(req, res) => {
    console.log(req.body);
   // res.json(req.body);
    console.log(req.query.company);
    var job = new jobs({
        company: req.body.company,
        category: req.body.jobcategory,
        Salary: req.body.salary,
        location: req.body.select,
        Application: "Apply Now"
      });
      await job.save()
	//res.send(job)
      res.render('Thankyou.hbs')
      
    
})


app.get('/search_job', (req, res) => {
    var cond = {
        category: req.query.jobcategory,
        location: req.query.select
    }
    jobs.find(cond)
    .then(result=>{

        res.status(200).render('job_listing',{
            jobresult:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
    
    
})
app.get('/all_jobs', (req, res) => {
    
    jobs.find()
    .then(result=>{

        res.status(200).render('job_listing',{
            jobresult:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
    
    
})
app.get('*', (req, res) => {  
    res.render('404', {
        title: '404',
        name: 'Mansi Chauhan',
        errorMessage: 'Page not found.'
    })
})
mongoose.connect("mongodb+srv://User1:5E4vt1bYlmTEK19U@cluster0.uom9r.mongodb.net/jobs_details?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology:true},
    () => console.log("connected to database!")
);
//server started
app.listen(port, () => {
    console.log('Server is up on port '+port)
})