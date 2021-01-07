import {capitalize} from '@core/utils'

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root provided for DomListener!')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDomListeners() {
        // console.log(this.listeners, this.$root);
        this.listeners.forEach(listener => {
            // ми здесь обращаемся к ключовому слово this, несмотря на то что ми знаходимся у callback функции, так делать можно тому що стрелочная функция не создает своего контекста, бо если ми здесь напишем слово function замисть стрлочной функии, то ключевое слово this в нас работать не будет и $root не будет найден
            // Тоже самое что и addEventListener
            const method = getMethodName(listener)
            const name = this.name || ''
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${name} Component`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }
    
    removeDomListeners() {
        //console.log('removeDom');
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }   
}

// input => onInput
function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}

