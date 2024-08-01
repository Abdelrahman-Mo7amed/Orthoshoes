document.addEventListener("DOMContentLoaded", function() {
    function isMobileOrTablet() {
        return window.matchMedia("only screen and (max-width: 1024px)").matches;
    }

    if (isMobileOrTablet()) {
        document.getElementById("device-notice").style.display = "flex";
    }
});