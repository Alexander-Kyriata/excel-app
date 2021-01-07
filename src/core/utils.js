// Pure functions ці функції не взаємодіють з якимись глобальними переменами які знаходяться в глобальному скоупі, вони тільки реагують на вхідні параметри і повертають якийсь результат, вони можуть буть абсолютно ізольовані
export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}
