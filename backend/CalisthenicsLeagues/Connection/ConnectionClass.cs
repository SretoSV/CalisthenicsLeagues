using Microsoft.Extensions.Configuration;

namespace CalisthenicsLeagues.Connection
{
    public class ConnectionClass
    {
        public static string? GetConnectionString()
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();

            return configuration.GetConnectionString("DefaultConnection");
        }

    }
}
