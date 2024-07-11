"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser} from '@/context/UserContext';
import {baseUrl} from "@/context/baseUrl"

const ServerForLogin = () => {
    const router = useRouter();
    const{user,logout}=useUser()

    const useLogout = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/v1/auth/logout`, {
            method: 'POST',
            credentials: 'include', // This ensures cookies are sent with the request
          });
    
          if (response.ok) {
            logout();
            router.push('/signin'); // Redirect to the sign-in page or another page
          } else {
            console.error('Failed to log out');
          }
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
    // console.log("user ", user)

    return (
        <>
            {user?.username ? (
                <>
                <img src={"https://cdn-icons-png.flaticon.com/512/9187/9187604.png"} className='h-6 w-6 rounded-full mr-1'/>
                    <p className='text-black dark:text-white'>{user.username}</p>

                    <button onClick={useLogout}
                    
                        className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
                    >
                        Log Out
                    </button></>
            ) : (
                <>
                    <Link
                        href="/signin"
                        className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/signup"
                        className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                    >
                        Sign Up
                    </Link>
                </>
            )}
        </>
    );
};

export default ServerForLogin;
