const body = document.querySelector('body')

//Get background dark and light color
const extractRGB = (color) => {
    var colorObj = {}
    colorObj.r = tmp >> 16
    colorObj.g = tmp >> 8 & 0xff
    colorObj.b = tmp & 0xff
    return colorObj
}

var tmp = getComputedStyle(body).getPropertyValue('--background-color')
tmp = parseHex(tmp)
var dark = extractRGB(tmp)

var tmp = getComputedStyle(body).getPropertyValue('--light-background-color')
tmp = parseHex(tmp)
var light = extractRGB(tmp)

updateBackground()

function updateBackground() {
    var y = (window.scrollX || window.pageYOffset)
    var height = window.screen.height
    var min = y > height / 4 ? 20 : 1
    var t = Math.max(min, Math.min(100, y / (height/2 / 100))) / 100;
    console.log(t)
    var lerp = (a, b, c) => a + ((b - a) * c);

    var [r, g, b] = [
        lerp(dark.r, light.r, t), 
        lerp(dark.g, light.g, t),
        lerp(dark.b, light.b, t)
    ]
    body.style.background = 'rgb(' + r + ', ' + g + ', ' + b + ')'
  
    requestAnimationFrame(updateBackground)
}

function parseHex(hex) {
    if (hex.startsWith('#')) hex = hex.substring(1, hex.length)

    var total = 0
    for (let i = 0; i < hex.length; i++) {
        const char = hex.charAt(i).toLowerCase()
        var value = 0

        if (char.match('[0-9]')) {
            value = parseInt(char)
        } else if (char.match('[a-f]')) {
            value = 'abcdef'.indexOf(char) + 10
        }

        total <<= 4
        total |= value
    }

    return total
}

function preview() {
    const inputA = document.querySelector('#inputA')
    const inputB = document.querySelector('#inputB')
    const inputC = document.querySelector('#inputC')
    const previewA = document.querySelector('#previewA')
    const previewB = document.querySelector('#previewB')
    const previewDelta = document.querySelector('#previewDelta')

    const a = parseInt(emptyZero(inputA.value))
    const b = parseInt(emptyZero(inputB.value))
    const c = parseInt(emptyZero(inputC.value))

    const delta = (b * b) - (4 * a * c)
    const x1 = (-b + Math.sqrt(delta)) / (2 * a)
    const x2 = (-b - Math.sqrt(delta)) / (2 * a)

    previewA.innerHTML = emptyZero(inputA.value)
    previewB.innerHTML = -emptyZero(inputB.value)
    previewDelta.innerHTML = emptyZero(delta)

    if (delta < 0 || (isNaN(x1) && isNaN(x2))) {
        result.innerHTML = ' = <span class="error">{∅}</span>'
    } else {
        if (x1 == x2) {
            result.innerHTML = ' = ' + x1
        } else {
            result.innerHTML = ' = {' + x1 + ', ' + x2 + '}'
        }
    }
}

function emptyZero(value) {
    if (value == '') {
        return 0
    }
    return value
}
