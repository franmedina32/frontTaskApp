import React, { useEffect, useState } from 'react'

export const statuses = {
    LOADING: "Loading...",
    OK: "OK",
    ERROR: "Error"
    };

export function useFetch (URL,options) {
    const [data,setData] = useState(null)
    const [status,setStatus] = useState(null)

    useEffect(()=>{
        setStatus(statuses.LOADING)
        fetch(URL,options)
         .then(res => {
            if (!res.ok) {
                console.log("ERROR EN EL FETCH")
            }
            return res.json
         })
         .then(dataApi => {
            setStatus(statuses.OK)
            setData(dataApi)})
         .catch(err => {
            setStatus(statuses.ERROR)
         })   
    },[])

    return {data,status}
}