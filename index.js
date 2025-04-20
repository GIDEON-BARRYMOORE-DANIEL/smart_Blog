import express from "express";
import bodyParser from "body-parser";
import multer, { diskStorage } from "multer";
import path from "path";
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');


app.use(express.static("public"));



let posts = [];

function getpostTime(){
    const date = new Date("2025-03-25T10:15:00");
    return date;

}

const storage = diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/images"); //cb telling node that the file is okay to be saved
       
    },
    filename: (req, file, cb)=>{
        const uniqueName = Date.now() + "_" + file.originalname;
        cb(null, uniqueName); // cb telling multer everything is okay and he should call back the filename uploaded by the user
    }
})

const uploadImage = multer({storage: storage});

app.get("/", (req, res)=> {
    const postTime = getpostTime();
    res.render("index.ejs", {posts, postTime});
});

app.get("/about", (req,res)=>{
    res.render("about.ejs", {title: "About page"});
});


app.get("/post/:postId", (req,res)=>{
    
        const postId = req.params.postId;
        const post = posts.find(items => items._id === postId );
        if(!post){
            res.status(404).send("post does not exits");
        }
        res.render("post.ejs", {post});

    
});


app.get("/login", (req,res)=>{
    res.render("login.ejs", {title: "Login page"});
});

app.get("/create", (req,res)=>{
    res.render("partials/create.ejs", {title: "post creation page"});
});

app.get("/footer", (req,res)=>{
    res.render("partials/footer.ejs", {title: "footer page"});
});

app.get("/signup", (req,res)=>{
    res.render("signup.ejs", {title: "Signup page"});
});

app.get("/posts", (req,res)=>{
    res.render("posts.ejs", {title: "posts page"});
});



app.post("/createPost", uploadImage.single("image"), (req, res) => {
    const { title, storyLine } = req.body;
    const imagePath = req.file ? "/images/" + req.file.filename : null;
  
    const newPost = {
      _id: Date.now().toString(), // Unique ID for each post
      postTitle: title,
      postMessage: storyLine,
      postImage: imagePath,
    };
  
    posts.push(newPost); // Save post in array including the _id
    console.log("Post created:", newPost);
  
    res.json({
      message: "Post Created Successfully",
      ...newPost, // Return everything including _id
    });
});
  


app.listen(port, ()=>{
    console.log(`app running on port ${port}`);
})

export default app;