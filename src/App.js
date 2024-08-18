import './App.css';
import FoodComponent from './components/FoodComponent';
import MenuData from './data/MenuData';
import {useState, useEffect} from "react"

function App() {

  const [foodData,setFoodData] = useState(MenuData);
  const [dataInPage,setDataInPage] = useState([]);
  const [pages,setPages] = useState(0)

  const pagination = ()=>{
    const foodPerpage = 3; //แสดงรายการหาหาร 3 รายการต่อ 1หน้า
    const pages = Math.ceil(MenuData.length / foodPerpage)
    console.log(`จำนวนเลขหน้า: ${pages}`)

    const newFood = Array.from({length:pages},(data,index)=>{
      const start = index * foodPerpage; // 0*3 = 0 / 1*3 = 3 / 2*3 = 6/ 3*3 = 9
      return MenuData.slice(start,start+foodPerpage) // 0,0+3/ 3,3+3 / 6,6+3/ 9,9+3
    })
    return newFood //return to function pagination
  }

  const handlePage = (index)=>{
    setPages(index)
  }
  
  useEffect(()=>{
    const paginate = pagination() // สร้างตัวแปรมารับ  newFood
    setDataInPage(paginate);
    setFoodData(paginate[pages])
  },[pages])

  return (
    <div className="App">
      <h1>FoodCard | Pagination</h1>
      <div className="container">
        {foodData.map((data,index)=>{
          return <FoodComponent key={index} {...data}/>
        })}
      </div>
      <div className="pagination-container">
        {dataInPage.map((data,index)=>{
          return <button className={`page-btn ${index === pages ? "active-btn" : null}`} key={index} onClick={()=>handlePage(index)}>{index+1}</button>
        })}
      </div>
    </div>
  );
}

export default App;
