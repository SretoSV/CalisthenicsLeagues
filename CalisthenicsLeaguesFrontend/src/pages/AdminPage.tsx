import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { serverPath } from "../functions/serverpath";
import { Application } from "../types/ApplicationTypes";
import { Navigation } from "../components/NavigationComponents/Navigation";
import { ApplicationCard } from "../components/AdminPageComponents/ApplicationCard";


export function AdminPage(){
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [applications, setApplications] = useState<Application[]>([]);
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await fetch(`${serverPath()}User/me`,{
                    method: 'GET', 
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.status === 204) {
                    navigate('/LeaguesPage');
                } else if (response.ok) {
                    const user = await response.json();
                    if (user == null || !user.admin) {
                        navigate('/LeaguesPage');
                    }
                } else {
                    console.error("API call error.");
                }
            } 
            catch (err: unknown) {
                if (err instanceof Error) {
                    alert(err?.message || 'Unknown error');
                }
                else {
                    alert('Unknown error');
                }
            }
        };

        fetchMe();
    }, []);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(`${serverPath()}Application/all`,{
                    method: 'GET', 
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.status === 204) {
                    setMessage("No Applications available!");
                } else if (response.ok) {
                    const data = await response.json();
                    setApplications(data);
                    setMessage("");
                } else {
                    console.error("API call error.");
                }
            } 
            catch (err: unknown) {
                if (err instanceof Error) {
                    alert(err?.message || 'Unknown error');
                }
                else {
                    alert('Unknown error');
                }
            }
        };

        fetchApplications();
    }, []);

    const handleDelete = (id: number) => {
        setApplications(prev => prev.filter(req => req.id !== id));
    }

    return (
        <>
            <Navigation isApplyPage={false}/>
            {
                applications.length > 0 ? (
                    <div>
                        {applications.map((application) => (
                            <ApplicationCard 
                                key={application.id}
                                Id={application.id}
                                Username={application.username}
                                Name={application.name}
                                Surname={application.surname}
                                Email={application.email}
                                Country={application.country}
                                DateOfBirth={application.dateOfBirth}
                                YoutubeLink={application.youtubeLink}
                                Instagram={application.instagram}
                                League={application.league}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div>{message}</div>
                )
            }   
        </>
    );
}