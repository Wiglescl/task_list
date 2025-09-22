const taskList = document.getElementById('task__list')
const inputElement = document.getElementById('antwort')
const createbtn = document.getElementById('antwort-btn')
const cencelBtn = document.getElementsByClassName('task__item-cencel')
const fertigbtn = document.getElementsByClassName('fertig')
const descriptionBtn = document.getElementsByClassName('description')
const descriptionInput = document.getElementById('input__description')

const taskArray = [{ title: 'Купить рыбу', complited: false, description: 'Чот мне кажется брать не нужно' },
{ title: 'Купить пиво', complited: true, description: 'нормальную такую темку пойти взять' },
{ title: 'Пойти в качалку', complited: false, description: '' }
];




function createTaskIten(taskArr) {
    taskArr.forEach(element => {
        taskList.insertAdjacentHTML('beforeend',
            `
            <li class="window_summ inpClass task__item">
                <div class="task__item-text-container"><p class="${element.complited ? 'text-completed-style' : ''}" id="task__item-text">${element.title}</p><p class="${element.description ? 'description__li' : ''}">${element.description}</p></div>
                    <div class="task__item-btn-container">
                        <button class="task__item-btn fertig">Выполнено</button>
                        <button class="task__item-btn task__item-cencel">Отменить</button>
                        <button class="task__item-btn description">Настроить описание</button>
                    </div>
                </li>
            `)
    })
}

// function forbtnElement() {

//     newArrayBtn.forEach((btn, index) => {
//         btn.addEventListener('click', () => {
//             taskArray[index].complited = true
//             console.log(taskArray)
//         })
//     })

// }


// for(let btn of newArrayBtn) {
//     btn.addEventListener('click', () => {
//         for(let i = 0; i < taskArray.length; i++) {
//             taskArray[i] = true
//             console.log(i)
//         }
//         console.log(taskArray)
//     })
// }


function render() {
    taskList.innerHTML = ''
    createTaskIten(taskArray)
    addEvents()
    descriptionVisible()
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


function descriptionVisible() {
    const descriptionBtnArray = Array.from(descriptionBtn)
    descriptionBtnArray.forEach(btn => {
        let descriptionInputActive = false
        btn.addEventListener('click', () => {
            console.log(btn)
            descriptionInputActive = !descriptionInputActive
            if(descriptionInputActive) {
                descriptionInput.style.display = 'block'
            } else if (!descriptionInputActive) {
                descriptionInput.style.display = 'none'
            }
        })
        // btn.addEventListener('click', () => {
        //     console.log(btn)
        //     descriptionInput.style.display = 'block'
        //     a = false
        // })
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






