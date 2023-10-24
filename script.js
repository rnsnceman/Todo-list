let inputText = document.querySelector('.text')
let itemsList = document.querySelector('.list-items')
let bottomMenu = document.querySelector('.bottom-menu')
let clear = document.querySelector('.clear-div')
let all = document.querySelector('.all')
let active = document.querySelector('.active')
let completed = document.querySelector('.completed')
let filter = document.querySelectorAll('.filter')
let header = document.querySelector('header')
let headerBG = document.querySelector('.header-bg')
let draggedItem = null;

clear.addEventListener('mouseover', e => {
    let mode = document.querySelector('.mode')
    if (mode.classList.contains('sun')) {
        clear.style.color = 'hsl(234, 39%, 85%)'
    } else { clear.style.color = 'black' }
})

clear.addEventListener('mouseout', e => {
    clear.style.color = ''
})

filter.forEach(e => {
    e.addEventListener('mouseover', e => {
        let mode = document.querySelector('.mode')
        if (mode.classList.contains('sun')) {
            e.currentTarget.style.color = 'hsl(234, 39%, 85%)'
        } else { e.currentTarget.style.color = 'black' }
    })

    e.addEventListener('mouseout', e => {
        e.currentTarget.style.color = ''
    })
})

window.addEventListener('keypress', e => {

    if (e.key === 'Enter' && inputText.value != '') {

        let text = inputText.value
        let num = document.querySelector('.num')
        let listItem = document.createElement('div')
        let mode = document.querySelector('.mode')

        if (mode.classList.contains('sun')) {
            listItem.innerHTML = `<div class="check-div d-circle"><div class="check-inside dark"></div></div><div class="item-text ongoing d-font">${text}</div><div class="x-div"><img src="images/icon-cross.svg" alt="x" class="x"></div>`
        } else {
            listItem.innerHTML = `<div class="check-div l-circle"><div class="check-inside light"></div></div><div class="item-text ongoing l-font">${text}</div><div class="x-div"><img src="images/icon-cross.svg" alt="x" class="x"></div>`
        }

        let itemText = listItem.querySelector('.item-text')
        bottomMenu.insertAdjacentElement("beforebegin", listItem)

        if (mode.classList.contains('sun')) {
            listItem.className = 'list-item item d-bottom'
        } else {
            listItem.className = 'list-item item l-bottom'
        }

        let x = listItem.querySelector('.x')
        let checkDiv = listItem.querySelector('.check-div')
        let checkInside = listItem.querySelector('.check-inside')

        checkDiv.addEventListener('mouseover', e => {
            e.currentTarget.style.background = 'linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))'
        })

        checkDiv.addEventListener('mouseout', e => {
            e.currentTarget.style.background = ''
        })

        num.innerHTML = parseInt(num.textContent) + 1

        listItem.addEventListener('mouseout', e => {
            x.style.visibility = 'hidden'
        })

        listItem.addEventListener('mouseover', e => {
            x.style.visibility = 'visible'
        })

        x.addEventListener('click', e => {
            itemsList.removeChild(listItem)
            if (itemText.classList.contains('ongoing')) {
                num.innerHTML = parseInt(num.textContent) - 1
            }
        })

        listItem.draggable = true;

        listItem.addEventListener('dragstart', e => {
            draggedItem = e.target;
        });

        listItem.addEventListener('dragover', e => {
            e.preventDefault();
        });

        listItem.addEventListener('dragenter', e => {
            e.target.classList.add('drag-over');
        });

        listItem.addEventListener('dragleave', e => {
            e.target.classList.remove('drag-over');
        });

        listItem.addEventListener('drop', e => {
            e.target.classList.remove('drag-over');
            if (draggedItem !== null) {
                const items = Array.from(itemsList.getElementsByClassName('list-item'));
                const currentIndex = items.indexOf(e.target);
                const draggedIndex = items.indexOf(draggedItem);
                if (currentIndex > draggedIndex) {
                    itemsList.insertBefore(draggedItem, e.target.nextSibling);
                } else {
                    itemsList.insertBefore(draggedItem, e.target);
                }
                draggedItem = null;
            }
        });

        function markAsActive() {
            itemText.style.textDecoration = 'none'
            let mode = document.querySelector('.mode')
            itemText.style.color = ''
            itemText.classList.replace('done', 'ongoing')
            checkInside.classList.remove('gradient')
            checkInside.innerHTML = ``
            num.innerHTML = parseInt(num.textContent) + 1
            if (mode.classList.contains('sun')) {
                itemText.classList.remove('ddark')
            } else { itemText.classList.remove('dlight') }
        }

        function markAsCompleted() {
            itemText.style.textDecoration = 'line-through'
            let mode = document.querySelector('.mode')
            itemText.classList.replace('ongoing', 'done')
            checkInside.innerHTML = `<img src="images/icon-check.svg">`
            checkInside.classList.add('gradient')
            num.innerHTML = parseInt(num.textContent) - 1
            if (mode.classList.contains('sun')) {
                itemText.classList.add('ddark')
            } else { itemText.classList.add('dlight') }
        }

        checkDiv.addEventListener('click', e => {
            if (checkInside.innerHTML !== '') {
                markAsActive()
            } else {
                markAsCompleted()
            }
        })

        itemText.addEventListener('click', e => {
            if (itemText.classList.contains('ongoing')) {
                markAsCompleted()
            } else {
                markAsActive()
            }
        })
        inputText.value = ''
    }
})

clear.addEventListener('click', e => {
    let doneItems = document.querySelectorAll('.done')
    doneItems.forEach((e) => {
        itemsList.removeChild(e.parentElement)
    })
})

all.addEventListener('click', e => {
    let doneItems = document.querySelectorAll('.done')
    let activeItems = document.querySelectorAll('.ongoing')
    doneItems.forEach((e) => {
        e.parentElement.style.display = 'flex'
    })
    activeItems.forEach((e) => {
        e.parentElement.style.display = 'flex'
    })

    filter.forEach((el) => {
        if (el.classList.contains('highlighted')) {
            el.classList.remove('highlighted')
        } all.classList.add('highlighted')
    })
})

active.addEventListener('click', e => {
    let activeItems = document.querySelectorAll('.ongoing')
    let doneItems = document.querySelectorAll('.done')
    activeItems.forEach((e) => {
        e.parentElement.style.display = 'flex'
    })
    doneItems.forEach((e) => {
        e.parentElement.style.display = 'none'
    })

    filter.forEach((el) => {
        if (el.classList.contains('highlighted')) {
            el.classList.remove('highlighted')
        } active.classList.add('highlighted')
    })
})

completed.addEventListener('click', e => {
    let doneItems = document.querySelectorAll('.done')
    let activeItems = document.querySelectorAll('.ongoing')
    doneItems.forEach((e) => {
        e.parentElement.style.display = 'flex'
    })
    activeItems.forEach((e) => {
        e.parentElement.style.display = 'none'
    })

    filter.forEach((el) => {
        if (el.classList.contains('highlighted')) {
            el.classList.remove('highlighted')
        } completed.classList.add('highlighted')
    })
})

header.addEventListener('click', e => {

    if (e.target.classList.contains('mode')) {
        if (e.target.classList.contains('moon')) {
            let light = document.querySelectorAll('.light')
            let lFont = document.querySelectorAll('.l-font')
            let lCircle = document.querySelectorAll('.l-circle')
            let lBottom = document.querySelectorAll('.l-bottom')
            let lineThrough = document.querySelectorAll('.done')

            header.innerHTML = `<h1>Todo List</h1><img src="images/icon-sun.svg" class="sun mode">`
            headerBG.setAttribute('src', 'images/bg-desktop-dark.jpg')
            document.body.style.backgroundColor = "hsl(235, 21%, 11%)"
            light.forEach(e => {
                e.classList.replace('light', 'dark')
            })

            lFont.forEach(e => {
                e.classList.replace('l-font', 'd-font')
            })

            lCircle.forEach(e => {
                e.classList.replace('l-circle', 'd-circle')
            })

            lBottom.forEach(e => {
                e.classList.replace('l-bottom', 'd-bottom')
            })

            lineThrough.forEach(e => {
                e.classList.replace('dlight', 'ddark')
            })

        } else if (e.target.classList.contains('sun')) {
            let dark = document.querySelectorAll('.dark')
            let dFont = document.querySelectorAll('.d-font')
            let dCircle = document.querySelectorAll('.d-circle')
            let dBottom = document.querySelectorAll('.d-bottom')
            let lineThrough = document.querySelectorAll('.done')

            header.innerHTML = `<h1>Todo List</h1><img src="images/icon-moon.svg" class="moon mode">`
            headerBG.setAttribute('src', 'images/bg-desktop-light.jpg')
            document.body.style.backgroundColor = "hsl(0, 0%, 98%)"
            dark.forEach(e => {
                e.classList.replace('dark', 'light')
            })

            dFont.forEach(e => {
                e.classList.replace('d-font', 'l-font')
            })

            dCircle.forEach(e => {
                e.classList.replace('d-circle', 'l-circle')
            })

            dBottom.forEach(e => {
                e.classList.replace('d-bottom', 'l-bottom')
            })

            lineThrough.forEach(e => {
                e.classList.replace('ddark', 'dlight')
            })
        }
    }
});