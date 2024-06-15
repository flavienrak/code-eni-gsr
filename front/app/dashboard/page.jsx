import Dashboard from "@/components/dashboard/Dashboard";
import Navbar from "@/components/home/Navbar";

export default function DashboardPage() {
  return (
    <>
      <Dashboard />
      <Navbar pseudo="Faly" email="randriantsoafaly8@gmail.com" />
    </>
  );
}

// https://fb.com/home/edit => /, /home, /auth, /dashboard ? /home?path=login, /home?path=register
