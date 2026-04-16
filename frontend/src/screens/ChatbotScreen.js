import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "🌱 Hello! I'm your Farming Assistant. Ask me anything about crops, soil, irrigation, or pests!",
      sender: "bot",
    },
  ]);

  const [input, setInput] = useState("");

  // 🌾 Farming Bot Logic
  const getBotReply = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes("crop")) {
      return "🌾 You can grow crops like wheat, rice, or maize depending on your soil and season.";
    } else if (msg.includes("fertilizer")) {
      return "🧪 Use organic compost or NPK fertilizers for better yield.";
    } else if (msg.includes("water") || msg.includes("irrigation")) {
      return "💧 Drip irrigation is efficient and saves water.";
    } else if (msg.includes("weather")) {
      return "☁️ Check weather forecasts before sowing to avoid crop damage.";
    } else if (msg.includes("pest")) {
      return "🐛 Use neem oil or organic pesticides to control pests.";
    } else if (msg.includes("soil")) {
      return "🌱 Test your soil to understand nutrient levels and pH balance.";
    } else if (msg.includes("yield")) {
      return "📈 Proper fertilization, irrigation, and pest control increase crop yield.";
    } else {
      return "🤖 I can help with crops, fertilizers, irrigation, soil, pests, and yield. Ask me anything!";
    }
  };

  // 📤 Send Message
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotReply(input),
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  // 🎨 Render Messages
  const renderItem = ({ item }) => {
    const isUser = item.sender === "user";

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.botMessage,
        ]}
      >
        <Text style={isUser ? styles.userText : styles.botText}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          {/* Chat List */}
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 10 }}
          />

          {/* Input Box */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ask about farming..."
              value={input}
              onChangeText={setInput}
            />

            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatbotScreen;

// 🎨 Styles
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f2f6f3",
  },

  container: {
    flex: 1,
  },

  messageContainer: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    maxWidth: "75%",
  },

  userMessage: {
    backgroundColor: "#4CAF50",
    alignSelf: "flex-end",
  },

  botMessage: {
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-start",
  },

  userText: {
    color: "#fff",
    fontSize: 15,
  },

  botText: {
    color: "#000",
    fontSize: 15,
  },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 20,
  },

  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});