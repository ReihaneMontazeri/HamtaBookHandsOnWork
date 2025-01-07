const toggleThemeBtns = document.querySelectorAll(".toggle-theme");
const submenuOpenBtn = document.querySelector("#submenuOpenBtn");
const submenu = document.querySelector(".submenu");
const navIconOpenBtn = document.querySelector(".navIcon")
const nav = document.querySelector(".nav");
const xMark = document.querySelector(".xMark");
const overlay = document.querySelector(".overlay");
const cartIcon = document.querySelector(".cartIcon");
const cart = document.querySelector(".cart");
const cartCloseBtn = document.querySelector(".cartCloseBtn");

toggleThemeBtns.forEach(btn => {
    btn.addEventListener("click", function(){
        if (localStorage.theme === "dark"){
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme" , "dark");
        }
    })
        
})
submenuOpenBtn.addEventListener("click", (e)=>{
    e.currentTarget.parentElement.classList.toggle("text-orange-300")
    submenu.classList.toggle("submenu--open");
})

// xMark.addEventListener("click", ()=>{
//     nav.classList.remove("right-0")
//     nav.classList.add("-right-64")
//     overlay.classList.remove("overlay--visible")
// })

function closeNav() {
    nav.classList.remove("right-0");
    nav.classList.add("-right-64");
    overlay.classList.remove("overlay--visible");
}
function closeCart() {
    cart.classList.remove("left-0");
    cart.classList.add("-left-64");
    overlay.classList.remove("overlay--visible");
}

navIconOpenBtn.addEventListener("click", ()=> {
    nav.classList.remove("-right-64")
    nav.classList.add("right-0")
    overlay.classList.add("overlay--visible")
    overlay.addEventListener("click", closeNav)
})

cartIcon.addEventListener("click", ()=> {
    cart.classList.remove("-left-64")
    cart.classList.add("left-0")
    overlay.classList.add("overlay--visible")
    overlay.addEventListener("click", closeCart)
})
// xMark.addEventListener("click", ()=>{
//     cart.classList.remove("left-0")
//     cart.classList.add("-left-64")
//     overlay.classList.remove("overlay--visible")
// })




xMark.addEventListener('click', closeNav)
cartCloseBtn.addEventListener('click', closeCart)


const listItems = [
    { id: 1, name: 'کیسه استخوان', family: 'Saeedi Rad' },
    { id: 2, name: 'Amir', family: 'Zehtab' },
    { id: 3, name: 'Qadir', family: 'Yolme' },
    { id: 4, name: 'Babak', family: 'Mohammadi' },
    { id: 5, name: 'Hasan', family: 'Ghahreman Zadeh' },

    { id: 6, name: 'Amin', family: 'Saeedi Rad' },
    { id: 7, name: 'Amir', family: 'Zehtab' },
    { id: 8, name: 'Qadir', family: 'Yolme' },
    { id: 9, name: 'Babak', family: 'Mohammadi' },
    { id: 10, name: 'Hasan', family: 'Ghahreman Zadeh' },

    { id: 11, name: 'Saeed', family: 'Ehsani' },
    { id: 12, name: 'Siamak', family: 'Modiri' },
    { id: 13, name: 'Mohsen', family: 'Ansari' },
    { id: 14, name: 'Mehran', family: 'Ali Pour' },
    { id: 15, name: 'Amir Hossein', family: 'Mahtabi' },

    { id: 16, name: 'Hossein', family: 'Amino' },
    { id: 17, name: 'Melika', family: 'Ehsani' },
    { id: 18, name: 'Qadir', family: 'Yolme' },
    { id: 19, name: 'Fatemeh', family: 'Alilou' },
    { id: 20, name: 'Ehsan', family: 'Tayyebi' },

    { id: 21, name: 'Zahra', family: 'Gholami' },
    { id: 22, name: 'Matin', family: 'Sahebi' },
    
];

let userListContainer = document.querySelector('#rowCounts')
let paginationContainer = document.querySelector('#pagination')

let currentPage = 1
let rowsCount = 5

function displayUesrsList (allUesrsArray, usersContainer, rowsCount, currentPage) {
    usersContainer.innerHTML = ''

    let endIndex = rowsCount * currentPage
    let startIndex = endIndex - rowsCount

    let paginatedUsers = allUesrsArray.slice(startIndex, endIndex)

    paginatedUsers.forEach(function (user) {
        let userElement = document.createElement('div')
        userElement.classList.add('item')
        userElement.innerHTML = user.name + ' ' + user.family

        usersContainer.appendChild(userElement)
    })

}

function setupPagination (allUesrsArray, pagesContainer, rowsCount) {
    // Codes

    pagesContainer.innerHTML = ''

    let pageCount = Math.ceil(allUesrsArray.length / rowsCount)

    for (let i = 1 ; i < pageCount + 1 ; i++) {
        let btn = paginationButtonGenerator(i, allUesrsArray)
        pagesContainer.appendChild(btn)
    }

}

function paginationButtonGenerator (page, allUesrsArray) {
    let button = document.createElement('button')
    button.innerHTML = page

    if (page === currentPage) {
        button.classList.add('active')
    }

    button.addEventListener('click', function () {
        currentPage = page
        displayUesrsList(allUesrsArray, userListContainer, rowsCount, currentPage)

        let prevPage = document.querySelector('button.active')
        prevPage.classList.remove('active')

        button.classList.add('active')


    })

    return button
}

displayUesrsList(listItems, userListContainer, rowsCount, currentPage)
setupPagination(listItems, paginationContainer, rowsCount)