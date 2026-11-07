namespace AptoP.Tutor.Services;

public sealed class UiState
{
    public bool GlossaryOpen { get; private set; }
    public string GlossaryQuery { get; private set; } = "";

    public event Action? Changed;

    public void OpenGlossary(string symbol = "")
    {
        GlossaryQuery = symbol;
        GlossaryOpen = true;
        Changed?.Invoke();
    }

    public void CloseGlossary()
    {
        GlossaryOpen = false;
        Changed?.Invoke();
    }
}
