const saints_folder = '/assets/saints';
const saints_json = ['buddha.json', 'confucius.json', 'lao_tzu.json'];
const title_quote = 'You\'ve got a message:';
const title_quote_complete = 'Great person, you\'ve reviewed all the quotes in this month!';
const title_quote_complete2 = 'That the saints will bring you to the bright after dark!:-)';
const title_datetime = 'Current Datetime: ';
const title_weather = 'Current Weather: ';

const index_selected_json = Number(new Date().getMonth()) % saints_json.length;
const filepath_selected_json = `${saints_folder}/${saints_json[index_selected_json]}`;

function showAlertLogo() {
    getQuoteMessage();
}

function showLogoMessage(quote_message) {
    var show_message = '';
    var msg_quote = '', msg_datetime = '', msg_weather = '';

    show_message += getPrintedQuoteMessage(quote_message);

    alert(show_message);
}

function getQuoteMessage(){
    var quote_message = '';
    doAjaxGet(filepath_selected_json).then((json) => {
        // random index fetch
        var index_select_quote = getRandomQuoteIndex(json.count);
        // text handling
        if (index_select_quote != null) {
            var text_select_quote = json.results[index_select_quote].quoteText.toString().trim();
            var author_select_quote = json.results[index_select_quote].quoteAuthor.toString().trim();
            quote_message = text_select_quote + '\n\n' + author_select_quote;
        }
        showLogoMessage(quote_message);
    });
}

var count_quotes_total = 0;
var count_quotes_read = 0;
var array_quote_indexes = [];

function getRandomQuoteIndex(count_total){
    // init at 1st time
    if (count_quotes_total == 0 && count_quotes_read == 0) {
        count_quotes_total = Number(count_total);
        for (var i = 0; i < count_quotes_total; i++) {
            array_quote_indexes.push(i);
        }
    }
    // get random index without replication
    if (array_quote_indexes.length == 0) { return null; }
    let index_selected = Math.floor(Math.random() * array_quote_indexes.length);
    let rolled = array_quote_indexes.splice(index_selected, 1);
    count_quotes_read++;
    return Number(rolled[0]);
}

function getPrintedQuoteMessage(quote_message){
    let str_printed = '';
    if(quote_message) {
        str_printed = `(${count_quotes_total - count_quotes_read}) ${title_quote}`;
        str_printed += '\n\n' + quote_message;
    } else {
        str_printed = title_quote_complete;
        str_printed += '\n' + title_quote_complete2;
    }
    return str_printed;
}

function getDatetimeMessage(){
    return new Date().toLocaleString();
}

function getWeatherMessage(){
    var weather_message = '';
    const weather_url = "http://wttr.in/?format=\"%l:+%c+%t+%h+%w+%p+%o+%m\"";
    doAjaxGet(weather_url).then((json) => {
        weather_message = json.toString().trim();
        return weather_message;
    });
}

async function doAjaxGet(ajaxurl) {
    let response = await fetch(ajaxurl);
    if (response.status == 200) {
        let data = await response.json();
        return data;
    }
    throw new Error(response.status);
}
