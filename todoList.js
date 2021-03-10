// 取得所有需要的 document 項目
let newItem = document.getElementById('newTodoItem');
let addNewItemBtn = document.getElementById('addTodoItem');
let itemTotal = document.getElementById('itemTotal');
let doneItemTotal = document.getElementById('completeTotal');
let undoneItemTotal = document.getElementById('undoneTotal');
let table = document.querySelector('.todoListTable');

let itemTotalNumber = 0;
let doneItemTotalNumber = 0;
let undoneItemTotalNumber = 0;

// 改變總和的函數
function subTotal (itemNumber, doneNumber, undoneNumber) {
    itemTotal.innerHTML = '全部' + itemTotalNumber;
    doneItemTotal.innerHTML = '完成' + doneItemTotalNumber;
    undoneItemTotal.innerHTML = '未完成' + undoneItemTotalNumber;
}

// 舊的新增 todo list 的函數
// function addList () {
//     let item = newItem.value;
//     newItem.value = '';
//     console.log('加入新的項目',item);

//     if (item === '') { // 擋未輸入的部分
//         alert('未輸入文字');
//     } else {
//         let todoList = document.createElement('div');
//         let checkBox = document.createElement('input');
//         let todoText = document.createElement('div');
//         let reviseText = document.createElement('input');
//         let reWriteBtn = document.createElement('button');
//         let deletBtn = document.createElement('button');

//         // 組合一項新的項目
//         todoList.classList.add('todoList');
//         table.appendChild(todoList);

//         checkBox.classList.add('checkbox');
//         checkBox.setAttribute('type','checkBox');
//         todoList.appendChild(checkBox);

//         todoText.classList.add('textItem');
//         todoText.innerText = item;
//         todoList.appendChild(todoText);

//         reviseText.classList.add('reviseText');
//         reviseText.setAttribute('value', item);
//         todoList.appendChild(reviseText);
//         reviseText.style.display = 'none';

//         reWriteBtn.classList.add('reWriteBtn');
//         reWriteBtn.innerText = '編輯';
//         todoList.appendChild(reWriteBtn);

//         deletBtn.classList.add('deleteBtn');
//         deletBtn.innerText = '刪除';
//         todoList.appendChild(deletBtn);

//         itemTotalNumber += 1;
//         undoneItemTotalNumber +=1;
//         // itemTotal.innerHTML = '全部' + itemTotalNumber;
//         subTotal(itemTotalNumber, doneItemTotalNumber, undoneItemTotalNumber);

//         // 按鈕的功能
//         checkBox.addEventListener('click',() => {
//             if (checkBox.checked) {
//                 undoneItemTotalNumber -= 1;
//                 doneItemTotalNumber += 1;
//             } else {
//                 undoneItemTotalNumber += 1;
//                 doneItemTotalNumber -= 1;
//             }

//             subTotal(itemTotalNumber, doneItemTotalNumber, undoneItemTotalNumber);
//         });

//         reWriteBtn.addEventListener('click',() => {

//             if (reWriteBtn.innerText === '編輯') {
//                 todoText.style.display = 'none';
//                 reviseText.style.display = 'block';
//                 reWriteBtn.innerText = '完成';
//             } else {
//                 let text = reviseText.value;
//                 todoText.innerText = text;
//                 todoText.style.display = 'block';
//                 reviseText.style.display = 'none';
//                 reWriteBtn.innerText = '編輯';
//             }
            
//             console.log('更改 / 完成')
            
//         });

//         deletBtn.addEventListener('click',() => { //是不是要有提示窗??
//             table.removeChild(todoList);
//             itemTotalNumber -= 1;
//             if (checkBox.checked) {
//                 doneItemTotalNumber -= 1;
//             } else {
//                 undoneItemTotalNumber -= 1;
//             }

//             subTotal(itemTotalNumber, doneItemTotalNumber, undoneItemTotalNumber);
//         });

//     }
// }

class todoList { // todo list class
    constructor (tableId) {
        this.table = document.querySelector(tableId);
        this.todoList = document.createElement('div');
        this.checkBox = document.createElement('input');
        this.todoText = document.createElement('div');
        this.reviseText = document.createElement('input');
        this.reWriteBtn = document.createElement('button');
        this.deletBtn = document.createElement('button');
        this.reviseSwitch = '';
    }

    created (content) {
        this.todoList.classList.add('todoList');
        this.todoList.classList.add('undone');
        this.table.appendChild(this.todoList);

        this.checkBox.classList.add('checkbox');
        this.checkBox.setAttribute('type','checkBox');
        this.todoList.appendChild(this.checkBox);

        this.todoText.classList.add('textItem');
        this.todoText.innerText = content;
        this.todoList.appendChild(this.todoText);

        this.reviseText.classList.add('reviseText');
        this.reviseText.setAttribute('value', content);
        this.todoList.appendChild(this.reviseText);
        this.reviseText.style.display = 'none';

        this.reWriteBtn.classList.add('reWriteBtn');
        this.reWriteBtn.innerText = '編輯';
        this.todoList.appendChild(this.reWriteBtn);

        this.deletBtn.classList.add('deleteBtn');
        this.deletBtn.innerText = '刪除';
        this.todoList.appendChild(this.deletBtn);

        itemTotalNumber += 1;
        undoneItemTotalNumber +=1;
        subTotal(itemTotalNumber, doneItemTotalNumber, undoneItemTotalNumber);

        // 按鈕的功能
        this.checkBox.addEventListener('click',() => {
            this.checkFunction();
        });

        this.reWriteBtn.addEventListener('click',() => {
            this.reWriteFunction();
        });

        this.deletBtn.addEventListener('click',() => { //是不是要有提示窗??
            this.deleteFunction();
        });

        this.reviseText.addEventListener('blur',() => {
            if (this.reviseSwitch === '') {
                this.reWriteFunction();

            }
        });

        this.reviseText.addEventListener('keyup',(e) => {
            if( e.keyCode === 13 ){
                this.reviseSwitch = 'keyup';
                this.reWriteFunction();
            }
        }, false);
    }

    checkFunction () {
        if (this.checkBox.checked) {
            undoneItemTotalNumber -= 1;
            doneItemTotalNumber += 1;

            this.todoList.classList.remove('undone');
            this.todoList.classList.add('done');
            this.todoText.classList.add('complete');

        } else {
            undoneItemTotalNumber += 1;
            doneItemTotalNumber -= 1;
            this.todoList.classList.remove('done');
            this.todoList.classList.add('undone');
            this.todoText.classList.remove('complete');

        }

        subTotal(itemTotalNumber, doneItemTotalNumber, undoneItemTotalNumber);
    }

    reWriteFunction () {

        if (this.reWriteBtn.innerText === '編輯') {
            this.reviseSwitch = '';
            this.todoText.style.display = 'none';
            this.reviseText.style.display = 'block';
            this.reWriteBtn.innerText = '完成';
        } else {
            let text = this.reviseText.value;
            this.todoText.innerText = text;
            this.todoText.style.display = 'block';
            this.reviseText.style.display = 'none';
            this.reWriteBtn.innerText = '編輯';
        }
        
        // console.log('更改 / 完成');
    }

    deleteFunction () {
        this.table.removeChild(this.todoList);
            itemTotalNumber -= 1;
            if (this.checkBox.checked) {
                doneItemTotalNumber -= 1;
            } else {
                undoneItemTotalNumber -= 1;
            }

            subTotal(itemTotalNumber, doneItemTotalNumber, undoneItemTotalNumber);
    }
}


addNewItemBtn.innerHTML = '新增';
subTotal(itemTotalNumber, doneItemTotalNumber, undoneItemTotalNumber);

// 監聽整個頁面的鍵盤事件
// document.onkeydown = function (e) {
    // if (e.keyCode === 13) { // push enter
    //     addList();
    //     console.log();
    // }

// }


// 舊的方式
// addNewItemBtn.addEventListener('click', () => addList());

addNewItemBtn.addEventListener('click', () => {
    let newItemValue = newItem.value;
    if (newItemValue !== '') {
        new todoList('.todoListTable').created(newItemValue);
        newItem.value = '';
    }
});

newItem.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {;
        if (newItem.value === '') {
            alert('未輸入文字');
        } else {
            list = new todoList('.todoListTable').created(newItem.value);
            newItem.value = '';
        }
    }
}, false);

itemTotal.addEventListener('click', () => {
    let list = document.getElementsByClassName('todoList');
    for (let ii = 0, ll = list.length; ii < ll; ii++) {
        list[ii].classList.remove('clickUndown');
        list[ii].classList.remove('clickDown');
        
    }

})

doneItemTotal.addEventListener('click', () => {
    let list = document.getElementsByClassName('todoList');
    for (let ii = 0, ll = list.length; ii < ll; ii++) {
        list[ii].classList.remove('clickDown');
        list[ii].classList.add('clickUndown');
        
    }

})

undoneItemTotal.addEventListener('click', () => {
    let list = document.getElementsByClassName('todoList');
    for (let ii = 0, ll = list.length; ii < ll; ii++) {
        list[ii].classList.remove('clickUndown');
        list[ii].classList.add('clickDown');
    }
})