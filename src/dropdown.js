import "./style.css";

const itemTransition = "0.05s ease-out";

const dropDowns = Array.from(document.getElementsByClassName("drop-down"));
dropDowns.map(buildDropDown);

function buildDropDown(dropDown) {
	const menuItems = Array.from(dropDown.getElementsByClassName("menu-item"));
	const menu = buildMenu(menuItems, dropDown);

	dropDown.expanded = false;
	dropDown.menuItems = menuItems;

	dropDown.addEventListener("mouseleave", () => collapseMenu(dropDown));

	dropDown.appendChild(menu);

	buildDropDownActivator(dropDown);

	collapseMenu(dropDown);
}

function buildMenu(menuItems, dropDown) {
	const menu = document.createElement("div");
	menu.classList.add("drop-down-menu");
	menuItems.map((item, index) => {
		item.addEventListener("transitionend", () => {
			if (dropDown.expanded === true && menuItems[index + 1]) {
				menuItems[index + 1].setAttribute("displaying", true);
			}
			if (dropDown.expanded === false && menuItems[(index - 1)]) {
				menuItems[index - 1].setAttribute("displaying", false);
			}
		});
		item.setAttribute("displaying", false);
		item.style.transition = itemTransition;
		menu.appendChild(item);
	});

	return menu;
}

function buildDropDownActivator(dropDown) {
	const activator = dropDown.querySelector(".menu-activator");
	activator.addEventListener("mouseenter", () => expandMenu(dropDown));
}

function expandMenu(dropDown) {
	dropDown.expanded = true;
	dropDown.menuItems[0].setAttribute("displaying", true);
}

function collapseMenu(dropDown) {
	dropDown.expanded = false;
	let lastLoadedIndex = -1;
	dropDown.menuItems.map((item) => {
		if (item.getAttribute("displaying") === "true") lastLoadedIndex++;
	});
	if (lastLoadedIndex > -1)
		dropDown.menuItems[lastLoadedIndex].setAttribute("displaying", false);
}
