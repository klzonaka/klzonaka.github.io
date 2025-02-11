window.onload = () => {
    history.scrollRestoration = "manual";
};

document.addEventListener("contextmenu", ev => {
    ev.preventDefault();
});

document.addEventListener("dragstart", ev => {
    ev.preventDefault();
});

document.addEventListener("selectstart", ev => {
    ev.preventDefault();
});