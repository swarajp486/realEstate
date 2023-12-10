const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const multer = require('multer');
const fs = require('fs');
app.use(cors())
app.use(express.json())
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const JWT_SECRET="sakdffjewofjwe"
const { Property, User } = require('./property'); 
const Port=5000
const MONGODB="mongodb+srv://swarajp486:Lecun@cluster0.c4lhbbx.mongodb.net/"
mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection successful");
    
  })
  .catch((e)=>console.log(e));



app.listen(Port,()=>{
    console.log(`website running on port http://localhost:${Port}`)
})


// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid password');

    // Generate JWT token
    const token = jwt.sign({ _id: user._id },JWT_SECRET);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { firstName,lastName,email, password,userType } = req.body;

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).send('Invalid email format');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send('User already exists');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({firstName,lastName,email, password: hashedPassword,userType});

    // Generate JWT token
    const token = jwt.sign({ _id: user._id },JWT_SECRET);

    res.status(200).send("Signup successful! Please login.");
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log(authHeader)
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}


// Fetch all properties (public endpoint)
app.get('/api/list-properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
// Add a property (private endpoint) 
//Frontend part i have not made below this
app.post('/api/property',authenticateToken,upload.single('image') ,async (req, res) => {
  

  try {
    const imageData =fs.readFileSync("uploads/" + req.file.filename);
    const contentType = req.file.mimetype;
    const { title,price,location,propertyType} = req.body;
    const property = await Property.create({
      title,
      price,
      location,
      image: { data: imageData, contentType },
      propertyType,
      owner: req.user._id,

    });
    await User.findByIdAndUpdate(req.user._id, {
      $push: { properties: property._id },
    });
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});



// Update a property (private endpoint)
app.put('/api/property/:id', authenticateToken, async (req, res) => {
  console.log("property value")
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndUpdate(id, req.body, { new: true });
    if (!property) return res.status(404).send('Property not found');
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).send('Unauthorized');
    }
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Delete a property (private endpoint)
app.delete('/api/property/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndDelete(id);
    if (!property) return res.status(404).send('Property not found');
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).send('Unauthorized');
    }
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { properties: property._id },
    });
    res.send('Property deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500)
  }
  
})

