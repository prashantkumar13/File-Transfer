import { useRouter } from 'next/navigation';

const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include', // This ensures cookies are sent with the request
      });

      if (response.ok) {
        router.push('/signin'); // Redirect to the sign-in page or another page
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return logout;
};

export default useLogout;
