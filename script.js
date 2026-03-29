let ad=[];
let nw=[];
let snx=false;

function getAni(){
    let ld=document.getElementById("lt");
    let u="https://api.jikan.moe/v4/top/anime";

    fetch(u)
    .then(function(r){
        return r.json();
    })
    .then(function(d){
        ad=d.data;
        ld.style.display="none";
        rend(ad);
    })
    .catch(function(e){
        ld.innerText="error";
    });
}

function rend(a){
    let c=document.getElementById("ac");

    if(a.length==0){
        c.innerHTML="<p>nothing found</p>";
        return;
    }

    let h=a.map(function(i){
        let t=i.title;
        let img=i.images.jpg.image_url;
        let s=i.score||"N/A";
        let ty=i.type||"?";
        let animeId=i.mal_id;

        let nx="";
        if(nw.includes(animeId)){
            nx="sn";
        }

        return `
        <div class="cd">
            <img src="${img}">
            <div class="ct">
                <h3>${t}</h3>
                <p>⭐${s} | ${ty}</p>
                <button class="ab ${nx}" onclick="tN(${animeId})">
                    + Next Watch
                </button>
            </div>
        </div>
        `;
    });

    c.innerHTML=h.join("");
}

function tN(animeId){
    if(nw.includes(animeId)){
        nw=nw.filter(function(id){
            return id!=animeId;
        });
    }
    else{
        nw.push(animeId);
    }

    filt();
}

function filt(){
    let sv=document.getElementById("si").value.toLowerCase();
    let tv=document.getElementById("tf").value;
    let sov=document.getElementById("so").value;

    let res=ad;

    if(sv!=""){
        res=res.filter(function(i){
            return i.title.toLowerCase().includes(sv);
        });
    }

    if(tv!="all"){
        res=res.filter(function(i){
            return i.type==tv;
        });
    }

    if(snx==true){
        res=res.filter(function(i){
            return nw.includes(i.mal_id);
        });
    }

    if(sov=="desc"){
        res.sort(function(a,b){
            return b.score-a.score;
        });
    }
    else if(sov=="asc"){
        res.sort(function(a,b){
            return a.score-b.score;
        });
    }

    rend(res);
}

document.getElementById("si").onkeyup=filt;
document.getElementById("tf").onchange=filt;
document.getElementById("so").onchange=filt;

document.getElementById("nb").onclick=function(){
    let btn=document.getElementById("nb");

    if(snx==false){
        snx=true;
        btn.className="btn act";
    }
    else{
        snx=false;
        btn.className="btn";
    }

    filt();
};

getAni();