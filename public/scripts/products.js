
const listItems = [
    { id: 1, name: 'کیسه استخوان', price: '550,000', img: '/images/products/horror/BagOfBones.png' },
    { id: 2, name: 'ترس اهل دریای زمردین', price: '550,000', img: '/images/products/fantasy/TressOfTheEmeraldSea.png' },
    { id: 3, name: 'فیبل', price: '200,000', img: '/images/products/fantasy/fable.png' },
    { id: 4, name: 'شهر هلالی 2 - سرای آسمان و نفس', price: '550,000', img: '/images/products/fantasy/HouseOfSkyAndBreath.png' },
    { id: 5, name: 'خانه پوچی', price: '600,000', img: '/images/products/horror/HouseOfHollow.png' },

    { id: 6, name: 'می خوام مثل تو باشم', price: '210,000', img: '/images/products/romantic/IWantToBeWhereYouAre.png' },
    { id: 7, name: 'رقیب های ازلی', price: '500,000', img: '/images/products/romantic/DivineRivals.png' },
    { id: 8, name: '2 فیبل', price: '200,000', img: '/images/products/fantasy/Namesake.png' },
    { id: 9, name: 'جناح چهارم', price: '600,000', img: '/images/products/fantasy/FourthWing.png' },
    { id: 10, name: 'همسر یک قاتل ', price: '320,000', img: '/images/products/crime/AKillersWife.png' },

    { id: 11, name: 'بگذار دروغ بگویم', price: '300,000', img: '/images/products/crime/LetMeLie.png' },
    { id: 12, name: 'یاغی', price: '320,000', img: '/images/products/fantasy/Insurgent.png' },
    { id: 13, name: 'ناهمتا', price: '300,000', img: '/images/products/fantasy/Divergent.png' },
    { id: 14, name: 'هم پیمان', price: '340,000', img: '/images/products/fantasy/Allegiant.png' },
    { id: 15, name: 'چهار', price: '160,000', img: '/images/products/fantasy/Four.png' },

    { id: 16, name: 'درباری از خار و رز', price: '400,000', img: '/images/products/fantasy/ACourtOfThornsAndRoses.png' },
    { id: 17, name: 'درباری از مه و خشم', price: '530,000', img: '/images/products/fantasy/ACourtOfMistAndFury.png' },
    { id: 18, name: 'درباری از بال و تباهی', price: '550,000' , img: '/images/products/fantasy/ACourtOfWingsAndRuin.png'},
    { id: 19, name: 'درباری از یخبندان و نور ستاره', price: '185,000', img: '/images/products/fantasy/ACourtOfFrostAndStarlight.png' },
    { id: 20, name: 'درباری از شعله های نقره ای', price: '600,000', img: '/images/products/fantasy/ACourtOfSilverFlames.png' },

    { id: 21, name: 'سایه خدایان', price: '600,000', img: '/images/products/fantasy/TheShadowOfTheGods.png' },
    { id: 22, name: 'صداهای دیگر', price: '180,000', img: '/images/products/horror/OtherVoices.jpg' },
    { id: 23, name: 'سیلمزلات', price: '460,000', img: '/images/products/horror/SalemsLot.png' },
    { id: 24, name: 'ریتا هیورث و رستگاری در شاوشنک', price: '100,000', img: '/images/products/horror/ShawshankRedemption.png' },
    { id: 25, name: 'کودک خاموش', price: '110,000', img: '/images/products/horror/TheSilentChild.png' },
    
    { id: 26, name: 'یومی و نقاش کابوس', price: '550,000', img: '/images/products/romantic/YumiAndTheNightmarePainter.png' },
    { id: 27, name: 'عشق در یک کلیک', price: '185,000', img: '/images/products/romantic/TheSoulmateEquation.png' },
    { id: 28, name: 'آرورا برمی خیزد', price: '255,000', img: '/images/products/scifi/AuroraRising.png' },
    { id: 29, name: 'آرورا می سوزاند', price: '220,000', img: '/images/products/scifi/AuroraBurning.png' },
    { id: 30, name: 'سرانجام آرورا', price: '400,000', img: '/images/products/scifi/AurorasEnd.png' },
    
    { id: 31, name: 'سیتونیک', price: '400,000', img: '/images/products/scifi/Cytonic.png' },
    { id: 32, name: 'به سوی آسمان', price: '320,000', img: '/images/products/scifi/Skyward.png' },
    { id: 33, name: 'چشم انداز ستاره', price: '420,000', img: '/images/products/scifi/Starsight.png' },
    { id: 34, name: 'الن ویک', price: '230,000', img: '/images/products/crime/AlanWake.png' },
    { id: 35, name: '11.22.63', price: '700,000', img: '/images/products/crime/11.22.63.png' },
    

]

document.addEventListener('DOMContentLoaded', function () {
    addBooksPerRow()
})

let itemCount = document.querySelector('#itemCount')
let allProducts = document.querySelector('#allProducts')
let currentPage = 1
let itemsPerPage = 10

itemCount.addEventListener('change', function () {
    itemsPerPage = +itemCount.value
    currentPage = 1
    addBooksPerRow()
    renderProducts()
})

document.querySelector('#prevPage').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--
        renderProducts()
    }
})

document.querySelector('#nextPage').addEventListener('click', function () {
    if (currentPage < Math.ceil(listItems.length / itemsPerPage)) {
        currentPage++
        renderProducts()
    }
})

function addBooksPerRow() {
    allProducts.innerHTML = ''
    itemCountValue = +itemCount.value

    for (let i = 0; i < itemCountValue; i++) {
        if (listItems[i]) {
            createBookElement(listItems[i])
        } else {
            break
        }
    }
}

function createBookElement(item) {
    let bookElement = document.createElement('div')
    bookElement.className = 'bg-white dark:bg-zinc-700 shadow-normal'
    bookElement.innerHTML = `
        <div class="relative mb-2 flex justify-between align-center md:mb-5 ">
            <img src="${item.img}" class="w-40 md:w-auto" alt="p2">
        </div>
        <div class="font-DanaMedium text-sm md:text-xl h-10 md:h-14 text-zinc-700 dark:text-white line-clamp-2">
            <h5>${item.name}</h5>
        </div>
        <div class="flex mt-1.5 md:mt-2.5 md:gap-x-2.5 gap-x-2">
            <div class="text-teal-600 dark:text-emerald-500">
                <span class="font-DanaDemiBold text-base md:text-xl ">${item.price}</span>
                <span class="text-xs md:text-sm tracking-tighter">تومان</span>
            </div>
        </div>
        <div class="flex items-center justify-between mt-2.5">
            <div class="flex items-center gap-x-2.5 md:gap-x-3 ">
                <span class="flex-center bg-gray-100 hover:bg-teal-600 dark:bg-zinc-700 dark:hover:bg-emerald-500 text-gray-400 hover:text-white w-[26px] h-[26px] md:w-9 md:h-9 rounded-full transition-all cursor-pointer">
                    <svg class="w-4 h-4 md:w-[22px] md:h-[22px]">
                        <use href="#shopping-cart"></use>
                    </svg>
                </span>
                <span class="flex-center text-gray-400 hover:text-teal-600 dark:hover:text-emerald-500 cursor-pointer">
                    <svg class="w-4 h-4 md:w-6 md:h-6 transition-all">
                        <use href="#arrows-left-right"></use>
                    </svg>
                </span>
            </div>
            <div class="flex text-yellow-400 ">
                <svg class="w-4 h-4 md:w-6 md:h-6">
                    <use href="#star"></use>
                </svg>
                <svg class="w-4 h-4 md:w-6 md:h-6">
                    <use href="#star"></use>
                </svg>
                <svg class="w-4 h-4 md:w-6 md:h-6">
                    <use href="#star"></use>
                </svg>
                <svg class="w-4 h-4 md:w-6 md:h-6">
                    <use href="#star"></use>
                </svg>
                <svg class="w-4 h-4 md:w-6 md:h-6">
                    <use href="#star"></use>
                </svg>
            </div>
        </div>
    `
    allProducts.append(bookElement)
}

function renderProducts() {
    allProducts.innerHTML = ''
    let start = (currentPage - 1) * itemsPerPage
    let end = start + itemsPerPage
    let pageItems = listItems.slice(start, end)

    pageItems.forEach(item => createBookElement(item))
}

renderProducts()
