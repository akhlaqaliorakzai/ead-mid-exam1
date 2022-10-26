import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
let list = []

console.log(list)

export default function Home(){
    let [person,setState]=useState("")
    let [search,changeSearch]=useState("")
    
    function renderStories(){
        fetch('https://hn.algolia.com/api/v1/search?query=hello&page=0')
        .then((resp) => {
        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then((data) => {
                    let err = { errorMessage: data.message };
                    throw err;
                });
            } else {
                let err = { errorMessage: 'Please try again in some time, Server Error!' };
                throw err;
            }
        }
        return resp.json();
    })

    .then((data) => {
        let i=0
        while(i<100){
            if(data.hits[i].title.includes(search)){
                list.push(data.hits[i].title)
            }
            i++
        }
        console.log(data.hits[0].title)
    //    for(let itm in data){
    //         console.log(itm)
    //    }
    })
    
        
        
        
       
            // console.log(data)
    }
    list.map(itm => <li>{itm}</li>)
    return(
        <>
            <h1 className="m-5">My Hacker Stories</h1>
            <label className='fw-bold ms-5 me-2'>Search: </label>
            <input className='border border-none me-2' onChange={e=>changeSearch(e.target.value)}></input>
            <button className='bg-danger text-white rounded border-white p-2' onClick={()=>renderStories()}>Submit</button>
            <ul>{list}</ul>
            
            
        </>

    )
    
}