import Link from "next/link";
import Image from "next/image";
import React, {useState, useEffect} from 'react'

import "bootstrap/dist/css/bootstrap.min.css";
import {useIntl} from "react-intl";
import {useRouter} from "next/router";


export const NavTop = () => {
    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { locale, locales, asPath } = useRouter();
    const intl = useIntl();
    useEffect(() => {
        setLoading(true)
        fetch('/api/auth/user')
            .then((res) => res.json())
            .then((data) => {
                setUser(data)
                console.log(data)
                setLoading(false)
            })
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">

        <div className="container">
            <Link className="navbar-brand me-2 d-flex" href="/">
                <Image src="/images/logo.png" width={40} height={40} alt="MDB Logo" loading="lazy" style={{marginTop: '-1px'}} className="pe-none me-2" />
                <span className="navbar-nav me-auto text-white ">Poker Manager</span>
            </Link>
            <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarButtonsExample" aria-controls="navbarButtonsExample" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="navbarButtonsExample">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                </ul>
                <div className="d-flex align-items-center">
                    <Link className="nav-link line-hover text-white me-3" href="/">Home</Link>
                    <Link className="nav-link line-hover text-white me-3" href="/club">Club</Link>
                    <Link className="nav-link line-hover text-white me-3" href="/leagues" >Leagues</Link>
                    <Link className="nav-link line-hover text-white me-3" href="/tournaments">Tournaments</Link>
                    {!user?.isLoggedIn && (
                            <Link className="nav-link line-hover text-white me-3" href="/login">
                                {intl.formatMessage({ id: "page.login.login" })}
                            </Link>
                    )}
                    {user?.isLoggedIn && (
                                <Link className="nav-link line-hover text-white me-3" href="/profile/home">
                                    {intl.formatMessage({ id: "page.navTop.profile" })}
                                </Link>
                    )}
                    {locale === "en" && (<Link className={"text-white"} locale={"nl"} href={asPath}>NL</Link>)}
                    {locale === "nl" && (<Link className={"text-white"} locale={"en"} href={asPath}>EN</Link>)}
                </div>
            </div>
        </div>
        </nav>
    );
    }



