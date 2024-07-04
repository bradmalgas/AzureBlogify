using System;
using Newtonsoft.Json;

public record Post
{
    [JsonProperty("id")]
    public Guid? Id { get; set; }
    [JsonProperty("title")]
    public string Title { get; set; }
    [JsonProperty("author")]
    public string Author { get; set; }
    [JsonProperty("category")]
    public string Category { get; set; }
    [JsonProperty("date")]
    public DateTime? Date { get; set; } = DateTime.Now;
    [JsonProperty("content")]
    public string Content { get; set; }
    [JsonProperty("summary")]
    public string Summary { get; set; }
    [JsonProperty("tags")]
    public string[] Tags { get; set; }
    [JsonProperty("coverImageUrl")]
    public string CoverImageUrl { get; set; }
    [JsonProperty("readingMinutes")]
    public int ReadingMinutes { get; set; }
    [JsonProperty("disclaimer")]
    public string Disclaimer { get; set; }

    [JsonIgnore]
    public bool IsValid => !string.IsNullOrEmpty(Title) &&
                    !string.IsNullOrEmpty(Author) &&
                    !string.IsNullOrEmpty(Category) &&
                    !string.IsNullOrEmpty(Content) &&
                    !string.IsNullOrEmpty(Summary) &&
                    !string.IsNullOrEmpty(CoverImageUrl) &&
                    !string.IsNullOrEmpty(Disclaimer) &&
                    !(Tags == null) &&
                    !(Id == null) &&
                    ReadingMinutes > 0;

    public override string ToString() {
        return $"Id: {Id},\nTitle: {Title},\nAuthor: {Author},\nCategory: {Category},\nDate: {Date},\nSummary: {Summary},\nTags: {Tags},\nCover Image URL: {CoverImageUrl},\nReading Mins: {ReadingMinutes},\nDiclaimer: {Disclaimer}";
    }
}