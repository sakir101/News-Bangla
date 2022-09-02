let sortArr = [];

const newsHeadingLoad = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        newsHeadShow(data.data.news_category);
    } catch (err) {
        console.log("Error found");
    }
}

const newsHeadShow = (elements) => {
    const newsHeading = document.getElementById('news-heading');
    elements.forEach(element => {
        const newsHeading1 = document.createElement('div');
        newsHeading1.classList.add('news-p');
        console.log(element)
        newsHeading1.innerHTML = `
        <p onclick ="newsContainer('${element.category_id}')">${element.category_name}</p>
        `
        newsHeading.appendChild(newsHeading1);
    });
}

newsHeadingLoad();


const newsContainer = async (search) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${search}`);
        const data = await res.json();
        // console.log(data.data);
        sortNews(data.data);
    } catch (err) {
        console.log("Error Found");
    }
}

const sortNews = (data) => {
    if (data.length === 0) {
        console.log("no data")
        const newsContainer1 = document.getElementById('news-container');
        newsContainer1.innerHTML=``;
        const newsFound = document.getElementById('news-found');
        newsFound.classList.remove('d-none');
    }

    else {
        const newsFound = document.getElementById('news-found');
        newsFound.classList.add('d-none');
        for (let j = 1; j < data.length; j++) {
            for (let i = 0; i <= (data.length - 2); i++) {
                if (data[i].total_view < data[i + 1].total_view) {
                    let temp = data[i + 1];
                    data[i + 1] = data[i];
                    data[i] = temp;
                }
            }
        }
        console.log(data);
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML=``;
        data.forEach(element => {
            const newsDiv = document.createElement('div')
            newsDiv.innerHTML = `
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${element.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.details.length>200 ? element.details.slice(0,400) : element.details }...</p>
                <div class="d-flex justify-content-between mt-4 align-items-center">
                    <div class="d-flex align-items-center">
                        <div class="me-3">
                            <img src ="${element.author.img ? element.author.img : `No Image Found`} class="img-fluid" style="height:50px; width:50; border-radius: 50%">
                        </div>
                        <div>
                            ${element.author.name ? element.author.name : `No Name Found`}
                            <br>
                            ${element.author.published_date ? element.author.published_date : `No Published date found`}
                                                   
                        </div>
                    </div>
                    <div>
                    <i class="fa-solid fa-eye me-3"></i>
                    <span class="text-primary fw-bold">${element.total_view}</span>
                    
                    </div>
                    <div>
                        <span class="me-4">${element.rating.number}</span
                        <span>${element.rating.badge}</span>
                    </div>

                    <div>
                        <buuton class="btn btn-primary">Show Detail</button>
                    </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
            `
            newsContainer.appendChild(newsDiv);
        });
    }



}