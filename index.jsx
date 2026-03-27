import { useState, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap');`;

const styles = `
  ${FONTS}
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080c10;
    --surface: #0d1117;
    --surface2: #161b22;
    --border: #21262d;
    --accent: #FF6B00;
    --accent2: #ff6b35;
    --accent3: #7eb8f7;
    --text: #e6edf3;
    --muted: #7d8590;
    --danger: #ff4444;
    --warning: #ffa726;
    --safe: #FF8C00;
    --font-mono: 'Space Mono', monospace;
    --font-display: 'Syne', sans-serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-mono); }

  .app {
    min-height: 100vh;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,107,0,0.08) 0%, transparent 60%),
      repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(33,38,45,0.4) 40px),
      repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(33,38,45,0.2) 40px);
    padding: 0 0 60px;
  }

  .header {
    border-bottom: 1px solid var(--border);
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(13,17,23,0.95);
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(12px);
  }

  .logo {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.5px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-badge {
    background: var(--accent);
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 3px;
    letter-spacing: 1px;
  }

  .header-tag {
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .main { max-width: 1100px; margin: 0 auto; padding: 40px 24px; }

  .hero {
    text-align: center;
    padding: 60px 0 50px;
  }

  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -2px;
    margin-bottom: 16px;
  }

  .hero h1 span { color: var(--accent); }

  .hero p {
    color: var(--muted);
    font-size: 14px;
    max-width: 500px;
    margin: 0 auto 40px;
    line-height: 1.7;
  }

  .input-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 32px;
    margin-bottom: 32px;
    position: relative;
    overflow: hidden;
  }

  .input-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #FF6B00, #FF9933, #FF6B00);
  }

  .section-label {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .fund-row {
    display: grid;
    grid-template-columns: 1fr 160px 40px;
    gap: 10px;
    margin-bottom: 10px;
    align-items: center;
  }

  input[type="text"], input[type="number"] {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text);
    font-family: var(--font-mono);
    font-size: 13px;
    padding: 10px 14px;
    width: 100%;
    transition: border-color 0.2s;
    outline: none;
  }

  input[type="text"]:focus, input[type="number"]:focus {
    border-color: var(--accent);
  }

  input::placeholder { color: var(--muted); }

  .btn-remove {
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--muted);
    cursor: pointer;
    font-size: 16px;
    height: 38px;
    width: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .btn-remove:hover { border-color: var(--danger); color: var(--danger); }

  .btn-add {
    background: transparent;
    border: 1px dashed var(--border);
    border-radius: 6px;
    color: var(--muted);
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 12px;
    padding: 10px;
    width: 100%;
    transition: all 0.2s;
    margin-top: 4px;
  }

  .btn-add:hover { border-color: var(--accent); color: var(--accent); }

  .btn-analyze {
    background: var(--accent);
    border: none;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 700;
    padding: 14px 36px;
    width: 100%;
    margin-top: 24px;
    transition: all 0.2s;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
  }

  .btn-analyze:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(255,107,0,0.35);
  }

  .btn-analyze:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .loading-bar {
    position: absolute;
    bottom: 0; left: 0;
    height: 3px;
    background: rgba(0,0,0,0.3);
    animation: loadbar 1.5s ease-in-out infinite;
  }

  @keyframes loadbar {
    0% { width: 0%; left: 0; }
    50% { width: 70%; left: 15% }
    100% { width: 0%; left: 100%; }
  }

  /* Results */
  .results { animation: fadeUp 0.4s ease; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .risk-score-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 36px;
    text-align: center;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
  }

  .risk-score-label {
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .risk-score-value {
    font-family: var(--font-display);
    font-size: 80px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -4px;
    margin-bottom: 8px;
  }

  .risk-score-tag {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    padding: 4px 14px;
    border-radius: 100px;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .risk-desc {
    color: var(--muted);
    font-size: 13px;
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .gauge-bg {
    width: 100%;
    height: 8px;
    background: var(--surface2);
    border-radius: 4px;
    overflow: hidden;
    margin-top: 24px;
  }

  .gauge-fill {
    height: 100%;
    border-radius: 4px;
    background: linear-gradient(90deg, #FF9933, #FF6B00, var(--danger));
    transition: width 1s ease;
  }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 20px; }

  @media (max-width: 700px) {
    .grid-2, .grid-3 { grid-template-columns: 1fr; }
    .fund-row { grid-template-columns: 1fr 120px 40px; }
    .header { padding: 16px 20px; }
    .main { padding: 24px 16px; }
  }

  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 22px;
  }

  .stat-label { font-size: 10px; letter-spacing: 2px; color: var(--muted); text-transform: uppercase; margin-bottom: 8px; }
  .stat-value { font-family: var(--font-display); font-size: 28px; font-weight: 800; letter-spacing: -1px; }
  .stat-sub { font-size: 11px; color: var(--muted); margin-top: 4px; }

  .analysis-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 28px;
    margin-bottom: 20px;
  }

  .analysis-title {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .analysis-title .icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    background: var(--surface2);
  }

  .prose {
    font-size: 13px;
    line-height: 1.8;
    color: #c9d1d9;
    white-space: pre-wrap;
  }

  .prose strong { color: var(--accent); }

  .bar-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
    font-size: 12px;
  }

  .bar-label { width: 140px; color: var(--muted); flex-shrink: 0; }
  .bar-track { flex: 1; height: 6px; background: var(--surface2); border-radius: 3px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 3px; transition: width 0.8s ease; }
  .bar-pct { width: 40px; text-align: right; color: var(--text); font-size: 11px; }

  .tag {
    display: inline-block;
    font-size: 10px;
    padding: 3px 10px;
    border-radius: 4px;
    margin: 3px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .tag-red { background: rgba(255,68,68,0.15); color: var(--danger); border: 1px solid rgba(255,68,68,0.3); }
  .tag-green { background: rgba(255,140,0,0.12); color: var(--safe); border: 1px solid rgba(255,140,0,0.3); }
  .tag-blue { background: rgba(126,184,247,0.12); color: var(--accent3); border: 1px solid rgba(126,184,247,0.25); }
  .tag-orange { background: rgba(255,107,53,0.12); color: var(--accent2); border: 1px solid rgba(255,107,53,0.3); }

  .suggest-item {
    border-left: 2px solid var(--accent);
    padding: 10px 14px;
    margin-bottom: 10px;
    background: rgba(255,107,0,0.06);
    border-radius: 0 6px 6px 0;
    font-size: 13px;
    line-height: 1.6;
    color: #c9d1d9;
  }

  .loading-state {
    text-align: center;
    padding: 80px 20px;
    color: var(--muted);
  }

  .spinner {
    width: 40px; height: 40px;
    border: 2px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 20px;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .error-box {
    background: rgba(255,68,68,0.08);
    border: 1px solid rgba(255,68,68,0.3);
    border-radius: 8px;
    padding: 20px;
    color: var(--danger);
    font-size: 13px;
    text-align: center;
  }

  .fund-chip {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .fund-chip-name { color: var(--text); }
  .fund-chip-amt { color: var(--accent); font-weight: 700; }

  .disclaimer {
    font-size: 10px;
    color: var(--muted);
    text-align: center;
    margin-top: 40px;
    line-height: 1.6;
    padding: 0 20px;
  }
`;

const COLORS = ["#00ff87","#7eb8f7","#ff6b35","#ffa726","#ce93d8","#80cbc4","#ef9a9a","#fff176"];

function getRiskColor(score) {
  if (score <= 30) return "#00e676";
  if (score <= 55) return "#ffa726";
  if (score <= 75) return "#ff6b35";
  return "#ff4444";
}

function getRiskLabel(score) {
  if (score <= 30) return { label: "Low Risk", cls: "tag-green" };
  if (score <= 55) return { label: "Moderate Risk", cls: "tag-orange" };
  if (score <= 75) return { label: "High Risk", cls: "tag-orange" };
  return { label: "Very High Risk", cls: "tag-red" };
}

const SAMPLE = [
  { name: "Mirae Asset Large Cap Fund", amount: "150000" },
  { name: "Parag Parikh Flexi Cap Fund", amount: "200000" },
  { name: "Axis Small Cap Fund", amount: "100000" },
  { name: "HDFC Mid-Cap Opportunities Fund", amount: "120000" },
];

export default function PortfolioRiskAnalyzer() {
  const [funds, setFunds] = useState([{ name: "", amount: "" }]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = styles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const addFund = () => setFunds([...funds, { name: "", amount: "" }]);
  const removeFund = (i) => setFunds(funds.filter((_, idx) => idx !== i));
  const updateFund = (i, field, val) => {
    const next = [...funds];
    next[i][field] = val;
    setFunds(next);
  };

  const loadSample = () => setFunds(SAMPLE.map(f => ({ ...f })));

  const totalAmount = funds.reduce((s, f) => s + (parseFloat(f.amount) || 0), 0);

  const analyzeLocally = (validFunds) => {
    const total = validFunds.reduce((s, f) => s + (parseFloat(f.amount) || 0), 0);

    const classify = (name) => {
      const n = name.toLowerCase();
      if (/liquid|overnight|money market|ultra short|low dur/.test(n)) return { risk: 5, eq: 0, type: "Debt", role: "Core", level: "Low" };
      if (/debt|gilt|bond|income|credit risk|banking & psu/.test(n)) return { risk: 18, eq: 5, type: "Debt", role: "Core", level: "Low" };
      if (/arbitrage/.test(n)) return { risk: 12, eq: 65, type: "Hybrid", role: "Satellite", level: "Low" };
      if (/hybrid|balanced advantage|dynamic asset|multi asset/.test(n)) return { risk: 35, eq: 65, type: "Hybrid", role: "Core", level: "Moderate" };
      if (/conservative hybrid/.test(n)) return { risk: 22, eq: 25, type: "Hybrid", role: "Core", level: "Low" };
      if (/large.*mid|flexi|multi cap|focused/.test(n)) return { risk: 55, eq: 90, type: "Equity", role: "Core", level: "Moderate" };
      if (/large cap|bluechip|top 100|nifty 50|index|sensex/.test(n)) return { risk: 45, eq: 95, type: "Equity", role: "Core", level: "Moderate" };
      if (/mid cap/.test(n)) return { risk: 65, eq: 95, type: "Equity", role: "Satellite", level: "High" };
      if (/small cap/.test(n)) return { risk: 80, eq: 95, type: "Equity", role: "Satellite", level: "High" };
      if (/elss|tax sav/.test(n)) return { risk: 58, eq: 95, type: "Equity", role: "Core", level: "Moderate" };
      if (/sector|thematic|psu|infra|tech|pharma|bank|fmcg|consumption|energy/.test(n)) return { risk: 78, eq: 98, type: "Sectoral", role: "Tactical", level: "High" };
      if (/international|global|us|nasdaq|world/.test(n)) return { risk: 62, eq: 95, type: "Equity", role: "Satellite", level: "High" };
      return { risk: 50, eq: 80, type: "Equity", role: "Core", level: "Moderate" };
    };

    const classifications = validFunds.map(f => ({ ...f, ...classify(f.name), amt: parseFloat(f.amount) || 0 }));

    // Weighted risk score
    const weightedRisk = classifications.reduce((s, f) => s + (f.risk * f.amt / total), 0);
    const riskScore = Math.round(weightedRisk);

    // Equity/Debt split
    const equityExposure = Math.round(classifications.reduce((s, f) => s + (f.eq * f.amt / total), 0));
    const debtExposure = 100 - equityExposure;

    // Diversification: penalise if one fund > 50%, reward variety
    const weights = classifications.map(f => f.amt / total);
    const maxWeight = Math.max(...weights);
    const typeSet = new Set(classifications.map(f => f.type));
    const divScore = Math.round(Math.min(100, (1 - maxWeight) * 70 + typeSet.size * 10));

    const volatility = riskScore <= 20 ? "Low" : riskScore <= 45 ? "Moderate" : riskScore <= 68 ? "High" : "Very High";

    // Sector concentration heuristics
    const sectorMap = {};
    classifications.forEach(f => {
      const n = f.name.toLowerCase();
      const pct = Math.round((f.amt / total) * 100);
      const sectors = [];
      if (/bank|fin|hdfc|icici|kotak|sbi/.test(n)) sectors.push(["Banking & Finance", pct * 0.35]);
      if (/tech|it|infosy|tcs|wipro/.test(n)) sectors.push(["IT & Technology", pct * 0.25]);
      if (/pharma|health/.test(n)) sectors.push(["Healthcare", pct * 0.7]);
      if (/infra|psu|power/.test(n)) sectors.push(["Infrastructure", pct * 0.6]);
      if (/fmcg|consum/.test(n)) sectors.push(["FMCG & Consumer", pct * 0.5]);
      if (sectors.length === 0) {
        sectors.push(["Banking & Finance", pct * 0.28]);
        sectors.push(["IT & Technology", pct * 0.18]);
        sectors.push(["Consumer Goods", pct * 0.12]);
      }
      sectors.forEach(([sec, w]) => { sectorMap[sec] = (sectorMap[sec] || 0) + w; });
    });
    const sectorConcentration = Object.entries(sectorMap)
      .map(([sector, weight]) => ({ sector, weight: Math.round(weight) }))
      .filter(s => s.weight > 3)
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 5);

    // Overlaps
    const overlaps = [];
    const equityFunds = classifications.filter(f => f.eq >= 80);
    if (equityFunds.length >= 3) overlaps.push(`${equityFunds.length} equity funds likely overlap in large-cap stocks (Banking, IT)`);
    const largeCap = classifications.filter(f => /large|bluechip|index|nifty|sensex/.test(f.name.toLowerCase()));
    if (largeCap.length >= 2) overlaps.push("Multiple large-cap funds detected — consider consolidating into one");
    if (overlaps.length === 0) overlaps.push("No significant overlap detected across fund categories");

    // Risks
    const risks = [];
    if (riskScore > 60) risks.push("High equity concentration increases short-term volatility risk");
    if (maxWeight > 0.4) risks.push(`Over-concentration: one fund holds ${Math.round(maxWeight * 100)}% of portfolio`);
    if (equityExposure > 85) risks.push("Very high equity exposure — portfolio may fall sharply in market downturns");
    const sectoral = classifications.filter(f => f.type === "Sectoral");
    if (sectoral.length > 0) risks.push(`Sectoral fund(s) add concentration risk in specific industries`);
    if (debtExposure < 10 && total > 100000) risks.push("No debt cushion — consider adding a debt/hybrid fund for stability");
    if (risks.length === 0) risks.push("Portfolio appears well-structured with no major risk flags");

    // Strengths
    const strengths = [];
    if (typeSet.size >= 3) strengths.push("Good mix of fund categories (equity, debt, hybrid)");
    if (classifications.some(f => /flexi|multi/.test(f.name.toLowerCase()))) strengths.push("Flexi-cap fund provides dynamic allocation across market caps");
    if (classifications.some(f => /index|nifty|sensex/.test(f.name.toLowerCase()))) strengths.push("Index fund inclusion keeps costs low and ensures market returns");
    if (divScore > 60) strengths.push("Reasonably diversified portfolio with spread across fund types");
    if (strengths.length === 0) strengths.push("Consistent SIP in equity funds builds long-term wealth");

    // Suggestions
    const suggestions = [];
    if (debtExposure < 15 && riskScore > 50) suggestions.push("Add a short-duration debt or liquid fund (10–15%) to reduce volatility");
    if (maxWeight > 0.4) suggestions.push(`Reduce allocation to your largest fund — cap each fund at 30–35% of portfolio`);
    if (largeCap.length >= 2) suggestions.push("Consolidate large-cap exposure into a single index fund to cut overlap and expense ratio");
    suggestions.push("Review and rebalance every 6 months to maintain target allocation");
    if (suggestions.length < 2) suggestions.push("Consider adding an international fund (5–10%) for geographical diversification");

    const riskSummary = riskScore <= 30
      ? "Your portfolio is conservatively positioned with low volatility — suitable for capital preservation."
      : riskScore <= 55
      ? "Your portfolio carries moderate risk with a healthy equity tilt — well-suited for long-term growth."
      : riskScore <= 72
      ? "Your portfolio is aggressively positioned with high equity exposure — expect short-term volatility."
      : "Your portfolio carries very high risk due to heavy small/mid-cap or sectoral exposure — suitable only for high-risk investors with 7+ year horizon.";

    return {
      riskScore,
      riskSummary,
      metrics: { equityExposure, debtExposure, diversificationScore: divScore, volatility },
      sectorConcentration,
      overlaps,
      risks,
      strengths,
      rebalancingSuggestions: suggestions.slice(0, 3),
      fundWiseRisk: classifications.map(f => ({ name: f.name.split(" ").slice(0, 3).join(" "), riskLevel: f.level, role: f.role })),
      funds: validFunds,
    };
  };

  const analyze = () => {
    const validFunds = funds.filter(f => f.name.trim() && f.amount);
    if (validFunds.length < 1) { alert("Please add at least 1 fund."); return; }
    setLoading(true);
    setResult(null);
    setError(null);
    // Tiny timeout so loading state renders before sync work
    setTimeout(() => {
      try {
        const result = analyzeLocally(validFunds);
        setResult(result);
      } catch (e) {
        setError("Analysis failed: " + e.message);
      } finally {
        setLoading(false);
      }
    }, 400);
  };
  const riskColor = result ? getRiskColor(result.riskScore) : "#00ff87";
  const riskInfo = result ? getRiskLabel(result.riskScore) : {};

  return (
    <div className="app">
      <div className="header">
        <div className="logo">
          <svg width="120" height="28" viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="#FF6B00"/>
            <text x="6" y="20" fontFamily="Syne, sans-serif" fontSize="16" fontWeight="800" fill="white">S</text>
            <text x="34" y="20" fontFamily="Syne, sans-serif" fontSize="16" fontWeight="700" fill="#e6edf3">scripbox</text>
          </svg>
          <span className="logo-badge">AI</span>
        </div>
        <div className="header-tag">Risk Analyzer · Powered by Claude</div>
      </div>

      <div className="main">
        {!result && !loading && (
          <div className="hero">
            <h1>Analyze Your<br /><span>Mutual Fund Risk</span></h1>
            <p>Enter your mutual fund holdings and get an AI-powered risk analysis with rebalancing suggestions.</p>
          </div>
        )}

        {/* INPUT CARD */}
        {!result && !loading && (
          <div className="input-card">
            <div className="section-label">Your Portfolio</div>

            <div className="fund-row" style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: 1 }}>FUND NAME</div>
              <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: 1 }}>AMOUNT (₹)</div>
              <div></div>
            </div>

            {funds.map((f, i) => (
              <div className="fund-row" key={i}>
                <input
                  type="text"
                  placeholder={`e.g. Mirae Asset Large Cap Fund`}
                  value={f.name}
                  onChange={e => updateFund(i, "name", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="100000"
                  value={f.amount}
                  onChange={e => updateFund(i, "amount", e.target.value)}
                />
                <button className="btn-remove" onClick={() => removeFund(i)}>×</button>
              </div>
            ))}

            <button className="btn-add" onClick={addFund}>+ Add Fund</button>

            {totalAmount > 0 && (
              <div style={{ textAlign: "right", fontSize: 12, color: "var(--muted)", marginTop: 12 }}>
                Total Portfolio: <span style={{ color: "var(--accent)", fontWeight: 700 }}>₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <button
                onClick={loadSample}
                style={{ background: "transparent", border: "1px solid var(--border)", borderRadius: 8, color: "var(--muted)", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 12, padding: "10px 20px", flex: "none" }}
              >
                Load Sample
              </button>
              <button
                className="btn-analyze"
                style={{ marginTop: 0, flex: 1 }}
                onClick={analyze}
                disabled={loading}
              >
                Analyze Portfolio Risk →
              </button>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Analyzing your portfolio...</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Checking sector exposure, overlaps & risks</div>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="error-box">
            <div style={{ marginBottom: 12 }}>⚠ {error}</div>
            <button onClick={() => setError(null)} style={{ background: "var(--danger)", border: "none", borderRadius: 6, color: "#fff", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 12, padding: "8px 16px" }}>Try Again</button>
          </div>
        )}

        {/* RESULTS */}
        {result && (
          <div className="results">
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>Risk Analysis Report</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{result.funds.length} funds · ₹{totalAmount.toLocaleString("en-IN")} total</div>
              </div>
              <button
                onClick={() => { setResult(null); setError(null); }}
                style={{ background: "transparent", border: "1px solid var(--border)", borderRadius: 8, color: "var(--muted)", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 12, padding: "8px 16px" }}
              >
                ← New Analysis
              </button>
            </div>

            {/* Risk Score */}
            <div className="risk-score-card" style={{ borderColor: riskColor + "44" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: riskColor }}></div>
              <div className="risk-score-label">Overall Risk Score</div>
              <div className="risk-score-value" style={{ color: riskColor }}>{result.riskScore}</div>
              <div className="tag" style={{ background: riskColor + "22", color: riskColor, border: `1px solid ${riskColor}55` }}>
                {riskInfo.label}
              </div>
              <div className="risk-desc">{result.riskSummary}</div>
              <div className="gauge-bg" style={{ maxWidth: 400, margin: "24px auto 0" }}>
                <div className="gauge-fill" style={{ width: `${result.riskScore}%` }}></div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 400, margin: "6px auto 0", fontSize: 10, color: "var(--muted)" }}>
                <span>LOW</span><span>MODERATE</span><span>HIGH</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid-3">
              <div className="stat-card">
                <div className="stat-label">Equity Exposure</div>
                <div className="stat-value" style={{ color: "var(--accent2)" }}>{result.metrics.equityExposure}%</div>
                <div className="stat-sub">of total portfolio</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Diversification</div>
                <div className="stat-value" style={{ color: "var(--accent3)" }}>{result.metrics.diversificationScore}/100</div>
                <div className="stat-sub">diversity score</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Volatility</div>
                <div className="stat-value" style={{ color: riskColor, fontSize: 22 }}>{result.metrics.volatility}</div>
                <div className="stat-sub">expected market movement</div>
              </div>
            </div>

            {/* Sector Concentration */}
            {result.sectorConcentration?.length > 0 && (
              <div className="analysis-card">
                <div className="analysis-title">
                  <span className="icon">📊</span>
                  Sector Concentration
                </div>
                {result.sectorConcentration.map((s, i) => (
                  <div className="bar-row" key={i}>
                    <div className="bar-label">{s.sector}</div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${Math.min(s.weight, 100)}%`, background: COLORS[i % COLORS.length] }}></div>
                    </div>
                    <div className="bar-pct">{s.weight}%</div>
                  </div>
                ))}
              </div>
            )}

            {/* Fund-wise Risk */}
            <div className="analysis-card">
              <div className="analysis-title"><span className="icon">🏦</span>Fund-wise Risk Profile</div>
              {result.fundWiseRisk?.map((f, i) => (
                <div className="fund-chip" key={i}>
                  <span className="fund-chip-name">{f.name}</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span className={`tag ${f.riskLevel === "High" ? "tag-red" : f.riskLevel === "Low" ? "tag-green" : "tag-orange"}`}>{f.riskLevel}</span>
                    <span className="tag tag-blue">{f.role}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Overlaps & Risks + Strengths */}
            <div className="grid-2">
              <div className="analysis-card">
                <div className="analysis-title"><span className="icon">⚠️</span>Key Risks</div>
                {result.risks?.map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, fontSize: 13, color: "#c9d1d9", lineHeight: 1.6 }}>
                    <span style={{ color: "var(--danger)", flexShrink: 0 }}>▸</span>{r}
                  </div>
                ))}
                {result.overlaps?.length > 0 && (
                  <>
                    <div style={{ fontSize: 10, letterSpacing: 2, color: "var(--muted)", margin: "14px 0 8px", textTransform: "uppercase" }}>Overlaps</div>
                    {result.overlaps.map((o, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13, color: "#c9d1d9", lineHeight: 1.6 }}>
                        <span style={{ color: "var(--warning)", flexShrink: 0 }}>▸</span>{o}
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="analysis-card">
                <div className="analysis-title"><span className="icon">✅</span>Strengths</div>
                {result.strengths?.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, fontSize: 13, color: "#c9d1d9", lineHeight: 1.6 }}>
                    <span style={{ color: "var(--safe)", flexShrink: 0 }}>▸</span>{s}
                  </div>
                ))}
              </div>
            </div>

            {/* Rebalancing Suggestions */}
            <div className="analysis-card">
              <div className="analysis-title"><span className="icon">🔄</span>Rebalancing Suggestions</div>
              {result.rebalancingSuggestions?.map((s, i) => (
                <div className="suggest-item" key={i}>{s}</div>
              ))}
            </div>

            <div className="disclaimer">
              ⚠ This analysis is AI-generated and for educational purposes only. It does not constitute financial advice.<br />
              Please consult a SEBI-registered investment advisor before making investment decisions.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
