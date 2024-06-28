using System;

public record Post
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? Author { get; set; }
    public string Category { get; set; }
    public DateTime Date { get; set; }
    public string? Content { get; set; }
    public string? Summary { get; set; }
    public string[]? Tags { get; set; }
    public string? CoverImageUrl { get; set; }
    public int? ReadingMinutes { get; set; }
    public string? Disclaimer { get; set; }
}