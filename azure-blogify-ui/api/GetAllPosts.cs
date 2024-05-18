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
using Microsoft.Azure.Cosmos;
using System.Data.Common;

namespace api
{
    public static class GetAllPosts
    {
        [FunctionName("GetAllPosts")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {

            log.LogInformation($"HTTP trigger: Get All Posts. [{DateTime.Now}]");

            List<Post> allPosts = new List<Post>();

            CosmosClient client = new(
                connectionString: Environment.GetEnvironmentVariable("COSMOS_CONNECTION_STRING")!
            );

            Database db = client.GetDatabase("azure-blogify-cosmosdb");
            Container blogPosts = db.GetContainer("blogPosts");

            //Post createdItem = await blogPosts.CreateItemAsync<Post>(testItem, partitionKey: new PartitionKey(testItem.category));
            
            FeedIterator<Post> feed = blogPosts.GetItemQueryIterator<Post>(queryText: "SELECT * FROM blogPosts");

            while (feed.HasMoreResults)
            {
                FeedResponse<Post> response = await feed.ReadNextAsync();

                foreach (Post post in response)
                {
                    allPosts.Add(post);
                }
            }

            return new OkObjectResult(allPosts);
        }

        public record Post
        {
            public Guid id { get; set; }
            public string title { get; set; }
            public string? Author { get; set; }
            public string category { get; set; }
            public DateTime date { get; set; }
            public string? Content { get; set; }
        }
    }
}
