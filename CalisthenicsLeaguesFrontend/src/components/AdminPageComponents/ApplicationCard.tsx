import { serverPath } from "../../functions/serverpath";

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
        <div style={{ color: "white" }}>
            <div>Username: {props.Username}</div>
            <div>Name: {props.Name}</div>
            <div>Surname: {props.Surname}</div>
            <div>Email: {props.Email}</div>
            <div>Country: {props.Country}</div>
            <div>Date of Birth: {new Date(props.DateOfBirth).toLocaleDateString()}</div>
            <div>Youtube Link: {props.YoutubeLink}</div>
            <div>Instagram: {props.Instagram || "N/A"}</div>
            <div>League: {props.League}</div>
            <button onClick={() => handleClick("accept")}>Accept</button>
            <button onClick={() => handleClick("reject")}>Reject</button>
        </div>
    );
}