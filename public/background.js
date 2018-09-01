let films = [];

//example of using a message handler from the content scripts
chrome.extension.onMessage.addListener(async (request, sender, sendResponse) => {
    switch (request.msg) {
        case 'films':
            sendResponse({ films });
            break;
        case 'updateFilms':
            await init();
            console.log('updateFilms', films);
            sendResponse({ films });
            break;
        default:
            break;
    }
});

jQuery.ajaxSetup({ async: false });

async function init() {
    console.log('Start parsing...');
    films = await parseFilms();
    if (!films.length) {
        console.log('captcha DETECTED');
        redirectCaptcha();
    } else {
        films = await parseDetails(films);
    }
    console.log('End parsing...');
}
init();

/**
 * Получаем массив объектов.
 * Пример: [{ url: "http://afisha.gid43.ru/films/view/id/3173/" }]
 */
async function parseFilms() {
    let films = [];
    await $.get(`https://afisha.yandex.ru/kirov/cinema?source=calendar&preset=today`, (response) => {
        $(response).find('.i-page__item_loader_yes').map((index, el) => {
            let url = 'https://afisha.yandex.ru/' + $(el).find('a[href]')[0].href.split('/').splice(3).join('/');
            films.push({ url: url });
        });
    });
    return films;
}
/**
 * Получаем подробности по каждому фильму.
 * @param {array} urls - массив ссылок на фильмы
 */
async function parseDetails(urls) {
    let captcha = false;
    let films = []; // массив фильмов
    await urls.forEach(async (el, index) => {
        await $.get(`${el.url}`, (response) => {
            if (response.indexOf('href="//yandex.ru/support/captcha/"') > -1) {
                console.log('captcha DETECTED');
                captcha = true;
                return;
            }
            let title = $(response).find('.event-heading__title')[0].textContent.trim();
            let image = $(response).find('.event-gallery__image')[0].style.backgroundImage.split('"')[1];;
            let cinema = []; // массив кинотеатров
            let scheduleTable = $(response).find('.schedule-cinema-item');
            let rating = $(response).find('.arrow_theme_rating').text();

            for (let i = 0; i < scheduleTable.length; i++) {
                let name = $(scheduleTable[i]).find('.place__title')[0].textContent.trim();
                let schedule = $(scheduleTable[i]).find('.schedule-cinema-item__groups');
                let time = []; // массив расписаний
                let room = []; // массив, в котором указан номер зала и цена билета
                // получаем расписание показов
                for (let j = 0; j < schedule.length; j++) {
                    let arraySchedule = $(schedule[j]).find('.schedule-sessions__item');
                    for (let k = 0; k < arraySchedule.length; k++) {
                        // если фильм еще не начался, то можно узнать номер зала и цену
                        if (arraySchedule[k].localName.trim() == 'button') {
                            time.push($(arraySchedule[k]).find('span')[0].innerHTML.split('<')[0]);
                            try {
                                room.push($(arraySchedule[k]).find('div')[0].textContent.trim());
                            } catch (error) {
                                room.push('Цена не определена');
                            }
                        } else {
                            time.push(arraySchedule[k].textContent.trim());
                            room.push('Цена не определена');
                        }
                    }
                }
                cinema.push({ name, time, room });
            }
            films.push({ title, cinema, image, rating });
        });
    });
    if (captcha) {
        redirectCaptcha();
    }
    return films;
}

function redirectCaptcha() {
    chrome.tabs.create({ url: `https://afisha.yandex.ru/kirov/cinema?source=calendar&preset=today` });
}

/**
 * Получаем массив объектов.
 * Пример: [{ url: "http://afisha.gid43.ru/films/view/id/3173/" }]
 */
async function GIDparseFilms() {
    let films = [];
    await $.get(`http://afisha.gid43.ru/rubr/view/id/0/`, (response) => {
        $(response).find('.c-cinema').map((index, el) => {
            let url = $(el).find('a[href]')[0].href;
            films.push({ url: url });
        });
    });
    return films;
}
/**
 * Получаем подробности по каждому фильму.
 * @param {array} urls - массив ссылок на фильмы
 */
async function GIDparseDetails(urls) {
    let films = []; // массив фильмов
    await urls.forEach(async (el, index) => {
        await $.get(`${el.url}`, (response) => {
            let title = $(response).find('.film__title h1')[0].textContent.trim();
            let image = $(response).find('.film__img img')[0].src;
            let cinema = []; // массив кинотеатров
            let scheduleTable = $(response).find('.schedule__table')[0].rows;
            for (let i = 0; i < scheduleTable.length; i++) {
                let name = scheduleTable[i].cells[0].textContent.trim();
                let schedule = scheduleTable[i].cells[1];
                let time = []; // массив расписаний
                let room = []; // массив, в котором указан номер зала и цена билета
                // получаем расписание показов
                for (let j = 0; j < schedule.children.length; j++) {
                    // если фильм еще не начался, то можно узнать номер зала и цену
                    if (schedule.children[j].localName.trim() == 'a') {
                        time.push(schedule.children[j].firstChild.textContent.trim());
                        room.push(schedule.children[j].lastChild.textContent.trim());
                    } else {
                        time.push(schedule.children[j].textContent.trim());
                    }
                }
                cinema.push({ name, time, room });
            }
            films.push({ title, cinema, image });
        });
    });
    return films;
}