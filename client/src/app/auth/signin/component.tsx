'use client';
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Nav from '@/components/commonComponent/nav'
import { ColorRing } from 'react-loader-spinner'
import { AlertCircle } from 'lucide-react';
import { signinWithEmailPassword } from '../../../auth/index'
import { useRouter } from 'next/navigation';


const Signin = () => {
    const [email, setemail] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const [request, setrequest] = useState<boolean>(false)
    const [error, seterror] = useState<string>('')
    const router = useRouter()
    const handlesubmit = async () => {
        seterror('')
        setrequest(true)
        if (password.length === 0 || email.length === 0) {
            seterror('Enter all fields properly')
            setrequest(false)
        } else {
            const formdata = {
                email, password
            }
            const result:any = await signinWithEmailPassword(formdata)
            const {error} = JSON.parse(result)
            console.log(JSON.stringify(result))
            console.log(result)
            if(error?.message){
                seterror(error.message)
                setrequest(false)
            }else {
                router.push('/dashboard')
            }
        }
    }
    return (
        <div className="bg-[#FAFAFA] dark:bg-transparent  min-h-[100vh]  overflow-x-hidden flex items-center justify-start flex-col md:w-[100%] base:w-[100%]">
            <Nav />
            <div className='w-[100%] min-h-[90vh] flex justify-center items-center'>
                <Card className='w-[400px]'>
                    <CardHeader>
                        <CardTitle>Sign in</CardTitle>
                        <CardDescription>
                            Welcome back! Sign in for a personalized experience and exclusive features.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="Email">Email</Label>
                            <Input id="Email" value={email} onChange={(e) => setemail(e.target.value)} placeholder='user@example.com'  />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="Password">Password</Label>
                            <Input id="Password" type='password' value={password} onChange={(e) => setpassword(e.target.value)} placeholder='******'  />
                        </div>
                    </CardContent>
                    <CardFooter style={error.length === 0 ? { justifyContent: 'end' } : { justifyContent: "space-between" }}>
                        {error.length !== 0 && (
                            <span className='text-[#FF0000] text-[0.8rem] w-[70%] text-left flex  items-center gap-2'><AlertCircle size={18} color='red' /> {error}</span>
                        )}
                        <Button className="gap-1" disabled={request} style={request === true ? { opacity: 0.67 } : { opacity: 1 }} onClick={handlesubmit}>
                            <ColorRing
                                visible={request}
                                height="30"
                                width="30"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                            /> Sign In</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default Signin