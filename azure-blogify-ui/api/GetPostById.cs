using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using static api.GetAllPosts;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Microsoft.Azure.Cosmos;
using System.Data.Common;
using System.Web;

namespace api
{
    public static class GetPostById
    {
        [FunctionName("GetPostById")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            string id = req.Query["id"];
            string category = req.Query["category"];

            if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(category)) return new NotFoundResult();

            string partitionKey = HttpUtility.UrlDecode(category);

            log.LogInformation($"HTTP trigger: Get By Id. [{DateTime.Now}]");

            CosmosClient client = new(
                connectionString: Environment.GetEnvironmentVariable("COSMOS_CONNECTION_STRING")!
            );

            Database db = client.GetDatabase("azure-blogify-cosmosdb");
            Container blogPosts = db.GetContainer("blogPosts");

            ItemResponse<Post> readItemResponse = await blogPosts.ReadItemAsync<Post>(
                id: id,
                partitionKey: new PartitionKey(partitionKey)
            );

            Post responseMessage = readItemResponse.Resource;

            return new OkObjectResult(responseMessage);
        }
    }
}
