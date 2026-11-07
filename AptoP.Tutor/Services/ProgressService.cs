using System.Text.Json;
using AptoP.Tutor.Models;
using Microsoft.JSInterop;

namespace AptoP.Tutor.Services;

public sealed class ProgressService
{
    public const string StorageKey = "aptop-beginner-progress-v1";

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };

    private readonly IJSRuntime _js;
    private ProgressState _state = new();
    private bool _loaded;

    public ProgressService(IJSRuntime js) => _js = js;

    public ProgressState State => _state;

    public event Action? Changed;

    public async Task EnsureLoadedAsync()
    {
        if (_loaded) return;
        try
        {
            var raw = await _js.InvokeAsync<string?>("localStorage.getItem", StorageKey);
            if (!string.IsNullOrWhiteSpace(raw))
            {
                var parsed = JsonSerializer.Deserialize<ProgressState>(raw, JsonOptions);
                if (parsed is not null) _state = parsed;
            }
        }
        catch
        {
            _state = new ProgressState();
        }

        _loaded = true;
    }

    private async Task PersistAsync()
    {
        var json = JsonSerializer.Serialize(_state, JsonOptions);
        await _js.InvokeVoidAsync("localStorage.setItem", StorageKey, json);
        Changed?.Invoke();
    }

    private async Task ApplyAsync(Func<ProgressState, ProgressState> recipe)
    {
        await EnsureLoadedAsync();
        _state = recipe(_state);
        await PersistAsync();
    }

    public Task MarkCardCompleteAsync(string cardId, bool usedShowMe) =>
        ApplyAsync(state =>
        {
            var completed = state.CompletedCards.Contains(cardId)
                ? state.CompletedCards
                : [.. state.CompletedCards, cardId];
            var needs = state.NeedsReview.Where(id => id != cardId).ToList();
            if (usedShowMe && !needs.Contains(cardId)) needs.Add(cardId);
            return Clone(state, completedCards: completed, needsReview: needs);
        });

    public Task MarkNeedsReviewAsync(string cardId) =>
        ApplyAsync(state =>
            state.NeedsReview.Contains(cardId)
                ? state
                : Clone(state, needsReview: [.. state.NeedsReview, cardId]));

    public Task MarkProofCompleteAsync(string proofId) =>
        ApplyAsync(state =>
            state.CompletedProofs.Contains(proofId)
                ? state
                : Clone(state, completedProofs: [.. state.CompletedProofs, proofId]));

    public Task MarkDrillCompleteAsync(string drillId) =>
        ApplyAsync(state =>
            state.CompletedDrills.Contains(drillId)
                ? state
                : Clone(state, completedDrills: [.. state.CompletedDrills, drillId]));

    public Task MarkLectureDoneAsync(string lectureId) =>
        ApplyAsync(state =>
            state.LectureDone.Contains(lectureId)
                ? state
                : Clone(state, lectureDone: [.. state.LectureDone, lectureId]));

    public Task SetWalkthroughDoneAsync() =>
        ApplyAsync(state => Clone(state, walkthroughDone: true));

    public Task ResetWalkthroughAsync() =>
        ApplyAsync(state => Clone(state, walkthroughDone: false));

    public Task SetMidtermIncludeAsync(bool include) =>
        ApplyAsync(state => Clone(state, includeFiveSixInMidterm: include));

    public Task SaveMidtermResultAsync(int score, List<string> misses) =>
        ApplyAsync(state => Clone(state, midtermScore: score, midtermMisses: misses));

    public Task ResetAllAsync() =>
        ApplyAsync(_ => new ProgressState());

    private static ProgressState Clone(
        ProgressState s,
        bool? walkthroughDone = null,
        bool? includeFiveSixInMidterm = null,
        List<string>? completedCards = null,
        List<string>? needsReview = null,
        List<string>? completedProofs = null,
        List<string>? completedDrills = null,
        List<string>? lectureDone = null,
        int? midtermScore = null,
        bool clearMidtermScore = false,
        List<string>? midtermMisses = null) =>
        new()
        {
            WalkthroughDone = walkthroughDone ?? s.WalkthroughDone,
            IncludeFiveSixInMidterm = includeFiveSixInMidterm ?? s.IncludeFiveSixInMidterm,
            CompletedCards = completedCards ?? [.. s.CompletedCards],
            NeedsReview = needsReview ?? [.. s.NeedsReview],
            CompletedProofs = completedProofs ?? [.. s.CompletedProofs],
            CompletedDrills = completedDrills ?? [.. s.CompletedDrills],
            LectureDone = lectureDone ?? [.. s.LectureDone],
            MidtermScore = clearMidtermScore ? null : midtermScore ?? s.MidtermScore,
            MidtermMisses = midtermMisses ?? [.. s.MidtermMisses],
        };
}
