// Code For The 'Back To Top' Button (Source 1)
let toTopButton = document.getElementById("back_top_button");
function goToTop() {
    // For Safairi
    document.body.scrollTop = 0
    // For Chrome, Firefox, IE and Opera
    document.documentElement.scrollTop = 0
}