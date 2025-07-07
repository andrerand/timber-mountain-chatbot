# Easy‑Start Guide – Measuring Your First AI Chatbot in LangSmith

> **Goal:** Know if your bot is *finding the right info*, *writing good answers*, *running fast*, and *helping users*—without deep ML expertise.

---

## 1. The Four Things to Measure

| Layer | Plain‑English Question | Starter Metric |
|-------|-----------------------|----------------|
| **1. Retrieval** | “Did the bot pull the right document into context?” | **Precision @ 5** – out of the top‑5 docs, how many are relevant? |
| **2. Generation** | “Did the bot’s answer match the facts it pulled?” | **Grounded Accuracy** – thumbs‑up / thumbs‑down on “Is this answer correct and based on the docs?”<br>**LLM‑as‑Judge Similarity** – automated 0‑1 score vs. your gold answer |
| **3. System Health** | “Is the bot fast and affordable?” | **p95 Latency** (speed) and **Cost per 1 k tokens** |
| **4. Business Impact** | “Are people happy and finishing tasks?” | **User Satisfaction** (thumbs‑up %) and **Query Success** (answer marked helpful) |

*(Add more metrics later—start here.)*

---

## 2. What “Good Enough” Looks Like

| Metric | First‑Launch Target |
|--------|---------------------|
| Precision @ 5 ≥ **70 %** |
| Grounded Accuracy ≥ **85 %** |
| LLM‑as‑Judge Similarity ≥ **0.85** |
| p95 Latency ≤ **2 s** |
| Cost ≤ **$0.02** per 1 k tokens *(example)* |
| User Satisfaction ≥ **80 % thumbs‑up** |
| Query Success ≥ **80 %** |

---

## 3. Plugging Metrics into LangSmith (Step‑by‑Step)

1. **Create Two Tiny Datasets**  
   * *Retrieval set* – 10 real user questions **+** the IDs of the docs that should be fetched.  
   * *Answer set* – the same questions **+** a short “gold” answer you wrote.

2. **Add Built‑In Evaluators**  

   ```python
   evaluators = [
       "context_precision",   # Precision @ k
       "qa_correctness",      # LLM‑as‑Judge accuracy / similarity
   ]
   ```

3. **Run an Experiment**  

   ```python
   from langsmith import evaluate
   evaluate(my_chatbot, data="answer_set", evaluators=evaluators)
   ```

4. **Read the Report**  
   LangSmith shows scores, failed examples, and lets you compare runs side‑by‑side.

5. **Track System Metrics**  
   In your code, log `latency_ms` and `cost_usd` for every request—LangSmith will chart them automatically.

6. **Collect Real User Feedback**  
   Add 👍 / 👎 buttons in your UI. Send the signal back to LangSmith with one line of code.

---

## 4. Everyday Workflow

| When | Quick Check |
|------|-------------|
| **Every code or prompt change** | Run the 10‑example *smoke test*. Block release if any key metric drops. |
| **Nightly** | Run the full dataset (50‑100 Qs). Slack the summary. |
| **Weekly** | Review latency & cost graphs for spikes. |
| **Monthly** | Review user satisfaction & query success. Plan improvements. |

---

## 5. Tips for New Teams

* **Start small.** Ten well‑chosen examples beat 1 000 random ones.  
* **Fail fast.** One low Precision score often means a bad embedding or filter.  
* **Click through.** In LangSmith, failed test → retrieved docs → answer, all in one place.  
* **Iterate.** Add extra metrics (recall, toxicity) only after the basics are green.  

---

## 6. Cheat‑Sheet of Terms

| Term | One‑Line Definition |
|------|---------------------|
| **Precision @ k** | % of the top‑k docs that are relevant. Higher = fewer junk docs. |
| **Grounded Accuracy** | Manual thumbs‑up that the answer matches the docs. |
| **LLM‑as‑Judge Similarity** | Automated 0‑1 score measuring closeness to your gold answer. |
| **p95 Latency** | 95 % of responses are faster than this time. |
| **User Satisfaction** | Thumbs‑up ratio or short survey score. |

---

## Appendix – LLM‑as‑Judge Setup (2 Minutes)

1. **Dataset needs:** `query`, `reference_answer`.  
2. **Use built‑in evaluator:**  

   ```python
   evaluate(
       my_chatbot,
       data="answer_set",
       evaluators=["qa_correctness"],  # LLM‑as‑Judge
   )
   ```

3. **Making it yours:**  
   *Want a 1‑5 rubric?* Create a **custom evaluator** in the LangSmith UI, paste your rubric, and save.  
   *Judge keeps mis‑scoring?* Click **“Correct”** in the UI; future runs will few‑shot learn from your edit.

---

**Takeaway:** Track four core layers, automate a tiny smoke test, and let LangSmith’s UI do the heavy lifting while your team ramps up.
