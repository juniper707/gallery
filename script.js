document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.getElementById("image-container");
    let images = [];

    function checkImages() {
        let i = 1;
        let foundAll = false;

        images = []; // Reset the list
        imageContainer.innerHTML = ""; // Clear previous images

        function checkNext() {
            let img = new Image();
            img.src = `additional/image${i}.jpg`;

            img.onload = function () {
                images.push(img.src);

                // Create an <img> element and add it to the page
                let imgElement = document.createElement("img");
                imgElement.src = img.src;
                imgElement.alt = `Image ${i}`;
                imgElement.style.width = "200px"; // Adjust size as needed
                imgElement.style.margin = "5px";

                imageContainer.appendChild(imgElement);

                i++;
                checkNext(); // Check the next file
            };

            img.onerror = function () {
                foundAll = true; // Stop when a missing file is found
            };
        }

        checkNext();

        setTimeout(checkImages, 5000); // Check again in 5 seconds
    }

    checkImages();
});
