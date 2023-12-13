import React from 'react';
import './Announcements.css';
import { Announcement } from 'types';

interface AnnouncementsProps {
    title: string;
    annoucements?: Announcement[];
}

const Announcements: React.FC<AnnouncementsProps> = ({ title, annoucements }) => {
    return (
        <div className='announce-block'>
            <h3 className='title'>{title}</h3>
        </div>
    );
};

export default Announcements;
