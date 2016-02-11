document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
    var keyCode = e.keyCode;
    switch(keyCode) {
        case 13:
        search();
        break;
        default:
        break;
    }
}