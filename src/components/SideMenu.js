import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/webscript.png";
import user from "../assets/user.jpg";

import MenuItem from "./MenuItem";

/**
 * @author
 * @function SideMenu
 **/

export const menuItems = [
    {
        name: "Home",
        exact: true,
        to: "/",
        iconClassName: "bi bi-speedometer2",
    },
    {
        name: "Calendrier",
        exact: true,
        to: `/Calendrier`,
        iconClassName: "bi bi-speedometer2",

    },
    {
        name: "Candidats",
        exact: true,
        to: `/Candidats`,
        iconClassName: "bi bi-speedometer2",
        subMenus: [
            { name: "Gestion des candidats", to: "/candidats/gestion" },
            { name: "Tests", to: "/candidats/tests" },
        ],
    },
    {
        name: "Employés",
        exact: true,
        to: `/employes`,
        iconClassName: "bi bi-speedometer2",
    },
    {
        name: "Véhicules",
        exact: true,
        to: `/vehicules`,
        iconClassName: "bi bi-speedometer2",
        subMenus: [
            { name: "Gestion des véhicules", to: "/vehicules/gestion" },
            { name: "Entretiens", to: "/vehicules/entretiens" },
            { name: "Gestion des documents", to: "/vehicules/documents" }
        ],
    }
];

const SideMenu = (props) => {
    const [inactive, setInactive] = useState(false);

    useEffect(() => {




        
        if (inactive) {
            removeActiveClassFromSubMenu();


          
        }

        props.onCollapse(inactive);
    }, [inactive]);
    const removeActiveClassFromSubMenu = () => {
        document.querySelectorAll(".sub-menu").forEach((el) => {
            el.classList.remove("active");
        });
    };

    useEffect(() => {
        let menuItems = document.querySelectorAll(".menu-item");
        menuItems.forEach((el) => {
            el.addEventListener("click", (e) => {
                const next = el.nextElementSibling;
                removeActiveClassFromSubMenu();
                menuItems.forEach((el) => el.classList.remove("active"));
                el.classList.toggle("active");
                console.log(next);
                if (next !== null) {
                    next.classList.toggle("active");
                }
            });
        });
    }, []);

    return (

        <div className={`side-menu ${inactive ? "inactive" : ""}`}>
           



            <div className="top-section">
                <div className="logo">
                    <img src={logo} alt="webscript" />
                </div>
            


                <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
                    {inactive ? (
                        <i class="bi bi-arrow-right-square-fill"></i>
                    ) : (
                        <i class="bi bi-arrow-left-square-fill"></i>
                    )}
                </div>
            </div>
           
            <br />

            <div className="divider"></div>

            <div className="main-menu">
                <ul>
                    {menuItems.map((menuItem, index) => (
                        <MenuItem
                            key={index}
                            name={menuItem.name}
                            exact={menuItem.exact}
                            to={menuItem.to}
                            subMenus={menuItem.subMenus || []}
                            iconClassName={menuItem.iconClassName}
                            onClick={(e) => {
                                if (inactive) {
                                    setInactive(false);
                                }
                            }}
                        />
                    ))}


                </ul>
            </div>

            <div className="side-menu-footer">
                <div className="avatar">
                    <img src={user} alt="user" />
                </div>
                <div className="user-info">
                    <h5>Ines Essetti</h5>
                    <p>inesessetti99@gmail.com</p>
                </div>
            </div>
        </div>



    );
};

export default SideMenu;