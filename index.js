const mongoose= require("mongoose");
const Campsite= require("./models/campsite");

const url="mongodb://localhost:27017/nucampsite";
const connect =mongoose.connect(url,{});

connect.then(()=>{
    console.log("Connected correctly to the server");

    Campsite.create({
        name:"React Lake Campground",
        description:"test"
    })
    .then(campsite=>{
        console.log(campsite);
        return Campsite.findByIdAndUpdate(campsite._id,
            {$set:{description:"Updated Description"}},{
                new:true
            }
        );
    })
    .then(campsite=>{
        console.log(campsite);
        campsite.comments.push({
            rating:5,
            text:"Good one",
            author:"Peter Than"
        });
        return campsite.save();
    })
    .then(campsite=>{
        console.log(campsite);
        return Campsite.deleteMany();
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch(()=>{
        console.log(err);
        return mongoose.connection.close();
    });
});