let arrow = document.getElementById('arrow');
let sidebar = document.getElementById('sidebar');
let cover = document.getElementById('cover');
let container = document.getElementById('container');
let userInfo = document.getElementById('userInfo');
let textSideBar = document.getElementsByClassName('sidebar-text-item')
let social = document.getElementById('social')
let email = document.getElementById('email')
let password = document.getElementById('password');
let submitBtn = document.getElementById('submitBtn')

let handelSideBar = () => {
    if (sidebar.classList.contains('w-[250px]')) {
        handelOpenSideBar()
    }
    else {
        handelCloseSideBar()
    }
}


let handelOpenSideBar = () => {
    sidebar.classList.remove('w-[250px]')
    sidebar.classList.add('w-[90px]')

    container.classList.remove('lg:w-[calc(100%-250px)]')
    container.classList.add('lg:w-[calc(100%-90px)]')

    userInfo.classList.remove('flex')
    userInfo.classList.add('hidden')

    social.classList.remove('flex')
    social.classList.add('hidden')

    arrow.classList.remove('rotate-180')

    for (let i of textSideBar) {
        i.classList.add('hidden')
    }
}


let handelCloseSideBar = () => {
    sidebar.classList.add('w-[250px]')
    sidebar.classList.remove('w-[90px]')

    container.classList.add('lg:w-[calc(100%-250px)]')
    container.classList.remove('lg:w-[calc(100%-90px)]')

    arrow.classList.add('rotate-180')

    setTimeout(() => {
        userInfo.classList.add('flex')
        userInfo.classList.remove('hidden')

        social.classList.add('flex')
        social.classList.remove('hidden')

        for (let i of textSideBar) {
            i.classList.remove('hidden')
        }
    }, 500);
}


let handelMobileSideBar = () => {
    if (sidebar.classList.contains('right-[-300px]')) {
        sidebar.classList.remove('right-[-300px]')
        sidebar.classList.add('right-0')

        cover.classList.remove('right-full')
        cover.classList.add('right-0')

        if (sidebar.classList.contains('w-[90px]')) {
            handelCloseSideBar()
        }
    }
    else {
        sidebar.classList.add('right-[-300px]')
        sidebar.classList.remove('right-0')

        cover.classList.add('right-full')
        cover.classList.remove('right-0')
    }
}

let handelForm = (type) => {
    let btnLogin = document.getElementById('btnLogin')
    let btnRegister = document.getElementById('btnRegister')
    let coverRegister = document.getElementById('coverRegister')
    let coverLogin = document.getElementById('coverLogin')
    let registerForm = document.getElementById('registerForm')
    let loginForm = document.getElementById('loginForm')

    if (type == 'login') {
        btnLogin.classList.add('bg-orange-300')
        btnLogin.classList.add('text-white')
        btnRegister.classList.remove('bg-orange-300')
        btnRegister.classList.remove('text-white')

        coverLogin.classList.add('z-[1]')
        coverLogin.classList.add('top-0')
        coverLogin.classList.add('opacity-100')
        coverLogin.classList.remove('z-[-1]')
        coverLogin.classList.remove('top-[-20px]')
        coverLogin.classList.remove('opacity-0')

        coverRegister.classList.remove('z-[1]')
        coverRegister.classList.remove('top-0')
        coverRegister.classList.remove('opacity-100')
        coverRegister.classList.add('z-[-1]')
        coverRegister.classList.add('top-[-20px]')
        coverRegister.classList.add('opacity-0')

        loginForm.classList.add('flex')
        loginForm.classList.remove('hidden')
        registerForm.classList.add('hidden')
        registerForm.classList.remove('flex')
    }
    else {
        btnRegister.classList.add('bg-orange-300')
        btnLogin.classList.remove('text-white')
        btnLogin.classList.remove('bg-orange-300')
        btnRegister.classList.add('text-white')

        coverRegister.classList.add('z-[1]')
        coverRegister.classList.add('top-0')
        coverRegister.classList.add('opacity-100')
        coverRegister.classList.remove('z-[-1]')
        coverRegister.classList.remove('top-[-20px]')
        coverRegister.classList.remove('opacity-0')

        coverLogin.classList.remove('z-[1]')
        coverLogin.classList.remove('top-0')
        coverLogin.classList.remove('opacity-100')
        coverLogin.classList.add('z-[-1]')
        coverLogin.classList.add('top-[-20px]')
        coverLogin.classList.add('opacity-0')

        registerForm.classList.add('flex')
        registerForm.classList.remove('hidden')
        loginForm.classList.add('hidden')
        loginForm.classList.remove('flex')
    }
}

submitBtn.addEventListener('click',function(){
    if(email.value == 'rmontazeri82@gmail.com' && password.value == '123456'){
        submitBtn.setAttribute('href', '/adminPanel.html')
    }
})
