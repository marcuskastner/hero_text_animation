const content = document.querySelector(".content");
const letters = document.querySelectorAll(".letter");
const anchors = document.querySelectorAll("a");

content.addEventListener("mousemove", (event) => {
  anchors.forEach((anchor) => {
    let anyLetterScaled = false; // Flag to check if any letter inside this anchor is scaled above 1

    // Check all letters inside the current anchor tag
    const anchorLetters = anchor.querySelectorAll(".letter");

    anchorLetters.forEach((letter) => {
      const rect = letter.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from the mouse pointer
      const distance = Math.hypot(
        event.clientX - centerX,
        event.clientY - centerY
      );

      // Map the distance to a scale factor
      const maxScale = 1.75;
      const minScale = 1;
      const maxDistance = 120; // Adjust this for effect range
      const scale = Math.max(minScale, maxScale - distance / maxDistance);

      // Calculate the amount to move the letter down based on scale
      const scaleDiff = scale - 1;
      const SCALING_TRANSLATE_CONVERSION_FACTOR = 12;
      const translateY = scaleDiff * SCALING_TRANSLATE_CONVERSION_FACTOR;

      // Apply both scaling and translation to maintain the bottom position
      letter.style.transform = `scaleY(${scale}) translateY(${translateY}px)`;

      // If any letter's scale is above 1, set the flag to true
      if (scale > 1) {
        anyLetterScaled = true;
      }
    });

    // Change the parent anchor color based on scale
    if (anyLetterScaled) {
      anchor.style.color = "hotpink";
    } else {
      anchor.style.color = "grey";
    }
  });
});

content.addEventListener("mouseleave", () => {
  letters.forEach((letter) => {
    // Reset scale and translation to normal when mouse leaves
    letter.style.transform = "scaleY(1) translateY(0)";
  });

  // Reset anchor color to black when mouse leaves
  anchors.forEach((anchor) => {
    anchor.style.color = "black";
  });
});
