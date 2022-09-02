const newsHeadingLoad = async() =>{
    try{
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        newsHeadShow(data.data.news_category);
    }catch(err){
        console.log("Error found");
    }
}

const newsHeadShow = (elements) =>{
    const newsHeading = document.getElementById('news-heading');
    elements.forEach(element => {
        const newsHeading1 = document.createElement('p');
        newsHeading1.classList.add('news-p');
        console.log(element)
        newsHeading1.innerHTML =`${element.category_name}`
        newsHeading.appendChild(newsHeading1);
    });
}

newsHeadingLoad();