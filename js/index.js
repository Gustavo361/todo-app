const completedInput = document.querySelectorAll('.completed-input')
const draggables = document.querySelectorAll('.draggable')
const btnAddTask = document.getElementById('add-task')
const addNewTaskInput = document.getElementById('add-new-task-input')
const newTaskInput = document.querySelectorAll('.new-task-input')
const template = document.getElementById('task-template').content
const containerAllTasks = document.getElementById('all-tasks')
const numberItems = document.getElementById('total-items')
const itemClear = document.getElementById('item-clear-container')
const clearDone = document.getElementById('item-clear-container').querySelector('button')
const viewAll = document.getElementById('view-options').querySelectorAll('button')[0]
const viewActives = document.getElementById('view-options').querySelectorAll('button')[1]
const viewCompleted = document.getElementById('view-options').querySelectorAll('button')[2]
const viewOptionsContainer = document.getElementById('view-options-container')

const btnsDelete = document.getElementsByName('close-outline')
// const btnsDeleteArray = Array.from(btnsDelete)

window.addEventListener('load', () => {
    for (const [key, value] of Object.entries(localStorage)) {
        const clone = template.cloneNode(true)
        clone.querySelector('.new-task-input').value = value
        containerAllTasks.prepend(clone)
        countAllItems()
        // btnsDelete.forEach(btn => {
        //     btn.addEventListener('click', e => {
        //         containerAllTasks.removeChild(e.target.parentNode)
        //         removeKeyByValue(e.target.parentNode.children[1].value)
        //         countAllItems()
        //         deleteTasks()
        //     })
        // })
        deleteTasks()
    }
})

function deleteTasks(){
    btnsDelete.forEach(btn => {
    btn.addEventListener('click', e => {
        containerAllTasks.removeChild(e.target.parentNode)
        removeKeyByValue(e.target.parentNode.children[1].value)
        countAllItems()
    })
})}

function addNewTask() {
    if (addNewTaskInput.value == '' || addNewTaskInput == null) {
        e.preventDefault()
    } else {
        const clone = template.cloneNode(true)
        clone.querySelector('.new-task-input').value = addNewTaskInput.value
        taskToStorage(clone.querySelector('.new-task-input').value)
        containerAllTasks.prepend(clone)
        countAllItems()
        addNewTaskInput.value = null
        // btnsDelete.forEach(btn => {
        //     btn.addEventListener('click', e => {
        //         containerAllTasks.removeChild(e.target.parentNode)
        //         removeKeyByValue(e.target.parentNode.children[1].value)
        //         countAllItems()
        //     })
        // })

        deleteTasks()

        for (let i = 0; i < doneInputs.length; i++) {
            doneInputs[i].addEventListener('click', function() {
                this.classList.toggle('new-task-input light');
            });
        }
    }
}

btnAddTask.addEventListener('click', (e) => {
    addNewTask()
})

addNewTaskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {addNewTask()}
})
// itemClear.style.borderTopLeftRadius = '5px'
//         itemClear.style.borderTopRightRadius = '5px'
function countAllItems() {
    let allItems = containerAllTasks.children.length.toString()
    numberItems.innerText = `${allItems} items left`

    if (allItems == 0) {
        itemClear.style.borderTopLeftRadius = '5px'
        itemClear.style.borderTopRightRadius = '5px'
        console.log('radius')
    } else {
        itemClear.style.borderTopLeftRadius = '0px'
        itemClear.style.borderTopRightRadius = '0px'
    }
}

function taskToStorage(task) {
    let count = localStorage.length
    count++
    let key = 'item-' + count
    localStorage.setItem(key, task)
}

// let madeInputs = document.querySelectorAll('input-made')

// madeInputs.forEach(madeInput => {
//     madeInput.addEventListener('change', () => {
//         console.log('hey')
//     })
// })

// function checkChecked() {
//     const checkbox = document.querySelector('.draggable').querySelector('input[type=checkbox]')
//     draggables.display = 'none'
//     if (checkbox.checked) {
//         console.log('checked')
//     } else {
//         console.log('notchecked')
//     }
// }

// function viewCompletedTask() {
//     const checkboxes = document.querySelectorAll('input[type="checkbox"]')
//     for (const checkbox of checkboxes) {
//         console.log(checkbox.checked)
//     }
// }

function removeKeyByValue(value) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (localStorage.getItem(key) === value) {
        // return key;
        localStorage.removeItem(key);
        }
    }
    return null;
}
// let value = getKeyByValue()


clearDone.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')  
    for (const checkbox of checkboxes) {
        if (checkbox.checked) {
            checkbox.parentNode.remove()
            countAllItems()
            removeKeyByValue(checkbox.parentNode.children[1].value)
        }
    }
})

function activeView(target) {
    viewAll.classList.remove('active')
    viewActives.classList.remove('active')
    viewCompleted.classList.remove('active')

    target.classList.add('active')
}

viewAll.addEventListener('click', (e) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')

    for (const checkbox of checkboxes) {
        const li = checkbox.parentNode

        li.style.display = 'flex'
        // countAllItems()
        console.log(e.currentTarget)
        console.log(e.target)
        let target = e.currentTarget
        activeView(target)
    }
})

viewActives.addEventListener('click', (e) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')

    for (const li of containerAllTasks.querySelectorAll('li')) {
        li.style.display = 'none'
    }

    for (const checkbox of checkboxes) {
        if (checkbox.checked) {
            const li = checkbox.parentNode
            li.style.display = 'none'
        } else {
            const li = checkbox.parentNode
            li.style.display = 'flex'
            // countAllItems()
        }
    }

    let target = e.currentTarget
        activeView(target)
})

viewCompleted.addEventListener('click', (e) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')

    for (const li of containerAllTasks.querySelectorAll('li')) {
        li.style.display = 'none'
    }

    for (const checkbox of checkboxes) {
        if (checkbox.checked) {
            const li = checkbox.parentNode
            li.style.display = 'flex'
            // countAllItems()
        }
    }

    let target = e.currentTarget
    activeView(target)
})

// btnsDeleteArray.forEach(btn => {
//     btn.addEventListener('click', e => {
//         containerAllTasks.removeChild(e.target.parentNode)
//         removeKeyByValue(e.target.parentNode.children[1].value)
//         countAllItems()
//     })
// })

// for (let i = 0; i < btnsDeleteArray.length; i++) {
//     btnsDeleteArray[i].addEventListener('click', function(e) {
//     containerAllTasks.removeChild(e.target.parentNode)
//     removeKeyByValue(e.target.parentNode.children[1].value)
//     countAllItems()
//     });
//     }

// console.log(window.localStorage)

// containerAllTasks.addEventListener("click", function(event) {
//     if (event.target.tagName === "INPUT") {
//       const currentTargetValue = event.target.value;
//       console.log(currentTargetValue);
//     }
//   });

// completedInput





// const btnSunny = document.getElementsByName('sunny')[0]
// // console.log(btnSunny)

// btnSunny.addEventListener('click', () => {
//     console.log('hey')
// })












// draggables.forEach(draggable => {
//     draggable.addEventListener('dragstart', (e) => {
//         e.dataTransfer.setData('text', e.target.innerHTML)
//     })

//     draggable.addEventListener('dragover', (e) => {
//         e.preventDefault()
//     })

//     draggable.addEventListener('drop', (e) => {
//         e.preventDefault()
//         const data = e.dataTransfer.getData('text')
//         e.target.innerHTML = data
//     })
// })



















// window.localStorage.setItem('listOrder', containerAllTasks.innerHTML)

// containerAllTasks.addEventListener('dragstart', (e) => {
//     e.dataTransfer.setData('text/plain', e.target.innerHTML)
// })

// containerAllTasks.addEventListener('dragover', (e) => {
//     e.preventDefault()
// })

// function updateList() {
//     items = document.querySelectorAll('.task-itself')
//     localStorage.setItem('listOrder', list.innerHTML)
//     for (let i = 0; i < items.length; i++) {
//         items[i].innerHTML = localStorage.getItem(i)
//     }
// }

// containerAllTasks.addEventListener('drop', (e) => {
//     let target = e.target;
//     let draggedItem = e.dataTransfer.getData('text/plain')
//     if (target.tagName === 'LI') {
//         target.insertAdjacentHTML('beforeend', draggedItem)
//         target.remove()
//         updateList()
//     }    
// })    





// draggables.forEach(draggable => {
//     draggable.addEventListener('dragstart', () => {
//         draggable.classList.add('dragging')
//     })

//     draggable.addEventListener('dragend', () => {
//         draggable.classList.remove('dragging')
//     })
// })

// containerAllTasks.addEventListener('dragover', (e) => {
//     e.preventDefault()
//     const afterElement = getDragAfterElement(containerAllTasks, e.clientY)
//     const draggable = document.querySelector('.dragging')
//     if (afterElement == null) {
//         containerAllTasks.appendChild(draggable)
//     } else {
//         containerAllTasks.insertBefore(draggable, afterElement)
//     }
// })

// function getDragAfterElement(containerAllTasks, y) {
//     const draggableElements = [...containerAllTasks.querySelectorAll('.draggable:not(.dragging)')]

//     return draggableElements.reduce((closest, child) => {
//         const box = child.getBoundingClientRect()
//         const offset = y - box.top - box.height / 2
//         if (offset < 0 && closest.offset) {
//             return { offset: offset, element: child }
//         } else {
//             return closest
//         }
//     }, { offset: Number.NEGATIVE_INFINITY }).element
// }
// //spread operator
// const items = getItems()
// function getItems() {
//     let value = localStorage.getItem('todo-task') || '[]'
//     return JSON.parse(value)
// }
// getItems()

// function setItem(items) {
//     let itemsJSON = JSON.stringify(items)

//     localStorage.setItem('todo-task', itemsJSON)
// }

// function addItem() {
//     items.unshift({
//         description: '',
//         completed : false
//     })

//     setItem(items)
//     refreshList()
// }

// function refreshList() {
//     containerAllTasks.innerHTML = ''
    
//     for (let item of items) {
//         let itemElement = template.content.cloneNode(true)

//         newTaskInput.value = item.description
//         completedInput.value = item.completed
//         containerAllTasks.appendChild(itemElement)
//     }
// }

// btnAddTaskt.addEventListener('click', () => {
//     addItem()
// })

// refreshList()
// console.log(items)

// const doneInputs = containerAllTasks.querySelector('li').querySelectorAll('input[type="text"]')

const btnSunny = document.getElementsByName('sunny')[0]
const btnMoon = document.getElementsByName('moon')[0]
const body = document.body
const header = document.querySelector('header')
// const newTask = document.getElementById('new-task')
const newTaskContainer = document.getElementById('new-task')
const closeBtns = document.getElementsByClassName('close-task')
const spanClear = document.getElementById('span-clear')
// const totalItems = document.getElementById('total-items')
const spanDragDrop = document.getElementById('span-drag-drop')

function toggleTheme() {
       // completedInput.classList.toggle('light')
       newTaskContainer.classList.toggle('light')
       body.classList.toggle('light');
       header.classList.toggle('light')
       // newTask.classList.toggle('light')
       containerAllTasks.classList.toggle('light')
       itemClear.classList.toggle('light')
       viewOptionsContainer.classList.toggle('light')
       spanClear.classList.toggle('light')
       spanDragDrop.classList.toggle('light')
       // btnsDelete.classList.toggle('close-task md hydrated light')
       // closeBtns.classList.toggle('light')
       // doneInputs.classList.toggle('light')
       // newTaskInput.classList.toggle('new-task-input light')
       // for (doneInput of doneInputs) {
       //     doneInput.classList.toggle('light')
       // }
       btnMoon.classList.toggle('light')
       btnSunny.classList.toggle('light')
}

btnSunny.addEventListener('click', () => {
    toggleTheme()
})

btnMoon.addEventListener('click', () => {
    toggleTheme()
})

for (let i = 0; i < completedInput.length; i++) {
    completedInput[i].addEventListener('click', function() {
        this.classList.toggle('light');
    });
}