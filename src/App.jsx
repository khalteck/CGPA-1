import { useState } from "react";
import "./App.css";

function App() {
  const [semesters, setSemesters] = useState([
    {
      id: 1,
      courses: [
        { id: 1, title: "", grade: "", credit: 0 },
        { id: 2, title: "", grade: "", credit: 0 },
        { id: 3, title: "", grade: "", credit: 0 },
        { id: 4, title: "", grade: "", credit: 0 },
      ],
    },
  ]);

  const handleAddSemester = () => {
    const newSemester = {
      id: semesters.length + 1,
      courses: [
        { id: 1, title: "", grade: "", credit: 0 },
        { id: 2, title: "", grade: "", credit: 0 },
        { id: 3, title: "", grade: "", credit: 0 },
        { id: 4, title: "", grade: "", credit: 0 },
      ],
    };
    setSemesters([...semesters, newSemester]);
  };

  const handleAddCourse = (semesterIndex) => {
    const newCourse = {
      id: semesters[semesterIndex].courses.length + 1,
      title: "",
      grade: "",
      credit: 0,
    };
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses.push(newCourse);
    setSemesters(updatedSemesters);
  };

  const handleRemoveCourse = (semesterIndex, courseIndex) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses.splice(courseIndex, 1);
    setSemesters(updatedSemesters);
  };

  const handleInputChange = (semesterIndex, courseIndex, field, value) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses[courseIndex][field] = value;
    setSemesters(updatedSemesters);
  };

  const calculateGPA = (courses) => {
    let totalCredits = 0;
    let totalPoints = 0;
    courses.forEach((course) => {
      if (course.grade !== "" && course.credit !== "") {
        const credit = parseInt(course.credit);
        const point = getPointFromGrade(course.grade);
        totalCredits += credit;
        totalPoints += credit * point;
      }
    });
    if (totalCredits === 0) {
      return 0;
    } else {
      return totalPoints / totalCredits;
    }
  };

  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    semesters.forEach((semester) => {
      const gpa = calculateGPA(semester.courses);
      const credits = getTotalCredits(semester.courses);
      totalCredits += credits;
      totalPoints += credits * gpa;
    });
    if (totalCredits === 0) {
      return 0;
    } else {
      return totalPoints / totalCredits;
    }
  };

  const getPointFromGrade = (grade) => {
    switch (grade) {
      case "A+":
        return 5.0;
      case "A-":
        return 4.5;
      case "B+":
        return 4.0;
      case "B-":
        return 3.5;
      case "C+":
        return 3.0;
      case "C-":
        return 2.5;
      case "D":
        return 2.0;
      case "E":
        return 1.5;
      case "F":
        return 1.0;
      default:
        return 0;
    }
  };

  const getTotalCredits = (courses) => {
    let totalCredits = 0;
    courses.forEach((course) => {
      if (course.credit !== "") {
        totalCredits += parseInt(course.credit);
      }
    });
    return totalCredits;
  };

  return (
    <>
      <header>
        <h1>cgpa calc</h1>
        <p>Calculate your CGPA with no hassle and in just a click</p>
      </header>
      <main>
        {semesters.map((semester, semesterIndex) => (
          <div key={semester.id}>
            <h2>
              {semester.id === 1
                ? "1st"
                : semester.id === 2
                ? "2nd"
                : semester.id === 3
                ? "3rd"
                : semester.id + "th"}{" "}
              Semester
            </h2>
            <div className="info">
              <p>NB: min, of 4 courses, max. of 6 courses</p>
            </div>
            {/* <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Grade</th>
                  <th>Credit</th>
                  <th>Actions</th>
                </tr>
              </thead> */}
            <div>
              {semester.courses.map((course, courseIndex) => (
                <div key={courseIndex} className="course_info">
                  <input
                    type="text"
                    placeholder="Course Title"
                    value={course.title}
                    onChange={(e) =>
                      handleInputChange(
                        semesterIndex,
                        courseIndex,
                        "title",
                        e.target.value
                      )
                    }
                  />
                  <select
                    style={{ paddingLeft: "10px" }}
                    defaultValue={"grade"}
                    onChange={(e) =>
                      handleInputChange(
                        semesterIndex,
                        courseIndex,
                        "grade",
                        e.target.value
                      )
                    }
                  >
                    <option value="grade" hidden>
                      Grade
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C-">C-</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                  </select>
                  <select
                    style={{ width: "200px", paddingLeft: "10px" }}
                    defaultValue={"credits"}
                    onChange={(e) =>
                      handleInputChange(
                        semesterIndex,
                        courseIndex,
                        "credit",
                        e.target.value
                      )
                    }
                  >
                    <option value="credits" hidden>
                      Credits
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="6">7</option>
                    <option value="6">8</option>
                  </select>
                  <div
                    onClick={() =>
                      handleRemoveCourse(semesterIndex, courseIndex)
                    }
                    className="close-cont"
                  >
                    <img alt="close" src="/img/icons8-close-50.png" />
                  </div>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "20px",
                  marginBottom: "40px",
                }}
              >
                <button
                  className="addCourse"
                  onClick={() => handleAddCourse(semesterIndex)}
                >
                  Add Course
                </button>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    border: "1px solid grey",
                    padding: "0 30px",
                    borderRadius: "10px",
                    lineHeight: "15px",
                  }}
                >
                  <p>GPA: {calculateGPA(semester.courses).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "20px",
            marginBottom: "40px",
            borderTop: "2px solid lightGrey",
          }}
        >
          <button className="addCourse" onClick={handleAddSemester}>
            Add Semester
          </button>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              border: "2px solid #0085ff",
              padding: "0 30px",
              borderRadius: "10px",
              lineHeight: "15px",
            }}
          >
            {" "}
            <p style={{ color: "#0085ff" }}>
              CGPA: {calculateCGPA().toFixed(2)}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
