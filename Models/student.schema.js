import mongoose from "mongoose";

const stuschema=({
    first_name:{
        type:String,
        required:true

    },
    last_name:{
        type:String,
        required:true
},
    email:{
     type:String,
     required:true,
     unique:true
},
   current_mentors:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Mentor"

   },
   previous_mentors:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Mentor"
   }
})


const Student=mongoose.model("Student",stuschema)
export default Student