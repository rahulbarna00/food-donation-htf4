'use client';
import React, { useEffect, useState } from 'react'
import '../sass/main/component.scss'
import Link from 'next/link';
import Image from 'next/image'
import { MoveUpRight, Menu, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useRouter } from 'next/navigation';
import SignOutServer from '@/auth/signout';
const component = () => {
  const [navopen, setnavopen] = useState<boolean>(false)
  const [screenWidth, setScreenwidth] = useState<number>(0);
  const router = useRouter()
  useEffect(() => {
    setScreenwidth(window.innerWidth)
  }, [])
  return (
    <div>HELLOO</div>
  )
}

export default component