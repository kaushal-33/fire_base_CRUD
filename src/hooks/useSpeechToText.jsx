import { useEffect, useRef, useState } from "react";

const useSpeechToText = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const listeningRef = useRef(false); // 👈 track listening with ref

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onresult = (event) => {
            let transcript = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                transcript += event.results[i][0].transcript;
            }
            setText(transcript);
        };

        recognition.onend = () => {
            // ✅ only restart if still listening
            if (listeningRef.current) {
                recognition.start();
            }
        };

        recognitionRef.current = recognition;
    }, []);

    const startListening = () => {
        if (recognitionRef.current) {
            setIsListening(true);
            listeningRef.current = true;
            recognitionRef.current.start();
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            setIsListening(false);
            listeningRef.current = false;
            recognitionRef.current.stop();
        }
    };

    return { text, isListening, startListening, stopListening };
};

export default useSpeechToText;
