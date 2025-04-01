"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import testImage from "../../public/assets/media/home/herobanner/HeroBanner.png";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const logoutAndCheckAuth = async () => {
      await signOut(auth);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          router.replace("/");
        }
      });
    };
    logoutAndCheckAuth();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="login-page-section-wrapper ">
      <div className="login-page-section-wrapper-bg" />
      <div className="login-box">
        <div className="login-box-image">
          <Image
            src={"/assets/media/home/herobanner/HeroBanner.png"}
            alt="image"
            height={200}
            width={150}
            quality={95}
            loading="lazy"
          />
          <div className="header-logo">tour guide</div>
        </div>
        <div className="login-box-content">
          <p>admin login</p>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
              <div className="icon">
                <FaUser />
              </div>
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="Password"
                value={password}
                className="form-input"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="icon">
                <RiLockPasswordFill />
              </div>
            </div>
            <div className="error-message-wrapper">
              {error && <p>{error}</p>}

          </div>

            <div className="button-wrapper">
              <button
                type="submit"
                className="button-type-1 text-white px-6 py-2 rounded"
              >
                Login
              </button>
            </div>
          </form>
          {/* <div className="error-message-wrapper">
              {error && <p>{error}</p>}

          </div> */}
        </div>
      </div>
    </section>
  );
}
