import "./style.css";

let menuTransition = "height 0.5s ease-out";

let dropDowns = Array.from(document.getElementsByClassName("drop-down"));
dropDowns.map(buildDropDown);

function buildDropDown(dropDown) {
	let menuItems = Array.from(dropDown.getElementsByClassName("menu-item"));
	let menu = buildMenu(menuItems);

	dropDown.addEventListener("mouseleave", () => collapseMenu(dropDown));

	dropDown.appendChild(menu);

	buildDropDownActivator(dropDown);

	collapseMenu(dropDown);
}

function buildMenu(menuItems) {
	let menu = document.createElement("div");
	menu.classList.add("drop-down-menu");
	for (let item of menuItems) {
		menu.appendChild(item);
	}

	return menu;
}

function buildDropDownActivator(dropDown) {
	let activator = dropDown.querySelector(".menu-activator");
	activator.addEventListener("mouseenter", () => expandMenu(dropDown));
}

function collapseMenu(dropDown) {
	disable(dropDown);

	let menu = dropDown.querySelector(".drop-down-menu");
	let menuHeight = menu.scrollHeight;
	menu.style.transition = "";
	menu.addEventListener("transitionend", reEnable(dropDown));

	requestAnimationFrame(() => {
		menu.style.height = menuHeight + "px";
		menu.style.transition = menuTransition;

		requestAnimationFrame(() => {
			menu.style.height = 0 + "px";
		});
	});

	menu.setAttribute("collapsed", true);
}

function expandMenu(dropDown) {
	disable(dropDown);

	let menu = dropDown.querySelector(".drop-down-menu");
	let menuHeight = menu.scrollHeight;
	menu.style.height = menuHeight + "px";

	menu.addEventListener("transitionend", resetHeight(menu));
	menu.addEventListener("transitionend", reEnable(dropDown));

	menu.setAttribute("collapsed", false);
}

function resetHeight(menu) {
	function reset() {
		menu.removeEventListener("transitionend", reset);
		menu.style.height = null;
	}

	return reset;
}

function reEnable(dropDown) {
	function reset() {
		dropDown.removeEventListener("transitionend", reset);
		dropDown.disabled = false;
	dropDown.querySelector(".menu-activator").disabled = false;
	}

	return reset;
}

function disable(dropDown) {
	dropDown.disabled = true;
	dropDown.querySelector(".menu-activator").disabled = true;
}
