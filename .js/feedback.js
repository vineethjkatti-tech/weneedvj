const supabaseClient = window.supabase.createClient(
    "https://arisflwrqtknyxgietxj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaXNmbHdycXRrbnl4Z2lldHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNTIzODIsImV4cCI6MjEwMzkyODM4Mn0.bLO8laSaZkhSK7OMWCylAgWLxQKg0APuCk-IN2Ohpmw"
);

const form = document.querySelector("#feedback-form");
const status = document.querySelector("#feedback-status");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = form.elements.message.value.trim();
    const email = form.elements.email.value.trim() || null;

    status.textContent = "Sending...";

    const { error } = await supabaseClient
        .from("feedback")
        .insert({ message, email });

    if (error) {
        console.error(error);
        status.textContent = "Something went wrong. Please try again.";
        return;
    }

    form.reset();
    status.textContent = "Thanks for your feedback!";
});

if (!form) {
    return;
}