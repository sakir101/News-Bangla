let sortArr = [];

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
        const newsHeading1 = document.createElement('div');
        newsHeading1.classList.add('news-p');
        console.log(element)
        newsHeading1.innerHTML =`
        <p onclick ="newsContainer('${element.category_id}')">${element.category_name}</p>
        `
        newsHeading.appendChild(newsHeading1);
    });
}

newsHeadingLoad();


const newsContainer = async (search) =>{
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${search}`);
        const data = await res.json();
        // console.log(data.data);
        sortNews(data.data);
    }catch(err){
        console.log("Error Found");
    }
}

const sortNews = (data) =>{
    if(data.length ===0){
        console.log("no data")
    }

    else{
        for(let j=1; j<data.length; j++)
        {
            for(let i=0; i<=(data.length-2); i++)
            {
                if(data[i].total_view<data[i+1].total_view)
                {
                    let temp=data[i+1];
                    data[i+1]=data[i];
                    data[i]=temp;
                }
            }
        }
    }
    console.log(data);
}