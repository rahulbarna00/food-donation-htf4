'use server';

import createSupabaseServerClient from '../lib/supabase/server'

export const signupWithEmailPassword = async (formdata: {
    email: string,
    password: string,
    name: string
}) => {
    const supabase = await createSupabaseServerClient()
    const result:any = await supabase.auth.signUp({
        email: formdata.email,
        password: formdata.password,
    })
    console.log(result)
    const userData = result.data;
    if(userData.user!==null){
        
        /// store user data in neurelo
        const resp = await fetch("https://ap-south-1.aws.neurelo.com/rest/donor/__one"  , {
            method:"POST",
            headers:{
                "X-API-KEY":"neurelo_9wKFBp874Z5xFw6ZCfvhXZGGajaKPYhdmYrqSdh8e2biNVE5mAMo9d+bGFM8x+BlESA2QHU11vqx1w65HkO3N10z1Lta1DMU8c4to8Y2tyrs+abgxJtAlSFXyhyW36rn5bY8OomK/wzItIsf4NP5d8PMZ1aeqRMxuifrsf66qe1JRHCOd8rS4vkHTJkwYWOE_dMRAUaGwR+Ug3fgThjUekM1UiHl0EBP4cJKTgF/wgBU=",
                "content-Type":"application/json"
            },
            body:JSON.stringify(formdata)
        })
        const msg = await resp.json()
        console.log(msg)
        return JSON.stringify(result)
        // if(resp.status===200){
        //     return JSON.stringify(resp)
        // }else{
        //     return JSON.stringify(resp)
        // }
    }else{
        return JSON.stringify(result)
    }
}

export const signinWithEmailPassword = async (formdata: {
    email: string,
    password: string
}) => {
    const supabase = await createSupabaseServerClient()
    const result = await supabase.auth.signInWithPassword({
        email: formdata.email,
        password: formdata.password
    })
    return JSON.stringify(result)

}