namespace CalisthenicsLeagues.Models
{
    public class League
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public League() { }
        public League(int id, string name, string image)
        {
            Id = id;
            Name = name;
            Image = image;
        }
    }
}
