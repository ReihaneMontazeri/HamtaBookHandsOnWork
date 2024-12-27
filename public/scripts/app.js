const toggleThemeBtns = document.querySelectorAll(".toggle-theme")
const submenuOpenBtn = document.querySelector("#submenuOpenBtn")
const submenu = document.querySelector(".submenu")
const navIconOpenBtn = document.querySelector(".navIcon")
const nav = document.querySelector(".nav")
const xMark = document.querySelector(".xMark")
const overlay = document.querySelector(".overlay")
const cartIcon = document.querySelector(".cartIcon")
const cart = document.querySelector(".cart")
const cartCloseBtn = document.querySelector(".cartCloseBtn")

toggleThemeBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        if (localStorage.theme === "dark") {
            document.documentElement.classList.remove("dark")
            localStorage.theme = "light"
        } else {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        }
    })

})
submenuOpenBtn.addEventListener("click", (e) => {
    e.currentTarget.parentElement.classList.toggle("text-orange-300")
    submenu.classList.toggle("submenu--open")
})

// xMark.addEventListener("click", ()=>{
//     nav.classList.remove("right-0")
//     nav.classList.add("-right-64")
//     overlay.classList.remove("overlay--visible")
// })

function closeNav() {
    nav.classList.remove("right-0")
    nav.classList.add("-right-64")
    overlay.classList.remove("overlay--visible")
}
function closeCart() {
    cart.classList.remove("left-0")
    cart.classList.add("-left-64")
    overlay.classList.remove("overlay--visible")
}

navIconOpenBtn.addEventListener("click", () => {
    nav.classList.remove("-right-64")
    nav.classList.add("right-0")
    overlay.classList.add("overlay--visible")
    overlay.addEventListener("click", closeNav)
})

cartIcon.addEventListener("click", () => {
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



// let searchEl = document.getElementById('searchIcon')
// searchEl.addEventListener('click', () => {
//     searchEl.innerHTML =  `<div style="display:flex; justify-content:space-between; align-items:center; width:5rem;"><input type="text" class="searchInput" placeholder="جستجو کنید"><svg width="32px" class="search-btn" height="32px" viewBox="0 0 24 24" fill="none"
//                         xmlns="http://www.w3.org/2000/svg">
//                         <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//                         <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
//                         <g id="SVGRepo_iconCarrier">
//                             <path fill-rule="evenodd" clip-rule="evenodd"
//                                 d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z"
//                                 fill="#fcd9bd">
//                             </path>
//                         </g>
//                     </svg></div>`

// })