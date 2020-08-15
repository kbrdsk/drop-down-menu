import "./style.css";

const itemTransition = "0.05s ease-out";

const dropDowns = Array.from(document.getElementsByClassName("drop-down"));
dropDowns.map(buildDropDown);

function buildDropDown(dropDown) {
	const menuItems = Array.from(dropDown.getElementsByClassName("menu-item"));
	const menu = buildMenu(menuItems, dropDown);
	dropDown.appendChild(menu);

	dropDown.addEventListener("mouseleave", () => collapseMenu(dropDown));
	buildDropDownActivator(dropDown);

	Object.assign(dropDown, { menuItems, menu, expanded: false });
}

function buildMenu(menuItems, dropDown) {
	const menu = document.createElement("div");
	menu.classList.add("drop-down-menu");
	menu.setAttribute("displaying", false);
	menuItems.map((item, index) => {
		item.addEventListener("transitionend", () => {
			if (dropDown.expanded === true && menuItems[index + 1]) {
				menuItems[index + 1].setAttribute("displaying", true);
			}
			if (dropDown.expanded === false) {
				if (menuItems[index - 1])
					menuItems[index - 1].setAttribute("displaying", false);
				else menu.setAttribute("displaying", false);
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
	dropDown.menu.setAttribute("displaying", true);
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
