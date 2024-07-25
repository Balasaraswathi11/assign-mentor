# Mentor and Student Assignment API

This API allows you to manage mentors and students, including assigning students to mentors and updating these assignments.


## Original Questions

1. **Write API to create Mentor**
2. **Write API to create Student**
3. **Write API to Assign a student to Mentor**
   - Select one mentor and add multiple students.
   - A student who has a mentor should not be shown in the list.
4. **Write API to Assign or Change Mentor for a Particular Student**
   - Select one student and assign one mentor.
5. **Write API to Show All Students for a Particular Mentor**
6. **Write an API to Show the Previously Assigned Mentor for a Particular Student**

   
## API Endpoints

### 1. Create a Mentor

- **Endpoint:** `POST /creatementor`
- **Description:** Create a new mentor.

### 2. Create a Student

- **Endpoint:** `POST /createstudent`
- **Description:** Create a new student.

### 3. Assign a Student to a Mentor

- **Endpoint:** `POST /addstudent/:mentorId`
- **Description:** Assign a student to a mentor. A student who already has a mentor cannot be reassigned.

### 4. Assign or Change Mentor for a Student

- **Endpoint:** `PUT /update/creatementor/tostudent`
- **Description:** Assign or change the mentor for a specific student.

### 5. Show All Students for a Particular Mentor

- **Endpoint:** `GET /getallstudent/:mentorId"`
- **Description:** Retrieve a list of all students assigned to a specific mentor.

### 6. Show the Previously Assigned Mentor for a Particular Student

- **Endpoint:** `GET /getpreviousmentors/:studentId`
- **Description:** Get the previously assigned mentor for a specific student.

## Rendering Link

The application is deployed and accessible at:

[Render](https://assign-mentor-lz39.onrender.com)

## Database

The API is connected to a MongoDB database. Ensure MongoDB is running and properly configured in your environment.

## Postman Collection

You can test the API endpoints using the Postman collection available at the following link:

[Postman Collection](https://documenter.getpostman.com/view/37156344/2sA3kXFLxX)



