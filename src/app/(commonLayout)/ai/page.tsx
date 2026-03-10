import AskAIChat from "@/components/modules/AI/AskAIChat";

export const metadata = {
    title: "Ask AI Travel Buddy - Personalized Travel Planning",
    description: "Get instant travel recommendations, itineraries, and expert advice from our AI Travel Buddy.",
};

const AIPage = () => {
    return (
        <div className="bg-background pt-10 pb-20 min-h-screen">
            <div className="container mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                        TRAVEL AI EXPLORER
                    </h1>
                    <p className="text-muted-foreground text-lg px-4">
                        Your intelligent companion for discovering the world's best kept secrets.
                    </p>
                </div>
                <AskAIChat />
            </div>
        </div>
    );
};

export default AIPage;
