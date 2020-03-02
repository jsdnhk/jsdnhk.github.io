const bg_color_body_values = ['white', 'gray', 'black'];
const bg_color_body_default_idx = bg_color_body_values.indexOf('gray');

$(document).ready(function() {
    showBGColorBody(getBGColorBody());
});

function getBGColorBody() {
    let color_selected_idx = -1;
    if(typeof(Storage) !== "undefined") {
        if (localStorage.bg_color_body_idx && isValidIndex(localStorage.bg_color_body_idx)) {
            color_selected_idx = Number(localStorage.bg_color_body_idx);
        } else {
            setBGColorBody(bg_color_body_default_idx);
            color_selected_idx = bg_color_body_default_idx;
        }
    } else {
        color_selected_idx = bg_color_body_default_idx;
    }
    return Number(color_selected_idx);
}

function isValidIndex(idx){
    let is_valid = true;
    try {
        idx = Number(idx);
        if (!(idx >= 0 && idx < bg_color_body_values.length)) {
            is_valid = false;
        }
    } catch (e) {
        is_valid = false;
    }
    return is_valid;
}

function setBGColorBody(idx){
    var color_set_idx = isValidIndex(idx) ? Number(idx) : bg_color_body_default_idx;
    if (typeof(Storage) !== "undefined") {
        localStorage.bg_color_body_idx = Number(color_set_idx);
    } else {
        color_set_idx = bg_color_body_default_idx;
    }
    return Number(color_set_idx);
}

function onChangeBGColorBody(){
    showBGColorBody(switchBGColorBody());
}

function switchBGColorBody(){
    var current_bg_color_body_idx = getBGColorBody();
    return (current_bg_color_body_idx + 1) % bg_color_body_values.length;
}

function showBGColorBody(idx) {
    var bg_color_body_value = bg_color_body_values[setBGColorBody(idx)];
    $('html body').css('background-color', bg_color_body_value);
}