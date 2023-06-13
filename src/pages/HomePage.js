import React, { useEffect, useState } from 'react'

const HomePage = () => {
    const [categories, set_categories] = useState([])

    const getCategories = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/get_categories/',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        let response_data = await response.json()
        if (response.status === 200) {
            set_categories(response_data)
        

        }
    }

    useEffect(()=>{
        getCategories()
    },[])

    return (
        <>
            <p>Add Product</p>
            <select>
                {categories.map((category)=>{
                    console.log(category.name)
                    return <option key={category.id} value={category.id}>{category.name}</option>
                })}

            </select>
        </>
    )   
}


export default HomePage