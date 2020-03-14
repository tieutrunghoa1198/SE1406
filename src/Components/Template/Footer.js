import React from 'react'

export default function Footer() {
    return (
        <>
            <footer className="bg-dark p-3 pt-5">
                <ul className="list-inline text-uppercase text-center">
                    <li className="list-inline-item mx-3">
                        <a href="/" className="text-light text-uppercase">
                            Home
                    </a>
                    </li>
                    <li className="list-inline-item mx-3">
                        <a href="/about" className="text-light text-uppercase">
                            about
                    </a>
                    </li>
                    <li className="list-inline-item mx-3">
                        <a href="/" className="text-light text-uppercase">
                            contact
                    </a>
                    </li>
                </ul>

                <h6 className="pt-3 text-light text-center text-capitalize">
                    let's be friends
            </h6>

                <ul className="list-inline text-center">
                    <li className="list-inline-item mx-2">
                        <a href="https://www.facebook.com/t1t7h4" className="text-light">
                            <i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li className="list-inline-item mx-2">
                        <a href="https://www.linkedin.com/" className="text-light">
                            <i className="fa fa-linkedin fa-2x" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li className="list-inline-item mx-2">
                        <a href="https://www.instagram.com/ttr.hoa/" className="text-light">
                            <i className="fa fa-instagram fa-2x" aria-hidden="true"></i>
                        </a>
                    </li>
                </ul>
            </footer>
        </>
    )
}
