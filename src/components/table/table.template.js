// 'A'.charCodeAt()
// String.fromCharCode(65)

const CODES = {
    A: 65,
    Z: 90
}

function toCell() {
    return `
        <div class="cell" contenteditable=""></div>
    `
}

function toColumn(col) {
    return `
        <div class="column">${col}</div>
    `
}

function createRow(index, content) {
    return `
        <div class="row">
            <div class="row-info">${index ? index : ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) { // el ми десь не используем то ми можем його обозначить placeholderom(це обична ситуация когда ми говорим что ми не используем етот входящий параметер але нам нужно його обозначить чтоби получить доступ до индекса)
    return String.fromCharCode(CODES.A + index) // String.fromCharCode приводить из символа в строчку
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn) // учитивая что здесь просто передача параметра ми можем передать функцию как reference

        // .map(el => createCol(el))

        // .map(el => {
        //     return createCol(el)
        // })

        .join('')

    rows.push(createRow(null, cols))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('')

        rows.push(createRow(i + 1, cells))
    }

    return rows.join('')
}

// ['1', '2'].join() - "1,2"
// ['1', '2'].join('') - "12"