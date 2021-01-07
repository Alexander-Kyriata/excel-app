import {$} from '@core/dom'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
    }

    getRoot() {
        //const $root = document.createElement('div')
        //$root.classList.add('excel')
        const $root = $.create('div', 'excel')
        //$root.textContent = "TEST"
        //$root.style.fontSize = '5rem'
        //return $root
        //return this //[object Object]
        //return this.$root //undefined
        this.components = this.components.map(Component => {
            //const $el = document.createElement('div')
            //$el.classList.add(Component.className)
            const $el = $.create('div', Component.className)
            const component = new Component($el)
            // DEBUG
            if (component.name) {
                window['c' + component.name] = component //Window.cFormula
            }
            $el.html(component.toHTML())
            //$root.insertAdjacentHTML('beforeend', component.toHTML())
            $root.append($el)
            return component
        })

        return $root
    }

    render() {
        //console.log(this.$el);
        //this.$el.innerHTML = '<h1>test</h1>'
        //this.$el.insertAdjacentHTML('beforeend', '<h1>test</h1>')
        //const node = document.createElement('h1')
        //node.textContent = 'TEST'
        //this.$el.append(node)
        //this.$el.appendChild(node)
        this.$el.append(this.getRoot())

        this.components.forEach(component => component.init())
    }
}