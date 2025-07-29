function clearSpaces() {
    const nav = document.querySelector("nav");
    const tabs = nav.childNodes;
    
    for (let i = 1, len = tabs.length; i < len - 1; i++) {
        navElem.removeChild(tabs[i]);
    }
}

function clearSpaceList() {
    const space = document.querySelector(".space-container");
    const children = space.childNodes;

    for (let i = 0, len = children.length; i < len - 1; i++) {
        space.removeChild(children[i]);
    }
}