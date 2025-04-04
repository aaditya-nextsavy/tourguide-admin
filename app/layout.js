
import "../public/assets/styles/reset.css";
import "../public/assets/styles/global.css";
import "../public/assets/styles/styles.css";
// import {  } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
// import { useRouter, usePathname } from "next/navigation";
import Head from "next/head";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const ADMIN_EMAIL = "aaditya@nextsavy.com";

export const metadata = {
  title: "Tour Guide Admin",
  description: "Admin panel for the tour guide",
};



export default function RootLayout({ children }) {
  const loading = false;
  // const router = useRouter();
  // const pathname = usePathname();

  // useEffect(() => {
  //   if (pathname === "/login") {
  //     setLoading(false);
  //     return;
  //   }

  //   const checkAuth = async () => {
  //     onAuthStateChanged(auth, async (user) => {
  //       if (!user || user.email !== ADMIN_EMAIL) {
  //         await signOut(auth);
  //         router.replace("/login");
  //         // router.refresh();
  //       } else {
  //         setLoading(false);
  //       }
  //     });
  //   };

  //   checkAuth();
  // }, [router, pathname]);

  // if (loading) {
  //   return (
  //     <html>
  //       <Head>
  //         <title>Tour Guide Admin</title>
  //         <meta name="description" content="Admin panel for the tour guide" />
  //       </Head>
  //       <body>
  //         {/* <div className="text-center p-6">
  //           <Loader />
  //         </div> */}
  //       </body>
  //     </html>
  //   );
  // }

  return (
    <html>
      <Head>
        <title>Tour Guide Admin</title>
        <meta name="description" content="Admin panel for the tour guide" />
      </Head>
      <body>
        <div className="body-wrapper">
          <section className="sidebar-section-wrapper">
            <Sidebar />
          </section>

          <div className="main-content-wrapper">
            {/* <Navbar /> */}
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
