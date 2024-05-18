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
            string dateFormat = "dd MMMM yyyy";

            CosmosClient client = new(
                connectionString: Environment.GetEnvironmentVariable("COSMOS_CONNECTION_STRING")!
            );

            Database db = client.GetDatabase("azure-blogify-cosmosdb");
            Container blogPosts = db.GetContainer("blogPosts");

            Post testItem = new Post() {
                id = Guid.NewGuid(),
                title = "The first article of many",
                date = DateTime.Today,
                category = "Test articles"                
            };

            Post createdItem = await blogPosts.CreateItemAsync<Post>(testItem, partitionKey: new PartitionKey(testItem.category));
            
            FeedIterator<Post> feed = blogPosts.GetItemQueryIterator<Post>(queryText: "SELECT * FROM blogPosts");
            FeedResponse<Post> response = await feed.ReadNextAsync(); 

            return new OkObjectResult(response);
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
