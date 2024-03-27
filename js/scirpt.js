const product = {
    crazy: {
        name: "crazy",
        price: 31000,
        amount: 0,
        img: "images/burger_1.png",
        get Summ() {
            return this.price * this.amount
        }
    },
    light: {
        name: "light",
        price: 26000,
        amount: 0,
        img: "images/burger_2.png",
        get Summ() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "cheeseburger",
        price: 29000,
        amount: 0,
        img: "images/burger_3.png",
        get Summ() {
            return this.price * this.amount
        }
    },

    dburger: {
        name: "dburger",
        price: 24000,
        amount: 0,
        img: "images/burger_4.png",
        get Summ() {
            return this.price * this.amount
        }
    },
}

const btns = document.querySelectorAll('.card__shop'),
    basketBox = document.querySelector('.basket__box'),
    shop__item = document.querySelector('.shop__item'),
    basket__total = document.querySelector('.basket__total'),
    card__imgs = document.querySelectorAll('.card__img'),
    header__img = document.querySelector('.header__img'),
    newDiv = document.createElement('div')



btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        const parent = btn.closest('.card'),
            parentId = parent.getAttribute('id')
        product[parentId].amount++
        basketInfo()
    })
})

function basketInfo() {
    const productArr = []
    let totalSum = 0
    for (const key in product) {
        const pk = product[key]
        const productCard = document.querySelector(`#${key}`),
            span = productCard.querySelector('.card__item');

        if (pk.amount) {
            span.classList.add('active')
            span.innerHTML = pk.amount
            productArr.push(pk)
            totalSum = totalSum + pk.Summ
            basket__total.innerHTML = totalSum
        } else {
            span.classList.remove('active')
        }
    }
    basketBox.innerHTML = ''
    for (let i = 0; i < productArr.length; i++) {
        basketBox.innerHTML += basketCard(productArr[i])
    }

    if (productArr.length > 0) {
        shop__item.classList.add('active')
        shop__item.innerHTML = productArr.length
    } else {
        shop__item.classList.remove('active')
        basket__total.innerHTML = 0
    }

}

function basketCard(card) {
    const { amount, price, img, name } = card
    return `<div class="basket__card">
                <img class="basket__img" src="${img}" alt="">
                <div class="basket__info">
                    <h3 class="basket__title">${name}</h3>
                    <p class="basket__price">${price} сум</p>
                </div>
                <div class="basket__btns" id="${name.toLowerCase()}_card">
                    <span class="basket__sym">-</span>
                    <span class="basket__amount">${amount}</span>
                    <span class="basket__sym">+</span>
                </div>
            </div>`
}

window.addEventListener('click', (e) => {
    const btn = e.target
    if (btn.classList.contains('basket__sym')) {
        const parent = btn.closest('.basket__btns'),
            parentId = parent.getAttribute('id').split('_')[0]
        btn.innerHTML == '+' ? product[parentId].amount++ : product[parentId].amount--
        basketInfo()
    }
})

const basket = document.querySelector('.basket'),
    shopBtn = document.querySelector('.shop '),
    basketClose = document.querySelector('.basket__close');
shopBtn.addEventListener('click', () => {
    basket.classList.add('active')
})
basketClose.addEventListener('click', () => {
    basket.classList.remove('active')
})

// const preview = `<div><img src=></div>`

card__imgs.forEach(img => {
    img.style.cursor = 'pointer'
    img.addEventListener('click', (e) => {
        src = img.getAttribute('src')
        header__img.src = src
    })
    img.addEventListener('dblclick', (e) => {
        src = img.getAttribute('src')

        const myDiv = document.createElement('div'),
            body = document.querySelector('body'),
            previewImage = document.createElement('img')

        body.style = 'position:relative;'

        myDiv.setAttribute('class', 'modal')
        previewImage.setAttribute('class', 'preview')
        previewImage.setAttribute('src', src)
        body.appendChild(myDiv)

        const modalStyle = document.querySelector('.modal')
        modalStyle.style = 'width: 100%; height: 100%; background-color:rgba(0, 0, 0, 0.75); position: absolute;' +
            'border-radius: 6px; left: 50%; top: 50%; transform: translate(-50%, -50%); display: flex; justify-content: center;' +
            ' align-items: center;'

        myDiv.appendChild(previewImage)
        const preview = document.querySelector('.preview')
        preview.style = 'border-radius:6px;'
    })
})

window.addEventListener('click', (e) => {
    if (document.querySelector('.modal')) {
        document.querySelector('.modal').remove()
    }
})

