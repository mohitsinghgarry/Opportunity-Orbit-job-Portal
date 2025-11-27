const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000;
require('dotenv').config()
// Middleware
app.use(express.json())
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? [
      'https://opportunity-orbit-job-portal.vercel.app',
      'https://opportunity-orbit-job-portal.netlify.app',
      'https://opportunity-orbit-job-portal.onrender.com',
      'https://opprotunity-orbit-job-portal.firebaseapp.com'
    ]
    : ["http://localhost:3000", "http://localhost:5173"],
  methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Hello Developer')
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yccnd.mongodb.net/jobporaldb`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //Create Database

    const db = client.db("mernJobPortal");
    const jobsCollections = db.collection("demoJobs");

    // Posting a Job
    app.post("/post-job", async (req, res) => {
      try {
        const body = req.body;
        body.createdAt = new Date(); // Fixed typo: createAt -> createdAt

        const result = await jobsCollections.insertOne(body);
        if (result.insertedId) {
          return res.status(200).send(result);
        } else {
          return res.status(400).send({
            message: "Failed to post job! Try again later",
            status: false
          })
        }
      } catch (error) {
        console.error('Error posting job:', error);
        return res.status(500).send({
          message: "Internal server error",
          status: false
        });
      }
    })

    // Get all jobs
    app.get("/all-jobs", async (req, res) => {
      try {
        const jobs = await jobsCollections.find({}).toArray()
        res.send(jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).send({ message: "Error fetching jobs" });
      }
    })

    // Get Single job using ID
    app.get("/all-jobs/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid job ID" });
        }

        const job = await jobsCollections.findOne({
          _id: new ObjectId(id)
        })

        if (!job) {
          return res.status(404).send({ message: "Job not found" });
        }

        res.send(job)
      } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).send({ message: "Error fetching job" });
      }
    })

    // Get Jobs by email
    app.get("/myJobs/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const jobs = await jobsCollections.find({ postedBy: email }).toArray();
        res.send(jobs)
      } catch (error) {
        console.error('Error fetching user jobs:', error);
        res.status(500).send({ message: "Error fetching jobs" });
      }
    })

    // Delete a Job
    app.delete("/job/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid job ID" });
        }

        const filter = { _id: new ObjectId(id) }
        const result = await jobsCollections.deleteOne(filter);

        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "Job not found" });
        }

        res.send(result)
      } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).send({ message: "Error deleting job" });
      }
    })

    //Update a Job
    app.patch("/update-job/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid job ID" });
        }

        const jobData = req.body;
        jobData.updatedAt = new Date(); // Add update timestamp

        const filter = { _id: new ObjectId(id) };
        const options = { upsert: false }; // Changed to false to prevent creating new documents
        const updateDoc = {
          $set: {
            ...jobData
          },
        };

        const result = await jobsCollections.updateOne(filter, updateDoc, options);

        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Job not found" });
        }

        res.send(result)
      } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).send({ message: "Error updating job" });
      }
    })

    // Resume Submission
    // Create applications collection
    const applicationsCollection = db.collection("jobApplications");

    // API endpoint to handle job applications (POST request)
    app.post('/job/:id/apply', async (req, res) => {
      const jobId = req.params.id;
      const { resumeLink, applicantEmail, applicantName } = req.body;

      try {
        const applicationData = {
          jobId: new ObjectId(jobId),
          resumeLink,
          applicantEmail,
          applicantName,
          appliedAt: new Date(),
          status: 'pending'
        };

        const result = await applicationsCollection.insertOne(applicationData);

        if (result.insertedId) {
          res.status(200).json({
            message: 'Application submitted successfully!',
            applicationId: result.insertedId
          });
        } else {
          res.status(400).json({ message: 'Failed to submit application' });
        }
      } catch (error) {
        console.error('Error saving application:', error.message);
        res.status(500).json({ message: 'Server Error' });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
