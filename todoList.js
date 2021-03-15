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
        this.reviseText.setAttribute('placeholder', '刪除此代辦事項');
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

        this.deletBtn.addEventListener('click',() => { 
            if (confirm(`是否確認刪除「${this.todoText.innerText}」?`)) {
                this.deleteFunction();
            }
        });

        this.reviseText.addEventListener('blur',() => {
            if (this.reviseSwitch === '') {

                if (this.reviseText.value.length < 1) {
                    this.deleteFunction();
                } else {
                    this.reWriteFunction();
                }

            }
        });

        this.reviseText.addEventListener('keyup',(e) => {
            if( e.keyCode === 13 ){
                this.reviseSwitch = 'keyup';

                if (this.reviseText.value.length < 1) {
                    this.deleteFunction();
                } else {
                    this.reWriteFunction();
                }
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

newItem.setAttribute('placeholder', '新增代辦事項');
addNewItemBtn.innerHTML = '新增';
subTotal(itemTotalNumber, doneItemTotalNumber, undoneItemTotalNumber);


addNewItemBtn.addEventListener('click', () => {
    let newItemValue = newItem.value;
    if (newItemValue !== '') {
        new todoList('.todoListTable').created(newItemValue);
        newItem.value = '';
    } else {
        alert('未輸入文字');
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


// tester
// for (let ii = 0; ii < 10; ii++) {
//     new todoList('.todoListTable').created('123_' + ii);
// }