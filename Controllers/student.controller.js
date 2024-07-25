import Mentor from '../Models/mentor.schema.js';
import  Student from './../Models/student.schema.js';

export const createstudent = async(req,res)=>{
    try {
        const student=new Student(req.body);
        await student.save();
        res.status(200).json({message:"Student Created", data:student})
    } catch (error) {
        console.log(error)
    }
}

export const getallstudents=async(req,res)=>{
    try {
        const students=await Student.find();
        res.status(200).json({message:"students fetched successfully", students})
        
    } catch (error) {
        console.log(error)
    }
}
export const assignmentortostudent=async(req,res)=>{
    try {
        const { studentId, mentorId } = req.body;
        const student = await Student.findById(studentId);
        const mentor = await Mentor.findById(mentorId);
    
        if (!student || !mentor) {
          return res.status(404).json({ message: 'Student or Mentor not found' });
        }
    
        // Check if the student already has a mentor
        if (!student.current_mentors) {
            student.current_mentors = [];
        }

        // Add the mentorId to the student's current_mentors array if it's not already there
        if (!student.current_mentors.includes(mentorId)) {
            student.current_mentors.push(mentorId);
        }

        await student.save();

        res.status(200).json(student);
    } catch (error) {
        console.log(error)
    }
}

export const assignOrUpdateMentor = async (req, res) => {
    try {
        const { studentId, mentorId } = req.body;

        // Find the student and the new mentor by their IDs
        const student = await Student.findById(studentId);
        const newMentor = await Mentor.findById(mentorId);

        if (!student || !newMentor) {
            return res.status(404).json({ message: 'Student or Mentor not found' });
        }

        // Check if the student already has the specified mentor
        if (student.current_mentors && student.current_mentors.equals(mentorId)) {
            return res.status(200).json({ message: 'Student is already assigned to this mentor' });
        }

        // Handle the current mentor if it exists
        const currentMentorId = student.current_mentors;
        if (currentMentorId) {
            const currentMentor = await Mentor.findById(currentMentorId);
            if (currentMentor) {
                // Remove student from the current mentor's students array
                await Mentor.findByIdAndUpdate(currentMentorId, {
                    $pull: { students: studentId }
                });
            }

            // Add the current mentor to the student's previous_mentors array
            await Student.findByIdAndUpdate(studentId, {
                $addToSet: { previous_mentors: currentMentorId }
            });
        }

        // Assign the new mentor to the student
        student.current_mentors = mentorId;
        await student.save();

        // Add the student to the new mentor's students array
        await Mentor.findByIdAndUpdate(mentorId, {
            $addToSet: { students: studentId }
        });

        res.status(200).json({ message: 'Mentor assigned/updated successfully', student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const getpreviousmentors=async(req,res)=>
{try {
    const { studentId } = req.params;

    // Find the student and populate the previous_mentors field
    const student = await Student.findById(studentId).populate('previous_mentors');

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    const previousMentors = student.previous_mentors;

    if (previousMentors.length === 0) {
        res.status(200).json({
            studentName: student.first_name,
            message: 'No previous mentors found for this student'
        });
    } else {
        res.status(200).json({
            studentName: student.first_name,
            previousMentors: previousMentors // Return the whole mentor objects
        });
    }
}







catch (error) {
    console.log(error)
}
}




export const getStudentsWithUnassignedMentors = async (req, res) => {
    try {
        // Query for students where `current_mentors` field is either not set or null
        const students = await Student.find({
            $or: [
                { current_mentors: { $exists: false } }, // `current_mentors` field does not exist
                { current_mentors: null } // `current_mentors` field is explicitly set to null
            ]
        });

        res.status(200).json({ students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

};


