# 🧠📖 GPT to Readwise Learning Script

**Turn AI-generated insights into structured, recall-friendly highlights in Readwise—automatically!** 

## 🌟 What This Does
✅ **Query GPT-4 Turbo** for **concise, structured knowledge**.  
✅ **Automatically format answers** with:
- **🏷️ Title** (for easy search in Readwise).
- **🔑 Key Takeaways** (3-5 bullet points).
- **🧠 Memory Hook** (to reinforce learning with spatial recall).  
✅ **Retry before saving** if the response isn’t quite right.  
✅ **Send directly to Readwise** in a **beautifully structured format**!

---

## 🎬 Demo
```sh
npm start "What are common mistakes with useEffect in React?"
```

### 👀 Example Output
```
📜 Received prompt: "What are common mistakes with useEffect in React?"
🔍 Sending prompt to OpenAI...
✅ Response received from OpenAI.

📝 GPT Response:
useEffect is commonly misused in ways that lead to performance issues, infinite loops, or memory leaks.

📌 **Optimized Highlight for Readwise:**
🔹 **Title:** Common useEffect Mistakes - GPT Summary  
🔑 **Key Takeaways:**  
- Forgetting the dependency array causes **infinite loops**.  
- Using state updates inside useEffect **without conditions** leads to repeated renders.  
- Not cleaning up event listeners causes **memory leaks**.  
- Placing `useEffect` inside conditionals **violates React’s Rules of Hooks**.  

🧠 **Memory Hook:** Imagine an app that keeps refreshing itself—because `useEffect` is triggering infinitely.  

Do you want to (k)eep, (r)etry, or (c)ancel?
```

**Hit `k` → 📤 Boom! Sent to Readwise!**

---

## ⚙️ Installation
1. **Clone the repo** 🏗️
   ```sh
   git clone https://github.com/thatguychrisw/readwise-ai
   cd readwise-ai
   ```
2. **Install dependencies** 📦
   ```sh
   npm install
   ```
3. **Set up API keys** 🔑
    - Get an **OpenAI API Key** → [OpenAI API](https://platform.openai.com/)
    - Get a **Readwise API Key** → [Readwise API](https://readwise.io/access_token)
    - Create a `.env` file and add:
      ```ini
      OPENAI_API_KEY=your_openai_api_key
      READWISE_API_KEY=your_readwise_api_key
      ```

---

## 🚀 Usage
Run the script with any knowledge-seeking prompt:
```sh
npm start "How do React hooks work?"
```

### 📜 What happens next?
1. GPT **generates a structured answer** (title, key takeaways, memory hook).
2. You **review the response** before saving.
3. Choose to **(k)eep, (r)etry, or (c)ancel**.
4. **Sent to Readwise** for future recall! 📤📚

---

## 🎯 Why Use This?
🔥 **Optimized for Learning** - Key takeaways + memory hooks = 🚀 recall.  
🔄 **Retry Mechanism** - Regenerate responses **before saving** to Readwise.  
📚 **Auto-Formatted** - **No manual editing** needed—just **review and save**!  
⚡ **Fast & Easy** - Just **ask a question** and let GPT do the rest.

---

## 🤝 Contributing
Want to improve this project? PRs welcome! 🎉

### 💡 Ideas:
- Add **a web UI** for even easier use 🎨
- Support **multiple knowledge sources** 📚
- Experiment with **different GPT models** 🤖

---

## 📜 License
MIT License. Use freely, modify, share—just don't hoard the knowledge! 🚀

---

## 💡 Final Thought
*"Learning isn't about remembering facts, it's about **recalling insights** when you need them."* 💡

🔥 **Now go forth and master React (or anything else) with Readwise + GPT!** 🚀📚  
