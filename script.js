/* =================================
   STUDENT PROFILE
================================= */

function saveProfile() {

    let name = document.getElementById("studentName").value.trim();
    let department = document.getElementById("department").value.trim();

    if (name === "" || department === "") {
        alert("Please enter your name and department");
        return;
    }

    localStorage.setItem("studentName", name);
    localStorage.setItem("department", department);

    alert("Profile saved successfully!");

    updateDashboard();
}


/* =================================
   ADD SKILL
================================= */

function addSkill() {

    let skillName = document.getElementById("skillName").value.trim();
    let skillLevel = Number(document.getElementById("skillLevel").value);
    let targetLevel = Number(document.getElementById("targetLevel").value);

    if (
        skillName === "" ||
        isNaN(skillLevel) ||
        isNaN(targetLevel)
    ) {
        alert("Please enter all skill details");
        return;
    }

    if (skillLevel < 0 || skillLevel > 100 ||
        targetLevel < 0 || targetLevel > 100) {

        alert("Skill levels must be between 0 and 100");
        return;
    }

    let skills =
        JSON.parse(localStorage.getItem("skills")) || [];

    skills.push({
        name: skillName,
        level: skillLevel,
        target: targetLevel
    });

    localStorage.setItem(
        "skills",
        JSON.stringify(skills)
    );

    document.getElementById("skillName").value = "";
    document.getElementById("skillLevel").value = "";
    document.getElementById("targetLevel").value = "";

    displaySkills();
}


/* =================================
   DISPLAY SKILLS
================================= */

function displaySkills() {

    let skillList =
        document.getElementById("skillList");

    if (!skillList) {
        return;
    }

    skillList.innerHTML = "";

    let skills =
        JSON.parse(localStorage.getItem("skills")) || [];

    skills.forEach(function(skill, index) {

        let newSkill =
            document.createElement("div");

        newSkill.className = "skill";

        newSkill.innerHTML = `
            <span>${skill.name}</span>

            <progress
                value="${skill.level}"
                max="100">
            </progress>

            <span>${skill.level}%</span>

            <button onclick="editSkill(${index})">
                Edit
            </button>

            <button onclick="deleteSkill(${index})">
                Delete
            </button>
        `;

        skillList.appendChild(newSkill);
    });

    updateOverallProgress();
    updateDashboard();
}


/* =================================
   EDIT SKILL
================================= */

function editSkill(index) {

    let skills =
        JSON.parse(localStorage.getItem("skills")) || [];

    let newName =
        prompt("Enter skill name:", skills[index].name);

    if (newName === null || newName.trim() === "") {
        return;
    }

    let newLevel =
        prompt("Enter current skill level (0-100):",
            skills[index].level);

    let newTarget =
        prompt("Enter target level (0-100):",
            skills[index].target);

    newLevel = Number(newLevel);
    newTarget = Number(newTarget);

    if (
        isNaN(newLevel) ||
        isNaN(newTarget) ||
        newLevel < 0 ||
        newLevel > 100 ||
        newTarget < 0 ||
        newTarget > 100
    ) {
        alert("Please enter valid levels");
        return;
    }

    skills[index].name = newName.trim();
    skills[index].level = newLevel;
    skills[index].target = newTarget;

    localStorage.setItem(
        "skills",
        JSON.stringify(skills)
    );

    displaySkills();
}


/* =================================
   DELETE SKILL
================================= */

function deleteSkill(index) {

    let skills =
        JSON.parse(localStorage.getItem("skills")) || [];

    skills.splice(index, 1);

    localStorage.setItem(
        "skills",
        JSON.stringify(skills)
    );

    displaySkills();
}


/* =================================
   OVERALL PROGRESS
================================= */

function updateOverallProgress() {

    let skills =
        JSON.parse(localStorage.getItem("skills")) || [];

    let progressBar =
        document.getElementById("overallBar");

    let progressText =
        document.getElementById("overallText");

    if (!progressBar || !progressText) {
        return;
    }

    if (skills.length === 0) {

        progressBar.value = 0;
        progressText.innerText = "0%";

        return;
    }

    let total = 0;

    skills.forEach(function(skill) {
        total += Number(skill.level);
    });

    let average =
        Math.round(total / skills.length);

    progressBar.value = average;
    progressText.innerText = average + "%";
}


/* =================================
   ADD CERTIFICATION
================================= */

function addCertificate() {

    let name =
        document.getElementById("certificateName").value.trim();

    let issuer =
        document.getElementById("certificateIssuer").value.trim();

    if (name === "" || issuer === "") {

        alert("Please enter certificate details");

        return;
    }

    let certificates =
        JSON.parse(localStorage.getItem("certificates")) || [];

    certificates.push({
        name: name,
        issuer: issuer
    });

    localStorage.setItem(
        "certificates",
        JSON.stringify(certificates)
    );

    document.getElementById("certificateName").value = "";
    document.getElementById("certificateIssuer").value = "";

    displayCertificates();
}


/* =================================
   DISPLAY CERTIFICATIONS
================================= */

function displayCertificates() {

    let list =
        document.getElementById("certificateList");

    if (!list) {
        return;
    }

    list.innerHTML = "";

    let certificates =
        JSON.parse(localStorage.getItem("certificates")) || [];

    certificates.forEach(function(certificate, index) {

        let item =
            document.createElement("p");

        item.innerHTML = `
            <strong>${certificate.name}</strong>
            - ${certificate.issuer}

            <button onclick="deleteCertificate(${index})">
                Delete
            </button>
        `;

        list.appendChild(item);
    });

    updateDashboard();
}


/* =================================
   DELETE CERTIFICATION
================================= */

function deleteCertificate(index) {

    let certificates =
        JSON.parse(localStorage.getItem("certificates")) || [];

    certificates.splice(index, 1);

    localStorage.setItem(
        "certificates",
        JSON.stringify(certificates)
    );

    displayCertificates();
}


/* =================================
   ADD PROJECT
================================= */

function addProject() {

    let name =
        document.getElementById("projectName").value.trim();

    let technology =
        document.getElementById("projectTechnology").value.trim();

    let status =
        document.getElementById("projectStatus").value;

    if (
        name === "" ||
        technology === "" ||
        status === ""
    ) {

        alert("Please enter all project details");

        return;
    }

    let projects =
        JSON.parse(localStorage.getItem("projects")) || [];

    projects.push({
        name: name,
        technology: technology,
        status: status
    });

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );

    document.getElementById("projectName").value = "";
    document.getElementById("projectTechnology").value = "";
    document.getElementById("projectStatus").value = "";

    displayProjects();
}


/* =================================
   DISPLAY PROJECTS
================================= */

function displayProjects() {

    let list =
        document.getElementById("projectList");

    if (!list) {
        return;
    }

    list.innerHTML = "";

    let projects =
        JSON.parse(localStorage.getItem("projects")) || [];

    projects.forEach(function(project, index) {

        let item =
            document.createElement("p");

        item.innerHTML = `
            <strong>${project.name}</strong>
            <br>
            Technology: ${project.technology}
            <br>
            Status: ${project.status}

            <button onclick="deleteProject(${index})">
                Delete
            </button>
        `;

        list.appendChild(item);
    });

    updateDashboard();
}


/* =================================
   DELETE PROJECT
================================= */

function deleteProject(index) {

    let projects =
        JSON.parse(localStorage.getItem("projects")) || [];

    projects.splice(index, 1);

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );

    displayProjects();
}


/* =================================
   ADD ACHIEVEMENT
================================= */

function addAchievement() {

    let name =
        document.getElementById("achievementName").value.trim();

    let date =
        document.getElementById("achievementDate").value.trim();

    if (name === "" || date === "") {

        alert("Please enter achievement details");

        return;
    }

    let achievements =
        JSON.parse(localStorage.getItem("achievements")) || [];

    achievements.push({
        name: name,
        date: date
    });

    localStorage.setItem(
        "achievements",
        JSON.stringify(achievements)
    );

    document.getElementById("achievementName").value = "";
    document.getElementById("achievementDate").value = "";

    displayAchievements();
}


/* =================================
   DISPLAY ACHIEVEMENTS
================================= */

function displayAchievements() {

    let list =
        document.getElementById("achievementList");

    if (!list) {
        return;
    }

    list.innerHTML = "";

    let achievements =
        JSON.parse(localStorage.getItem("achievements")) || [];

    achievements.forEach(function(achievement, index) {

        let item =
            document.createElement("p");

        item.innerHTML = `
            <strong>${achievement.name}</strong>
            - ${achievement.date}

            <button onclick="deleteAchievement(${index})">
                Delete
            </button>
        `;

        list.appendChild(item);
    });

    updateDashboard();
}


/* =================================
   DELETE ACHIEVEMENT
================================= */

function deleteAchievement(index) {

    let achievements =
        JSON.parse(localStorage.getItem("achievements")) || [];

    achievements.splice(index, 1);

    localStorage.setItem(
        "achievements",
        JSON.stringify(achievements)
    );

    displayAchievements();
}


/* =================================
   DASHBOARD
================================= */

function updateDashboard() {

    let skills =
        JSON.parse(localStorage.getItem("skills")) || [];

    let certificates =
        JSON.parse(localStorage.getItem("certificates")) || [];

    let projects =
        JSON.parse(localStorage.getItem("projects")) || [];

    let achievements =
        JSON.parse(localStorage.getItem("achievements")) || [];


    let totalSkills =
        document.getElementById("totalSkills");

    let totalCertificates =
        document.getElementById("totalCertificates");

    let totalProjects =
        document.getElementById("totalProjects");

    let totalAchievements =
        document.getElementById("totalAchievements");


    if (totalSkills) {
        totalSkills.innerText = skills.length;
    }

    if (totalCertificates) {
        totalCertificates.innerText =
            certificates.length;
    }

    if (totalProjects) {
        totalProjects.innerText =
            projects.length;
    }

    if (totalAchievements) {
        totalAchievements.innerText =
            achievements.length;
    }
}


/* =================================
   DARK MODE
================================= */

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    let isDark =
        document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "darkMode",
        isDark
    );
}


/* =================================
   LOAD SAVED DATA
================================= */

window.onload = function() {

    let savedName =
        localStorage.getItem("studentName");

    let savedDepartment =
        localStorage.getItem("department");


    if (savedName) {

        document.getElementById(
            "studentName"
        ).value = savedName;
    }


    if (savedDepartment) {

        document.getElementById(
            "department"
        ).value = savedDepartment;
    }


    if (
        localStorage.getItem("darkMode") === "true"
    ) {

        document.body.classList.add("dark-mode");
    }


    displaySkills();
    displayCertificates();
    displayProjects();
    displayAchievements();

    updateDashboard();
    updateOverallProgress();
};