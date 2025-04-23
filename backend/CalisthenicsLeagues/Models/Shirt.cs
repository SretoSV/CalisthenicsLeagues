namespace CalisthenicsLeagues.Models
{
    public class Shirt
    {
        public int Id { get; set; }
        public string League { get; set; }
        public string ShirtImageBlackFront { get; set; }
        public string ShirtImageBlackBack { get; set; }
        public string ShirtImageWhiteFront { get; set; }
        public string ShirtImageWhiteBack { get; set; }
        public double Price { get; set; }
        public Shirt() { }

        public Shirt(int id, string league, string shirtImageBlackFront, string shirtImageBlackBack, string shirtImageWhiteFront, string shirtImageWhiteBack, double price)
        {
            Id = id;
            League = league;
            ShirtImageBlackFront = shirtImageBlackFront;
            ShirtImageBlackBack = shirtImageBlackBack;
            ShirtImageWhiteFront = shirtImageWhiteFront;
            ShirtImageWhiteBack = shirtImageWhiteBack;
            Price = price;
        }
    }
}
