using System;

public record Post
{
    public Guid id { get; set; }
    public string title { get; set; }
    public string? Author { get; set; }
    public string category { get; set; }
    public DateTime date { get; set; }
    public string? Content { get; set; }
    public string? CoverImageUrl { get; set; }
}