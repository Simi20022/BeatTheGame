import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const hiLoValues = {
  "2": 1, "3": 1, "4": 1, "5": 1, "6": 1,
  "7": 0, "8": 0, "9": 0,
  "10": -1, "J": -1, "Q": -1, "K": -1, "A": -1
};

export default function BlackjackAssistant() {
  const [seenCards, setSeenCards] = useState([]);
  const [decksRemaining, setDecksRemaining] = useState(4);
  const [cardInput, setCardInput] = useState("");

  const addCard = () => {
    if (cardInput in hiLoValues) {
      setSeenCards([...seenCards, cardInput]);
    }
    setCardInput("");
  };

  const resetAll = () => {
    setSeenCards([]);
    setDecksRemaining(4);
    setCardInput("");
  };

  const runningCount = seenCards.reduce((sum, card) => sum + hiLoValues[card], 0);
  const trueCount = decksRemaining > 0 ? (runningCount / decksRemaining).toFixed(2) : 0;

  const recommendation = () => {
    const tc = parseFloat(trueCount);
    if (tc <= 0) return "Miză minimă. Dezavantaj mare.";
    if (tc === 1) return "Joacă normal. Neutral.";
    if (tc === 2) return "Crește ușor miza.";
    if (tc === 3) return "Miză mare. Ai avantaj.";
    return "MAX BET! Moment ideal pentru profit.";
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <motion.img
        src="/logo.png"
        alt="Logo"
        className="mx-auto h-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      <Card>
        <CardContent className="p-4 space-y-4">
          <motion.h2
            className="text-xl font-bold text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Blackjack Assistant – Hi-Lo Counter
          </motion.h2>

          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Introdu o carte (ex: 10, A, 5)"
              value={cardInput}
              onChange={(e) => setCardInput(e.target.value.toUpperCase())}
            />
            <Button onClick={addCard}>Adaugă</Button>
            <Button variant="destructive" onClick={resetAll}>Reset</Button>
          </div>

          <div className="text-sm">Cărți văzute: {seenCards.join(", ")}</div>
          <div className="text-sm">
            <label>Pachete rămase: </label>
            <Input
              type="number"
              value={decksRemaining}
              onChange={(e) => setDecksRemaining(Number(e.target.value))}
              className="w-24 inline ml-2"
            />
          </div>

          <motion.div className="text-lg font-semibold">
            Running Count: {runningCount}
          </motion.div>

          <motion.div className="text-lg font-semibold">
            True Count: {trueCount}
          </motion.div>

          <motion.div
            className="text-green-400 font-bold text-center text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {recommendation()}
          </motion.div>
        </CardContent>
      </Card>

      <div className="text-sm text-gray-400 text-center pt-4">
        <p><strong>Instrucțiuni:</strong> Introdu cărțile vizibile pe masă (ex: 10, A, 6). Sistemul calculează automat avantajul tău.</p>
        <p>Folosește „Reset” după fiecare mână nouă.</p>
      </div>
    </div>
  );
}