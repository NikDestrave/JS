// Глобальные переменные:                            
let FIELD_SIZE_X = 20; //строки
let FIELD_SIZE_Y = 20; //столбцы
let SNAKE_SPEED = 300; // Интервал между перемещениями змейки
let snake = []; // Сама змейка
let direction = 'y+'; // Направление движения змейки
let gameIsRunning = false; // Запущена ли игра
let snake_timer; // Таймер змейки
let food_timer; // Таймер для еды
let bomb_timer; // Таймер для бомбы
let score = 0; // Результат

function init() {
    prepareGameField(); // Генерация поля

    let wrap = document.getElementsByClassName('wrap')[0];
    // Подгоняем размер контейнера под игровое поле
    wrap.style.width = '461px';
    // События кнопок Старт и Новая игра
    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

    // Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection);
}

/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
    // Создаём таблицу
    let game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table ');

    // Генерация ячеек игровой таблицы
    for (let i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        let row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (let j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            let cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}

/**
 * Старт игры
 */
function startGame() {
    gameIsRunning = true;
    respawn(); //создали змейку

    bomb_timer = setInterval(createBomb, 8000);
    snake_timer = setInterval(move, SNAKE_SPEED); //каждые 300мс запускаем функцию move
    setTimeout(createFood, 5000);
}

/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2

    // Respawn змейки из центра
    let start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    let start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

    // Голова змейки
    let snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');
    // Тело змейки
    let snake_tail = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0];
    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');

    snake.push(snake_head);
    snake.push(snake_tail);
}

// function countFood() {
//     let con = document.getElementById("count_id");
//     con.textContent = score;
// }


/**
 * Движение змейки
 */
function move() {
    //console.log('move',direction);
    // Сборка классов
    let snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');

    // Сдвиг головы
    let new_unit;
    let snake_coords = snake_head_classes[1].split('-'); //преобразовали строку в массив
    let coord_y = parseInt(snake_coords[1]);
    let coord_x = parseInt(snake_coords[2]);

    // Определяем новую точку
    if (direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
    } else if (direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
    } else if (direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
    } else if (direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
    }

    // Проверки
    // 1) new_unit не часть змейки
    // 2) Змейка не ушла за границу поля
    if (!isSnakeUnit(new_unit) && new_unit != undefined) {
        // Добавление новой части змейки
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
        snake.push(new_unit);

        // Проверяем, надо ли убрать хвост
        if (!haveFood(new_unit)) {
            // Находим хвост
            let removed = snake.splice(0, 1)[0];
            let classes = removed.getAttribute('class').split(' ');

            // удаляем хвост
            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        }
    } else {
        finishTheGame();
    }
}

/**
 * Проверка на змейку
 * @param unit
 * @returns {boolean}
 */
function isSnakeUnit(unit) { //проверка, что змейка не попала сама в себя в новой ячейке
    let check = false;

    if (snake.includes(unit)) { //если в змейке содержится новая ячейка, значит возникло пересечение
        check = true;
    }
    return check;
}
/**
 * Проверка на бомбу
 * @param bomb
 * @returns {boolean}
 */
function isSnakeUnit(bomb) { //проверка, что змейка не попала сама в себя в новой ячейке
    let check = false;

    if (snake.includes(bomb)) { //если в змейке содержится новая ячейка, значит возникло пересечение
        check = true;
    }
    return check;
}
/**
 * проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {
    let check = false;

    let unit_classes = unit.getAttribute('class').split(' ');

    // Если еда
    if (unit_classes.includes('food-unit')) {
        check = true;
        createFood();

        score++;

        // Вывод результата на экран
        let con = document.getElementById("count_id");
        con.textContent = score * 10;

    }
    else if (unit_classes.includes('bomb-unit')) {
        finishTheGame();
    }
    return check;
}

/**
 * Создание еды
 */
function createFood() {
    let foodCreated = false;

    while (!foodCreated) { //пока еду не создали
        // рандом
        let food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        let food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        let food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
        let food_cell_classes = food_cell.getAttribute('class').split(' ');

        // проверка на змейку
        if (!food_cell_classes.includes('snake-unit')) {
            let classes = '';
            for (let i = 0; i < food_cell_classes.length; i++) {
                classes += food_cell_classes[i] + ' ';
            }

            food_cell.setAttribute('class', classes + 'food-unit');
            foodCreated = true;
        }
    }
}

function createBomb() {
    let bombCreated = false;

    while (!bombCreated) {
        let bomb_x = Math.floor(Math.random() * FIELD_SIZE_X);
        let bomb_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        let bomb_cell = document.getElementsByClassName('cell-' + bomb_y + '-' + bomb_x)[0];
        let bomb_cell_classes = bomb_cell.getAttribute('class').split(' ');

        // проверка на змейку
        if (!bomb_cell_classes.includes('snake-unit')) {
            let classes = '';
            for (let i = 0; i < bomb_cell_classes.length; i++) {
                classes += bomb_cell_classes[i] + ' ';
            }

            bomb_cell.setAttribute('class', classes + 'bomb-unit');
            bombCreated = true;
        }
    }
}

/**
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) {
    console.log(e);

    switch (e.keyCode) {
        case 37: // Клавиша влево
            if (direction != 'x+') direction = 'x-';
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') direction = 'y+';
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') direction = 'x+';
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') direction = 'y-';
            break;
    }
}

/**
 * Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    clearInterval(bomb_timer);
    alert('Игра завершена! Ваш результат: ' + (score * 10).toString() + ' очков.');
}

/**
 * Новая игра
 */
function refreshGame() {
    location.reload();
}

// Инициализация
window.onload = init;