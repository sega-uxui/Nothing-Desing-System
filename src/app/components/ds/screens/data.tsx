// Shared static data + micro-visuals for the App Screens prototypes.

export const TICKERS = [
  {
    name: "S&P 500", price: "5,736.84", change: "-1.81%", up: false,
    data: [58.4, 58.6, 58.2, 58.5, 58.0, 57.7, 57.4, 57.2, 57.0, 57.37].map((v, i) => ({ i, v })),
  },
  {
    name: "Dow 30", price: "42,492.59", change: "-1.20%", up: false,
    data: [43.0, 42.9, 43.0, 42.8, 42.7, 42.6, 42.5, 42.4, 42.3, 42.49].map((v, i) => ({ i, v })),
  },
  {
    name: "Nasdaq", price: "18,130.84", change: "-2.27%", up: false,
    data: [18.5, 18.4, 18.5, 18.3, 18.2, 18.1, 18.0, 17.9, 18.0, 18.13].map((v, i) => ({ i, v })),
  },
  {
    name: "Rus. 2000", price: "2,071.64", change: "-1.39%", up: false,
    data: [210, 209.5, 210, 209, 208.5, 208, 207.5, 207, 207.2, 207.16].map((v, i) => ({ i, v })),
  },
];

export const PORTFOLIO_DATA = [
  { t: "", v: 5910 },
  { t: "", v: 5935 },
  { t: "", v: 5948 },
  { t: "10 PM", v: 5922 },
  { t: "", v: 5960 },
  { t: "", v: 5942 },
  { t: "", v: 5928 },
  { t: "", v: 5915 },
  { t: "11 PM", v: 5902 },
  { t: "", v: 5892 },
  { t: "", v: 5878 },
  { t: "", v: 5868 },
  { t: "12 AM", v: 5866 },
];

export const RANGES = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "ALL"] as const;
export type Range = (typeof RANGES)[number];

export const FINANCE_NEWS = [
  {
    title: "Nvidia earnings beat estimates, shares climb after hours", source: "CNBC", time: "48m ago", tag: "Earnings",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=640&q=60",
  },
  { title: "Fed signals rate hold through Q2 amid cooling inflation", source: "Bloomberg", time: "12m ago", tag: "Macro" },
  {
    title: "Bitcoin dips below $61k as risk appetite fades", source: "CoinDesk", time: "1h ago", tag: "Crypto",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=640&q=60",
  },
  { title: "Retail sales miss forecasts for third straight month", source: "Reuters", time: "2h ago", tag: "Macro" },
  { title: "Tesla recalls 120k vehicles over software defect", source: "WSJ", time: "3h ago", tag: "Earnings" },
  { title: "Oil prices climb on OPEC+ supply cut extension", source: "Bloomberg", time: "5h ago", tag: "Macro" },
  { title: "Ethereum ETF inflows hit record weekly high", source: "CoinDesk", time: "6h ago", tag: "Crypto" },
];

export const FINANCE_MARKETS = {
  Stocks: TICKERS,
  Crypto: [
    { name: "Bitcoin", price: "60,842.10", change: "-2.14%", data: [63, 62.5, 62, 61.5, 61, 60.8, 60.9, 61.2, 60.9, 60.84].map((v, i) => ({ i, v })) },
    { name: "Ethereum", price: "2,940.55", change: "+1.02%", data: [2.85, 2.87, 2.9, 2.89, 2.92, 2.91, 2.93, 2.94, 2.93, 2.94].map((v, i) => ({ i, v })) },
    { name: "Solana", price: "142.18", change: "+3.41%", data: [130, 132, 135, 133, 138, 136, 140, 139, 141, 142].map((v, i) => ({ i, v })) },
  ],
  Forex: [
    { name: "EUR/USD", price: "1.0842", change: "+0.12%", data: [1.081, 1.082, 1.083, 1.082, 1.084, 1.083, 1.084, 1.085, 1.084, 1.0842].map((v, i) => ({ i, v })) },
    { name: "GBP/USD", price: "1.2634", change: "-0.08%", data: [1.266, 1.265, 1.264, 1.265, 1.263, 1.264, 1.262, 1.263, 1.264, 1.2634].map((v, i) => ({ i, v })) },
    { name: "USD/JPY", price: "151.92", change: "+0.31%", data: [151.2, 151.4, 151.5, 151.3, 151.6, 151.7, 151.5, 151.8, 151.9, 151.92].map((v, i) => ({ i, v })) },
  ],
} as const;

export const SOCCER_NEWS = [
  {
    title: "Rusnak confident Sounders can use home advantage in Game 2", source: "FotMob", time: "Yesterday", tag: "Preview",
    image: "https://images.unsplash.com/photo-1772450235863-996680ddb732?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=640&q=60",
  },
  { title: "Loons winger ruled out for remainder of playoffs with ACL injury", source: "MLSsoccer", time: "3h ago", tag: "Injury" },
  {
    title: "Transfer rumors: Sounders eye January reinforcements at fullback", source: "The Athletic", time: "6h ago", tag: "Transfer",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=640&q=60",
  },
  { title: "Conference final second leg sells out in under an hour", source: "ESPN", time: "1d ago", tag: "News" },
  { title: "Referee assignment confirmed for Saturday's decider", source: "FotMob", time: "1d ago", tag: "News" },
  { title: "Minnesota boss: \"We travel to win, not just compete\"", source: "MLSsoccer", time: "2d ago", tag: "Preview" },
];

export const LEAGUE_STANDINGS = [
  { pos: 1, team: "LA Galaxy", p: 34, gd: 22, pts: 61 },
  { pos: 2, team: "Seattle Sounders", p: 34, gd: 18, pts: 58, highlight: true },
  { pos: 3, team: "Minnesota United", p: 34, gd: 14, pts: 55 },
  { pos: 4, team: "Real Salt Lake", p: 34, gd: 9, pts: 52 },
  { pos: 5, team: "Portland Timbers", p: 34, gd: 6, pts: 49 },
];

export const FOLLOWING = [
  { name: "Seattle Sounders FC", meta: "MLS · Western Conference", initials: "SS" },
  { name: "Cristiano Ronaldo", meta: "Al Nassr · Forward", initials: "CR" },
  { name: "Minnesota United", meta: "MLS · Western Conference", initials: "MN" },
  { name: "Lionel Messi", meta: "Inter Miami · Forward", initials: "LM" },
];

export const COMMENTARY = [
  { minute: "90+3'", text: "Full-time whistle. Sounders hold on for a crucial away point.", kind: "Whistle" },
  { minute: "84'", text: "Yellow card shown to Morris for a late challenge.", player: "J. Morris", kind: "Card" },
  { minute: "78'", text: "GOAL! Ruidiaz finishes a slick counter to level the tie.", player: "R. Ruidiaz", kind: "Goal" },
  { minute: "65'", text: "Substitution: Rusnak comes on for Lodeiro.", player: "A. Rusnak", kind: "Sub" },
  { minute: "51'", text: "GOAL! Reynoso curls a free kick into the top corner.", player: "E. Reynoso", kind: "Goal" },
  { minute: "12'", text: "Early chance for Minnesota, shot straight at the keeper.", player: "R. Fragapane", kind: "Chance" },
];

export const HOME_XI = [
  { num: 1, name: "S. Frei", pos: "GK" },
  { num: 13, name: "N. Giannitto", pos: "RB" },
  { num: 4, name: "Y. Ademe", pos: "CB" },
  { num: 5, name: "J. Vargas", pos: "CB" },
  { num: 3, name: "J. Morris", pos: "LB" },
  { num: 8, name: "A. Roldan", pos: "CDM" },
  { num: 6, name: "J. Bruin", pos: "CM" },
  { num: 10, name: "N. Lodeiro", pos: "CAM" },
  { num: 7, name: "C. Rothrock", pos: "RW" },
  { num: 24, name: "P. Ruidiaz", pos: "ST" },
  { num: 11, name: "R. Lewis", pos: "LW" },
];

export const AWAY_XI = [
  { num: 18, name: "D. St. Clair", pos: "GK" },
  { num: 2, name: "D. Moor", pos: "RB" },
  { num: 5, name: "M. Boxall", pos: "CB" },
  { num: 15, name: "M. Miller", pos: "CB" },
  { num: 22, name: "H. Metanire", pos: "LB" },
  { num: 20, name: "W. Trapp", pos: "CDM" },
  { num: 8, name: "H. Arguez", pos: "CM" },
  { num: 10, name: "E. Reynoso", pos: "CAM" },
  { num: 7, name: "R. Fragapane", pos: "RW" },
  { num: 9, name: "T. Boxall", pos: "ST" },
  { num: 17, name: "R. Gregus", pos: "LW" },
];

export const KNOCKOUT_ROUNDS = [
  { round: "Round of 16", home: "Seattle Sounders", homeScore: 3, away: "FC Dallas", awayScore: 1, winner: "home" },
  { round: "Quarterfinal", home: "Seattle Sounders", homeScore: 2, away: "LAFC", awayScore: 0, winner: "home" },
  { round: "Semifinal", home: "Seattle Sounders", homeScore: 1, away: "Portland Timbers", awayScore: 0, winner: "home" },
  { round: "Final · 1st leg", home: "Minnesota United", homeScore: 1, away: "Seattle Sounders", awayScore: 1, winner: null },
];

export const MATCH_STATS = [
  { label: "Possession", left: 58, right: 42, leftLabel: "%", rightLabel: "%" },
  { label: "Shots", left: 14, right: 9 },
  { label: "Shots on target", left: 7, right: 4 },
  { label: "Corners", left: 5, right: 8 },
  { label: "Fouls", left: 11, right: 13 },
];

export function SoundersLogo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <path d="M22 2L40 9.5V25C40 36 32 41.5 22 44C12 41.5 4 36 4 25V9.5Z" fill="#2E7D32" />
      <path d="M22 2L40 9.5V25C40 36 32 41.5 22 44C12 41.5 4 36 4 25V9.5Z"
        stroke="#4CAF50" strokeWidth="1" fill="none" />
      <circle cx="22" cy="25" r="11" stroke="white" strokeWidth="1.5" />
      <circle cx="22" cy="25" r="5.5" fill="#4CAF50" />
      <circle cx="22" cy="25" r="2.2" fill="white" />
      <path d="M22 8 L23.2 11.5 L27 11.5 L24.1 13.7 L25.2 17.2 L22 15.1 L18.8 17.2 L19.9 13.7 L17 11.5 L20.8 11.5 Z"
        fill="white" opacity="0.85" />
    </svg>
  );
}

export function MinnesotaLogo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <path d="M22 2L40 9.5V25C40 36 32 41.5 22 44C12 41.5 4 36 4 25V9.5Z" fill="#14213D" />
      <path d="M22 2L40 9.5V25C40 36 32 41.5 22 44C12 41.5 4 36 4 25V9.5Z"
        stroke="#6B8FBF" strokeWidth="1" fill="none" />
      <path d="M9 23 Q14 15 22 17.5 Q30 15 35 23"
        stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M13 25 Q17 19.5 22 21 Q27 19.5 31 25 L27 25.5 Q22 23 17 25.5 Z"
        fill="white" />
      <circle cx="22" cy="29" r="3.5" fill="white" />
      <circle cx="32" cy="16" r="2" fill="white" opacity="0.6" />
    </svg>
  );
}

const PLAYER_IMG =
  "https://images.unsplash.com/photo-1772450235863-996680ddb732?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=320&q=80";
export { PLAYER_IMG };
