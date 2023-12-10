import React, { useEffect } from 'react';
import './Sidebar.scss'
import { Link, NavLink } from 'react-router-dom';
// Icons
import home_icon from 'assets/images/Home.svg'
import courseregis_icon from 'assets/images/Course.svg'
import calendar_icon from 'assets/images/Calender.svg'
import exam_icon from 'assets/images/Bookmark.svg'
import fee_icon from 'assets/images/Money.svg'
import program_icon from 'assets/images/Program.svg'
import marks_icon from 'assets/images/ListCheck.svg'
import profile_icon from 'assets/images/Profile.svg'
import User from 'models/User';

type SidebarProps = {
    open?: boolean;
    onSelection: (pageName: string) => void;
    handleClose: () => void;
    user?: User;
}

const Sidebar: React.FC<SidebarProps> = ({ open = false, user, onSelection, handleClose }) => {
    const [name, setName] = React.useState('');
    const [sid, setSid] = React.useState('');
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const userObj = JSON.parse(user);
            setName(userObj.name);
            setSid(userObj.sid);
        }
    })
    const pages = [
        {
        "name": "Home Page",
        "link": "/",
        "image": home_icon
        }, 
        {
        "name": "Course registation",
        "link": "/course-registration",
        "image": courseregis_icon
        }, 
        {
        "name": "Timetable",
        "link": "/timetable",
        "image": calendar_icon
        }, 
        {
        "name": "Examination schedule",
        "link": "/examination-schedule",
        "image": exam_icon
        },
        {
        "name": "School fee",
        "link": "/school-fee",
        "image": fee_icon
        },
        {
        "name": "Course program",
        "link": "/course-program",
        "image": program_icon
        },
        {
        "name": "Student marks",
        "link": "/student-marks",
        "image": marks_icon
        },
        // {
        // "name": "Prequesite subjects",
        // "link": "/prequesite-subjects",
        // "image": prequesite_icon
        // },
        {
        "name": "User profile",
        "link": "/profile",
        "image": profile_icon
        },
    ]
    return (
        <>
            <div className={`sidebar ${open ? 'open' : 'close'}`}>
                <div className='logo'><h3>UniLife</h3></div>
                <div className="links">
                    {pages.map((page, index) => (
                        <NavLink 
                            key={index} 
                            to={page.link} 
                            className={({ isActive, isPending})=>
                            isPending ? 'pending' : isActive ? 'active' : ''
                        } onClick={()=> {
                            // handleClose();
                            onSelection(page.name) 
                            }}>
                            <img src={page.image} alt='Icon'/>{page.name}
                        </NavLink>
                    ))}
                </div>
                {user ? 
                <div className='bottom profile'>
                    <p className="name">{name}</p>
                    <p className="id">{sid}</p>
                    <Link to="/login" id="btn-logout" onClick={()=>{
                        localStorage.removeItem('user');
                        handleClose();
                    }}>Logout</Link>
                </div> : 
                <div className='bottom login'>
                    <Link to="/login">Login</Link>
                </div>
                }
            </div>
            {open && <div className="sidebar-cover" onClick={handleClose} />}
        </>
    );
}

export default Sidebar;