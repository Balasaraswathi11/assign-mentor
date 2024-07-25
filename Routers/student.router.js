import express from 'express';
import { assignmentortostudent, assignOrUpdateMentor, createstudent, getallstudents, getpreviousmentors, getStudentsWithUnassignedMentors } from '../Controllers/student.controller.js';

const router = express.Router();

router.post("/createstudent", createstudent);
router.get("/getallstudents",getallstudents)
router.post('/creatementorforstudent',assignmentortostudent)
router.post("/update/creatementor/tostudent",assignOrUpdateMentor)
router.get("/getpreviousmentors/:studentId",getpreviousmentors)
router.get("/unassignnedmentors",getStudentsWithUnassignedMentors)
export default router;
