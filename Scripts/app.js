
const sortByView=async(id)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data= await res.json();
    const sortedArray=data.data;
    sortedArray.sort(function (a, b) {return parseFloat(b.others.views)*1000 - parseFloat(a.others.views)*1000});
    DisplayCard(sortedArray);
}
// sorting on different page
const sortBycatagory=async()=>{
    const removeRed=document.getElementsByClassName('catagory-btn-four');
    for (let i = 0; i < removeRed.length; i++) {
        if(removeRed[i].classList.contains('red-btn')){
            sortByView(removeRed[i].getAttribute('id'));
        }
    }
}

const btn_catagory=async()=>{
    const res=await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data= await res.json();
    DisplayButtons(data.data);
}
const video_catagory=async(id)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data= await res.json();
    if(data.status)  DisplayCard(data.data);
    else itemNotFount();
}
// data not found
function itemNotFount(){
    const video_container=document.getElementById('video-not-found');
    const previous_video_container=document.getElementById('video-container');
    previous_video_container.innerText='';
    video_container.innerText='';
    
        const tempDiv=document.createElement('div');
        // style="width:250px; height:250px"
            tempDiv.innerHTML=`
            <img src="./images/Icon.png" alt="">
            <h1 class="text-3xl text-black font-bold">Oops!! Sorry, There is no<br>content here</h1>
            `
        tempDiv.classList=`grid justify-items-center`;
        video_container.appendChild(tempDiv);
}
// dynamically button adding
const DisplayButtons = buttons=>{
    const btn_container=document.getElementById('btn-container');
    buttons.forEach(button => {
        const tempDiv=document.createElement('div');
        if(button.category_id==="1000"){
            
            tempDiv.innerHTML=`<a onclick="video_catagory('${button.category_id}'), makeRed('${button.category_id}')" id="${button.category_id}" class="catagory-btn-four red-btn text-white cursor-pointer font-medium rounded-lg px-4 py-2">${button.category}</a>`
        }
        else tempDiv.innerHTML=`<a onclick="video_catagory('${button.category_id}'), makeRed('${button.category_id}')" id="${button.category_id}" class="catagory-btn-four btn-bg text-black cursor-pointer font-medium rounded-lg px-4 py-2">${button.category}</a>`
        btn_container.appendChild(tempDiv);
    });
}
// make button red onclick

const makeRed=async(ID)=>{    
    const removeRed=document.getElementsByClassName('catagory-btn-four');
    // console.log(removeRed); .style.backgroundColor = "rgba(37, 37, 37, 0.20)"
    for (let i = 0; i < removeRed.length; i++) {
        // console.log(removeRed[i]);
        removeRed[i].classList=`catagory-btn-four btn-bg text-black cursor-pointer font-medium rounded-lg px-4 py-2`;
    }
    const makered=document.getElementById(ID);
    makered.classList=`catagory-btn-four red-btn text-white cursor-pointer font-medium rounded-lg px-5 py-3`;
}

//
// display video card
const DisplayCard = cards=>{
    const video_container=document.getElementById('video-container');
    video_container.innerText='';
    const not_found=document.getElementById('video-not-found');
    not_found.innerText='';
        cards.forEach(card => {
        const timestamp = parseInt(card?.others?.posted_date);
        const hours = Math.floor(timestamp / 3600);
        const minutes = Math.floor((timestamp % 3600) / 60);
    
        const tempDiv=document.createElement('div');
        // style="width:250px; height:250px"
        
        
    if(isNaN(hours)&&isNaN(minutes)){
        
        if(card.authors[0].verified){
            tempDiv.innerHTML=`
            <div class="bg-grey-100 shadow-xl rounded-lg">
            <div class="relative">
                <img style="width:100%; height:250px" class="rounded" src="${card?.thumbnail}" alt="Shoes" />
            </div>
                <div class="px-5 py-10">
                    <div class="">
                        <div class="flex gap-3">
                            <img style="width: 30px; height: 30px;" class="rounded-full" src="${card?.authors[0]?.profile_picture}" alt="">
                            <h2 class="text-xl text-black font-semibold">${card?.title}</h2>
                        </div>
                        <div>
                            <div class="flex gap-2">
                                <p class="author-bg font-semibold">${card?.authors[0]?.profile_name} </p>
                                <p><img class="" src="./images/verified.png" alt=""></p>
                            </div>
                            <p class="text-black font-medium">${card?.others?.views} views</p>
                        </div>
                    </div>
                </div>
            </div>`
        }else{
            tempDiv.innerHTML=`
            <div class="bg-grey-100 shadow-xl rounded-lg">
            <div class="relative">
                <img style="width:100%; height:250px" class="rounded" src="${card?.thumbnail}" alt="Shoes" />
            </div>
                <div class="px-5 py-10">
                    <div class="">
                        <div class="flex gap-3">
                            <img style="width: 30px; height: 30px;" class="rounded-full" src="${card?.authors[0]?.profile_picture}" alt="">
                            <h2 class="text-xl text-black font-semibold">${card?.title}</h2>
                        </div>
                        <div>
                            <div class="grid grid-cols-2 gap-0">
                                <p class="author-bg font-semibold">${card?.authors[0]?.profile_name} </p>
                            </div>
                            <p class="text-black font-medium">${card?.others?.views} views</p>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }else{
        if(card.authors[0].verified){
            tempDiv.innerHTML=`
            <div class="bg-grey-100 shadow-xl rounded-lg">
            <div class="relative">
                <img style="width:100%; height:250px" class="rounded" src="${card?.thumbnail}" alt="Shoes" />
                <p id="time" class="bg-black text-white absolute rounded text-xs font-normal p-1 -mt-8 right-2">${hours}hrs ${minutes}min ago</p>
            </div>
                <div class="px-5 py-10">
                    <div class="">
                        <div class="flex gap-3">
                            <img style="width: 30px; height: 30px;" class="rounded-full" src="${card?.authors[0]?.profile_picture}" alt="">
                            <h2 class="text-xl text-black font-semibold">${card?.title}</h2>
                        </div>
                        <div>
                            <div class="flex gap-2">
                                <p class="author-bg font-semibold">${card?.authors[0]?.profile_name} </p>
                                <p><img class="" src="./images/verified.png" alt=""></p>
                            </div>
                            <p class="text-black font-medium">${card?.others?.views} views</p>
                        </div>
                    </div>
                </div>
            </div>`
        }else{
            tempDiv.innerHTML=`
            <div class="bg-grey-100 shadow-xl rounded-lg">
            <div class="relative">
                <img style="width:100%; height:250px" class="rounded" src="${card?.thumbnail}" alt="Shoes" />
                <p id="time" class="bg-black text-white absolute rounded text-xs font-normal p-1 -mt-8 right-2">${hours}hrs ${minutes}min ago</p>
            </div>
                <div class="px-5 py-10">
                    <div class="">
                        <div class="flex gap-3">
                            <img style="width: 30px; height: 30px;" class="rounded-full" src="${card?.authors[0]?.profile_picture}" alt="">
                            <h2 class="text-xl text-black font-semibold">${card?.title}</h2>
                        </div>
                        <div>
                            <div class="grid grid-cols-2 gap-0">
                                <p class="author-bg font-semibold">${card?.authors[0]?.profile_name} </p>
                            </div>
                            <p class="text-black font-medium">${card?.others?.views} views</p>
                        </div>
                    </div>
                </div>
            </div>`
        }
    }
     video_container.appendChild(tempDiv);
    });
}

btn_catagory();
video_catagory("1000");
// console.log("fuck");


