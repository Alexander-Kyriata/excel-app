class Dom {
    constructor(selector) {
        //this.$$listeners = {} // це в нас системні речі
        this.$el = typeof selector === 'string'
            // #app
            ? document.querySelector(selector)
            // event.target
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    on(eventType, callback) {
        //this.$$listeners[eventType] = callback // ми добавляэм новий ключ в обект
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
        //this.$el.removeEventListener(eventType, this.$$listeners[eventType])
    }

    clear() {
        this.html('')
        return this
    }

    // Element
    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        
        return this
    }
}

// це есть один из патернов в javascript
//$('div').html('<h1>test</h1>').clear() // если ми хотим сsделать chain нам в методе html нужно получить щось

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}