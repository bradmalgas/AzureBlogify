using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Globalization;

namespace azure_blogify_api
{
    public static class GetAllPosts
    {
        [FunctionName("GetAllPosts")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation($"HTTP trigger: Get All Posts. [{DateTime.Now}]");
            string dateFormat = "dd MMMM yyyy";

            List<Post> posts = new List<Post>()
            {
                new Post() {
                    Id = "1",
                    Title = "27 year old Johannesburg woman Tania Koetsie convicted for being a perfectionist who wants a draft website to have real words and full sentences.",
                    Date = DateTime.ParseExact("20 May 2024", dateFormat, CultureInfo.InvariantCulture)
                },
                new Post()
                {
                    Id = "2",
                    Title = "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus laoreet arcu sit amet erat dapibus.",
                    Date = DateTime.ParseExact("19 May 2024", dateFormat, CultureInfo.InvariantCulture)
                },
                new Post()
                {
                    Id = "3",
                    Title = "Vestibulum faucibus purus augue, aliquam pretium urna finibus id. Praesent tincidunt luctus leo, vitae rhoncus ex eleifend eu. Aenean aliquam.",
                    Date = DateTime.ParseExact("18 May 2024", dateFormat, CultureInfo.InvariantCulture)
                },
                new Post()
                {
                    Id = "4",
                    Title = "Fusce posuere, orci ut tempor suscipit, ipsum est tempor odio, ac placerat tortor neque non erat. Proin vulputate ornare felis.",
                    Date = DateTime.ParseExact("17 May 2024", dateFormat, CultureInfo.InvariantCulture)
                },
                new Post()
                {
                    Id = "5",
                    Title = "Mauris iaculis lacus vel nisl feugiat, in volutpat ex pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
                    Date = DateTime.ParseExact("16 May 2024", dateFormat, CultureInfo.InvariantCulture)
                },
                new Post()
                {
                    Id = "6",
                    Title = "Nullam dolor sapien, porta at neque a, condimentum malesuada est. Integer facilisis sodales cursus. Proin in elit turpis. Phasellus a.",
                    Date = DateTime.ParseExact("15 May 2024", dateFormat, CultureInfo.InvariantCulture)
                },
                new Post()
                {
                    Id = "7",
                    Title = "Phasellus mattis maximus eros, eu rhoncus turpis feugiat faucibus. Proin interdum consequat pulvinar. Quisque malesuada magna ut ligula gravida, quis.",
                    Date = DateTime.ParseExact("14 May 2024", dateFormat, CultureInfo.InvariantCulture)
                }
            };

            return new OkObjectResult(posts);
        }

        public class Post
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public DateTime Date { get; set; }
            public string? Content { get; set; }
        }
    }
}
