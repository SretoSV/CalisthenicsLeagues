export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, formSetter: React.Dispatch<React.SetStateAction<any>>) => {
    const { name, value } = e.target;
    formSetter((prevForm: any) => ({
        ...prevForm,
        [name]: value,
    }));
};

export const setLeagueIdByLeagueName = (leagueName: string) => {
    switch (leagueName){
        case "Legendary":
            return 1;
        case "World-Class":
            return 2;
        case "Pro":
            return 3;
        case "Semi-pro":
            return 4;
        case "Amateur":
            return 5;
        case "Begginer":
            return 6;
        default:
            return 7;
    }
}

export const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return dateString.split('T')[0]; // Uzimanje samo "YYYY-MM-DD" dela
};

export const formatTime = (dateString: string) => {
    if (!dateString) return '';
    const timeString =  dateString.split('T')[1];
    return timeString.split(':')[0]+":"+timeString.split(':')[1];
};