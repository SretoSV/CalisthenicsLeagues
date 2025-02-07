import { serverPath } from "../../functions/serverpath";
import styles from "../../styles/AdminPageStyles/ApplicationCardStyle.module.css";

interface ApplicationCardProps {
    Id: number;
    Username: string;
    Name: string;
    Surname: string;
    Email: string;
    Country: string;
    DateOfBirth: Date;
    YoutubeLink: string;
    Instagram: string;
    League: number;
    onDelete: (arg0: number) => void;
}
export function ApplicationCard(props: ApplicationCardProps){

    const handleClick = async (action: string) => {
        try {
            let response: Response | null = null;
            if(action === 'accept'){
                response = await fetch(`${serverPath()}Application/action/${props.Id}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
              });
            }
            else if(action === 'reject'){
                response = await fetch(`${serverPath()}Application/action/${props.Id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
              });
            }
      
            if (response && response.ok) {
              props.onDelete(props.Id);
            } 
            else {
              console.log("An error occurred while processing the request.");
            }
          } 
          catch (error) {
            console.error("Server error! Try again later...");
          }
    }

    return (
        <div className={styles.mainDiv}>
            <div>Username: <b>{props.Username}</b></div>
            <div>Name: <b>{props.Name}</b></div>
            <div>Surname: <b>{props.Surname}</b></div>
            <div>Email: <b>{props.Email}</b></div>
            <div>Country: <b>{props.Country}</b></div>
            <div>Date of Birth: <b>{new Date(props.DateOfBirth).toLocaleDateString()}</b></div>
            <div>Youtube Link: 

            <a 
              href={props.YoutubeLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.youtubeLink}
            >
              CLICK FOR VIDEO APPLICATION
            </a>
            </div>
            <div>Instagram: 
              <a 
                href={`https://www.instagram.com/${props.Instagram}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.instagramLink}
              >
                {"@" + props.Instagram}
              </a>
            </div>
            <div>League: <b>{props.League}</b></div>
            <div>
            <button onClick={() => handleClick("accept")} className={styles.buttonAccept}>Accept</button>
            <button onClick={() => handleClick("reject")} className={styles.buttonReject}>Reject</button>

            </div>
        </div>
    );
}