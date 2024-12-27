document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');

    let isAvailable = true;
    let iconElement = document.getElementById("check-icon");
    let textElement = document.getElementById("availability-text");

    if (iconElement && textElement) {
        if (isAvailable) {
            iconElement.style.backgroundImage = "url('/final-pageDetails/images-detailsBook/check.svg')";
            iconElement.style.margin = '5px 0 5px 5px';
            console.log("URL for available icon:", iconElement.style.backgroundImage);
            textElement.textContent = 'موجودی';
            textElement.style.color = '#10b091';
        } else {
            iconElement.style.backgroundImage = "url('/final-pageDetails/images-detailsBook/close.svg')";
            iconElement.style.margin = '5px 0 5px 5px';
            console.log("URL for unavailable icon:", iconElement.style.backgroundImage);
            textElement.textContent = 'ناموجود';
            textElement.style.color = '#f64749';
        }
    } else {
        console.error("یکی از عناصر یافت نشد.");
    }
});
document.addEventListener('DOMContentLoaded', function () {
    let incrementDiv = document.querySelector('.nextBtn');
    let decrementDiv = document.querySelector('.prevBtn');
    let quantityInput = document.getElementById('quantity-input');
    let quantityContainer = document.querySelector('.quantity-container')
    incrementDiv.addEventListener('click', function () {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    decrementDiv.addEventListener('click', function () {
        if (quantityInput.value > 0) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });
    incrementDiv.addEventListener('mouseenter', function () {
        quantityContainer.style.border = '1.5px solid #747474';

    });
    incrementDiv.addEventListener('mouseleave', function () {
        quantityContainer.style.border = '1.5px solid #ddd';
    });
    decrementDiv.addEventListener('mouseenter', function () {
        quantityContainer.style.border = '1.5px solid #747474';
    });
    decrementDiv.addEventListener('mouseleave', function () {
        quantityContainer.style.border = '1.5px solid #ddd';
    });

    //rating
    let stars = document.querySelectorAll('.fas');
    let ratingValue = document.querySelector('.rating-value');
    let rating = 0;
    stars.forEach(star => {
        star.addEventListener('mouseenter', function () {
            let rect = this.getBoundingClientRect();
            let offsetX = event.clientX - rect.left;
            let width = rect.width;
            let value = (offsetX / width) + parseFloat(this.getAttribute('data-value')) - 1;
            highlightStar(value);
        });
    
        star.addEventListener('click', function () {
            let rect = this.getBoundingClientRect();
            let offsetX = event.clientX - rect.left;
            let width = rect.width;
            rating = (offsetX / width) + parseFloat(this.getAttribute('data-value')) - 1;
            rating = Math.round(rating * 2) / 2;
            ratingValue.textContent = rating.toFixed(1);
            highlightStar(rating);
            console.log('Rating set to:', rating);
        });

    });
    function highlightStar(value) {
        stars.forEach(star => {
            let starValue = parseFloat(star.getAttribute('data-value'));
            let halfValue = starValue - 0.5;
            if (value >= starValue) {
                star.classList.add('active');
                star.classList.remove('half');
            } else if (value >= halfValue) {
                star.classList.add('half');
                star.classList.remove('active');
            } else {
                star.classList.remove('active', 'half');
            }
        });
    }

    //like with heart
    let heartIcon = document.querySelector(".like-button .heart-icon");
    let likesAmountLabel = document.querySelector(".like-button .likes-amount");

    let likesAmount = 0;

    heartIcon.addEventListener("click", () => {
        heartIcon.classList.toggle("liked");
        if (heartIcon.classList.contains("liked")) {
            likesAmount++;
        } else {
            likesAmount--;
        }

        likesAmountLabel.innerHTML = likesAmount;
    });

    //comment section
    let USERID = {
        name: null,
        identity: null,
        image: null,
        message: null,
        date: null
    }

    let userComment = document.querySelector(".usercomment");
    let publishBtn = document.querySelector("#publish");
    let comments = document.querySelector(".comments");
    let userName = document.querySelector(".user");
    
    userComment.addEventListener("input", e => {
        if (!userComment.value) {
            publishBtn.setAttribute("disabled", "disabled");
            publishBtn.classList.remove("abled");
        } else {
            publishBtn.removeAttribute("disabled");
            publishBtn.classList.add("abled");
        }
    });
    function addPost() {
        if (!userComment.value) return;
        USERID.name = userName.value;
        if (USERID.name === "") {
            USERID.identity = false;
            alert("دوست عزیز برای ثبت نظر باید عضو سایت  شده باشی.");
            return; // جلوگیری از ادامه اجرای تابع
        } else {
            USERID.identity = true;
            USERID.image = "images-detailsBook/user.png";
        }
    
        USERID.message = userComment.value;
        USERID.date = new Date().toLocaleString();
        let published =
            `<div class="parents" style="position:relative;">
                <img src="${USERID.image}">
                <div style="width:100%; display:flex; flex-direction:column;">
                    <div class="userCommInf">
                        <p style="margin-top:10px; margin-right:10px;">${USERID.name}</p>
                        <div style="margin:20px 0 20px; width:100%; font-size:0.6rem; color:333;">${USERID.message}</div>
                    </div>
                    <div class="dateComm" style="display: flex; justify-content: flex-end;">
                        <span class="date">${USERID.date}</span>
                    </div>
                </div>
            </div>`;
        // <div style="position:absolute; left:10px;" class="engagements"><img src="like.png" id="like"><img src="share.png" alt=""></div>
        
        comments.innerHTML += published;
        userComment.value = "";
        publishBtn.classList.remove("abled");
        let commentsNum = document.querySelectorAll(".parents").length;
        document.getElementById("comment").textContent = commentsNum;
    }
    
    publishBtn.addEventListener("click", addPost);
    

    let commentIcon = document.getElementById('scrollToComment')
    commentIcon.addEventListener('click', function () {
        let commentSectin = document.getElementById('product-comment')
        commentSectin.scrollIntoView({ behavior: "smooth", block: 'center' })
    })
  
   //dark/light mode
    let themeSwitch = document.getElementById('theme-switch')
    let cardElement = document.querySelector('.card');
    let body = document.querySelector('body')


    let theme = localStorage.getItem('theme');

    let enableDarkmode = () => {
        cardElement.classList.add('darkmode');
        body.style.backgroundColor = '#27272a'
        document.getElementById('moonElem').classList.remove('inline-block')
        document.getElementById('moonElem').classList.add('hidden')
    
        document.getElementById('sunElem').classList.remove('hidden')
        document.getElementById('sunElem').classList.add('inline-block')

        localStorage.setItem('theme', 'dark');
    };

    let disableDarkmode = () => {
        cardElement.classList.remove('darkmode');
        body.style.backgroundColor = '#fff'
        document.getElementById('moonElem').classList.add('inline-block')
        document.getElementById('moonElem').classList.remove('hidden')
        
        document.getElementById('sunElem').classList.add('hidden')
        document.getElementById('sunElem').classList.remove('inline-block')

        localStorage.setItem('theme', 'light');
    };

    if (theme === "dark") enableDarkmode();

    themeSwitch.addEventListener('click', () => {
        theme = localStorage.getItem('theme');
        theme !== 'dark' ? enableDarkmode() : disableDarkmode();
    })
})

let themeSwitch = document.getElementById('theme-switch')
let cardElement = document.querySelector('.card');
let body = document.querySelector('body')


let theme = localStorage.getItem('theme');

let enableDarkmode = () => {
    cardElement.classList.add('darkmode');
    body.style.backgroundColor = '#27272a'
    document.getElementById('moonElem').classList.remove('inline-block')
    document.getElementById('moonElem').classList.add('hidden')

    document.getElementById('sunElem').classList.remove('hidden')
    document.getElementById('sunElem').classList.add('inline-block')

    localStorage.setItem('theme', 'dark');
};

let disableDarkmode = () => {
    cardElement.classList.remove('darkmode');
    body.style.backgroundColor = '#fff'
    document.getElementById('moonElem').classList.add('inline-block')
    document.getElementById('moonElem').classList.remove('hidden')
    
    document.getElementById('sunElem').classList.add('hidden')
    document.getElementById('sunElem').classList.remove('inline-block')


    localStorage.setItem('theme', 'light');
};

if (theme === "dark") enableDarkmode();

function swithThemes () {
    theme = localStorage.getItem('theme');
    theme !== 'dark' ? enableDarkmode() : disableDarkmode();
}

