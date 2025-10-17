//--------LÅT STÅ-----------
// Definiera fasta "konstanter" för olika typer av animering av menyn
ANIMATION = {
  NONE: "none", // Ingen animation
  TIMER: "timer", // setInterval-baserad animation
  ALTERNATIVE: "alternative", // ytterligare alternativ
};

// Ändra värdet för att styra vilken meny-animation som ska användas
window.MENU_ANIMATION_MODE ??= ANIMATION.ALTERNATIVE; // ANIMATION.TIMER (Default) = ingen animation (G-nivå), ANIMATION.TIMER // (VG-nivå), ANIMATION.ALTERNATIVE // ytterligare ett alternativ (VG-nivå);

/*
 Användningsexempel för animationer beroende på inställning
*/
if (window.MENU_ANIMATION_MODE === ANIMATION.NONE) {
  console.log("Ingen meny-animation används");
} else if (window.MENU_ANIMATION_MODE === ANIMATION.TIMER) {
  console.log("Meny-animation med timer används");

  const originalMenuPosition = parseFloat(
    window.getComputedStyle(document.querySelector("ul.menu")).left
  ); // parseFloat returnerar alla float värden som är före en annan värdetyp ur en sträng, i det här fallet -300 ur "-300px"

  function toggleMenu() {
    let menuPositionLeft = parseFloat(
      window.getComputedStyle(document.querySelector("ul.menu")).left
    );

    if (menuPositionLeft < 0) {
      document.querySelector(".menu-icon > .fas").classList.add("fa-times");

      const menuIntervalAnimationIn = setInterval(() => {
        if (menuPositionLeft < 0) {
          menuPositionLeft += 20;
          document.querySelector("ul.menu").style.left = menuPositionLeft + "px";
        } else {
          clearInterval(menuIntervalAnimationIn);
        }
      }, 0);
    } else {
      document.querySelector(".menu-icon > .fas").classList.remove("fa-times");

      const menuIntervalAnimationOut = setInterval(() => {
        if (menuPositionLeft > originalMenuPosition) {
          menuPositionLeft -= 20;
          document.querySelector("ul.menu").style.left = menuPositionLeft + "px";
        } else {
          clearInterval(menuIntervalAnimationOut);
        }
      }, 0);
    }
  }
} else if (window.MENU_ANIMATION_MODE === ANIMATION.ALTERNATIVE) {
  console.log("Meny-animation med alternativ metod används");

  function toggleMenu() {
    const menu = document.querySelector("ul.menu");
    const menuIcon = document.querySelector(".menu-icon > .fas");

    menu.style.transition = "left, 500ms";

    if (!menu.classList.contains("menu--show")) {
      menu.classList.add("menu--show");
      menuIcon.classList.add("fa-times");
    } else {
      menu.classList.remove("menu--show");
      menuIcon.classList.remove("fa-times");
    }
  }
}
//--------------------------

async function fetchData(url) {
	document.querySelector("#js-loading").classList.remove("hidden");
	if (document.querySelector(".show-previous")) document.querySelector(".show-previous").classList.add("hidden");

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

function setChannel(channelName) {
  document.querySelector("#js-title").innerText = channelName;

	let list = `
	<ul class="list-group list-group-flush">
		<li class="list-group-item show-previous">Visa tidigare program</li>
	</ul>`;
	document.querySelector("#js-schedule").innerHTML = list;

  fetchData(`./data/${channelName}.json`).then((dataFromFetch) => {
    const programNamesAndTimes = dataFromFetch.map((programNameAndTime) => ({

      start: `${new Date(programNameAndTime.start).getHours()}:${new Date(programNameAndTime.start).getMinutes()}`,
      name: programNameAndTime.name,
    }));

		let listItems = "";

    programNamesAndTimes.forEach((programNameAndTime) => {
      listItems +=
			`<li class="list-group-item">
				<strong>${programNameAndTime.start}</strong>
				<div>${programNameAndTime.name}</div>
			</li>`;
    });

		document.querySelector(".list-group").innerHTML += listItems;

		document.querySelector(".show-previous").classList.remove("hidden");
		document.querySelector("#js-loading").classList.add("hidden");
  });
}
