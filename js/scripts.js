const taskList = document.getElementById('task__list')
const inputElement = document.getElementById('antwort')
const createbtn = document.getElementById('antwort-btn')
const cencelBtn = document.getElementsByClassName('task__item-cencel')
const fertigbtn = document.getElementsByClassName('fertig')
const descriptionInput = document.getElementById('input__description')

const taskArray = JSON.parse(localStorage.getItem("taskArray")) || [{ title: 'Купить рыбу', complited: false, description: 'Чот мне кажется брать не нужно' },
{ title: 'Купить пиво', complited: true, description: 'нормальную такую темку пойти взять' },
{ title: 'Пойти в качалку', complited: false, description: '' }
];


function createTaskIten(taskArr) {
    taskArr.forEach(element => {
        taskList.insertAdjacentHTML('beforeend',
            `
            <li class="window_summ inpClass task__item">
                <div class="task__item-text-container"><p class="${element.complited ? 'text-completed-style' : ''}" id="task__item-text">${element.title}</p><p class="${element.description ? 'description__li' : ''}">${element.description || ''}</p></div>
                    <div class="task__item-btn-container">
                        <button class="task__item-btn fertig">Выполнено</button>
                        <button class="task__item-btn description">Настроить описание</button>
                        <button class="task__item-btn task__item-cencel">X</button>
                    </div>
                </li>
            `)
    })
}

function saveTasks() {
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
}

function render() {
    taskList.innerHTML = ''
    createTaskIten(taskArray)
    addEvents()
    descriptionVisible()
    saveTasks()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function addEvents() {
    const newArrayBtn = Array.from(fertigbtn)
    newArrayBtn.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (taskArray[index].complited == true) {
                taskArray[index].complited = false
                console.log(taskArray[index])
            } else if (taskArray[index].complited == false) {
                taskArray[index].complited = true
                console.log(taskArray[index])
            } else {
                console.log('gg')
            }
            render()
        })
    })
    const newArrayCencelBtn = Array.from(cencelBtn)
    newArrayCencelBtn.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            const taskElement = btn.parentElement.parentElement;
            taskElement.className = 'rr'
            await sleep(500);
            taskArray.splice(index, 1)
            render()
        })
    })
}

let currentTaskIndex = null

function descriptionVisible() {
    const descriptionBtnArray = document.querySelectorAll('.description')
    descriptionBtnArray.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            console.log(btn)
            if (currentTaskIndex === index) {
                descriptionInput.style.display = 'none'
                taskArray[index].description = descriptionInput.value
                currentTaskIndex = null
                render()
            } else {
                descriptionInput.style.display = 'block'
                descriptionInput.value = taskArray[index].description || ''
                currentTaskIndex = index
            }
        })
    })
}
render()


createbtn.addEventListener('click', () => {
    if (inputElement.value != '') {
        const newNote = {
            title: inputElement.value,
            complited: false
        }
        taskArray.unshift(newNote)
        render()
        console.log(taskList)
    }
    console.log(taskArray)
    inputElement.value = ''
})

localStorage.setItem("taskArray", JSON.stringify(taskArray))




