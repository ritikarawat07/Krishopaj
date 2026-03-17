import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c9485",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#f9fafb",
    textAlign: "center",
    marginBottom: 40,
  },

  subHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f9fafb",
    textAlign: "center",
    marginBottom: 20,
  },

  description: {
    fontSize: 14,
    color: "#f9fafb",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 20,
  },

  input: {
    backgroundColor: "#f9fafb",
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
    fontSize: 15,
    color: "#0a0a0a",
  },

  button: {
    backgroundColor: "#f9fafb",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#0a0a0a",
    fontSize: 16,
    fontWeight: "bold",
  },

  link: {
    textAlign: "center",
    marginTop: 18,
    color: "#0a0a0a",
    fontWeight: "500",
  },
});
