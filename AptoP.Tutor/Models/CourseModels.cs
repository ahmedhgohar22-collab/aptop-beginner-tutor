namespace AptoP.Tutor.Models;

public sealed class CoursePack
{
    public CourseMeta Meta { get; set; } = new();
    public List<CourseLecture> Lectures { get; set; } = [];
    public Dictionary<string, LectureContent> ContentById { get; set; } = new();
    public List<GlossaryEntry> Glossary { get; set; } = [];
    public List<Drill> MidtermDrills { get; set; } = [];
    public List<Drill> MidtermExtraFiveSix { get; set; } = [];
    public Dictionary<string, string> MidtermReviewLink { get; set; } = new();
    public Dictionary<string, List<TopicVideo>> VideosByLecture { get; set; } = new();
    public Dictionary<string, List<AnimatedExplainer>> ExplainersByLecture { get; set; } = new();
    public Dictionary<string, List<PrintablePdf>> PrintablesByLecture { get; set; } = new();
}

public sealed class CourseMeta
{
    public string Book { get; set; } = "";
    public string Edition { get; set; } = "";
    public string Author { get; set; } = "";
    public string Credit { get; set; } = "";
    public string MidtermDate { get; set; } = "";
    public string ReviewDate { get; set; } = "";
}

public sealed class CourseLecture
{
    public string Id { get; set; } = "";
    public string Number { get; set; } = "";
    public string DateLabel { get; set; } = "";
    public string Title { get; set; } = "";
    public string Sections { get; set; } = "";
    public bool Midterm { get; set; }
    public string? Note { get; set; }
}

public sealed class LectureContent
{
    public string Id { get; set; } = "";
    public List<GuideSection>? Guides { get; set; }
    public List<Card> Cards { get; set; } = [];
    public List<Proof> Proofs { get; set; } = [];
    public List<Drill> Drills { get; set; } = [];
}

public sealed class GuideSection
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string? SlidesRef { get; set; }
    public List<string> Paragraphs { get; set; } = [];
    public List<string>? Bullets { get; set; }
    public List<string>? Formulas { get; set; }
    public string? Example { get; set; }
    public string? Trap { get; set; }
    public Check Check { get; set; } = new();
}

public sealed class Card
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string Plain { get; set; } = "";
    public string? Example { get; set; }
    public string? Notation { get; set; }
    public string? ReadAloud { get; set; }
    public string? Confused { get; set; }
    public Check Check { get; set; } = new();
}

public sealed class Check
{
    public string Kind { get; set; } = "";
    public string Prompt { get; set; } = "";
    public List<string>? Choices { get; set; }
    public int? CorrectIndex { get; set; }
    public string ExplainCorrect { get; set; } = "";
    public string ExplainWrong { get; set; } = "";
    public List<ValueTableRow>? Rows { get; set; }
    public string? Expression { get; set; }
    public string? Before { get; set; }
    public string? Source { get; set; }
}

public sealed class ValueTableRow
{
    public string Expression { get; set; } = "";
    public string Correct { get; set; } = "";
}

public sealed class Proof
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string Claim { get; set; } = "";
    public string ClaimReading { get; set; } = "";
    public List<ProofStep> Steps { get; set; } = [];
}

public sealed class ProofStep
{
    public string Connector { get; set; } = "";
    public string Expression { get; set; } = "";
    public string Law { get; set; } = "";
    public List<string>? ConnectorChoices { get; set; }
    public List<string> LawChoices { get; set; } = [];
    public Dictionary<string, string>? WrongReasons { get; set; }
}

public sealed class Drill
{
    public string Id { get; set; } = "";
    public string Prompt { get; set; } = "";
    public string Kind { get; set; } = "";
    public List<string>? Choices { get; set; }
    public int? CorrectIndex { get; set; }
    public string? ExplainCorrect { get; set; }
    public string? ExplainWrong { get; set; }
    public List<string>? Hints { get; set; }
    public string? Solution { get; set; }
}

public sealed class GlossaryEntry
{
    public string Symbol { get; set; } = "";
    public string Name { get; set; } = "";
    public string Reading { get; set; } = "";
    public string? Tip { get; set; }
}

public sealed class TopicVideo
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string Duration { get; set; } = "";
    public string Topic { get; set; } = "";
    public string VideoUrl { get; set; } = "";
    public string TranscriptUrl { get; set; } = "";
    public string VisualsUrl { get; set; } = "";
    public string WhyWatch { get; set; } = "";
}

public sealed class AnimatedExplainer
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string Summary { get; set; } = "";
    public List<ExplainerStep> Steps { get; set; } = [];
}

public sealed class ExplainerStep
{
    public string Title { get; set; } = "";
    public string Body { get; set; } = "";
    public string Visual { get; set; } = "";
}

public sealed class PrintablePdf
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string Href { get; set; } = "";
    public string Detail { get; set; } = "";
}

public sealed class ProgressState
{
    public bool WalkthroughDone { get; set; }
    public bool IncludeFiveSixInMidterm { get; set; }
    public List<string> CompletedCards { get; set; } = [];
    public List<string> NeedsReview { get; set; } = [];
    public List<string> CompletedProofs { get; set; } = [];
    public List<string> CompletedDrills { get; set; } = [];
    public List<string> LectureDone { get; set; } = [];
    public int? MidtermScore { get; set; }
    public List<string> MidtermMisses { get; set; } = [];
}
