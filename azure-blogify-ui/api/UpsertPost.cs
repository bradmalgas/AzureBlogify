using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.Cosmos;

namespace api
{
    public static class UpsertPost
    {
        [FunctionName("UpsertPost")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            string requestBody;
            try
            {
                requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Could not read the request body: {req.Body.ToString}. Error: {ex}");
            }

            Post data;
            try
            {
                data = JsonConvert.DeserializeObject<Post>(requestBody);
            }
            catch (Exception ex)
            {
                throw new Exception($"Could not parse the JSON: {requestBody}. Error: {ex}");
            }

            log.LogInformation($"HTTP trigger: Upsert Post. [{DateTime.Now}]");

            CosmosClient client = new(
                connectionString: Environment.GetEnvironmentVariable("COSMOS_CONNECTION_STRING")!
            );

            Database db = client.GetDatabase("azure-blogify-cosmosdb");
            Container blogPosts = db.GetContainer("blogPosts");

            if (data.Id == null) data.Id = Guid.NewGuid();
            
            data.ReadingMinutes = calculateReadingTime(data.Content);

            if (data.IsValid)
            {
                Post createdItem = await blogPosts.UpsertItemAsync(data, partitionKey: new PartitionKey(data.Category));
                return new OkObjectResult(createdItem);
            }
            else
            {
                return new BadRequestObjectResult("Could not post data - missing fields");
            };
        }

        public static int calculateReadingTime(string postContent)
        {
            if (string.IsNullOrWhiteSpace(postContent))
            {
                return 0;
            }

            string[] words = postContent.Split(new char[] { ' ', '\t', '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries);

            return Math.Max((int)Math.Round((double)words.Length / 150, 0), 1);
        }
    }
}
