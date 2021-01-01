var textArea = document.querySelector("textarea")

textArea.addEventListener("click", () => {
    if (textArea.innerText = "") {
        textArea.setSelectionRange(0,0)
    };
});
