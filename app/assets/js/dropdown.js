const dropdown = document.querySelector(".dropdown");
const dropdownSections = document.querySelectorAll(".dropdown .sections > ul");
const dropdownButtons = document.querySelectorAll(".clickable");

const fitContent = dropdown.offsetHeight;
dropdown.setAttribute("style", `height: ${fitContent}px;`);

dropdownButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sectionToOpen = document.querySelector(`ul#${button.id}`);
    console.log(sectionToOpen);
    const allSections = [...dropdownSections];
    const allSectionsExceptOpened = allSections.filter(
      (section) => section !== sectionToOpen
    );
    allSectionsExceptOpened.forEach((section) =>
      section.classList.remove("active")
    );
    sectionToOpen.classList.add("active");
    document
      .querySelector(".dropdown .sections > ul.furtherDropdown")
      .classList.add("inactive");
    dropdown.style.height = `${65 + sectionToOpen.offsetHeight}px`;
    document.querySelector(".dropdown > .header").classList.add("active");
  });
});

function backDropdown() {
  for (const section of dropdownSections) section.classList.remove("active");
  document
    .querySelector(".dropdown .sections > ul.furtherDropdown")
    .classList.remove("inactive");
  dropdown.style.height = `${fitContent}px`;
  document.querySelector(".dropdown > .header").classList.remove("active");
}

document
  .querySelector(".dropdown > .header")
  .addEventListener("click", () => backDropdown());

function closeDropdown() {
  backDropdown();
  document.querySelector(".hamburgerIcon").classList.remove("active");
  dropdown.classList.remove("active");
}

document.body.addEventListener("click", (e) => {
  if (
    !e.target.closest(".dropdown") &&
    !e.target.classList.contains("clickyClick")
  ) {
    closeDropdown();
  }
});

document.querySelector(".clickyClick").addEventListener("click", () => {
  document.querySelector(".hamburgerIcon").classList.toggle("active");
  dropdown.classList.toggle("active");
});
