document.getElementById("reviewForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let rating = document.getElementById("rating").value;
    let comment = document.getElementById("comment").value;

    let reviewContainer = document.querySelector(".reviews-container");

    let newReview = document.createElement("div");
    newReview.classList.add("review");
    newReview.innerHTML = `
        <h3>${name}</h3>
        <p>${"⭐".repeat(rating)}</p>
        <p>"${comment}"</p>
    `;

    reviewContainer.appendChild(newReview);

    document.getElementById("reviewForm").reset();
});
function togglemenu(){
    subMenu.classList.toggle("open-menu");
}

document.getElementById("uploadProfilePic").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profileImage").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("profileForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Profile updated successfully!");
});

document.getElementById("complaintForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let room = document.getElementById("room").value;
    let complaintType = document.getElementById("complaintType").value;
    let complaintText = document.getElementById("complaintText").value;

    let complaintContainer = document.getElementById("complaintsList");
    
    // Remove "No complaints submitted yet." message if present
    if (complaintContainer.innerHTML.includes("No complaints submitted yet.")) {
        complaintContainer.innerHTML = "";
    }

    let newComplaint = document.createElement("div");
    newComplaint.classList.add("complaint-item");
    newComplaint.innerHTML = `
        <h3>${complaintType}</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Room No:</strong> ${room}</p>
        <p><strong>Details:</strong> ${complaintText}</p>
    `;

    complaintContainer.appendChild(newComplaint);

    // Reset the form
    document.getElementById("complaintForm").reset();
});