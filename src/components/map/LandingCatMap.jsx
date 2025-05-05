import { useEffect, useState } from 'react'
import customAxios from '../../core/services/interceptor'

const LandingCatMap = () => {

  const [catItems, setCatItems] = useState([])

  const getTechnologies = async () => {
    let result = await customAxios.get("/Home/GetTechnologies")
    setCatItems(result)
  }

  useEffect(() => {
    getTechnologies()
  }, [])
  

  return (
    catItems.map((el, index) => {
        return (
          <div key={index} className="w-[300px] h-[190px] transition duration-500 max-[1713px]:w-[250px] max-[1449px]:w-[350px] max-[1200px]:w-[300px] max-[1000px]:w-[250px] max-[730px]:w-[200px] max-[600px]:w-[150px] max-[600px]:h-[120px] max-[500px]:w-[120px] max-[500px]:h-[110px] max-[400px]:w-[100px] max-[400px]:h-[90px] " >
            <img src={"../src/assets/images/landingCategory/" + ++index + ".png"} className="w-28 h-28 p-2 max-[1000px]:w-24 max-[1000px]:h-24 max-[600px]:w-16 max-[475px]:h-16 max-[400px]:w-14 max-[400px]:h-14" />
            <p className='max-[1000px]:text-[25px] max-[475px]:text-[18px] max-[400px]:text-[16px] dark:text-[#fff]'>{el.techName}</p>
          </div>
        );
    })
  )
}

export default LandingCatMap