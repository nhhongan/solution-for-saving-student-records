import Announcements from "components/Announcements/Announcements";

function HomePage() {
    return (
        <div className="page"> 
            <Announcements title="Announcements"/>
            <Announcements title="News and Events"/>
        </div>
    );
}

export default HomePage;
