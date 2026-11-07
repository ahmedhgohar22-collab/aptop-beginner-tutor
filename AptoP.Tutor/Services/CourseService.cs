using System.Net.Http.Json;
using System.Text.Json;
using AptoP.Tutor.Models;

namespace AptoP.Tutor.Services;

public sealed class CourseService
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
    };

    private readonly HttpClient _http;
    private CoursePack? _pack;
    private Task? _loadTask;

    public CourseService(HttpClient http) => _http = http;

    public CoursePack Pack =>
        _pack ?? throw new InvalidOperationException("Course pack not loaded yet.");

    public bool IsLoaded => _pack is not null;

    public Task EnsureLoadedAsync() => _loadTask ??= LoadAsync();

    private async Task LoadAsync()
    {
        var pack = await _http.GetFromJsonAsync<CoursePack>("data/course-pack.json", JsonOptions)
            ?? throw new InvalidOperationException("Could not load course-pack.json");
        _pack = pack;
    }

    public CourseLecture? GetLecture(string id) =>
        Pack.Lectures.FirstOrDefault(l => l.Id == id);

    public LectureContent? GetContent(string id) =>
        Pack.ContentById.TryGetValue(id, out var c) ? c : null;

    public static int DaysUntil(string isoDate)
    {
        if (!DateOnly.TryParse(isoDate, out var target)) return 0;
        var today = DateOnly.FromDateTime(DateTime.Today);
        return target.DayNumber - today.DayNumber;
    }

    public static string DaysLabel(int days) =>
        days > 0 ? $"{days} days" : days == 0 ? "Today" : "Passed";
}
