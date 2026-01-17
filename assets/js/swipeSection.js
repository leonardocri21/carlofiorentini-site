document.addEventListener("DOMContentLoaded", () => {
  const slideInElements = document.querySelectorAll(".slide-in");

  // Create an intersection observer to detect when elements are in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is in view (either scrolling down or up)
          entry.target.classList.add("show");
        }
      });
    },
    {
    }
  );

  // Observe each slide-in element
  slideInElements.forEach(element => {
    observer.observe(element);
  });
});
