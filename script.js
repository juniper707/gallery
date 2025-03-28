document.addEventListener("DOMContentLoaded", function () {
    let images = [];
    let currentIndex = 0;
    let slideshowInterval;
    const imageContainer = document.getElementById("image-container");

    function checkImages() {
        let i = 1;
        function checkNext() {
            let img = new Image();
            img.src = `additional/image${i}.jpg`;
            img.onload = function () {
                images.push(img.src);
                i++;
                checkNext();
            };
            img.onerror = function () {
                if (images.length > 0) {
                    displayImage(currentIndex);
                    startSlideshow();
                } else {
                    imageContainer.innerHTML = "<p>No images found.</p>";
                }
            };
        }
        checkNext();
    }

    function displayImage(index) {
        imageContainer.innerHTML = "";
        let imgElement = document.createElement("img");
        imgElement.src = images[index];
        imgElement.style.width = "100%"; 
        imgElement.style.maxHeight = "80vh"; 
        imgElement.style.objectFit = "contain";
        imgElement.style.display = "block";
        imgElement.style.margin = "auto";
        imageContainer.appendChild(imgElement);
        createNavigation();
    }

    function createNavigation() {
        document.querySelectorAll(".arrow").forEach(arrow => arrow.remove());
        let leftArrow = document.createElement("div");
        leftArrow.innerHTML = "&#10094;";
        leftArrow.className = "arrow left";
        leftArrow.onclick = function () {
            prevImage();
        };

        let rightArrow = document.createElement("div");
        rightArrow.innerHTML = "&#10095;";
        rightArrow.className = "arrow right";
        rightArrow.onclick = function () {
            nextImage();
        };

        document.body.appendChild(leftArrow);
        document.body.appendChild(rightArrow);
    }

    function nextImage() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to first image
        }
        displayImage(currentIndex);
    }

    function prevImage() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = images.length - 1; // Loop to last image
        }
        displayImage(currentIndex);
    }

    function startSlideshow() {
        slideshowInterval = setInterval(nextImage, 5000); // Change image every 5s
    }

    function stopSlideshow() {
        clearInterval(slideshowInterval);
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
            stopSlideshow();
            nextImage();
        } else if (event.key === "ArrowLeft") {
            stopSlideshow();
            prevImage();
        }
    });

    checkImages();
});
