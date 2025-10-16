//--------LÅT STÅ-----------
// Definiera fasta "konstanter" för olika typer av animering av menyn
ANIMATION = {
  NONE: "none", // Ingen animation
  TIMER: "timer", // setInterval-baserad animation
  ALTERNATIVE: "alternative", // ytterligare alternativ
};

// Ändra värdet för att styra vilken meny-animation som ska användas
window.MENU_ANIMATION_MODE ??= ANIMATION.TIMER; // ANIMATION.TIMER (Default) = ingen animation (G-nivå), ANIMATION.TIMER // (VG-nivå), ANIMATION.ALTERNATIVE // ytterligare ett alternativ (VG-nivå);

/*
 Användningsexempel för animationer beroende på inställning
*/
if (window.MENU_ANIMATION_MODE === ANIMATION.NONE) {
  console.log("Ingen meny-animation används");
} else if (window.MENU_ANIMATION_MODE === ANIMATION.TIMER) {
  console.log("Meny-animation med timer används");

  function toggleMenu() {
    const menuPositionLeft = window.getComputedStyle(document.querySelector("ul.menu")).left;

    if (parseFloat(menuPositionLeft) < 0) { // parseFloat returnerar alla float värden som är före en annan värdetyp ur en sträng, i det här fallet -300 ur "-300px"
      let pos = parseFloat(menuPositionLeft);

      const menuIntervalAnimation = setInterval(() => {
        pos += 15;
        document.querySelector("ul.menu").style.left = pos + "px";

      if (pos > -1) clearInterval(menuIntervalAnimation);
      }, 0);
    }
  }
} else if (window.MENU_ANIMATION_MODE === ANIMATION.ALTERNATIVE) {
  console.log("Meny-animation med alternativ metod används");
}
//--------------------------
