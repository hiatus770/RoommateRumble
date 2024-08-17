
'use client'; 
import { usePathname } from 'next/navigation'
 
export default async function getURL() {
  const pathname = await usePathname();
  return pathname; 
}