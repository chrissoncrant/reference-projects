function createBox(content) {
	const box = document.createElement("div");
	box.classList.add("box");

	if (content) {
		box.textContent = content;
	} else {
		box.textContent = "Box";
	}

	return box;
}

// When not using 'export default' the brackets are required both for the export and for the import.
export { createBox };
