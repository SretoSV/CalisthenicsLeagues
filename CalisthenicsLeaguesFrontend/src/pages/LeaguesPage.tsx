import { LeagueCard } from "../components/LeagueCard";
import { Navigation } from "../components/Navigation";

export function LeaguesPage(){
    return(
        <>
            <Navigation />
            <div>
                <LeagueCard />
                <LeagueCard />
            </div>
        </>
    );
}