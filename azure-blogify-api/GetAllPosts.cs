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
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation($"HTTP trigger: Get All Posts. [{DateTime.Now}]");
            string dateFormat = "dd MMMM yyyy";

            List<Post> posts = new List<Post>()
            {
                new Post() {
                    Id = "1",
                    Title = "Quisque aliquam lorem nec arcu convallis scelerisque. Ut laoreet pharetra imperdiet. Vivamus dignissim fringilla augue sed accumsan. In sollicitudin urna.",
                    Date = DateTime.ParseExact("20 May 2024", dateFormat, CultureInfo.InvariantCulture)
                },
                new Post()
                {
                    Id = "2",
                    Title = "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus laoreet arcu sit amet erat dapibus.",
                    Date = DateTime.ParseExact("19 May 2024", dateFormat, CultureInfo.InvariantCulture)
                }
            };

            return new OkObjectResult(posts);
        }

        public class Post
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public DateTime Date { get; set; }
        }
    }
}
