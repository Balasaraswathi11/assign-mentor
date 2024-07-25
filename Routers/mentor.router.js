import express from 'express';
import { assignStudentsToMentor,  createMentor, getallmentors, getAllStudents } from '../Controllers/mentor.controller.js';

const router = express.Router();

router.post("/creatementor", createMentor);
router.get("/getallmentors",getallmentors)
router.post("/addstudent/:mentorId",assignStudentsToMentor)
router.get("/getallstudent/:mentorId",getAllStudents)

export default router;
