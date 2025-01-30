namespace CalisthenicsLeagues.Models
{
    public class Shirt
    {
        public int Id { get; set; }
        public string LeagueName { get; set; }
        public string ShirtImageBlackFront { get; set; }
        public string ShirtImageBlackBack { get; set; }
        public string ShirtImageWhiteFront { get; set; }
        public string ShirtImageWhiteBack { get; set; }
        public Shirt() { }

        public Shirt(int id, string leagueName, string shirtImageBlackFront, string shirtImageBlackBack, string shirtImageWhiteFront, string shirtImageWhiteBack)
        {
            Id = id;
            LeagueName = leagueName;
            ShirtImageBlackFront = shirtImageBlackFront;
            ShirtImageBlackBack = shirtImageBlackBack;
            ShirtImageWhiteFront = shirtImageWhiteFront;
            ShirtImageWhiteBack = shirtImageWhiteBack;
        }
    }
}
