using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using Microsoft.Azure.Cosmos;

namespace api
{
    public static class GetPosts
    {
        private static readonly CosmosClient client = new(
                connectionString: Environment.GetEnvironmentVariable("COSMOS_CONNECTION_STRING")!
        );
        private static readonly Database db = client.GetDatabase("azure-blogify-cosmosdb");
        private static readonly Container blogPosts = db.GetContainer("blogPosts");
        [FunctionName("GetPosts")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            // Continuation used to facilitate pagination
            string continuationToken = req.Query["contToken"];

            int pageSize = int.TryParse(req.Query["pageSize"], out int size) ? size : 10;
            List<Post> posts = new List<Post>();

            // Order posts from most recent
            var queryDefinition = new QueryDefinition("SELECT * FROM blogPosts ORDER BY blogPosts.date DESC");

            // Specifiy the number of results to return
            var requestOptions = new QueryRequestOptions { MaxItemCount = pageSize };

            // Use continuation token if available
            FeedIterator<Post> feed = string.IsNullOrEmpty(continuationToken)
                ? blogPosts.GetItemQueryIterator<Post>(queryDefinition, requestOptions: requestOptions)
                : blogPosts.GetItemQueryIterator<Post>(queryDefinition, continuationToken, requestOptions);

            // Check if there are posts to return
            if (feed.HasMoreResults)
            {
                FeedResponse<Post> response = await feed.ReadNextAsync();
                posts.AddRange(response);
                // If there are more results available, return posts with the new continuation token
                if(response.ContinuationToken != null) {
                    var newContinuationToken = JsonConvert.DeserializeObject(response.ContinuationToken);
                    return new OkObjectResult(new { posts, continuationToken = newContinuationToken });
                }
            }
            // If there are no more results, return posts without continutation token
            return new OkObjectResult(new { posts });
        }
    }
}
