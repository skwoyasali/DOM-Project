document.addEventListener("DOMContentLoaded", loadStudents);
//When the page loads, it fetches stored student records from localStorage and displays them.


document.getElementById("student-form").addEventListener("submit", function(e) {
    e.preventDefault();
    addStudent();
});
// When the form is submitted, it prevents page reload and calls addStudent().


function addStudent() {
    let name = document.getElementById("name").value.trim();
    let studentClass = document.getElementById("class").value.trim();
    let address = document.getElementById("address").value.trim();
    let studentId = document.getElementById("studentId").value.trim();
    let email = document.getElementById("email").value.trim();
    let contact = document.getElementById("contact").value.trim();

    if (!name || !studentClass || !address || !studentId || !email || !contact) {
        alert("All fields are required.");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push({ name, studentClass, address, studentId, email, contact });
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
    document.getElementById("student-form").reset();
    updateScrollbar();   // Calling the Scrollbar function each time a new student is registered
}

/* Validates if all fields are filled.

Saves student data to localStorage.

Reloads the table to reflect changes.

Clears form inputs after submission. */

    document.getElementById("name").addEventListener ("input", function () {
    this.value = this.value.replace(/[^A-Za-z\s]/g, '');
    }); 
// Removes numbers and special characters from Student Name
    document.querySelectorAll("#studentId, #contact, #class").forEach(input => 
        input.addEventListener("input", () => input.value = input.value.replace(/\D/g, ''))
    );
// Removes alphabets and Student ID and contact number accept only numbers,
// I didnt made for email beacause browsers already provide built-in email validation for <input type="email".

function loadStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let table = document.getElementById("student-table");
    table.innerHTML = "";
    students.forEach((student, index) => {
        let row = `<tr>
            <td>${student.name}</td>
            <td>${student.studentClass}</td>
            <td>${student.address}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
        table.innerHTML += row;
    });
}
/* Retrieves students from localStorage.

   Clears the existing table.

   Loops through each student and dynamically creates a table
   row with edit and delete buttons.*/

   function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students"));
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}
/*Finds the student at the given index and removes it.

Updates localStorage and reloads the table.*/


function editStudent(index) {
    let students = JSON.parse(localStorage.getItem("students"));
    let student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("class").value = student.studentClass;
    document.getElementById("address").value = student.address;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}
/*Fills the form with the existing details of the selected student.

Removes the student from the list so it can be updated.

After editing, the user can resubmit the form to save changes.*/

function updateScrollbar() {
    let studentList = document.querySelector(".student-list"); 
    if (studentList.scrollHeight > studentList.clientHeight) {
        studentList.style.overflowY = "auto"; // Enable scrollbar if content overflows
    } else {
        studentList.style.overflowY = "hidden"; // Hide scrollbar if not needed
    }
}

// Call this function every time a student is added or removed



//Adds a scrollbar Dynamically 