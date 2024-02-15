import ChatComponent from "./ChatComponent";
import NewsComponent from "./NewsComponent";

export function Home() {
    return (
        <div>
            <h2>Chat</h2>
            <ChatComponent />
            <h2>News</h2>
            <NewsComponent />

        </div>
    )
}