import Mentor from "../Models/mentor.schema.js";
import Student from "../Models/student.schema.js";

export const createMentor = async (req, res) => {
    try {
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(200).json({ message: "Mentor created", data: mentor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating mentor", error });
    }
};
export const getallmentors=async(req,res)=>{
    try {
        const mentors=await Mentor.find()
        res.status(200).json({message:"Mentors fetched successfully", mentors})
    } catch (error) {
        console.log(error)
    }
}


export const assignStudentsToMentor = async (req, res) => {
    try {
        const { mentorId } = req.params; //getting the metor id as input from the user
        const studentIds = req.body.studentIds;//getting the student ids from the user as input

        if (!Array.isArray(studentIds)) {
            return res.status(400).json({ message: "studentIds should be an array" });//student ids should be in an array
        }

       
        const mentor = await Mentor.findById(mentorId);//cheking if the user given mentor id exists in Mentor collection by using Mentor.findbyid()
        if (!mentor) {//if not exists
            return res.status(404).json({ message: "Mentor not found" });
        }//if exists,...
        const studentUpdateResult = await Student.updateMany(//updating the student ids
            {
                _id: { $in: studentIds },//$in used within a query to specify a condition where a field's value must be within a given array.
                                         //if the student colllection's id matches the student ids in the array
                current_mentors: { $exists: false }//and id the student didnt have current_mentors
            },
            {
                $push: { current_mentors: mentorId }//then push the mentor id to the students current_menntors
            }
        );

        // Update the mentor's list of students, avoiding duplicates
        await Mentor.findByIdAndUpdate(
            mentorId,
            {
                $addToSet: { students: { $each: studentIds } } //$push-add elements dont care about duplicates, addtoset- prevent duplicates
            }
        );

        res.status(200).json({ message: "Students assigned and mentor updated successfully", studentUpdateResult });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const { mentorId } = req.params; // Getting ID from the user

        // Check if the mentor exists
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }

        // Find all students assigned to this mentor
        const students = await Student.find({ current_mentors: mentorId });

        // Respond with the list of students
        res.status(200).json({ students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

    
};
