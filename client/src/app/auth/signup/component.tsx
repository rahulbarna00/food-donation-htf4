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
import { ColorRing } from 'react-loader-spinner'
import { AlertCircle } from 'lucide-react';
import { signupWithEmailPassword } from '../../../auth/index'
import Nav from '@/components/commonComponent/nav'
import { useRouter } from 'next/navigation';

const Signup = () => {
    const [email, setemail] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const [name, setname] = useState<string>("")
    const [confirmPassword, setconfirmPassword] = useState<string>('')
    const [request, setrequest] = useState<boolean>(false)
    const [error, seterror] = useState<string>('')
    const router = useRouter()
    const handlesubmit = async () => {
        seterror('')
        setrequest(true)
        if (password.length === 0 || email.length === 0 || confirmPassword.length === 0 || name.length === 0) {
            seterror('Enter all fields properly')
        } else if (password !== confirmPassword) {
            seterror("Password and Confirm Password not matching")
        } else {
            const formdata = {
                email, password, name
            }
            const result:any = await signupWithEmailPassword(formdata)
            const {error} = JSON.parse(result)
            console.log(result)
            if(error?.message){
                seterror(error.message)
                setrequest(false)
            }else {
                router.push('/dashboard')
            }
        }
        setrequest(false)
    }
    return (
        <div className="bg-[#FAFAFA] dark:bg-transparent  min-h-[100vh]  overflow-x-hidden flex items-center justify-start flex-col md:w-[100%] base:w-[100%]">
            <Nav />
            <div className='w-[100%] min-h-[90vh] flex justify-center items-center'>
                <Card>
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>
                            Register Now , to unlock some extraordinary features
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="Email">Name</Label>
                            <Input id="Name" value={name} onChange={(e) => setname(e.target.value)} placeholder='John Doe' />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="Email">Email</Label>
                            <Input id="Email" value={email} onChange={(e) => setemail(e.target.value)} placeholder='user@example.com' />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="Password">Password</Label>
                            <Input type='password' id="Password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='******' />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="confirm Password">confirm Password</Label>
                            <Input type='password' id="confirm Password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} placeholder='******' />
                        </div>
                    </CardContent>
                    <CardFooter style={error.length === 0 ? { justifyContent: 'end' } : { justifyContent: "space-between" }}>
                        {error.length !== 0 && (
                            <span className='text-[#FF0000] text-[0.8rem] w-[70%] text-left flex justify-center items-center gap-2'><AlertCircle size={18} color='red' /> {error}</span>
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
                            /> Sign Up</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default Signup