const body = document.querySelector("body")
const bars = document.getElementById("bars")
const openedBars = document.getElementById("openedBars")
const promokod = document.getElementById("promokod")
let k = 0
bars.onclick = function () {
    k++
    openedBars.style.height = k % 2 ? "250px" : "0"
}
let kod = ''
let x = 1
promokod.onclick = function () {
    if (x == 1) {
        promokod.innerHTML = ""
        kod = `
                <div class="w-full flex items-center justify-between">
                    <input type="text" class="border-0 outline-0"/>
                    <button class="py-[7px] px-[10px] bg-[#CFEB0B] border-1 border-black rounded-[40px] font-normal text-[0.8em] cursor-pointer uppercase leading-[14px] hover:bg-white">Aktivləşdirin</button>
                </div>
                `
        promokod.innerHTML = kod

    }
    x++
}
const catagoryMenu = document.getElementById("catagoryMenu")
const catagories = catagoryMenu.querySelectorAll("li")
const catagoryArea = document.getElementById("catagoryArea")
showAllCategory()
function showAllCategory() {
    let code = ''
    data.category.map(item => {
        code +=
            `
        <div class="mt-10">
            <h2 class="papaheavy uppercase text-[2em] md:text-[42px] leading-[42px] ">${item.category}</h2>
            <div id="${item.category}" class="products grid grid-cols-2 md:grid-cols-3 gap-2.5 ">
                
            </div>
        </div>    
        `
    })
    catagoryArea.innerHTML += code
}

const products = catagoryArea.getElementsByClassName("products")
let empArr = []

function showProduct() {
    for (const product of products) {
        let id = product.id
        let code = ''
    

        data[id].map(item => {
            item.count=1
            console.log(item.count);
            
           code +=
                `
                <div onclick="openModal('${item.id}','${item.category}')"  id="${item.id}" class="relative pr-cart flex flex-col justify-between rounded-[16px] cursor-pointer mt-[24px] ">
                    <div class="relative">
                        <img src="${item.img}" class="rounded-[16px]" alt="">
                        <div id="img${item.id}" class=" hidden absolute top-0 left-0  items-center justify-center papaheavy text-3xl text-white bg-[rgb(0,0,0,0.6)] w-full rounded-[16px] !h-full">${item.count}</div>
                    </div>
                    <div class="flex flex-col justify-center p-2">
                        <h2 class="papaheavy leading-[18px] pt-[16px] pb-[6px]">${item.title}</h2>
                        <p class="text-[#72747a] text-[14px] leading-[100%]">${item.composition}</p>
                        <span class="pt-[10px] text-[12px]">${item.price} AZN</span>
                    </div>
                    <div class="cartBtn py-2.5 px-2 lg:opacity-0">
                        <button class="w-full bg-[#CFEB0B] text-black border-1 border-black rounded-[40px] hover:bg-white cursor-pointer ">SƏBƏTƏ ƏLAVƏ ET</button>
                    </div>
                </div>
            `
        })
        product.innerHTML = code
        // console.log(data[id].map(salamver))
    }
}

showProduct()
// function salamver(item){
//     console.log(item)
// }

function showCount(arg){
    const ip = document.getElementById(`img${arg.id}`)
    ip.style.display = "flex"
    ip.innerHTML = arg.count
    if(!arg.count){
        ip.style.display = "none"

    }
}

// showCount()

function filter(li, arg) {
    let kod = ''
    catagories.forEach(i => i.classList.remove('active'))
    li.classList.add('active')
    if (arg == "mukafatlar") {
        catagoryArea.innerHTML = "Bura Bosdur"
    }
    else {
        let newArr = data.category.filter(item => item.category == arg)
        newArr.map(item => {
            kod +=
                `
            <div class="mt-10">
                <h2 class="papaheavy uppercase text-[2em] md:text-[42px] leading-[42px] ">${item.category}</h2>
                <div id="${item.category}" class="products grid grid-cols-2 md:grid-cols-3 gap-2.5 ">
                    
                </div>
            </div>    
            `
        })
        catagoryArea.innerHTML = kod
        showProduct()
    }
}
const modal = document.getElementById("modal")
function openModal(id, cat) {
    count = 1
    modal.style.display = "block"
    let clickedProduct = data[cat].find(item => item.id == id)
    
    showCount(clickedProduct)

    if (clickedProduct.category == "pizza") {
        pizzaModal(clickedProduct)
    }
    else {
        renderModal(clickedProduct)
    }
    closemodaltab()
}
function closemodaltab() {

    const closeModal = document.getElementById("closeModal")
    closeModal.onclick = function () { modal.style.display = "none" }
}

function closeAfterModal(){
    modal.style.display = "none"
}

let price = 0

function minpl(arg, id,ctgry) { 
    getMobilCount()


    let newObj = data[ctgry].find(item => item.id == id)
    const totalcount = document.getElementById("totalcount")
    const productTotalPrice = document.getElementById("productTotalPrice")
    if (newObj.count + arg > 0) newObj.count += arg
    totalcount.innerText = newObj.count
    price = +newObj.price * newObj.count
    productTotalPrice.innerHTML = price.toFixed(2) + " AZN"
    showCount(newObj)

}
function renderModal(arg) {
    let code = ''
    code =
        `
    <div class="translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] lg:rounded-[32px] absolute p-[30px] w-full h-full overflow-y-auto lg:min-h-[400px] lg:w-[700px] bg-white flex flex-col items-center justify-start lg:justify-center">
                <div class="w-full flex items-center justify-end">
                    <button id="closeModal" class="cursor-pointer"><i class="fa-solid fa-x"></i></button>
                </div>
                <div class="w-full h-[400px]">
                    
                    <img src="${arg.img}" class="w-full h-full object-cover rounded-[32px]" alt="">
                </div>
                <div class="w-full pt-[36px]">
                    <h2 class="w-full text-start papaheavy text-[24px] leading-[29px] ">${arg.title}</h2>
                    <p class="text-[14px] leading-[17px] pt-[7px] ">${arg.composition}</p>
                </div>
                <div class="w-full flex items-center justify-between py-4">
                    <h2 id="productTotalPrice" class="papaheavy text-[#456F42]">${arg.price * arg.count} AZN</h2>
                    <div class="flex items-center gap-2.5">
                        <button onclick="minpl(-1,'${arg.id}','${arg.category}')" class="w-[25px] h-[25px] rounded-[50%] border-1 border-[#D7D9D9] cursor-pointer p-[5px] !flex !items-center !justify-center"><i class="text-[#2D5D2A] fa-solid fa-minus"></i></button>
                        <span id="totalcount" class="papaheavy text-[#456F42]">${arg.count}</span>
                        <button onclick="minpl(1,'${arg.id}','${arg.category}')" class="w-[25px] h-[25px] rounded-[50%] border-1 border-[#D7D9D9] cursor-pointer p-[5px] !flex !items-center !justify-center"><i class="text-[#2D5D2A] fa-solid fa-plus"></i></button>
                    </div>
                    <button onclick="addBasket('${arg.id}','${arg.category}')" class="px-3 py-2 bg-[#CFEB0B] text-black border-1 border-black rounded-[40px] hover:bg-white cursor-pointer ">SƏBƏTƏ ƏLAVƏ ET</button>
                </div>
            </div>   
    `
    modal.innerHTML = code
}

let sebet = []
const basket = document.getElementById("basket")
const basketArea = document.getElementById("basketArea")

function addBasket(id,category){
    getMobilCount()
    closeAfterModal()
    let exsitingProduct = data[category].find(item => item.id == id)


    if(category == "pizza"){
        finalprice ? exsitingProduct.price = finalprice : exsitingProduct.price = exsitingProduct.price
    }

    sebet.includes(exsitingProduct) ? exsitingProduct.count++ : sebet.push(exsitingProduct)
    renderBasket()
    totalBasketPrice()
    showCount(exsitingProduct)
}

const dontSeen = document.getElementById("dontSeen")

const tesdiq = document.getElementById("tesdiq")

renderBasket()

function renderBasket(){
    let kod = ''
    console.log(sebet.length);
    
    if(!sebet.length){
        dontSeen.classList.add("!hidden")
        tesdiq.classList.remove("actived")
        kod = 
        `
        <div class="flex py-5 flex-col gap-2.5 items-center justify-center">
            <i class="text-[#C9C9C9] fa-solid fa-cart-shopping text-7xl"></i>
            <p class="text-[#C9C9C9] ">Səbətiniz boşdur</p>
        </div>
        `
    }
    else{
        tesdiq.classList.add("actived")
        dontSeen.classList.remove("!hidden")

        sebet.map(item => {
        if(item.category == "pizza"){          
            finalprice = sizestatue || xemirstatue ? totalPrice : item.price          
            item.price = finalprice
            finalprice = 0
            totalPrice = 0
            sizestatue = false
            xemirstatue = false
        }
        kod += 
        `
        <div>
            <div class="flex items-center justify-between pb-[10px] gap-4">
                <h2 class="text-[18px] papaheavy">${item.title}</h2>
                <button onclick="deletList('${item.id}')"><i class="fa-solid fa-x"></i></button>
            </div>
            <div class="flex items-center justify-between pt-[10px] pb-[20px]">
                <div></div>
                <div class="flex items-center gap-2 ">
                    <button onclick="minus('${item.id}')" class="cursor-pointer px-1.5 border-1 border-[#D7D9D9] rounded-full">
                        <i class="fa-solid fa-minus text-[#2D5D2A]"></i>
                    </button>
                    <span class="text-[#2D5D2A] papaheavy">${item.count}</span>
                    <button  onclick="plus('${item.id}')" class="cursor-pointer px-1.5 border-1 border-[#D7D9D9] rounded-full">
                        <i class="fa-solid fa-plus text-[#2D5D2A]"></i>
                    </button>
                </div>
                <div class="papaheavy">${item.count * item.price} AZN</div>
            </div>
        </div>
        `
    })
    }
    basketArea.innerHTML = kod
}
function deletList(arg){
    getMobilCount()

    let deletedProduct = sebet.find(item => item.id == arg)
    if(deletedProduct){deletedProduct.count = 1}
    sebet = sebet.filter(item => item.id != arg)
    renderBasket()
    totalBasketPrice()
}
function plus(arg){
    getMobilCount()
    let plusProduct = sebet.find(item => item.id == arg)
    plusProduct.count++
    showCount(plusProduct)
    renderBasket()
    totalBasketPrice()
}
function minus(arg){
    getMobilCount()
    let minProduct = sebet.find(item => item.id == arg)
    minProduct.count--
    showCount(minProduct)
    if(minProduct.count == 0){deletList(arg)}
    renderBasket()
    totalBasketPrice()
}

let reduceArr = [] 
let totalBasPrice = 0
const mobilPrice = document.getElementById("mobilPrice")
function totalBasketPrice(){
    const totalbasketPrice = document.getElementById("totalBasketPrice")   
    let summary = sebet.reduce((sum,item)=> sum + (item.price * item.count),0)
    totalbasketPrice.innerHTML = summary.toFixed(2) + ' AZN'
    mobilPrice.innerHTML = summary.toFixed(2) + ' AZN'
}
let totalPrice = 1
let sizestatue = false
let xemirstatue = false

function pizzaModal(arg) {
    let variatons = arg.variations
    totalPrice = arg.price
    finalprice = arg.price
    let div = ''
    
    let code = ''
    code =
        `
        <div class="flex flex-col justify-between w-full h-full lg:w-[80%] lg:max-h-[95%] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] lg:rounded-[32px] fixed p-[30px] bg-white overflow-y-auto">
                <div class="w-full">
                    
                    <div class="w-full flex items-center justify-end">
                        <button id="closeModal" class="cursor-pointer"><i class="fa-solid fa-x"></i></button>
                    </div>

                    <div class="flex flex-col lg:flex-row items-start justify-start gap-10">
                        <div class="w-full lg:w-[215px] flex flex-col justify-center ">
                            <div class="w-full lg:w-[215px] h-[200px] lg:h-[141px]">
                                <img src="${arg.img}" class="w-full h-full object-cover rounded-2xl" alt="">
                            </div>
                            <h2 class="text-[36px] pt-[24px] papaheavy">${arg.title}</h2>
                            <p class="text-[14px] pt-[7px]">${arg.composition}</p>
                        </div>
                        <div class="flex flex-col ">
                            <p class="pb-[18px] text-[18px] papaheavy">Ölçü <span class="text-[#2D5D2A] ">(Mütləq)</span></p>
                            <div class="flex flex-col items-start  lg:items-start justify-start  gap-5">
                                <div class="flex items-center">
                                    <div id="def" class="flex flex-col justify-between cursor-pointer rounded-[10px] mb-[10px] mr-[10px] p-[10px] min-h-[80px] border-1 border-[#2D5D2A]">
                                        <p class="papaheavy text-[14px] text-[#72747A]">Kiçik, 17 sm</p>
                                        <p class="papaheavy text-[14px] text-[#2D5D2A] ">${arg.price} AZN</p>
                                    </div>
                                    <div id="olcu" class="flex items-end text-[#C9C9C9] justify-start gap-3.5 cursor-pointer hover:!text-[#2D5D2A]">
                                        <p class="text-[14px]">Digər <br> Varinatı <br> Seçin</p>
                                        <i class="text-[14px] fa-solid fa-arrow-right"></i>
                                    </div>
                                </div>
                                <div id="olculer" class="hidden flex-col flex-wrap lg:flex-row gap-5 ">
                                    
                                </div>
                            </div>
                            <p class="pb-[18px] mt-2.5 text-[18px] papaheavy">Xəmirin Növü <span class="text-[#2D5D2A] ">(Mütləq)</span></p>
                            <div class="flex flex-col items-start lg:flex-row lg:items-center justify-start  gap-5">
                                <div class="flex items-center">
                                    <div class=" flex flex-col justify-between cursor-pointer rounded-[10px] mb-[10px] mr-[10px] p-[10px] min-w-[120px] min-h-[80px] border-1 border-[#2D5D2A]">
                                        <p class="papaheavy text-[14px] text-[#72747A]">Nazik</p>
                                    </div>
                                    <div id="other" class="flex items-end text-[#C9C9C9] justify-start gap-3.5 cursor-pointer hover:!text-[#2D5D2A]">
                                        <p class="text-[14px]">Digər <br> Varinatı <br> Seçin</p>
                                        <i class="text-[14px] fa-solid fa-arrow-right"></i>
                                    </div>
                                </div>
                                <div id="xemirtype" class="hidden  flex-col lg:flex-row gap-5 ">
                                    <div onclick="xemir('${+arg.price}',5)" class="flex flex-col justify-between cursor-pointer rounded-[10px] mb-[10px] mr-[10px] p-[10px] min-w-[120px] min-h-[80px] border-1 border-[#2D5D2A]">
                                        <p class="papaheavy text-[14px] text-[#72747A]">Mozzarella kənar</p>
                                        <p class="papaheavy text-[14px] text-[#2D5D2A] ">+5.00 AZN</p>
                                    </div>
                                    <div onclick="xemir('${+arg.price}',6)" class="flex flex-col justify-between cursor-pointer rounded-[10px] mb-[10px] mr-[10px] p-[10px] min-w-[120px] min-h-[80px] border-1 border-[#2D5D2A]">
                                        <p class="papaheavy text-[14px] text-[#72747A]">Hot dog kənar</p>
                                        <p class="papaheavy text-[14px] text-[#2D5D2A] ">+6.00 AZN</p>
                                    </div>
                                    <div class=" flex flex-col justify-between cursor-pointer rounded-[10px] mb-[10px] mr-[10px] p-[10px] min-w-[120px] min-h-[80px] border-1 border-[#2D5D2A]">
                                        <p class="papaheavy text-[14px] text-[#72747A]">Ənənəvi</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="w-full">
                    <div class="w-full flex flex-col lg:flex-row items-center gap-3.5 lg:justify-end py-4">
                        <h2 id="productTotalPrice" class="papaheavy text-[#456F42]">${arg.price} AZN</h2>
                        <div class="flex items-center gap-2.5">
                            <button onclick="artazal(-1,'${arg.id}','${arg.category}')" class="w-[25px] h-[25px] rounded-[50%] border-1 border-[#D7D9D9] cursor-pointer p-[5px] !flex !items-center !justify-center"><i class="text-[#2D5D2A] fa-solid fa-minus"></i></button>
                            <span id="totalcount" class="papaheavy text-[#456F42]">${arg.count}</span>
                            <button onclick="artazal(1,'${arg.id}','${arg.category}')" class="w-[25px] h-[25px] rounded-[50%] border-1 border-[#D7D9D9] cursor-pointer p-[5px] !flex !items-center !justify-center"><i class="text-[#2D5D2A] fa-solid fa-plus"></i></button>
                        </div>
                        <button onclick="addBasket('${arg.id}','${arg.category}')" class="px-3 py-2 bg-[#CFEB0B] text-black border-1 border-black rounded-[40px] hover:bg-white cursor-pointer ">SƏBƏTƏ ƏLAVƏ ET</button>
                    </div>
                </div>
            </div> 
    `
    modal.innerHTML = code
    const other = document.getElementById("other")
    const xemirtype = document.getElementById("xemirtype")
    other.onclick = function(){
        other.classList.add("hidden")
        xemirtype.classList.remove("hidden")
        xemirtype.classList.add("flex")
    }
    const olcu = document.getElementById("olcu")
    const olculer = document.getElementById("olculer")
    olcu.onclick = function (){
        olcu.classList.add("hidden")
        olculer.classList.remove("hidden")
        olculer.classList.add("flex")
    }
    let newArr = variatons.filter(item => item.type == "Ənənəvi")
    newArr.map(item => {
        div += 
        `
        <div onclick="sizePrice('${+item.price}')" class="flex flex-col justify-between cursor-pointer rounded-[10px] mb-[10px] mr-[10px] p-[10px] min-w-[120px] min-h-[80px] border-1 border-[#2D5D2A]">
            <p class="papaheavy text-[14px] text-[#72747A]">${item.size}</p>
            <p class="papaheavy text-[14px] text-[#2D5D2A] ">${item.price} AZN</p>
        </div>
        `
    })
    olculer.innerHTML = div
}

function generatePrice(arg,count){
    const productTotalPrice = document.getElementById("productTotalPrice")
    productTotalPrice.innerHTML = +arg * +count  + " AZN" 
    
    console.log(arg,count);    
}


function sizePrice(price){   
    sizestatue = true
    totalPrice = +price
    generatePrice(totalPrice,1)
}


let finalprice = 0
function artazal(arg,id,ctgry){
    getMobilCount()
    let newObj = data[ctgry].find(item => item.id == id)
    const totalcount = document.getElementById("totalcount")
    if (newObj.count + arg > 0) newObj.count += arg
    totalcount.innerText = newObj.count
    finalprice = sizestatue || xemirstatue ? totalPrice : newObj.price
    generatePrice(finalprice,newObj.count)
}



function xemir(arg,type){
    xemirstatue = true
    let newPrice = +arg + type
    sizestatue ? totalPrice += +type : totalPrice = newPrice
    generatePrice(totalPrice,1)
}   

const mobilCount = document.getElementById("mobilCount")


function getMobilCount (){
    let endCount = 1
    sebet.map(item => endCount += item.count)
    mobilCount.innerHTML = endCount
}

const globalBasket = document.getElementById("globalBasket")
dontSeen.onclick = function(){
    globalBasket.style.display = "block"
}
function getMobilBasket(){
    globalBasket.style.display = "none"
}

const takeawaybtns = document.querySelectorAll("#takeaway button")
const catdirilmadiv = document.getElementById("catdirilmadiv")
const alapardiv = document.getElementById("alapardiv")
for (const btn of takeawaybtns) {
    btn.onclick = function(){
        for (const key of takeawaybtns) {
            key.classList.remove("takeawayborder")
        }
        
        btn.classList.add("takeawayborder")
        
        if(btn.id == "catdirilma"){
            console.log("salam");
            
            alapardiv.style.display = "none";
            catdirilmadiv.style.display = "block"
        }
        else{
            alapardiv.style.display = "block"
            catdirilmadiv.style.display = "none"
        }
    }
}
const locationArea = document.getElementById("locationArea")


showLocation()
function showLocation() {
    let kod = ''
    papaJohnsLocations.map(item => {
        kod += 
        `
            <div id="${item.id}" class="box cursor-pointer p-[9px] border-1 mt-2.5 w-full border-[#DEDEDE] rounded-[8px]">
                <h2 class="uppercase text-[#275125] text-[14px] leading-[16px] pb-[10px] font-bold">${item.name}</h2>
                <div class="flex items-center gap-2 pb-[8px] leading-[17px] text-[14px] font-[400]">
                    <i class="fa-solid fa-location-dot text-[#275125]"></i>
                    <span>${item.address}</span>
                </div>
                <div class="flex items-center gap-2 pb-[8px] leading-[17px] text-[14px] font-[400]">
                    <i class="fa-solid fa-clock text-[#275125]"></i>
                    <span>${item.workingHours}.Son restoran içi sifariş:${item.lastOrder.dineIn}  Son al-apar sifarişi: ${item.lastOrder.takeAway}</span>
                </div>
            </div>
        `
    })
    locationArea.innerHTML = kod
}
const locationAreaDivs = document.querySelectorAll("#locationArea .box")
const iframe = document.getElementById("iframe")
for (const divs of locationAreaDivs) {
    divs.onclick = function(){
        let obj = papaJohnsLocations.find(item => item.id == divs.id)
        iframe.src = obj.maps
        for (const keys of locationAreaDivs) {
            keys.classList.remove("takeawayborder")
        }
        divs.classList.add("takeawayborder")
    }
}

const closeMap = document.getElementById("closeMap")
const locationModal = document.getElementById("locationModal")
closeMap.onclick = function(){
    locationModal.style.display = "none"
}
function openLocationModal(){
    locationModal.style.display = "block"
}